"""Config and options flow for FlueGuard."""

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
from homeassistant.core import callback
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers import selector
from homeassistant.util.unit_conversion import TemperatureConverter

from .const import (
    CONF_BURNOUT_RATE,
    CONF_COLD_THRESHOLD,
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


def _number(minimum: float, maximum: float, step: float, unit: str) -> selector.NumberSelector:
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
                CONF_COLD_THRESHOLD, default=current(CONF_COLD_THRESHOLD, DEFAULT_COLD_THRESHOLD)
            ): _number(40, 200, 5, "°C"),
            vol.Optional(
                CONF_REFUEL_THRESHOLD, default=current(CONF_REFUEL_THRESHOLD, DEFAULT_REFUEL_THRESHOLD)
            ): _number(60, 250, 5, "°C"),
            vol.Optional(
                CONF_OPTIMAL_LOW, default=current(CONF_OPTIMAL_LOW, DEFAULT_OPTIMAL_LOW)
            ): _number(80, 300, 5, "°C"),
            vol.Optional(
                CONF_MAIN_THRESHOLD, default=current(CONF_MAIN_THRESHOLD, DEFAULT_MAIN_THRESHOLD)
            ): _number(120, 400, 5, "°C"),
            vol.Optional(
                CONF_OPTIMAL_HIGH, default=current(CONF_OPTIMAL_HIGH, DEFAULT_OPTIMAL_HIGH)
            ): _number(150, 500, 5, "°C"),
            vol.Optional(
                CONF_WARN_THRESHOLD, default=current(CONF_WARN_THRESHOLD, DEFAULT_WARN_THRESHOLD)
            ): _number(200, 800, 10, "°C"),
            vol.Optional(
                CONF_IGNITION_MAX_MINUTES,
                default=float(options.get(CONF_IGNITION_MAX_MINUTES, DEFAULT_IGNITION_MAX_MINUTES)),
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


class FlueGuardConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the initial setup."""

    VERSION = 1

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

                return self.async_create_entry(
                    title=state.attributes.get("friendly_name") or source,
                    data={CONF_SOURCE_ENTITY: source},
                    options={
                        CONF_UPDATE_INTERVAL: int(user_input[CONF_UPDATE_INTERVAL]),
                        CONF_COLD_THRESHOLD: DEFAULT_COLD_THRESHOLD,
                        CONF_REFUEL_THRESHOLD: DEFAULT_REFUEL_THRESHOLD,
                        CONF_OPTIMAL_LOW: DEFAULT_OPTIMAL_LOW,
                        CONF_MAIN_THRESHOLD: DEFAULT_MAIN_THRESHOLD,
                        CONF_OPTIMAL_HIGH: DEFAULT_OPTIMAL_HIGH,
                        CONF_WARN_THRESHOLD: DEFAULT_WARN_THRESHOLD,
                        CONF_IGNITION_MAX_MINUTES: DEFAULT_IGNITION_MAX_MINUTES,
                        CONF_BURNOUT_RATE: DEFAULT_BURNOUT_RATE,
                        CONF_NOTIFICATIONS: bool(user_input[CONF_NOTIFICATIONS]),
                        CONF_NOTIFY_SERVICE: str(
                            user_input.get(CONF_NOTIFY_SERVICE, "")
                        ).strip(),
                    },
                )

        return self.async_show_form(
            step_id="user", data_schema=_source_schema(user_input), errors=errors
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Return the options flow."""
        return FlueGuardOptionsFlow()


class FlueGuardOptionsFlow(OptionsFlow):
    """Tune thresholds and notifications."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        errors: dict[str, str] = {}

        if user_input is not None:
            if not _ordered(user_input):
                errors["base"] = "invalid_thresholds"
            elif not _notify_ok(user_input):
                errors["base"] = "notify_required"
            else:
                return self.async_create_entry(title="", data=user_input)

        return self.async_show_form(
            step_id="init",
            data_schema=_threshold_schema(
                user_input
                if user_input is not None
                else dict(self.config_entry.options)
            ),
            errors=errors,
        )
