"""Unit tests for the FlueGuard combustion state machine."""

from __future__ import annotations

from datetime import datetime, timedelta

import pytest

from flueguard_logic import Engine, Limits, Phase, Recommendation

START = datetime(2026, 1, 1, 18, 0, 0)


def feed(engine: Engine, samples: list[tuple[float, float]]) -> list:
    """Feed (minute_offset, temperature) samples and return all results."""
    results = []
    previous_temp = None
    previous_minute = 0.0
    for minute, temperature in samples:
        if previous_temp is None:
            rate = 0.0
        else:
            delta = minute - previous_minute
            rate = 0.0 if delta <= 0 else (temperature - previous_temp) / delta
        results.append(engine.update(temperature, rate, START + timedelta(minutes=minute)))
        previous_temp = temperature
        previous_minute = minute
    return results


def test_cold_stove_is_idle() -> None:
    engine = Engine()
    result = feed(engine, [(0, 20.0)])[-1]
    assert result.phase is Phase.IDLE
    assert result.recommendation is Recommendation.WAIT
    assert result.overtemp is False


def test_start_hysteresis_prevents_flicker() -> None:
    engine = Engine()
    result = feed(engine, [(0, 20.0), (5, 102.0)])[-1]
    assert result.phase is Phase.IDLE


def test_ignition_starts_above_cold_plus_hysteresis() -> None:
    engine = Engine()
    result = feed(engine, [(0, 20.0), (5, 120.0)])[-1]
    assert result.phase is Phase.IGNITION
    assert result.recommendation is Recommendation.AIR_OPEN
    assert result.burn_seconds == pytest.approx(0.0, abs=1)


def test_ignition_becomes_main_burn() -> None:
    engine = Engine()
    result = feed(engine, [(0, 20.0), (2, 120.0), (6, 270.0)])[-1]
    assert result.phase is Phase.MAIN
    assert result.recommendation is Recommendation.HOLD


def test_reduce_air_when_running_hot() -> None:
    engine = Engine()
    result = feed(engine, [(0, 20.0), (2, 120.0), (6, 270.0), (10, 380.0)])[-1]
    assert result.phase is Phase.MAIN
    assert result.recommendation is Recommendation.REDUCE_AIR
    assert result.overtemp is False
    assert result.peak == 380.0


def test_overtemperature_flag() -> None:
    engine = Engine()
    result = feed(engine, [(0, 20.0), (2, 120.0), (6, 270.0), (10, 500.0)])[-1]
    assert result.overtemp is True


def test_burnout_then_reload_hint_then_idle() -> None:
    engine = Engine()
    results = feed(
        engine,
        [(0, 20.0), (2, 120.0), (6, 270.0), (10, 380.0), (14, 300.0), (18, 140.0)],
    )

    burnout = results[4]
    assert burnout.phase is Phase.BURNOUT

    reload_hint = results[5]
    assert reload_hint.recommendation is Recommendation.ADD_FUEL

    end = feed(engine, [(22, 90.0)])[-1]
    assert end.phase is Phase.IDLE
    assert end.recommendation is Recommendation.LET_BURN_OUT
    assert end.peak == 0.0


def test_failed_ignition_returns_to_idle() -> None:
    engine = Engine()
    result = feed(engine, [(0, 20.0), (2, 120.0), (5, 80.0)])[-1]
    assert result.phase is Phase.IDLE
    assert result.recommendation is Recommendation.LET_BURN_OUT


def test_ignition_timeout_enters_main_burn() -> None:
    engine = Engine()
    # Stays below `main` but above `cold` for longer than the ignition window.
    result = feed(engine, [(0, 20.0), (2, 120.0), (20, 200.0)])[-1]
    assert result.phase is Phase.MAIN


def test_phase_and_recommendation_change_flags() -> None:
    engine = Engine()
    results = feed(engine, [(0, 20.0), (2, 120.0)])
    assert results[0].phase_changed is False
    assert results[1].phase_changed is True


def test_limits_ordering_validation() -> None:
    assert Limits().is_ordered() is True
    assert Limits(cold=300).is_ordered() is False
