"""Base entity for FlueGuard."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, NAME
from .coordinator import FlueGuardCoordinator


class FlueGuardEntity(CoordinatorEntity[FlueGuardCoordinator]):
    """Common device info and naming for all FlueGuard entities."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: FlueGuardCoordinator,
        entry: ConfigEntry,
        key: str,
    ) -> None:
        super().__init__(coordinator)
        self._attr_unique_id = f"{entry.entry_id}_{key}"
        self._attr_translation_key = key
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=entry.title,
            manufacturer=NAME,
            model="Rauchgasüberwachung / flue gas monitor",
            entry_type=DeviceEntryType.SERVICE,
        )
