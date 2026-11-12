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


# ----------------------------------------------------------------------
# fan
# ----------------------------------------------------------------------
from flueguard_logic import (  # noqa: E402
    FanReason,
    FanSettings,
    fan_percentage,
    in_night_window,
)


def test_fan_is_off_below_off_temperature() -> None:
    decision = fan_percentage(120.0)
    assert decision.on is False
    assert decision.percentage == 0
    assert decision.reason is FanReason.OFF


def test_fan_starts_at_minimum_percentage() -> None:
    decision = fan_percentage(160.0)
    assert decision.percentage == 15
    assert decision.on is True
    assert decision.reason is FanReason.RAMP
    # Between off_temp and min_temp the fan already runs at minimum speed.
    assert fan_percentage(150.0).percentage == 15


def test_fan_ramps_linearly() -> None:
    settings = FanSettings()
    # 240 °C is exactly in the middle of 160…320 °C.
    assert fan_percentage(240.0, settings).percentage == 50
    # Above max_temp it stays at max_percentage until the warning threshold.
    assert fan_percentage(320.0, settings).percentage == 85
    assert fan_percentage(440.0, settings).percentage == 85


def test_fan_full_speed_on_overtemperature() -> None:
    decision = fan_percentage(460.0, is_night=True, room_temperature=27.0)
    assert decision.percentage == 100
    assert decision.reason is FanReason.OVERTEMP
    assert decision.on is True


def test_fan_night_cap() -> None:
    decision = fan_percentage(300.0, is_night=True)
    assert decision.percentage == 30
    assert decision.reason is FanReason.NIGHT


def test_fan_room_cap() -> None:
    decision = fan_percentage(300.0, room_temperature=24.0)
    assert decision.percentage == 40
    assert decision.reason is FanReason.ROOM


def test_fan_room_below_limit_does_not_cap() -> None:
    decision = fan_percentage(300.0, room_temperature=23.9)
    assert decision.percentage == 76
    assert decision.reason is FanReason.RAMP


def test_fan_night_and_room_cap_together() -> None:
    # A stricter room cap than the night cap is unusual but possible.
    settings = FanSettings(room_percentage=10)
    decision = fan_percentage(
        300.0, settings, is_night=True, room_temperature=25.0
    )
    assert decision.percentage == 10
    assert decision.reason is FanReason.NIGHT_ROOM


def test_fan_never_exceeds_configured_bounds() -> None:
    settings = FanSettings(min_percentage=20, max_percentage=70)
    assert fan_percentage(130.0, settings).percentage == 0
    assert fan_percentage(161.0, settings).percentage == 20
    assert fan_percentage(319.0, settings).percentage == 70
    assert fan_percentage(449.0, settings).percentage == 70


def test_night_window_wraps_midnight() -> None:
    assert in_night_window(23, 22, 7) is True
    assert in_night_window(2, 22, 7) is True
    assert in_night_window(6, 22, 7) is True
    assert in_night_window(7, 22, 7) is False
    assert in_night_window(12, 22, 7) is False
    assert in_night_window(21, 22, 7) is False


def test_night_window_same_start_and_end_is_all_day() -> None:
    assert in_night_window(3, 8, 8) is True


def test_fan_settings_defaults_are_plausible() -> None:
    settings = FanSettings()
    assert settings.off_temp <= settings.min_temp < settings.max_temp
    assert settings.min_percentage <= settings.max_percentage
    assert settings.night_percentage <= settings.max_percentage
    assert settings.room_percentage <= settings.max_percentage
