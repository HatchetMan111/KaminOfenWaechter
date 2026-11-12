"""Data coordinator for FlueGuard."""

from __future__ import annotations

import logging
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    ATTR_UNIT_OF_MEASUREMENT,
    STATE_UNAVAILABLE,
    STATE_UNKNOWN,
    UnitOfTemperature,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util
from homeassistant.util.unit_conversion import TemperatureConverter

from .const import (
    CONF_BURNOUT_RATE,
    CONF_COLD_THRESHOLD,
    CONF_FAN_ENABLED,
    CONF_FAN_ENTITY,
    CONF_FAN_MAX_PERCENTAGE,
    CONF_FAN_MAX_TEMP,
    CONF_FAN_MIN_PERCENTAGE,
    CONF_FAN_MIN_TEMP,
    CONF_FAN_NIGHT_END,
    CONF_FAN_NIGHT_PERCENTAGE,
    CONF_FAN_NIGHT_START,
    CONF_FAN_OFF_TEMP,
    CONF_FAN_OVERRIDE_MINUTES,
    CONF_FAN_ROOM_ENTITY,
    CONF_FAN_ROOM_MAX,
    CONF_FAN_ROOM_PERCENTAGE,
    CONF_IGNITION_MAX_MINUTES,
    CONF_MAIN_THRESHOLD,
    CONF_NOTIFICATIONS,
    CONF_NOTIFY_SERVICE,
    CONF_OPTIMAL_HIGH,
    CONF_OPTIMAL_LOW,
    CONF_REFUEL_THRESHOLD,
    CONF_SOURCE_ENTITY,
    CONF_UPDATE_INTERVAL,
    CONF_WARN_THRESHOLD,
    DEFAULT_BURNOUT_RATE,
    DEFAULT_COLD_THRESHOLD,
    DEFAULT_FAN_ENTITY,
    DEFAULT_FAN_MAX_PERCENTAGE,
    DEFAULT_FAN_MAX_TEMP,
    DEFAULT_FAN_MIN_PERCENTAGE,
    DEFAULT_FAN_MIN_TEMP,
    DEFAULT_FAN_NIGHT_END,
    DEFAULT_FAN_NIGHT_PERCENTAGE,
    DEFAULT_FAN_NIGHT_START,
    DEFAULT_FAN_OFF_TEMP,
    DEFAULT_FAN_OVERRIDE_MINUTES,
    DEFAULT_FAN_ROOM_ENTITY,
    DEFAULT_FAN_ROOM_MAX,
    DEFAULT_FAN_ROOM_PERCENTAGE,
    DEFAULT_IGNITION_MAX_MINUTES,
    DEFAULT_MAIN_THRESHOLD,
    DEFAULT_NOTIFICATIONS,
    DEFAULT_NOTIFY_SERVICE,
    DEFAULT_OPTIMAL_HIGH,
    DEFAULT_OPTIMAL_LOW,
    DEFAULT_REFUEL_THRESHOLD,
    DEFAULT_UPDATE_INTERVAL,
    DEFAULT_WARN_THRESHOLD,
    DOMAIN,
    EVENT_OVERTEMPERATURE,
    EVENT_PHASE_CHANGED,
    EVENT_RECOMMENDATION_CHANGED,
    MAX_RATE,
    MESSAGES,
    NOTIFY_COOLDOWN,
    PEAK_DROP,
    RATE_RESET_GAP,
    RATE_SMOOTHING,
    START_HYSTERESIS,
    STORAGE_KEY,
    STORAGE_VERSION,
)
from .logic import (
    Engine,
    FanDecision,
    FanReason,
    FanSettings,
    Limits,
    Phase,
    Recommendation,
    Result,
    fan_percentage,
    in_night_window,
)

_LOGGER = logging.getLogger(__name__)


@dataclass
class FlueGuardData:
    """Current snapshot of the combustion monitor."""

    temperature: float
    rate: float
    phase: Phase
    recommendation: Recommendation
    peak: float
    burn_seconds: float
    overtemp: bool


