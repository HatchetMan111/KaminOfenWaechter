"""Integration tests for FlueGuard using the Home Assistant test harness."""

from __future__ import annotations

from datetime import timedelta

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_time_changed,
)

from custom_components.flueguard.const import (
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
    DOMAIN,
)

SOURCE = "sensor.rauchgas"


def _source_state(hass: HomeAssistant, value: str, unit: str = "°C") -> None:
    hass.states.async_set(
        SOURCE,
        value,
        {
            "unit_of_measurement": unit,
            "device_class": "temperature",
            "friendly_name": "Rauchgas",
        },
    )


def _entry(**options: object) -> MockConfigEntry:
    base = {
        CONF_UPDATE_INTERVAL: 10,
        CONF_COLD_THRESHOLD: 100.0,
        CONF_REFUEL_THRESHOLD: 150.0,
        CONF_OPTIMAL_LOW: 180.0,
        CONF_MAIN_THRESHOLD: 250.0,
        CONF_OPTIMAL_HIGH: 350.0,
        CONF_WARN_THRESHOLD: 450.0,
        CONF_IGNITION_MAX_MINUTES: 15.0,
        CONF_BURNOUT_RATE: -1.5,
        CONF_NOTIFICATIONS: False,
        CONF_NOTIFY_SERVICE: "",
    }
    base.update(options)
    return MockConfigEntry(
        domain=DOMAIN,
        title="Rauchgas",
        data={CONF_SOURCE_ENTITY: SOURCE},
        options=base,
    )


async def _setup(hass: HomeAssistant, entry: MockConfigEntry) -> None:
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


def _entity_id(hass: HomeAssistant, entry: MockConfigEntry, platform: str, key: str) -> str:
    registry = er.async_get(hass)
    entity_id = registry.async_get_entity_id(platform, DOMAIN, f"{entry.entry_id}_{key}")
    assert entity_id is not None, f"entity {key} was not created"
    return entity_id


async def test_user_flow_creates_entry(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    _source_state(hass, "20.0")

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] == "form"
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_SOURCE_ENTITY: SOURCE,
            CONF_UPDATE_INTERVAL: 30,
            CONF_NOTIFICATIONS: False,
            CONF_NOTIFY_SERVICE: "",
        },
    )

    assert result["type"] == "create_entry"
    assert result["title"] == "Rauchgas"
    assert result["data"][CONF_SOURCE_ENTITY] == SOURCE
    assert result["options"][CONF_OPTIMAL_HIGH] == 350.0


async def test_user_flow_rejects_unknown_entity(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_SOURCE_ENTITY: "sensor.does_not_exist",
            CONF_UPDATE_INTERVAL: 30,
            CONF_NOTIFICATIONS: False,
            CONF_NOTIFY_SERVICE: "",
        },
    )

    assert result["type"] == "form"
    assert result["errors"] == {"base": "entity_not_found"}


async def test_user_flow_requires_notify_service(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    _source_state(hass, "20.0")

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            CONF_SOURCE_ENTITY: SOURCE,
            CONF_UPDATE_INTERVAL: 30,
            CONF_NOTIFICATIONS: True,
            CONF_NOTIFY_SERVICE: "",
        },
    )

    assert result["type"] == "form"
    assert result["errors"] == {"base": "notify_required"}


