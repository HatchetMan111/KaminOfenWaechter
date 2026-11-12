import React, { useEffect, useRef } from "react";
import { KEYS, emptyEntities, discoverEntities } from "./discovery.js";
import { textsFor } from "./i18n.js";

const DEFAULT_THRESHOLDS = {
  cold: 100,
  refuel: 150,
  optimal_low: 180,
  optimal_high: 350,
  warn: 450,
};

const LABELS = {
  de: {
    temperature: "Rauchgas-Temperatursensor",
    phase: "Phasen-Sensor",
    recommendation: "Empfehlungs-Sensor",
    burn_duration: "Abbranddauer-Sensor",
    peak_temperature: "Spitzentemperatur-Sensor",
    rate_of_change: "Temperaturänderungs-Sensor",
    burn_active: "Abbrand-aktiv-Binärsensor",
    overtemperature: "Übertemperatur-Binärsensor",
    stove_fan: "Ofenventilator (fan.*)",
    gaugeMax: "Skalenende des Gauges (°C)",
    hours: "Verlauf (Stunden)",
    showHistory: "Verlaufsdiagramm anzeigen",
    showFan: "Ventilator-Steuerung anzeigen",
    auto: "Entitäten automatisch erkennen",
    entities: "Entitäten",
    thresholds: "Schwellwerte (°C)",
  },
  en: {
    temperature: "Flue gas temperature sensor",
    phase: "Phase sensor",
    recommendation: "Recommendation sensor",
    burn_duration: "Burn duration sensor",
    peak_temperature: "Peak temperature sensor",
    rate_of_change: "Rate-of-change sensor",
    burn_active: "Burn active binary sensor",
    overtemperature: "Overtemperature binary sensor",
    stove_fan: "Stove fan (fan.*)",
    gaugeMax: "Gauge maximum (°C)",
    hours: "History (hours)",
    showHistory: "Show history chart",
    showFan: "Show fan control",
    auto: "Discover entities automatically",
    entities: "Entities",
    thresholds: "Thresholds (°C)",
  },
};

// Lit-Elemente feuern Custom Events; React 18 fängt die nicht über
// Synthetic-Props ab. Deshalb: Events per ref mit addEventListener binden.
function useElementEvent(eventName, handler, deps = []) {
  const ref = useRef(null);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fn = (e) => handlerRef.current(e);
    el.addEventListener(eventName, fn);
    return () => el.removeEventListener(eventName, fn);
  }, [eventName, ...deps]);
  return ref;
}

function EntityPicker({ hass, value, label, onChange }) {
  const ref = useElementEvent("value-changed", (e) => onChange(e.detail.value));
  useEffect(() => {
    if (ref.current) {
      ref.current.hass = hass;
      ref.current.value = value || "";
    }
  });
  return <ha-entity-picker ref={ref} label={label} allow-custom-entity />;
}

function Toggle({ checked, label, onChange }) {
  const ref = useElementEvent("change", (e) => onChange(e.target.checked));
  useEffect(() => {
    if (ref.current) ref.current.checked = Boolean(checked);
  });
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", cursor: "pointer" }}>
      <ha-switch ref={ref} />
      {label}
    </label>
  );
}

export default function Editor({ hass, config, onChange }) {
  const isDe = (hass?.language || "de").toLowerCase().startsWith("de");
  const L = LABELS[isDe ? "de" : "en"];
  const t = textsFor(hass?.language);

  const discovered = discoverEntities(hass || {}, config || {});
  const manual = Boolean(config.entities);
  const current = manual ? { ...emptyEntities(), ...(config.entities || {}) } : discovered;
  const thresholds = { ...DEFAULT_THRESHOLDS, ...(config.thresholds || {}) };

  const update = (patch) => onChange({ ...(config || {}), ...patch });

  const setEntity = (key, value) => {
    const entities = { ...(config.entities || emptyEntities()) };
    if (value) entities[key] = value;
    else delete entities[key];
    update({ entities });
  };

  const setThreshold = (key, value) => {
    const num = parseFloat(value);
    if (Number.isFinite(num)) update({ thresholds: { ...thresholds, [key]: num } });
  };

  return (
    <div className="kfw-editor">
      <style>{`
        .kfw-editor ha-entity-picker,
        .kfw-editor ha-textfield { display: block; width: 100%; margin-bottom: 8px; }
        .kfw-editor h4 { margin: 14px 0 6px; font-size: 0.8rem; opacity: 0.8; }
      `}</style>

      <Toggle
        checked={!manual}
        label={L.auto}
        onChange={(checked) => {
          if (checked) update({ entities: undefined });
          else update({ entities: { ...discovered } });
        }}
      />

      <h4>{L.entities}</h4>
      {Object.keys(KEYS).map((key) => (
        <EntityPicker
          key={key}
          hass={hass}
          value={current[key]}
          label={L[key]}
          onChange={(value) => setEntity(key, value)}
        />
      ))}

      <h4>{L.thresholds}</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px" }}>
        {Object.keys(DEFAULT_THRESHOLDS).map((key) => (
          <ha-textfield
            key={key}
            label={key}
            type="number"
            value={String(thresholds[key])}
            onInput={(e) => setThreshold(key, e.target.value)}
          />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "12px 0" }}>
        <ha-textfield
          label={L.gaugeMax}
          type="number"
          value={String(config.gauge_max ?? 600)}
          onInput={(e) => {
            const num = parseFloat(e.target.value);
            update({ gauge_max: Number.isFinite(num) ? num : undefined });
          }}
        />
        <ha-textfield
          label={L.hours}
          type="number"
          value={String(config.hours_to_show ?? 12)}
          onInput={(e) => {
            const num = parseFloat(e.target.value);
            update({ hours_to_show: Number.isFinite(num) ? num : undefined });
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Toggle
          checked={config.show_history !== false}
          label={L.showHistory}
          onChange={(checked) => update({ show_history: checked })}
        />
        <Toggle
          checked={config.show_fan !== false}
          label={L.showFan}
          onChange={(checked) => update({ show_fan: checked })}
        />
      </div>

      {!discovered.temperature && (
        <div style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--warning-color, #b58b00)" }}>
          <ha-icon icon="mdi:alert-circle-outline" style={{ verticalAlign: "-3px" }} /> {t.noEntry}
        </div>
      )}
    </div>
  );
}