class FlueGuardCoordinator(DataUpdateCoordinator[FlueGuardData]):
    """Polls the source thermometer and runs the combustion state machine."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.entry = entry
        self.source_entity: str = entry.data[CONF_SOURCE_ENTITY]

        options = entry.options
        interval = int(
            options.get(
                CONF_UPDATE_INTERVAL,
                entry.data.get(CONF_UPDATE_INTERVAL, DEFAULT_UPDATE_INTERVAL),
            )
        )
        self._limits = Limits(
            cold=float(options.get(CONF_COLD_THRESHOLD, DEFAULT_COLD_THRESHOLD)),
            refuel=float(options.get(CONF_REFUEL_THRESHOLD, DEFAULT_REFUEL_THRESHOLD)),
            optimal_low=float(options.get(CONF_OPTIMAL_LOW, DEFAULT_OPTIMAL_LOW)),
            main=float(options.get(CONF_MAIN_THRESHOLD, DEFAULT_MAIN_THRESHOLD)),
            optimal_high=float(options.get(CONF_OPTIMAL_HIGH, DEFAULT_OPTIMAL_HIGH)),
            warn=float(options.get(CONF_WARN_THRESHOLD, DEFAULT_WARN_THRESHOLD)),
            ignition_max_minutes=float(
                options.get(CONF_IGNITION_MAX_MINUTES, DEFAULT_IGNITION_MAX_MINUTES)
            ),
            burnout_rate=float(options.get(CONF_BURNOUT_RATE, DEFAULT_BURNOUT_RATE)),
            peak_drop=PEAK_DROP,
            hysteresis=START_HYSTERESIS,
        )
        self._notifications: bool = bool(
            options.get(CONF_NOTIFICATIONS, DEFAULT_NOTIFICATIONS)
        )
        self._notify_service: str = options.get(
            CONF_NOTIFY_SERVICE, DEFAULT_NOTIFY_SERVICE
        )

        self.fan_entity: str = str(
            options.get(CONF_FAN_ENTITY, DEFAULT_FAN_ENTITY)
        ).strip()
        self.fan_enabled: bool = bool(
            options.get(CONF_FAN_ENABLED, bool(self.fan_entity))
        )
        if not self.fan_enabled:
            self.fan_entity = ""
        self.fan_room_entity: str = str(
            options.get(CONF_FAN_ROOM_ENTITY, DEFAULT_FAN_ROOM_ENTITY)
        ).strip()
        self.fan_override_minutes: int = int(
            options.get(CONF_FAN_OVERRIDE_MINUTES, DEFAULT_FAN_OVERRIDE_MINUTES)
        )
        self.fan_settings = FanSettings(
            off_temp=float(options.get(CONF_FAN_OFF_TEMP, DEFAULT_FAN_OFF_TEMP)),
            min_temp=float(options.get(CONF_FAN_MIN_TEMP, DEFAULT_FAN_MIN_TEMP)),
            max_temp=float(options.get(CONF_FAN_MAX_TEMP, DEFAULT_FAN_MAX_TEMP)),
            min_percentage=int(
                options.get(CONF_FAN_MIN_PERCENTAGE, DEFAULT_FAN_MIN_PERCENTAGE)
            ),
            max_percentage=int(
                options.get(CONF_FAN_MAX_PERCENTAGE, DEFAULT_FAN_MAX_PERCENTAGE)
            ),
            warn_temp=float(
                options.get(CONF_WARN_THRESHOLD, DEFAULT_WARN_THRESHOLD)
            ),
            night_start=int(
                options.get(CONF_FAN_NIGHT_START, DEFAULT_FAN_NIGHT_START)
            ),
            night_end=int(options.get(CONF_FAN_NIGHT_END, DEFAULT_FAN_NIGHT_END)),
            night_percentage=int(
                options.get(CONF_FAN_NIGHT_PERCENTAGE, DEFAULT_FAN_NIGHT_PERCENTAGE)
            ),
            room_max=float(options.get(CONF_FAN_ROOM_MAX, DEFAULT_FAN_ROOM_MAX)),
            room_percentage=int(
                options.get(CONF_FAN_ROOM_PERCENTAGE, DEFAULT_FAN_ROOM_PERCENTAGE)
            ),
            override_minutes=self.fan_override_minutes,
        )

        self._engine = Engine(self._limits)
        self._store: Store[dict[str, Any]] = Store(
            hass, STORAGE_VERSION, f"{STORAGE_KEY}.{entry.entry_id}"
        )
        self._last_temperature: float | None = None
        self._last_sample_time: datetime | None = None
        self._rate: float = 0.0
        self._last_notify: dict[str, datetime] = {}

        super().__init__(
            hass,
            _LOGGER,
            name=f"{DOMAIN}_{entry.entry_id}",
            update_interval=timedelta(seconds=max(10, interval)),
        )

    # ------------------------------------------------------------------
    # fan control
    # ------------------------------------------------------------------
    @property
    def limits(self) -> Limits:
        """Return the active combustion thresholds."""
        return self._limits

    def fan_decision(self) -> FanDecision:
        """Return the automatic fan target for the current measurement."""
        if not self.fan_entity or self.data is None:
            return FanDecision(0, False, FanReason.OFF)

        room = (
            self._read_temperature(self.fan_room_entity)
            if self.fan_room_entity
            else None
        )
        hour = dt_util.now().hour
        is_night = in_night_window(
            hour,
            self.fan_settings.night_start,
            self.fan_settings.night_end,
        )

        return fan_percentage(
            self.data.temperature,
            self.fan_settings,
            room_temperature=room,
            is_night=is_night,
        )

    def _read_temperature(self, entity_id: str) -> float | None:
        """Read an optional room temperature entity in °C."""
        state = self.hass.states.get(entity_id)
        if state is None or state.state in (STATE_UNKNOWN, STATE_UNAVAILABLE):
            return None
        try:
            value = float(state.state)
        except (TypeError, ValueError):
            return None

        unit = (
            state.attributes.get(ATTR_UNIT_OF_MEASUREMENT)
            or self.hass.config.units.temperature_unit
        )
        try:
            return float(
                TemperatureConverter.convert(value, unit, UnitOfTemperature.CELSIUS)
            )
        except (TypeError, ValueError, KeyError):
            return None

    # ------------------------------------------------------------------
    # persistence
    # ------------------------------------------------------------------
    async def async_load_stored(self) -> None:
        """Restore the burn state after a Home Assistant restart."""
        stored = await self._store.async_load()
        if not stored:
            return

        try:
            phase = Phase(stored.get("phase", Phase.IDLE))
        except ValueError:
            phase = Phase.IDLE

        burn_started = dt_util.parse_datetime(stored.get("burn_started") or "")
        if burn_started is not None:
            burn_started = dt_util.as_utc(burn_started)
            if dt_util.utcnow() - burn_started > timedelta(hours=24):
                burn_started = None

        if phase is not Phase.IDLE and burn_started is None:
            phase = Phase.IDLE

        self._engine = Engine(
            self._limits,
            phase=phase,
            burn_started=burn_started,
            peak=float(stored.get("peak", 0.0)),
        )

    def _data_to_save(self) -> dict[str, Any]:
        started = self._engine.burn_started
        return {
            "phase": self._engine.phase.value,
            "burn_started": started.isoformat() if started else None,
            "peak": self._engine.peak,
        }

    # ------------------------------------------------------------------
    # data update
    # ------------------------------------------------------------------
    async def _async_update_data(self) -> FlueGuardData:
        state = self.hass.states.get(self.source_entity)
        if state is None or state.state in (STATE_UNKNOWN, STATE_UNAVAILABLE):
            raise UpdateFailed(
                f"Temperatursensor {self.source_entity} ist nicht verfügbar"
            )

        try:
            raw_value = float(state.state)
        except (TypeError, ValueError) as err:
            raise UpdateFailed(
                f"Temperatursensor {self.source_entity} liefert keinen Zahlenwert"
            ) from err

        unit = (
            state.attributes.get(ATTR_UNIT_OF_MEASUREMENT)
            or self.hass.config.units.temperature_unit
        )
        try:
            temperature = TemperatureConverter.convert(
                raw_value, unit, UnitOfTemperature.CELSIUS
            )
        except (TypeError, ValueError, KeyError) as err:
            raise UpdateFailed(
                f"Einheit {unit!r} von {self.source_entity} kann nicht gelesen werden"
            ) from err

        now = dt_util.utcnow()
        rate = self._calculate_rate(temperature, now)
        result = self._engine.update(temperature, rate, now)

        data = FlueGuardData(
            temperature=round(temperature, 1),
            rate=rate,
            phase=result.phase,
            recommendation=result.recommendation,
            peak=round(result.peak, 1),
            burn_seconds=round(result.burn_seconds),
            overtemp=result.overtemp,
        )

        if self.data is not None:
            await self._handle_transitions(self.data, result)

        # Persist only when the phase changes (rare). Saving on every update
        # would keep resetting the delayed-save timer and never write.
        if result.phase_changed:
            self._store.async_delay_save(self._data_to_save, 5)

        return data

    async def async_save_state(self) -> None:
        """Flush the burn state to disk (e.g. on unload)."""
        await self._store.async_save(self._data_to_save())

    def _calculate_rate(self, temperature: float, now: datetime) -> float:
        """Return a smoothed temperature change in deg C per minute."""
        if self._last_sample_time is None or self._last_temperature is None:
            self._last_temperature = temperature
            self._last_sample_time = now
            return 0.0

        elapsed = (now - self._last_sample_time).total_seconds()
        if elapsed <= 0:
            return self._rate

        if elapsed > RATE_RESET_GAP.total_seconds():
            self._last_temperature = temperature
            self._last_sample_time = now
            self._rate = 0.0
            return 0.0

        instant = (temperature - self._last_temperature) / (elapsed / 60.0)
        instant = max(-MAX_RATE, min(MAX_RATE, instant))
        self._rate = RATE_SMOOTHING * instant + (1 - RATE_SMOOTHING) * self._rate

        self._last_temperature = temperature
        self._last_sample_time = now
        return round(self._rate, 2)

    # ------------------------------------------------------------------
    # events and notifications
    # ------------------------------------------------------------------
    async def _handle_transitions(
        self, previous: FlueGuardData, result: Result
    ) -> None:
        common = {
            "entry_id": self.entry.entry_id,
            "source_entity": self.source_entity,
            "temperature": round(result.temperature, 1),
            "rate": round(result.rate, 2),
        }

        if result.phase_changed:
            self.hass.bus.async_fire(
                EVENT_PHASE_CHANGED,
                {**common, "phase": result.phase.value, "previous": previous.phase.value},
            )

        if result.recommendation_changed:
            self.hass.bus.async_fire(
                EVENT_RECOMMENDATION_CHANGED,
                {
                    **common,
                    "recommendation": result.recommendation.value,
                    "previous": previous.recommendation.value,
                },
            )

        if result.overtemp and not previous.overtemp:
            self.hass.bus.async_fire(
                EVENT_OVERTEMPERATURE,
                {**common, "threshold": self._limits.warn},
            )

        await self._maybe_notify(previous, result)

    async def _maybe_notify(
        self, previous: FlueGuardData, result: Result
    ) -> None:
        if not (self._notifications and self._notify_service):
            return

        key: str | None = None
        if result.overtemp and not previous.overtemp:
            key = "overtemp"
        elif (
            result.recommendation is Recommendation.REDUCE_AIR
            and previous.recommendation is not Recommendation.REDUCE_AIR
        ):
            key = "reduce_air"
        elif (
            result.recommendation is Recommendation.ADD_FUEL
            and previous.recommendation is not Recommendation.ADD_FUEL
        ):
            key = "add_fuel"

        if key is None:
            return

        now = dt_util.utcnow()
        last = self._last_notify.get(key)
        if last is not None and now - last < NOTIFY_COOLDOWN:
            return
        self._last_notify[key] = now

        language = (self.hass.config.language or "en").split("_")[0].lower()
        texts = MESSAGES.get(language, MESSAGES["en"])[key]
        title = texts["title"]
        message = texts["message"].format(
            temperature=result.temperature, threshold=self._limits.warn
        )

        domain, _, service = self._notify_service.partition(".")
        if not service:
            domain, service = "notify", self._notify_service

        try:
            await self.hass.services.async_call(
                domain,
                service,
                {"title": title, "message": message},
                blocking=False,
            )
        except Exception as err:  # noqa: BLE001 - never break the update loop
            _LOGGER.warning(
                "Benachrichtigung über %s.%s fehlgeschlagen: %s",
                domain,
                service,
                err,
            )