async def test_setup_creates_entities(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    _source_state(hass, "20.0")
    entry = _entry()
    await _setup(hass, entry)

    temperature = hass.states.get(_entity_id(hass, entry, "sensor", "temperature"))
    assert temperature is not None
    assert float(temperature.state) == 20.0
    assert temperature.attributes["unit_of_measurement"] == "°C"

    phase = hass.states.get(_entity_id(hass, entry, "sensor", "phase"))
    assert phase is not None
    assert phase.state == "idle"

    recommendation = hass.states.get(
        _entity_id(hass, entry, "sensor", "recommendation")
    )
    assert recommendation is not None
    assert recommendation.state == "wait"

    active = hass.states.get(_entity_id(hass, entry, "binary_sensor", "burn_active"))
    assert active is not None
    assert active.state == "off"

    overtemp = hass.states.get(
        _entity_id(hass, entry, "binary_sensor", "overtemperature")
    )
    assert overtemp is not None
    assert overtemp.state == "off"

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_fahrenheit_source_is_converted(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    _source_state(hass, "212.0", "°F")
    entry = _entry()
    await _setup(hass, entry)

    temperature = hass.states.get(_entity_id(hass, entry, "sensor", "temperature"))
    assert temperature is not None
    assert float(temperature.state) == 100.0


async def test_notification_service_is_called(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    _source_state(hass, "20.0")
    calls = []

    async def _handler(call) -> None:
        calls.append(call)

    hass.services.async_register("notify", "unit_test", _handler)
    entry = _entry(
        **{CONF_NOTIFICATIONS: True, CONF_NOTIFY_SERVICE: "notify.unit_test"}
    )
    await _setup(hass, entry)

    _source_state(hass, "500.0")
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=11))
    await hass.async_block_till_done()

    assert len(calls) == 1
    assert "500" in calls[0].data["message"]
    assert "450" in calls[0].data["message"]


async def test_overtemperature_and_phase_detection(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    _source_state(hass, "20.0")
    entry = _entry()
    await _setup(hass, entry)

    _source_state(hass, "500.0")
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=11))
    await hass.async_block_till_done()

    overtemp = hass.states.get(
        _entity_id(hass, entry, "binary_sensor", "overtemperature")
    )
    assert overtemp is not None
    assert overtemp.state == "on"

    phase = hass.states.get(_entity_id(hass, entry, "sensor", "phase"))
    assert phase is not None
    assert phase.state == "ignition"

    active = hass.states.get(_entity_id(hass, entry, "binary_sensor", "burn_active"))
    assert active is not None
    assert active.state == "on"


async def test_options_flow_updates_thresholds(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    _source_state(hass, "20.0")
    entry = _entry()
    await _setup(hass, entry)

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] == "form"

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {
            CONF_UPDATE_INTERVAL: 30,
            CONF_COLD_THRESHOLD: 90.0,
            CONF_REFUEL_THRESHOLD: 140.0,
            CONF_OPTIMAL_LOW: 170.0,
            CONF_MAIN_THRESHOLD: 240.0,
            CONF_OPTIMAL_HIGH: 330.0,
            CONF_WARN_THRESHOLD: 440.0,
            CONF_IGNITION_MAX_MINUTES: 10.0,
            CONF_BURNOUT_RATE: -1.0,
            CONF_NOTIFICATIONS: False,
            CONF_NOTIFY_SERVICE: "",
        },
    )
    await hass.async_block_till_done()

    assert result["type"] == "create_entry"
    assert entry.options[CONF_COLD_THRESHOLD] == 90.0
    assert entry.options[CONF_OPTIMAL_HIGH] == 330.0


async def test_options_flow_rejects_unordered_thresholds(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    _source_state(hass, "20.0")
    entry = _entry()
    await _setup(hass, entry)

    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {
            CONF_UPDATE_INTERVAL: 30,
            CONF_COLD_THRESHOLD: 190.0,
            CONF_REFUEL_THRESHOLD: 150.0,
            CONF_OPTIMAL_LOW: 180.0,
            CONF_MAIN_THRESHOLD: 250.0,
            CONF_OPTIMAL_HIGH: 350.0,
            CONF_WARN_THRESHOLD: 450.0,
            CONF_IGNITION_MAX_MINUTES: 15.0,
            CONF_BURNOUT_RATE: -1.5,
            CONF_NOTIFICATIONS: False,
            CONF_NOTIFY_SERVICE: "",
        },
    )

    assert result["type"] == "form"
    assert result["errors"] == {"base": "invalid_thresholds"}


async def test_source_unavailable_makes_entities_unavailable(
    hass: HomeAssistant, enable_custom_integrations: None
) -> None:
    _source_state(hass, "20.0")
    entry = _entry()
    await _setup(hass, entry)

    hass.states.async_set(SOURCE, "unavailable")
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=11))
    await hass.async_block_till_done()

    temperature = hass.states.get(_entity_id(hass, entry, "sensor", "temperature"))
    assert temperature is not None
    assert temperature.state == "unavailable"
