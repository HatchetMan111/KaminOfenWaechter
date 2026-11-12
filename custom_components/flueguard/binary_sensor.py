"""Binary sensor entities for KaminOfenWaechter."""

from __future__ import annotations

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .coordinator import FlueGuardCoordinator
from .entity import FlueGuardEntity
from .logic import Phase


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the KaminOfenWaechter binary sensors."""
    coordinator: FlueGuardCoordinator = entry.runtime_data
    async_add_entities(
        [
            BurnActiveBinarySensor(coordinator, entry),
            OvertemperatureBinarySensor(coordinator, entry),
        ]
    )


class FlueGuardBinarySensor(FlueGuardEntity, BinarySensorEntity):
    """Base class for KaminOfenWaechter binary sensors."""


class BurnActiveBinarySensor(FlueGuardBinarySensor):
    """On while a burn is detected."""

    _attr_device_class = BinarySensorDeviceClass.HEAT
    _attr_icon = "mdi:fire"

    def __init__(self, coordinator: FlueGuardCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "burn_active")

    @property
    def is_on(self) -> bool:
        return self.coordinator.data.phase is not Phase.IDLE


class OvertemperatureBinarySensor(FlueGuardBinarySensor):
    """On when the flue gas temperature exceeds the warning threshold."""

    _attr_device_class = BinarySensorDeviceClass.PROBLEM
    _attr_icon = "mdi:thermometer-alert"

    def __init__(self, coordinator: FlueGuardCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "overtemperature")

    @property
    def is_on(self) -> bool:
        return self.coordinator.data.overtemp
