"""Sensor entities for KaminOfenWaechter."""

from __future__ import annotations

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import UnitOfTemperature, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .coordinator import FlueGuardCoordinator
from .entity import FlueGuardEntity
from .logic import Phase, Recommendation


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the KaminOfenWaechter sensors."""
    coordinator: FlueGuardCoordinator = entry.runtime_data
    async_add_entities(
        [
            FlueGasTemperatureSensor(coordinator, entry),
            RateOfChangeSensor(coordinator, entry),
            PhaseSensor(coordinator, entry),
            RecommendationSensor(coordinator, entry),
            BurnDurationSensor(coordinator, entry),
            PeakTemperatureSensor(coordinator, entry),
        ]
    )


class FlueGuardSensor(FlueGuardEntity, SensorEntity):
    """Base class for KaminOfenWaechter sensors."""


class FlueGasTemperatureSensor(FlueGuardSensor):
    """Flue gas temperature in Celsius (converted and rounded)."""

    _attr_device_class = SensorDeviceClass.TEMPERATURE
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS
    _attr_suggested_display_precision = 1

    def __init__(self, coordinator: FlueGuardCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "temperature")

    @property
    def native_value(self) -> float:
        return self.coordinator.data.temperature


class RateOfChangeSensor(FlueGuardSensor):
    """Smoothed temperature change per minute."""

    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = "°C/min"
    _attr_suggested_display_precision = 1
    _attr_icon = "mdi:chart-line-variant"

    def __init__(self, coordinator: FlueGuardCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "rate_of_change")

    @property
    def native_value(self) -> float:
        return self.coordinator.data.rate


class PhaseSensor(FlueGuardSensor):
    """Current combustion phase."""

    _attr_device_class = SensorDeviceClass.ENUM
    _attr_options = [phase.value for phase in Phase]
    _attr_icon = "mdi:fire"

    def __init__(self, coordinator: FlueGuardCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "phase")

    @property
    def native_value(self) -> str:
        return self.coordinator.data.phase.value


class RecommendationSensor(FlueGuardSensor):
    """What the user should do right now."""

    _attr_device_class = SensorDeviceClass.ENUM
    _attr_options = [item.value for item in Recommendation]
    _attr_icon = "mdi:weather-windy"

    def __init__(self, coordinator: FlueGuardCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "recommendation")

    @property
    def native_value(self) -> str:
        return self.coordinator.data.recommendation.value


class BurnDurationSensor(FlueGuardSensor):
    """Duration of the current (or last) burn."""

    _attr_device_class = SensorDeviceClass.DURATION
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = UnitOfTime.SECONDS
    _attr_suggested_display_precision = 0
    _attr_icon = "mdi:timer-outline"

    def __init__(self, coordinator: FlueGuardCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "burn_duration")

    @property
    def native_value(self) -> float:
        return self.coordinator.data.burn_seconds


class PeakTemperatureSensor(FlueGuardSensor):
    """Highest flue gas temperature of the current burn."""

    _attr_device_class = SensorDeviceClass.TEMPERATURE
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS
    _attr_suggested_display_precision = 1
    _attr_icon = "mdi:thermometer-high"

    def __init__(self, coordinator: FlueGuardCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "peak_temperature")

    @property
    def native_value(self) -> float:
        return self.coordinator.data.peak
