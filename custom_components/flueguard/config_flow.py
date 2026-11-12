"""Config and options flow for KaminOfenWaechter."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, ConfigFlow, OptionsFlow
from homeassistant.const import (
    ATTR_UNIT_OF_MEASUREMENT,
    STATE_UNAVAILABLE,
    STATE_UNKNOWN,
    UnitOfTemperature,
)
from homeassistant.core import HomeAssistant, callback
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import selector
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
    CONF_SETUP_FAN,
    CONF_SOURCE_ENTITY,
    CONF_UPDATE_INTERVAL,
    CONF_WARN_THRESHOLD,
    DEFAULT_BURNOUT_RATE,
    DEFAULT_COLD_THRESHOLD,
    DEFAULT_FAN_ENABLED,
    DEFAULT_FAN_MAX_PERCENTAGE,
    DEFAULT_FAN_MAX_TEMP,
    DEFAULT_FAN_MIN_PERCENTAGE,
    DEFAULT_FAN_MIN_TEMP,
    DEFAULT_FAN_NIGHT_END,
    DEFAULT_FAN_NIGHT_PERCENTAGE,
    DEFAULT_FAN_NIGHT_START,
    DEFAULT_FAN_OFF_TEMP,
    DEFAULT_FAN_OVERRIDE_MINUTES,
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
    PEAK_DROP,
    START_HYSTERESIS,
)
from .logic import Limits


def _number(
    minimum: float, maximum: float, step: float, unit: str
) -> selector.NumberSelector:
    return selector.NumberSelector(
        selector.NumberSelectorConfig(
            min=minimum,
            max=maximum,
            step=step,
            mode=selector.NumberSelectorMode.BOX,
            unit_of_measurement=unit,
        )
    )


def _source_schema(values: dict[str, Any] | None = None) -> vol.Schema:
    values = values or {}
    source_key: Any = vol.Required(CONF_SOURCE_ENTITY)
    if values.get(CONF_SOURCE_ENTITY):
        source_key = vol.Required(
            CONF_SOURCE_ENTITY, default=values[CONF_SOURCE_ENTITY]
        )

    return vol.Schema(
        {
            source_key: selector.EntitySelector(
                selector.EntitySelectorConfig(domain="sensor")
            ),
            vol.Optional(
                CONF_UPDATE_INTERVAL,
                default=values.get(CONF_UPDATE_INTERVAL, DEFAULT_UPDATE_INTERVAL),
            ): _number(10, 300, 5, "s"),
            vol.Optional(
                CONF_NOTIFICATIONS,
                default=values.get(CONF_NOTIFICATIONS, DEFAULT_NOTIFICATIONS),
            ): selector.BooleanSelector(),
            vol.Optional(
                CONF_NOTIFY_SERVICE,
                default=values.get(CONF_NOTIFY_SERVICE, DEFAULT_NOTIFY_SERVICE),
            ): selector.TextSelector(),
            vol.Optional(
                CONF_SETUP_FAN,
                default=values.get(CONF_SETUP_FAN, False),
            ): selector.BooleanSelector(),
        }
    )


def _threshold_schema(options: dict[str, Any]) -> vol.Schema:
    def current(key: str, default: float) -> float:
        return float(options.get(key, default))

    return vol.Schema(
        {
            vol.Optional(
                CONF_UPDATE_INTERVAL,
                default=int(options.get(CONF_UPDATE_INTERVAL, DEFAULT_UPDATE_INTERVAL)),
            ): _number(10, 300, 5, "s"),
            vol.Optional(
                CONF_COLD_THRESHOLD,
                default=current(CONF_COLD_THRESHOLD, DEFAULT_COLD_THRESHOLD),
            ): _number(40, 200, 5, "°C"),
            vol.Optional(
                CONF_REFUEL_THRESHOLD,
                default=current(CONF_REFUEL_THRESHOLD, DEFAULT_REFUEL_THRESHOLD),
            ): _number(60, 250, 5, "°C"),
            vol.Optional(
                CONF_OPTIMAL_LOW,
                default=current(CONF_OPTIMAL_LOW, DEFAULT_OPTIMAL_LOW),
            ): _number(80, 300, 5, "°C"),
            vol.Optional(
                CONF_MAIN_THRESHOLD,
                default=current(CONF_MAIN_THRESHOLD, DEFAULT_MAIN_THRESHOLD),
            ): _number(120, 400, 5, "°C"),
            vol.Optional(
                CONF_OPTIMAL_HIGH,
                default=current(CONF_OPTIMAL_HIGH, DEFAULT_OPTIMAL_HIGH),
            ): _number(150, 500, 5, "°C"),
            vol.Optional(
                CONF_WARN_THRESHOLD,
                default=current(CONF_WARN_THRESHOLD, DEFAULT_WARN_THRESHOLD),
            ): _number(200, 800, 10, "°C"),
            vol.Optional(
                CONF_IGNITION_MAX_MINUTES,
                default=float(
                    options.get(CONF_IGNITION_MAX_MINUTES, DEFAULT_IGNITION_MAX_MINUTES)
                ),
            ): _number(3, 60, 1, "min"),
            vol.Optional(
                CONF_BURNOUT_RATE,
                default=float(options.get(CONF_BURNOUT_RATE, DEFAULT_BURNOUT_RATE)),
            ): _number(-10, 0, 0.5, "°C/min"),
            vol.Optional(
                CONF_NOTIFICATIONS,
                default=bool(options.get(CONF_NOTIFICATIONS, DEFAULT_NOTIFICATIONS)),
            ): selector.BooleanSelector(),
            vol.Optional(
                CONF_NOTIFY_SERVICE,
                default=str(options.get(CONF_NOTIFY_SERVICE, DEFAULT_NOTIFY_SERVICE)),
            ): selector.TextSelector(),
        }
    )


def _fan_schema(options: dict[str, Any] | None = None) -> vol.Schema:
    options = options or {}

    def number(key: str, default: float) -> float:
        return float(options.get(key, default))

    def integer(key: str, default: int) -> int:
        return int(options.get(key, default))

    entity_key: Any = vol.Optional(CONF_FAN_ENTITY)
    if str(options.get(CONF_FAN_ENTITY) or "").strip():
        entity_key = vol.Optional(
            CONF_FAN_ENTITY, default=str(options[CONF_FAN_ENTITY])
        )

    room_key: Any = vol.Optional(CONF_FAN_ROOM_ENTITY)
    if str(options.get(CONF_FAN_ROOM_ENTITY) or "").strip():
        room_key = vol.Optional(
            CONF_FAN_ROOM_ENTITY, default=str(options[CONF_FAN_ROOM_ENTITY])
        )

    return vol.Schema(
        {
            vol.Optional(
                CONF_FAN_ENABLED,
                default=bool(
                    options.get(
                        CONF_FAN_ENABLED, bool(options.get(CONF_FAN_ENTITY))
                    )
                ),
            ): selector.BooleanSelector(),
            entity_key: selector.EntitySelector(
                selector.EntitySelectorConfig(domain=["fan", "switch"])
            ),
            room_key: selector.EntitySelector(
                selector.EntitySelectorConfig(domain="sensor")
            ),
            vol.Optional(
                CONF_FAN_OFF_TEMP,
                default=number(CONF_FAN_OFF_TEMP, DEFAULT_FAN_OFF_TEMP),
            ): _number(60, 300, 5, "°C"),
            vol.Optional(
                CONF_FAN_MIN_TEMP,
                default=number(CONF_FAN_MIN_TEMP, DEFAULT_FAN_MIN_TEMP),
            ): _number(80, 400, 5, "°C"),
            vol.Optional(
                CONF_FAN_MAX_TEMP,
                default=number(CONF_FAN_MAX_TEMP, DEFAULT_FAN_MAX_TEMP),
            ): _number(100, 600, 5, "°C"),
            vol.Optional(
                CONF_FAN_MIN_PERCENTAGE,
                default=integer(CONF_FAN_MIN_PERCENTAGE, DEFAULT_FAN_MIN_PERCENTAGE),
            ): _number(0, 100, 5, "%"),
            vol.Optional(
                CONF_FAN_MAX_PERCENTAGE,
                default=integer(CONF_FAN_MAX_PERCENTAGE, DEFAULT_FAN_MAX_PERCENTAGE),
            ): _number(5, 100, 5, "%"),
            vol.Optional(
                CONF_FAN_NIGHT_START,
                default=integer(CONF_FAN_NIGHT_START, DEFAULT_FAN_NIGHT_START),
            ): _number(0, 23, 1, "h"),
            vol.Optional(
                CONF_FAN_NIGHT_END,
                default=integer(CONF_FAN_NIGHT_END, DEFAULT_FAN_NIGHT_END),
            ): _number(0, 23, 1, "h"),
            vol.Optional(
                CONF_FAN_NIGHT_PERCENTAGE,
                default=integer(
                    CONF_FAN_NIGHT_PERCENTAGE, DEFAULT_FAN_NIGHT_PERCENTAGE
                ),
            ): _number(0, 100, 5, "%"),
            vol.Optional(
                CONF_FAN_ROOM_MAX,
                default=number(CONF_FAN_ROOM_MAX, DEFAULT_FAN_ROOM_MAX),
            ): _number(15, 30, 0.5, "°C"),
            vol.Optional(
                CONF_FAN_ROOM_PERCENTAGE,
                default=integer(
                    CONF_FAN_ROOM_PERCENTAGE, DEFAULT_FAN_ROOM_PERCENTAGE
                ),
            ): _number(0, 100, 5, "%"),
            vol.Optional(
                CONF_FAN_OVERRIDE_MINUTES,
                default=integer(
                    CONF_FAN_OVERRIDE_MINUTES, DEFAULT_FAN_OVERRIDE_MINUTES
                ),
            ): _number(5, 240, 5, "min"),
        }
    )


def _ordered(values: dict[str, Any]) -> bool:
    limits = Limits(
        cold=float(values[CONF_COLD_THRESHOLD]),
        refuel=float(values[CONF_REFUEL_THRESHOLD]),
        optimal_low=float(values[CONF_OPTIMAL_LOW]),
        main=float(values[CONF_MAIN_THRESHOLD]),
        optimal_high=float(values[CONF_OPTIMAL_HIGH]),
        warn=float(values[CONF_WARN_THRESHOLD]),
        ignition_max_minutes=float(values[CONF_IGNITION_MAX_MINUTES]),
        burnout_rate=float(values[CONF_BURNOUT_RATE]),
        peak_drop=PEAK_DROP,
        hysteresis=START_HYSTERESIS,
    )
    return limits.is_ordered()


def _notify_ok(values: dict[str, Any]) -> bool:
    return not values.get(CONF_NOTIFICATIONS) or bool(
        str(values.get(CONF_NOTIFY_SERVICE, "")).strip()
    )


def _fan_entity_ok(hass: HomeAssistant, entity_id: str) -> bool:
    if not entity_id:
        return True
    if not (entity_id.startswith("fan.") or entity_id.startswith("switch.")):
        return False
    if hass.states.get(entity_id) is not None:
        return True
    # The entity may be disabled or not loaded right now; accept it if the
    # registry knows it.
    return er.async_get(hass).async_get(entity_id) is not None


def _fan_ordered(values: dict[str, Any]) -> bool:
    if not values.get(CONF_FAN_ENABLED):
        return True
    if not str(values.get(CONF_FAN_ENTITY, "")).strip():
        return False

    off_temp = float(values[CONF_FAN_OFF_TEMP])
    min_temp = float(values[CONF_FAN_MIN_TEMP])
    max_temp = float(values[CONF_FAN_MAX_TEMP])
    min_pct = int(values[CONF_FAN_MIN_PERCENTAGE])
    max_pct = int(values[CONF_FAN_MAX_PERCENTAGE])

    if not off_temp <= min_temp < max_temp:
        return False
    if min_pct > max_pct:
        return False
    if int(values[CONF_FAN_NIGHT_PERCENTAGE]) > max_pct:
        return False
    if int(values[CONF_FAN_ROOM_PERCENTAGE]) > max_pct:
        return False
    return True


def _fan_values(values: dict[str, Any]) -> dict[str, Any]:
    """Normalise the fan fields to the types stored in the config entry."""
    return {
        CONF_FAN_ENABLED: bool(values.get(CONF_FAN_ENABLED, DEFAULT_FAN_ENABLED)),
        CONF_FAN_ENTITY: str(values.get(CONF_FAN_ENTITY) or "").strip(),
        CONF_FAN_ROOM_ENTITY: str(values.get(CONF_FAN_ROOM_ENTITY) or "").strip(),
        CONF_FAN_OFF_TEMP: float(values.get(CONF_FAN_OFF_TEMP, DEFAULT_FAN_OFF_TEMP)),
        CONF_FAN_MIN_TEMP: float(values.get(CONF_FAN_MIN_TEMP, DEFAULT_FAN_MIN_TEMP)),
        CONF_FAN_MAX_TEMP: float(values.get(CONF_FAN_MAX_TEMP, DEFAULT_FAN_MAX_TEMP)),
        CONF_FAN_MIN_PERCENTAGE: int(
            values.get(CONF_FAN_MIN_PERCENTAGE, DEFAULT_FAN_MIN_PERCENTAGE)
        ),
        CONF_FAN_MAX_PERCENTAGE: int(
            values.get(CONF_FAN_MAX_PERCENTAGE, DEFAULT_FAN_MAX_PERCENTAGE)
        ),
        CONF_FAN_NIGHT_START: int(
            values.get(CONF_FAN_NIGHT_START, DEFAULT_FAN_NIGHT_START)
        ),
        CONF_FAN_NIGHT_END: int(
            values.get(CONF_FAN_NIGHT_END, DEFAULT_FAN_NIGHT_END)
        ),
        CONF_FAN_NIGHT_PERCENTAGE: int(
            values.get(CONF_FAN_NIGHT_PERCENTAGE, DEFAULT_FAN_NIGHT_PERCENTAGE)
        ),
        CONF_FAN_ROOM_MAX: float(
            values.get(CONF_FAN_ROOM_MAX, DEFAULT_FAN_ROOM_MAX)
        ),
        CONF_FAN_ROOM_PERCENTAGE: int(
            values.get(CONF_FAN_ROOM_PERCENTAGE, DEFAULT_FAN_ROOM_PERCENTAGE)
        ),
        CONF_FAN_OVERRIDE_MINUTES: int(
            values.get(CONF_FAN_OVERRIDE_MINUTES, DEFAULT_FAN_OVERRIDE_MINUTES)
        ),
    }


def _base_options(values: dict[str, Any]) -> dict[str, Any]:
    """Build the combustion options for a new entry."""
    return {
        CONF_UPDATE_INTERVAL: int(values[CONF_UPDATE_INTERVAL]),
        CONF_COLD_THRESHOLD: DEFAULT_COLD_THRESHOLD,
        CONF_REFUEL_THRESHOLD: DEFAULT_REFUEL_THRESHOLD,
        CONF_OPTIMAL_LOW: DEFAULT_OPTIMAL_LOW,
        CONF_MAIN_THRESHOLD: DEFAULT_MAIN_THRESHOLD,
        CONF_OPTIMAL_HIGH: DEFAULT_OPTIMAL_HIGH,
        CONF_WARN_THRESHOLD: DEFAULT_WARN_THRESHOLD,
        CONF_IGNITION_MAX_MINUTES: DEFAULT_IGNITION_MAX_MINUTES,
        CONF_BURNOUT_RATE: DEFAULT_BURNOUT_RATE,
        CONF_NOTIFICATIONS: bool(values[CONF_NOTIFICATIONS]),
        CONF_NOTIFY_SERVICE: str(values.get(CONF_NOTIFY_SERVICE, "")).strip(),
    }


class FlueGuardConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the initial setup."""

    VERSION = 1

    def __init__(self) -> None:
        self._base: dict[str, Any] = {}
        self._title: str = ""
        self._source: str = ""

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        errors: dict[str, str] = {}

        if user_input is not None:
            source = user_input[CONF_SOURCE_ENTITY]
            state = self.hass.states.get(source)

            if state is None:
                errors["base"] = "entity_not_found"
            elif state.state in (STATE_UNKNOWN, STATE_UNAVAILABLE):
                errors["base"] = "entity_unavailable"
            else:
                try:
                    value = float(state.state)
                except (TypeError, ValueError):
                    errors["base"] = "not_numeric"
                else:
                    unit = (
                        state.attributes.get(ATTR_UNIT_OF_MEASUREMENT)
                        or self.hass.config.units.temperature_unit
                    )
                    try:
                        TemperatureConverter.convert(
                            value, unit, UnitOfTemperature.CELSIUS
                        )
                    except (TypeError, ValueError, KeyError):
                        errors["base"] = "not_temperature"

            if not errors and not _notify_ok(user_input):
                errors["base"] = "notify_required"

            if not errors:
                await self.async_set_unique_id(source)
                self._abort_if_unique_id_configured()

                self._base = _base_options(user_input)
                self._title = state.attributes.get("friendly_name") or source
                self._source = source

                if user_input.get(CONF_SETUP_FAN):
                    return await self.async_step_fan()

                return self.async_create_entry(
                    title=self._title,
                    data={CONF_SOURCE_ENTITY: source},
                    options={**self._base, **_fan_values({})},
                )

        return self.async_show_form(
            step_id="user", data_schema=_source_schema(user_input), errors=errors
        )

    async def async_step_fan(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Optional fan step during the initial setup."""
        errors: dict[str, str] = {}
        source = self._source

        if user_input is not None:
            values = _fan_values(user_input)
            if values[CONF_FAN_ENABLED] and not values[CONF_FAN_ENTITY]:
                errors["base"] = "fan_required"
            elif values[CONF_FAN_ENABLED] and not _fan_entity_ok(
                self.hass, values[CONF_FAN_ENTITY]
            ):
                errors["base"] = "fan_not_found"
            elif not _fan_ordered(values):
                errors["base"] = "invalid_fan_settings"

            if not errors:
                return self.async_create_entry(
                    title=self._title,
                    data={CONF_SOURCE_ENTITY: source},
                    options={**self._base, **values},
                )

        return self.async_show_form(
            step_id="fan",
            data_schema=_fan_schema(
                user_input
                if user_input is not None
                else {CONF_FAN_ENABLED: True}
            ),
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Return the options flow."""
        return FlueGuardOptionsFlow()


class FlueGuardOptionsFlow(OptionsFlow):
    """Tune thresholds, notifications and the optional fan."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        return self.async_show_menu(
            step_id="init", menu_options=["general", "fan"]
        )

    async def async_step_general(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        errors: dict[str, str] = {}

        if user_input is not None:
            if not _ordered(user_input):
                errors["base"] = "invalid_thresholds"
            elif not _notify_ok(user_input):
                errors["base"] = "notify_required"
            else:
                return self.async_create_entry(
                    title="", data={**self.config_entry.options, **user_input}
                )

        return self.async_show_form(
            step_id="general",
            data_schema=_threshold_schema(
                user_input
                if user_input is not None
                else dict(self.config_entry.options)
            ),
            errors=errors,
        )

    async def async_step_fan(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        errors: dict[str, str] = {}

        if user_input is not None:
            values = _fan_values(user_input)
            if values[CONF_FAN_ENABLED] and not values[CONF_FAN_ENTITY]:
                errors["base"] = "fan_required"
            elif values[CONF_FAN_ENABLED] and not _fan_entity_ok(
                self.hass, values[CONF_FAN_ENTITY]
            ):
                errors["base"] = "fan_not_found"
            elif not _fan_ordered(values):
                errors["base"] = "invalid_fan_settings"
            else:
                return self.async_create_entry(
                    title="", data={**self.config_entry.options, **values}
                )

        return self.async_show_form(
            step_id="fan",
            data_schema=_fan_schema(
                user_input
                if user_input is not None
                else dict(self.config_entry.options)
            ),
            errors=errors,
        )
