"""Constants for the FlueGuard integration."""

from __future__ import annotations

from datetime import timedelta

DOMAIN = "flueguard"
NAME = "FlueGuard"
PLATFORMS = ["sensor", "binary_sensor"]

# Configuration
CONF_SOURCE_ENTITY = "source_entity"
CONF_UPDATE_INTERVAL = "update_interval"
CONF_NOTIFICATIONS = "notifications"
CONF_NOTIFY_SERVICE = "notify_service"

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
