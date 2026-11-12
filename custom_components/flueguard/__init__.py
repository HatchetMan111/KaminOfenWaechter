"""The KaminOfenWaechter integration."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import PLATFORMS
from .coordinator import FlueGuardCoordinator

CARD_URL_PATH = "/kaminofenwaechter_card"


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Serve the bundled Lovelace card, also without configured entries."""
    await _async_register_card(hass)
    return True


async def _async_register_card(hass: HomeAssistant) -> None:
    """Serve custom_components/flueguard/www under /kaminofenwaechter_card."""
    if hass.http is None:  # stripped-down environments (e.g. unit tests)
        return
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                CARD_URL_PATH,
                str(Path(__file__).parent / "www"),
                cache_headers=False,
            )
        ]
    )


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up KaminOfenWaechter from a config entry."""
    coordinator = FlueGuardCoordinator(hass, entry)
    await coordinator.async_load_stored()
    await coordinator.async_config_entry_first_refresh()

    entry.runtime_data = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    coordinator: FlueGuardCoordinator | None = getattr(entry, "runtime_data", None)
    if coordinator is not None:
        await coordinator.async_save_state()
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the entry when the options change."""
    await hass.config_entries.async_reload(entry.entry_id)
