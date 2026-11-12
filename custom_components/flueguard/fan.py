"""Optional fan entity for KaminOfenWaechter.

The fan moves room air around the stove. It never touches the combustion air,
so it cannot change the burn itself - the worst case is a colder room or a
slightly cooler stove.
"""

from __future__ import annotations

import asyncio
import logging
from datetime import datetime, timedelta

from homeassistant.components.fan import FanEntity, FanEntityFeature
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_call_later
from homeassistant.util import dt as dt_util

from .const import DOMAIN, FAN_BOOST_MINUTES, FAN_PERCENTAGE_TOLERANCE
from .coordinator import FlueGuardCoordinator
from .entity import FlueGuardEntity
from .logic import FanDecision, FanReason

_LOGGER = logging.getLogger(__name__)

PRESET_AUTO = "auto"
PRESET_BOOST = "boost"
PRESET_OFF = "off"

TARGET_KEY = "stove_fan"


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the optional fan entity."""
    coordinator: FlueGuardCoordinator = entry.runtime_data

    if not coordinator.fan_entity:
        # The user disabled the fan later on: drop the orphan registry entry.
        registry = er.async_get(hass)
        entity_id = registry.async_get_entity_id(
            "fan", DOMAIN, f"{entry.entry_id}_{TARGET_KEY}"
        )
        if entity_id is not None:
            registry.async_remove(entity_id)
        return

    async_add_entities([FlueGuardFan(coordinator, entry)])


class FlueGuardFan(FlueGuardEntity, FanEntity):
    """Fan that follows the flue gas temperature automatically."""

    _attr_icon = "mdi:fan"
    _attr_preset_modes = [PRESET_AUTO, PRESET_BOOST, PRESET_OFF]
    _attr_speed_count = 100

    def __init__(
        self, coordinator: FlueGuardCoordinator, entry: ConfigEntry
    ) -> None:
        super().__init__(coordinator, entry, TARGET_KEY)
        self._override_percentage: int | None = None
        self._override_until: datetime | None = None
        self._override_preset: str = PRESET_AUTO
        self._last_applied: int | None = None
        self._override_cancel: object | None = None
        self._apply_lock = asyncio.Lock()

    # ------------------------------------------------------------------
    # state
    # ------------------------------------------------------------------
    @property
    def _target(self) -> str:
        return self.coordinator.fan_entity

    @property
    def supported_features(self) -> FanEntityFeature:
        # TURN_ON/TURN_OFF sind deprecated (HA 2024.9+); die Service-Aufrufe
        # async_turn_on/async_turn_off funktionieren weiterhin.
        features = FanEntityFeature.PRESET_MODE
        if self._target_supports_speed():
            features |= FanEntityFeature.SET_SPEED
        return features

    def _target_supports_speed(self) -> bool:
        target = self._target
        if not target.startswith("fan."):
            return False
        state = self.hass.states.get(target)
        if state is None:
            return False
        supported = int(state.attributes.get("supported_features", 0) or 0)
        return bool(supported & FanEntityFeature.SET_SPEED)

    def _override_active(self) -> bool:
        if self._override_until is None:
            return False
        if dt_util.utcnow() >= self._override_until:
            self._clear_override()
            return False
        return True

    def _clear_override(self) -> None:
        self._override_percentage = None
        self._override_until = None
        self._override_preset = PRESET_AUTO
        if self._override_cancel is not None:
            self._override_cancel()
            self._override_cancel = None

    def _auto_decision(self) -> FanDecision:
        return self.coordinator.fan_decision()

    @property
    def percentage(self) -> int | None:
        if self._override_active():
            return self._override_percentage
        return self._auto_decision().percentage

    @property
    def is_on(self) -> bool:
        return (self.percentage or 0) > 0

    @property
    def preset_mode(self) -> str | None:
        if self._override_active():
            return self._override_preset
        return PRESET_AUTO

    @property
    def extra_state_attributes(self) -> dict[str, object]:
        decision = self._auto_decision()
        override_active = self._override_active()
        return {
            "target_entity": self._target,
            "auto": not override_active,
            "reason": (
                FanReason.MANUAL.value if override_active else decision.reason.value
            ),
            "auto_percentage": decision.percentage,
            "override_percentage": (
                self._override_percentage if override_active else None
            ),
            "override_until": (
                self._override_until.isoformat() if override_active else None
            ),
        }

    # ------------------------------------------------------------------
    # commands
    # ------------------------------------------------------------------
    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        # Apply the current target right away after a restart.
        await self._apply()

    async def async_will_remove_from_hass(self) -> None:
        await super().async_will_remove_from_hass()
        self._clear_override()

    async def async_turn_on(
        self,
        percentage: int | None = None,
        preset_mode: str | None = None,
        **kwargs: object,
    ) -> None:
        if percentage is not None:
            await self.async_set_percentage(percentage)
            return
        if preset_mode is not None:
            await self.async_set_preset_mode(preset_mode)
            return
        # Plain `fan.turn_on` (e.g. from an automation) resumes automatic
        # control instead of silently starting a 20-minute 100 % boost.
        self._clear_override()
        self.async_write_ha_state()
        await self._apply(force=True)

    async def async_turn_off(self, **kwargs: object) -> None:
        await self._start_override(0, PRESET_OFF, self.coordinator.fan_override_minutes)

    async def async_set_percentage(self, percentage: int) -> None:
        percentage = max(0, min(100, int(percentage)))
        if percentage == 0:
            await self.async_turn_off()
            return
        await self._start_override(
            percentage, PRESET_AUTO, self.coordinator.fan_override_minutes
        )

    async def async_set_preset_mode(self, preset_mode: str) -> None:
        if preset_mode == PRESET_AUTO:
            self._clear_override()
            self.async_write_ha_state()
            await self._apply(force=True)
            return

        if preset_mode == PRESET_BOOST:
            await self._start_override(100, PRESET_BOOST, FAN_BOOST_MINUTES)
            return

        if preset_mode == PRESET_OFF:
            await self._start_override(
                0, PRESET_OFF, self.coordinator.fan_override_minutes
            )
            return

        _LOGGER.warning("Unbekannter Ventilator-Preset: %s", preset_mode)

    async def _start_override(
        self, percentage: int, preset: str, minutes: int
    ) -> None:
        self._override_percentage = percentage
        self._override_preset = preset
        self._override_until = dt_util.utcnow() + timedelta(minutes=max(1, minutes))

        # Schedule the return to automatic mode exactly at expiry instead of
        # waiting for the next coordinator poll (up to one interval later).
        if self._override_cancel is not None:
            self._override_cancel()
        self._override_cancel = async_call_later(
            self.hass,
            (self._override_until - dt_util.utcnow()).total_seconds(),
            self._handle_override_expired,
        )

        self.async_write_ha_state()
        await self._apply(force=True)

    @callback
    def _handle_override_expired(self, _now: datetime) -> None:
        """Return to automatic control when a manual override runs out."""
        self._override_cancel = None
        self._clear_override()
        if self.hass is None or not self.hass.is_running:
            return
        self.async_write_ha_state()
        self.hass.async_create_task(self._apply(force=True))

    # ------------------------------------------------------------------
    # applying the target
    # ------------------------------------------------------------------
    @callback
    def _handle_coordinator_update(self) -> None:
        super()._handle_coordinator_update()
        self.hass.async_create_task(self._apply())

    async def _apply(self, force: bool = False) -> None:
        """Send the current target to the configured fan or switch entity."""
        if not self._target:
            return

        # Coordinator poll, manual command and override expiry can overlap;
        # the lock keeps exactly one send in flight.
        async with self._apply_lock:
            percentage = self.percentage or 0
            if (
                not force
                and self._last_applied is not None
                and abs(percentage - self._last_applied) < FAN_PERCENTAGE_TOLERANCE
            ):
                return

            try:
                await self._send(percentage)
            except Exception as err:  # noqa: BLE001 - never break the update loop
                _LOGGER.warning(
                    "Ventilator %s konnte nicht gesteuert werden: %s",
                    self._target,
                    err,
                )
                return

            self._last_applied = percentage
            self.async_write_ha_state()

    async def _send(self, percentage: int) -> None:
        target = self._target
        if self.entity_id is not None and target == self.entity_id:
            _LOGGER.warning(
                "KaminOfenWaechter: Ventilator-Ziel darf nicht die KaminOfenWaechter-Entität selbst sein"
            )
            return
        state = self.hass.states.get(target)

        if target.startswith("switch."):
            desired = "on" if percentage > 0 else "off"
            if state is not None and state.state == desired:
                return
            await self.hass.services.async_call(
                "switch",
                f"turn_{desired}",
                {"entity_id": target},
                blocking=True,
            )
            return

        if not target.startswith("fan."):
            _LOGGER.warning(
                "KaminOfenWaechter: %s ist weder fan.* noch switch.*", target
            )
            return

        if percentage <= 0:
            if state is not None and state.state == "off":
                return
            await self.hass.services.async_call(
                "fan", "turn_off", {"entity_id": target}, blocking=True
            )
            return

        if not self._target_supports_speed():
            if state is not None and state.state == "on":
                return
            await self.hass.services.async_call(
                "fan", "turn_on", {"entity_id": target}, blocking=True
            )
            return

        current = None
        if state is not None:
            current = state.attributes.get("percentage")
        if state is not None and state.state == "on" and current == percentage:
            return

        await self.hass.services.async_call(
            "fan",
            "set_percentage",
            {"entity_id": target, "percentage": percentage},
            blocking=True,
        )
