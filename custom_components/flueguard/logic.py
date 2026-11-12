"""Pure combustion-phase logic for KaminOfenWaechter.

This module deliberately has **no** Home Assistant imports so that the
state machine can be unit tested without a running Home Assistant instance.

The model is intentionally simple and explainable: a wood stove burn has a
rising phase (ignition), a hot phase (main burn), a cooling phase (burnout)
and is otherwise idle. The recommendation tells the user what to do with the
primary air / when to reload.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from enum import Enum


class Phase(str, Enum):
    """Current combustion phase."""

    IDLE = "idle"
    IGNITION = "ignition"
    MAIN = "main"
    BURNOUT = "burnout"


class Recommendation(str, Enum):
    """What the user should do right now."""

    WAIT = "wait"
    AIR_OPEN = "air_open"
    HOLD = "hold"
    REDUCE_AIR = "reduce_air"
    ADD_FUEL = "add_fuel"
    LET_BURN_OUT = "let_burn_out"


@dataclass(frozen=True)
class Limits:
    """Thresholds in degrees Celsius and minutes.

    Defaults are rule-of-thumb values for a modern closed wood stove
    (Scheitholz, dry wood). They are meant to be tuned per stove.
    """

    # Below this flue gas temperature the stove is considered cold.
    cold: float = 100.0
    # Below this temperature (but above cold) reloading makes sense.
    refuel: float = 150.0
    # Lower edge of the "good" flue gas temperature band.
    optimal_low: float = 180.0
    # Above this temperature we consider the main burn established.
    main: float = 250.0
    # Upper edge of the "good" flue gas temperature band.
    optimal_high: float = 350.0
    # Above this temperature the stove is running too hot / wasting wood.
    warn: float = 450.0
    # If the fire is not established within this time we still call it main burn.
    ignition_max_minutes: float = 15.0
    # Cooling rate (deg C per minute) that marks the transition to burnout.
    burnout_rate: float = -1.5
    # Required drop below the peak before burnout is detected.
    peak_drop: float = 25.0
    # Start hysteresis so the burn does not flicker around `cold`.
    hysteresis: float = 5.0

    def is_ordered(self) -> bool:
        """Return True if the thresholds make sense."""
        return (
            self.cold
            < self.refuel
            <= self.optimal_low
            < self.main
            <= self.optimal_high
            < self.warn
        )


@dataclass
class Result:
    """One evaluation of the state machine."""

    temperature: float
    rate: float
    phase: Phase
    recommendation: Recommendation
    peak: float
    burn_seconds: float
    overtemp: bool
    phase_changed: bool = False
    recommendation_changed: bool = False


class Engine:
    """Small, deterministic combustion state machine."""

    def __init__(
        self,
        limits: Limits | None = None,
        *,
        phase: Phase = Phase.IDLE,
        burn_started: datetime | None = None,
        peak: float = 0.0,
    ) -> None:
        self.limits = limits or Limits()
        self.phase = phase
        self.burn_started = burn_started
        self.peak = peak
        self.recommendation = Recommendation.WAIT

    def update(self, temperature: float, rate: float, now: datetime) -> Result:
        """Feed one measurement (deg C, deg C/min, timestamp) into the engine."""
        limits = self.limits
        previous_phase = self.phase
        previous_recommendation = self.recommendation
        burn_ended = False

        if self.phase is Phase.IDLE:
            if temperature >= limits.cold + limits.hysteresis:
                self.phase = Phase.IGNITION
                self.burn_started = now
                self.peak = temperature
        else:
            self.peak = max(self.peak, temperature)
            elapsed_minutes = self._elapsed_minutes(now)

            if self.phase is Phase.IGNITION:
                if temperature < limits.cold:
                    self._reset()
                    burn_ended = True
                elif (
                    temperature >= limits.main
                    or elapsed_minutes >= limits.ignition_max_minutes
                ):
                    self.phase = Phase.MAIN

            if self.phase is Phase.MAIN:
                if (
                    rate <= limits.burnout_rate
                    and temperature <= self.peak - limits.peak_drop
                ):
                    self.phase = Phase.BURNOUT

            if self.phase is Phase.BURNOUT and temperature < limits.cold:
                self._reset()
                burn_ended = True

        self.recommendation = self._recommend(temperature, burn_ended)

        return Result(
            temperature=temperature,
            rate=rate,
            phase=self.phase,
            recommendation=self.recommendation,
            peak=self.peak,
            burn_seconds=self._burn_seconds(now),
            overtemp=temperature >= limits.warn,
            phase_changed=self.phase is not previous_phase,
            recommendation_changed=self.recommendation is not previous_recommendation,
        )

    def _recommend(self, temperature: float, burn_ended: bool) -> Recommendation:
        limits = self.limits

        if self.phase is Phase.IDLE:
            return Recommendation.LET_BURN_OUT if burn_ended else Recommendation.WAIT
        if self.phase is Phase.IGNITION:
            return Recommendation.AIR_OPEN
        if self.phase is Phase.MAIN:
            if temperature >= limits.optimal_high:
                return Recommendation.REDUCE_AIR
            if temperature < limits.optimal_low:
                return Recommendation.AIR_OPEN
            return Recommendation.HOLD
        # Phase.BURNOUT
        if temperature < limits.refuel:
            return Recommendation.ADD_FUEL
        return Recommendation.HOLD

    def _elapsed_minutes(self, now: datetime) -> float:
        if self.burn_started is None:
            return 0.0
        return max(0.0, (now - self.burn_started).total_seconds() / 60.0)

    def _burn_seconds(self, now: datetime) -> float:
        if self.burn_started is None:
            return 0.0
        return max(0.0, (now - self.burn_started).total_seconds())

    def _reset(self) -> None:
        self.phase = Phase.IDLE
        self.burn_started = None
        self.peak = 0.0


class FanReason(str, Enum):
    """Why the fan is running at the current speed."""

    OFF = "off"
    RAMP = "ramp"
    OVERTEMP = "overtemp"
    NIGHT = "night"
    ROOM = "room"
    NIGHT_ROOM = "night_room"
    MANUAL = "manual"


@dataclass(frozen=True)
class FanSettings:
    """Tuning for the optional stove fan control.

    The fan only moves room air across/around the stove. It never touches the
    combustion air, so it cannot change the burn itself.
    """

    # Below this flue gas temperature the fan stays off (avoids cooling the
    # stove into the creosote range).
    off_temp: float = 140.0
    # At min_temp the fan starts at min_percentage.
    min_temp: float = 160.0
    # At max_temp the fan reaches max_percentage.
    max_temp: float = 320.0
    min_percentage: int = 15
    max_percentage: int = 85
    # At/above the over-temperature threshold the fan runs at 100 %.
    warn_temp: float = 450.0
    # Night window (local hours, end is exclusive, wrapping allowed).
    night_start: int = 22
    night_end: int = 7
    night_percentage: int = 30
    # When the room is already warm enough, do not add more heat.
    room_max: float = 24.0
    room_percentage: int = 40
    # Default duration of a manual override.
    override_minutes: int = 60


@dataclass(frozen=True)
class FanDecision:
    """One computed fan target."""

    percentage: int
    on: bool
    reason: FanReason


def in_night_window(hour: int, start: int, end: int) -> bool:
    """Return True if `hour` lies in the (wrapping) window [start, end)."""
    start %= 24
    end %= 24
    hour %= 24
    if start == end:
        return True
    if start < end:
        return start <= hour < end
    return hour >= start or hour < end


def fan_percentage(
    temperature: float,
    settings: FanSettings | None = None,
    *,
    room_temperature: float | None = None,
    is_night: bool = False,
) -> FanDecision:
    """Compute the automatic fan target for a flue gas temperature.

    Rules, in order of priority:

    1. Below `off_temp` the fan is off.
    2. At/above `warn_temp` it runs at 100 % for cooling (night/room caps do
       not apply here - safety beats comfort).
    3. Otherwise the speed ramps linearly between `min_temp`/`min_percentage`
       and `max_temp`/`max_percentage`.
    4. During the night the speed is capped at `night_percentage`.
    5. If the room is at/above `room_max`, the speed is capped at
       `room_percentage`.
    """
    settings = settings or FanSettings()

    if temperature < settings.off_temp:
        return FanDecision(0, False, FanReason.OFF)

    if temperature >= settings.warn_temp:
        return FanDecision(100, True, FanReason.OVERTEMP)

    span = max(1.0, settings.max_temp - settings.min_temp)
    ratio = (temperature - settings.min_temp) / span
    ratio = max(0.0, min(1.0, ratio))
    span_percentage = settings.max_percentage - settings.min_percentage
    percentage = settings.min_percentage + ratio * span_percentage
    percentage = int(round(percentage))
    percentage = max(settings.min_percentage, min(settings.max_percentage, percentage))

    reason = FanReason.RAMP

    if is_night and percentage > settings.night_percentage:
        percentage = settings.night_percentage
        reason = FanReason.NIGHT

    if (
        room_temperature is not None
        and room_temperature >= settings.room_max
        and percentage > settings.room_percentage
    ):
        percentage = settings.room_percentage
        reason = (
            FanReason.NIGHT_ROOM if reason is FanReason.NIGHT else FanReason.ROOM
        )

    return FanDecision(percentage, percentage > 0, reason)
