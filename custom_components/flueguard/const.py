"""Constants for the KaminOfenWaechter integration."""

from __future__ import annotations

from datetime import timedelta

from .logic import FanSettings

DOMAIN = "flueguard"
NAME = "KaminOfenWaechter"
PLATFORMS = ["sensor", "binary_sensor", "fan"]

# Configuration
CONF_SOURCE_ENTITY = "source_entity"
CONF_UPDATE_INTERVAL = "update_interval"
CONF_NOTIFICATIONS = "notifications"
CONF_NOTIFY_SERVICE = "notify_service"

# Flow-only helper (not stored)
CONF_SETUP_FAN = "setup_fan"

# Fan control
CONF_FAN_ENABLED = "fan_enabled"
CONF_FAN_ENTITY = "fan_entity"
CONF_FAN_ROOM_ENTITY = "fan_room_entity"
CONF_FAN_OFF_TEMP = "fan_off_temp"
CONF_FAN_MIN_TEMP = "fan_min_temp"
CONF_FAN_MAX_TEMP = "fan_max_temp"
CONF_FAN_MIN_PERCENTAGE = "fan_min_percentage"
CONF_FAN_MAX_PERCENTAGE = "fan_max_percentage"
CONF_FAN_NIGHT_START = "fan_night_start"
CONF_FAN_NIGHT_END = "fan_night_end"
CONF_FAN_NIGHT_PERCENTAGE = "fan_night_percentage"
CONF_FAN_ROOM_MAX = "fan_room_max"
CONF_FAN_ROOM_PERCENTAGE = "fan_room_percentage"
CONF_FAN_OVERRIDE_MINUTES = "fan_override_minutes"

CONF_COLD_THRESHOLD = "cold_threshold"
CONF_REFUEL_THRESHOLD = "refuel_threshold"
CONF_OPTIMAL_LOW = "optimal_low"
CONF_MAIN_THRESHOLD = "main_threshold"
CONF_OPTIMAL_HIGH = "optimal_high"
CONF_WARN_THRESHOLD = "warn_threshold"
CONF_IGNITION_MAX_MINUTES = "ignition_max_minutes"
CONF_BURNOUT_RATE = "burnout_rate"

DEFAULT_UPDATE_INTERVAL = 30
DEFAULT_NOTIFICATIONS = True
DEFAULT_NOTIFY_SERVICE = ""

DEFAULT_COLD_THRESHOLD = 100.0
DEFAULT_REFUEL_THRESHOLD = 150.0
DEFAULT_OPTIMAL_LOW = 180.0
DEFAULT_MAIN_THRESHOLD = 250.0
DEFAULT_OPTIMAL_HIGH = 350.0
DEFAULT_WARN_THRESHOLD = 450.0
DEFAULT_IGNITION_MAX_MINUTES = 15.0
DEFAULT_BURNOUT_RATE = -1.5

# Fan control defaults (single source of truth is logic.FanSettings).
DEFAULT_FAN = FanSettings()
DEFAULT_FAN_ENABLED = False
DEFAULT_FAN_ENTITY = ""
DEFAULT_FAN_ROOM_ENTITY = ""
DEFAULT_FAN_OFF_TEMP = DEFAULT_FAN.off_temp
DEFAULT_FAN_MIN_TEMP = DEFAULT_FAN.min_temp
DEFAULT_FAN_MAX_TEMP = DEFAULT_FAN.max_temp
DEFAULT_FAN_MIN_PERCENTAGE = DEFAULT_FAN.min_percentage
DEFAULT_FAN_MAX_PERCENTAGE = DEFAULT_FAN.max_percentage
DEFAULT_FAN_NIGHT_START = DEFAULT_FAN.night_start
DEFAULT_FAN_NIGHT_END = DEFAULT_FAN.night_end
DEFAULT_FAN_NIGHT_PERCENTAGE = DEFAULT_FAN.night_percentage
DEFAULT_FAN_ROOM_MAX = DEFAULT_FAN.room_max
DEFAULT_FAN_ROOM_PERCENTAGE = DEFAULT_FAN.room_percentage
DEFAULT_FAN_OVERRIDE_MINUTES = DEFAULT_FAN.override_minutes

# How long a manual "boost" preset runs at 100 %.
FAN_BOOST_MINUTES = 20
# Percentage steps below this are not re-sent to the target to avoid noise.
FAN_PERCENTAGE_TOLERANCE = 2

# Internal tuning that is not exposed in the UI (sensible defaults).
PEAK_DROP = 25.0
START_HYSTERESIS = 5.0
RATE_SMOOTHING = 0.3
MAX_RATE = 30.0
RATE_RESET_GAP = timedelta(minutes=10)
NOTIFY_COOLDOWN = timedelta(minutes=10)

STORAGE_VERSION = 1
STORAGE_KEY = f"{DOMAIN}.state"

EVENT_PHASE_CHANGED = f"{DOMAIN}_phase_changed"
EVENT_RECOMMENDATION_CHANGED = f"{DOMAIN}_recommendation_changed"
EVENT_OVERTEMPERATURE = f"{DOMAIN}_overtemperature"

# Notification texts. `{temperature}` and `{threshold}` are formatted in.
MESSAGES: dict[str, dict[str, dict[str, str]]] = {
    "de": {
        "overtemp": {
            "title": "🔥 Ofen läuft zu heiß",
            "message": (
                "Rauchgas {temperature:.0f} °C (Grenze {threshold:.0f} °C). "
                "Primärluft jetzt drosseln – sonst geht die Wärme den Schornstein hoch."
            ),
        },
        "reduce_air": {
            "title": "Ofen: Luft drosseln",
            "message": (
                "Rauchgas {temperature:.0f} °C. Primärluft etwas schließen, "
                "Sekundärluft offen lassen."
            ),
        },
        "add_fuel": {
            "title": "Ofen: Nachlegen",
            "message": (
                "Rauchgas nur noch {temperature:.0f} °C. Wenn noch Glut vorhanden ist, "
                "jetzt 1–2 Scheite nachlegen – sonst ausbrennen lassen."
            ),
        },
    },
    "en": {
        "overtemp": {
            "title": "🔥 Stove is running too hot",
            "message": (
                "Flue gas {temperature:.0f} °C (limit {threshold:.0f} °C). "
                "Reduce primary air now – otherwise the heat goes up the chimney."
            ),
        },
        "reduce_air": {
            "title": "Stove: reduce air",
            "message": (
                "Flue gas {temperature:.0f} °C. Close the primary air a bit and "
                "keep the secondary air open."
            ),
        },
        "add_fuel": {
            "title": "Stove: reload",
            "message": (
                "Flue gas down to {temperature:.0f} °C. If embers are left, add "
                "one or two logs now – otherwise let it burn out."
            ),
        },
    },
}
