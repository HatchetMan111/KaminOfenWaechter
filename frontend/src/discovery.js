// Findet alle Entitäten einer KaminOfenWaechter-Instanz automatisch.
//
// Primär: Entity-Registry (hass.entities) nach platform === "flueguard"
// filtern und über translation_key zuordnen. Fallback: die vom Nutzer in der
// Card-Konfig angegebene Temperatur-Entität.

export const KEYS = {
  temperature: "sensor",
  rate_of_change: "sensor",
  phase: "sensor",
  recommendation: "sensor",
  burn_duration: "sensor",
  peak_temperature: "sensor",
  burn_active: "binary_sensor",
  overtemperature: "binary_sensor",
  stove_fan: "fan",
};

export function emptyEntities() {
  return Object.fromEntries(Object.keys(KEYS).map((k) => [k, null]));
}

export function discoverEntities(hass, config = {}) {
  const found = emptyEntities();

  // Explizite Konfiguration gewinnt immer.
  for (const key of Object.keys(KEYS)) {
    const explicit = config.entities?.[key];
    if (explicit && hass.states[explicit]) {
      found[key] = explicit;
    }
  }
  if (Object.values(found).some(Boolean) && config.entities) {
    return found;
  }

  const groups = {};
  for (const [entityId, registration] of Object.entries(hass.entities || {})) {
    if (registration?.platform !== "flueguard") continue;
    const key = registration.translation_key;
    if (!key || !(key in KEYS)) continue;
    if (KEYS[key] !== entityId.split(".")[0]) continue;
    const groupId = registration.config_entry_id || "_";
    (groups[groupId] ||= {})[key] = entityId;
  }

  let best = null;
  for (const group of Object.values(groups)) {
    if (
      config.entity &&
      Object.values(group).includes(config.entity)
    ) {
      best = group;
      break;
    }
    if (!best || Object.keys(group).length > Object.keys(best).length) {
      best = group;
    }
  }

  return { ...found, ...(best || {}) };
}

// Welche flueguard-Instanzen existieren (für den Editor)?
export function discoverInstances(hass) {
  const instances = {};
  for (const [entityId, registration] of Object.entries(hass.entities || {})) {
    if (registration?.platform !== "flueguard") continue;
    const key = registration.translation_key;
    if (key === "temperature" || key === "burn_active") {
      instances[registration.config_entry_id || entityId] = entityId;
    }
  }
  return Object.entries(instances);
}
