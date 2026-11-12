import React, { useEffect, useMemo, useRef, useState } from "react";
import { discoverEntities } from "./discovery.js";
import { textsFor, formatDuration, formatClock } from "./i18n.js";

const DEFAULT_THRESHOLDS = {
  cold: 100,
  refuel: 150,
  optimal_low: 180,
  optimal_high: 350,
  warn: 450,
};

const PHASE_ICON = {
  idle: "mdi:sleep",
  ignition: "mdi:fire",
  main: "mdi:fire",
  burnout: "mdi:fire",
};

const REC_ICON = {
  wait: "mdi:progress-clock",
  air_open: "mdi:weather-windy",
  hold: "mdi:check-circle-outline",
  reduce_air: "mdi:tune-vertical",
  add_fuel: "mdi:log",
  let_burn_out: "mdi:timelapse",
};

function useTick(intervalMs = 1000) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return tick;
}

// ------------------------------------------------------------------
// Gauge
// ------------------------------------------------------------------
const GAUGE_W = 300;
const GAUGE_H = 172;
const GAUGE_R = 118;
const GAUGE_CX = 150;
const GAUGE_CY = 148;

function polar(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return [GAUGE_CX + radius * Math.cos(rad), GAUGE_CY + radius * Math.sin(rad)];
}

// 0 % → 180° (links), 100 % → 0°/360° (rechts); SVG-Winkel im Uhrzeigersinn.
function valueAngle(value, max) {
  const ratio = Math.max(0, Math.min(1, value / max));
  return 180 + ratio * 180;
}

// Nadel zeigt nach oben; CSS-Rotation: 0 → -90° (links), max → +90° (rechts).
function needleAngle(value, max) {
  return valueAngle(value, max) - 270;
}

function arcPath(startValue, endValue, max, radius) {
  const start = polar(valueAngle(startValue, max), radius);
  const end = polar(valueAngle(endValue, max), radius);
  const largeArc = valueAngle(endValue, max) - valueAngle(startValue, max) > 180 ? 1 : 0;
  return `M ${start[0].toFixed(2)} ${start[1].toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${end[0].toFixed(2)} ${end[1].toFixed(2)}`;
}

function Gauge({ value, peak, max, thresholds, lang, needleFast }) {
  const t = textsFor(lang);
  const nf = new Intl.NumberFormat(lang || "de", { maximumFractionDigits: 1 });

  // Bandfarben: kalt → grau, Anwärmen → bernstein, optimal → grün,
  // zu heiß → orange, Warnbereich → rot.
  const bands = [
    { from: 0, to: thresholds.cold, color: "var(--kfw-cold)" },
    { from: thresholds.cold, to: thresholds.optimal_low, color: "var(--kfw-amber)" },
    { from: thresholds.optimal_low, to: thresholds.optimal_high, color: "var(--kfw-green)" },
    { from: thresholds.optimal_high, to: thresholds.warn, color: "var(--kfw-orange)" },
    { from: thresholds.warn, to: max, color: "var(--kfw-red)" },
  ];

  const needleDeg = needleAngle(value, max);
  const peakPos = polar(valueAngle(peak, max), GAUGE_R + 10);

  return (
    <div className="gauge-wrap">
      <svg
        className="gauge-svg"
        viewBox={`0 0 ${GAUGE_W} ${GAUGE_H}`}
        role="img"
        aria-label={`${t.flue}: ${nf.format(value)} °C`}
      >
        {bands.map((b, i) =>
          b.to > b.from ? (
            <path
              key={i}
              d={arcPath(b.from, b.to, max, GAUGE_R)}
              fill="none"
              // var() in SVG-Presentation-Attributen wird nicht aufgelöst –
              // Farben müssen als CSS-Style gesetzt werden.
              style={{ stroke: b.color }}
              strokeWidth={13}
              strokeLinecap="butt"
              opacity={0.85}
            />
          ) : null
        )}

        {/* Peak-Marker (Spitze des aktuellen Abbrands) */}
        {peak > thresholds.cold && (
          <circle cx={peakPos[0]} cy={peakPos[1]} r={4} style={{ fill: "var(--kfw-text-dim)" }} />
        )}

        {/* Skalenmarken */}
        {[0, 0.25, 0.5, 0.75, 1].map((r) => {
          const a = valueAngle(r * max, max);
          const [x1, y1] = polar(a, GAUGE_R - 11);
          const [x2, y2] = polar(a, GAUGE_R - 17);
          return (
            <line
              key={r}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth={1.5}
              style={{ stroke: "var(--kfw-text-dim)" }}
            />
          );
        })}

        <g
          className={needleFast ? "gauge-needle-fast" : "gauge-needle"}
          style={{ transform: `rotate(${needleDeg}deg)`, transformOrigin: `${GAUGE_CX}px ${GAUGE_CY}px` }}
        >
          <line
            x1={GAUGE_CX}
            y1={GAUGE_CY}
            x2={GAUGE_CX}
            y2={GAUGE_CY - GAUGE_R + 26}
            strokeWidth={3.5}
            strokeLinecap="round"
            style={{ stroke: "var(--kfw-text)" }}
          />
          <circle cx={GAUGE_CX} cy={GAUGE_CY - GAUGE_R + 26} r={3.5} style={{ fill: "var(--kfw-fire)" }} />
        </g>
        <circle cx={GAUGE_CX} cy={GAUGE_CY} r={7} style={{ fill: "var(--kfw-text)" }} />

        <text x={GAUGE_CX} y={GAUGE_CY - 58} textAnchor="middle" className="gauge-center-temp">
          {nf.format(value)}
        </text>
        <text x={GAUGE_CX} y={GAUGE_CY - 42} textAnchor="middle" className="gauge-center-unit">
          °C · {t.flue}
        </text>
        <text x={GAUGE_CX} y={GAUGE_CY + 18} textAnchor="middle" className="gauge-center-label">
          {nf.format(0)} – {nf.format(max)} °C
        </text>
      </svg>
    </div>
  );
}

// ------------------------------------------------------------------
// Verlaufs-Sparkline (REST history endpoint)
// ------------------------------------------------------------------
function Sparkline({ hass, entity, hours, thresholds, max, lang }) {
  const [series, setSeries] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!hass || !entity) return;
    let cancelled = false;

    const load = () => {
      const start = new Date(Date.now() - hours * 3600e3).toISOString();
      hass
        .callApi("GET", `history/period/${start}?filter_entity_id=${entity}&minimal_response&significant_changes_only`)
        .then((data) => {
          if (cancelled || !mounted.current) return;
          const list = Array.isArray(data?.[0]) ? data[0] : [];
          const points = list
            .map((p) => ({ x: new Date(p.last_changed).getTime(), v: parseFloat(p.state) }))
            .filter((p) => Number.isFinite(p.v));
          setSeries(points.length >= 2 ? points : []);
        })
        .catch(() => {
          if (!cancelled && mounted.current) setSeries([]);
        });
    };

    load();
    const id = setInterval(load, 10 * 60e3);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [hass, entity, hours]);

  const t = textsFor(lang);
  if (!entity) return null;

  const W = 320;
  const H = 72;
  const PAD = 4;

  let path = null;
  let area = null;
  let lastValue = null;

  if (series && series.length >= 2) {
    const x0 = series[0].x;
    const x1 = Date.now();
    const yMax = Math.max(max, ...series.map((p) => p.v)) * 1.05;
    const toXY = (p) => [
      PAD + ((p.x - x0) / Math.max(1, x1 - x0)) * (W - 2 * PAD),
      H - PAD - (Math.max(0, p.v) / yMax) * (H - 2 * PAD),
    ];
    const pts = series.map(toXY);
    path = "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");
    area = `${path} L ${pts[pts.length - 1][0].toFixed(1)} ${H - PAD} L ${pts[0][0].toFixed(1)} ${H - PAD} Z`;
    lastValue = series[series.length - 1].v;
  }

  const bandY = (v) => {
    if (!series || series.length < 2) return 0;
    const yMax = Math.max(max, ...series.map((p) => p.v)) * 1.05;
    return H - PAD - (v / yMax) * (H - 2 * PAD);
  };

  return (
    <div className="history-block">
      <div className="block-title">{t.history}</div>
      {series === null ? null : series.length < 2 ? (
        <div className="block-title" style={{ textTransform: "none" }}>{t.historyEmpty}</div>
      ) : (
        <svg className="history-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="kfwHistGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--kfw-fire)", stopOpacity: 0.45 }} />
              <stop offset="100%" style={{ stopColor: "var(--kfw-fire)", stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>
          {thresholds.optimal_low < max && (
            <line x1={0} x2={W} y1={bandY(thresholds.optimal_low)} y2={bandY(thresholds.optimal_low)} strokeDasharray="3 4" strokeWidth={1} opacity={0.7} style={{ stroke: "var(--kfw-green)" }} />
          )}
          {thresholds.warn < max && (
            <line x1={0} x2={W} y1={bandY(thresholds.warn)} y2={bandY(thresholds.warn)} strokeDasharray="3 4" strokeWidth={1} opacity={0.7} style={{ stroke: "var(--kfw-red)" }} />
          )}
          <path d={area} style={{ fill: "url(#kfwHistGrad)" }} />
          <path d={path} fill="none" strokeWidth={1.8} style={{ stroke: "var(--kfw-fire)" }} />
        </svg>
      )}
      {lastValue !== null && (
        <div className="block-title" style={{ textTransform: "none", marginTop: 2 }}>
          {new Intl.NumberFormat(lang || "de", { maximumFractionDigits: 0 }).format(Math.max(0, lastValue))} °C
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------
// Ventilator-Block
// ------------------------------------------------------------------
function FanBlock({ hass, fanEntity, lang, tick }) {
  const t = textsFor(lang);
  const [busy, setBusy] = useState(false);
  const state = hass.states[fanEntity];
  if (!state) return null;

  const attrs = state.attributes || {};
  const unavailable = ["unknown", "unavailable"].includes(state.state);
  const percentage = typeof attrs.percentage === "number" ? attrs.percentage : null;
  const auto = attrs.auto !== false;
  const preset = attrs.preset_mode || "auto";
  const reasonKey = attrs.reason || "off";
  const running = !unavailable && (percentage ?? 0) > 0;

  // Countdown der Handsteuerung (tick triggert Neuberechnung).
  let overrideLeft = null;
  if (!auto && attrs.override_until) {
    const until = new Date(attrs.override_until).getTime();
    if (Number.isFinite(until)) overrideLeft = Math.max(0, (until - Date.now()) / 1000);
  }

  const R = 34;
  const C = 2 * Math.PI * R;
  const progress = percentage !== null ? Math.max(0, Math.min(100, percentage)) / 100 : running ? 1 : 0;

  const send = (service, data) => {
    setBusy(true);
    Promise.resolve(
      hass.callService("fan", service, { entity_id: fanEntity, ...data })
    ).finally(() => setBusy(false));
  };

  const autoTarget = typeof attrs.auto_percentage === "number" ? attrs.auto_percentage : null;

  return (
    <div className="fan-block">
      <div className="block-title">{t.fan.title}</div>
      <div className="fan-row">
        <div className="fan-ring">
          <svg viewBox="0 0 84 84" width="84" height="84">
            <circle cx="42" cy="42" r={R} fill="none" strokeWidth="7" style={{ stroke: "var(--kfw-divider)" }} />
            {progress > 0 && (
              <circle
                cx="42"
                cy="42"
                r={R}
                fill="none"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${(C * progress).toFixed(1)} ${C.toFixed(1)}`}
                style={{
                  transition: "stroke-dasharray .6s ease",
                  stroke: reasonKey === "overtemp" ? "var(--kfw-red)" : "var(--kfw-accent)",
                }}
              />
            )}
          </svg>
          <div className="fan-center">
            <span className="fan-pct">{percentage !== null ? `${percentage} %` : running ? t.fan.on : "—"}</span>
            <span className="fan-reason">{t.fan.reason[reasonKey] || reasonKey}</span>
          </div>
        </div>
        <div className="fan-controls">
          <div className="fan-presets">
            <button
              className={`fan-btn ${preset === "auto" ? "active" : ""}`}
              disabled={busy || unavailable}
              onClick={() => send("set_preset_mode", { preset_mode: "auto" })}
            >
              <ha-icon icon="mdi:autorenew" style={{ fontSize: "1rem" }} /> {t.fan.auto}
            </button>
            <button
              className={`fan-btn ${preset === "boost" ? "active" : ""}`}
              disabled={busy || unavailable}
              onClick={() => send("set_preset_mode", { preset_mode: "boost" })}
            >
              <ha-icon icon="mdi:fast-forward" style={{ fontSize: "1rem" }} /> {t.fan.boost}
            </button>
            <button
              className={`fan-btn ${preset === "off" ? "active" : ""}`}
              disabled={busy || unavailable}
              onClick={() => send("set_preset_mode", { preset_mode: "off" })}
            >
              <ha-icon icon="mdi:fan-off" style={{ fontSize: "1rem" }} /> {t.fan.off}
            </button>
          </div>
          <div className="fan-meta">
            <span>
              <ha-icon icon={running ? "mdi:fan" : "mdi:fan-off"} style={{ fontSize: ".9rem", verticalAlign: "-2px", display: running ? "inline" : "none" }} />
              {auto
                ? `${t.fan.autoTarget}: ${autoTarget !== null ? `${autoTarget} %` : "—"}`
                : `${t.fan.override}: ${overrideLeft !== null ? formatClock(overrideLeft) : "—"}${autoTarget !== null ? ` · ${t.fan.autoTarget} ${autoTarget} %` : ""}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Haupt-Card
// ------------------------------------------------------------------
export default function Card({ hass, config }) {
  const tick = useTick(1000);
  // React 18 setzt className nicht auf Custom-Elements – der Alarm-Rahmen
  // wird deshalb imperativ über classList gesetzt.
  const cardRef = useRef(null);
  const lang = hass.language || "de";
  const t = textsFor(lang);

  const entities = useMemo(
    () => discoverEntities(hass, config),
    // hass selbst ändert sich laufend; die Registry-Zuordnung nur bei relevanten Feldern neu bauen.
    [hass && hass.entities, config]
  );

  const tempState = entities.temperature ? hass.states[entities.temperature] : null;
  const thresholds = { ...DEFAULT_THRESHOLDS, ...(config.thresholds || {}) };
  const gaugeMax = Number(config.gauge_max) > 0 ? Number(config.gauge_max) : 600;
  const hours = Number(config.hours_to_show) > 0 ? Number(config.hours_to_show) : 12;
  const showHistory = config.show_history !== false;
  const showFan = config.show_fan !== false;

  const num = (entityId) => {
    const st = entityId ? hass.states[entityId] : null;
    if (!st) return null;
    const v = parseFloat(st.state);
    return Number.isFinite(v) ? v : null;
  };

  const temp = num(entities.temperature);
  const rate = num(entities.rate_of_change);
  const peak = num(entities.peak_temperature) ?? 0;
  const burnSeconds = num(entities.burn_duration) ?? 0;
  const phase = entities.phase ? hass.states[entities.phase]?.state : "idle";
  const recommendation = entities.recommendation
    ? hass.states[entities.recommendation]?.state
    : "wait";
  const burnActive = entities.burn_active
    ? hass.states[entities.burn_active]?.state === "on"
    : phase !== "idle";
  const overtemp = entities.overtemperature
    ? hass.states[entities.overtemperature]?.state === "on"
    : temp !== null && temp >= thresholds.warn;

  const unavailable = !tempState || ["unknown", "unavailable"].includes(tempState.state);

  useEffect(() => {
    cardRef.current?.classList.toggle("alert", Boolean(overtemp));
  }, [overtemp]);

  // Abbranddauer weiterlaufen lassen zwischen den Coordinator-Updates.
  const lastChanged = tempState ? new Date(tempState.last_changed).getTime() : null;
  const liveBurnSeconds =
    burnSeconds > 0 && lastChanged && Number.isFinite(lastChanged)
      ? burnSeconds + Math.max(0, (Date.now() - lastChanged) / 1000)
      : burnSeconds;

  const deviceName = useMemo(() => {
    const reg = entities.temperature ? hass.entities?.[entities.temperature] : null;
    if (reg?.device_id && hass.devices?.[reg.device_id]?.name) {
      return hass.devices[reg.device_id].name;
    }
    return tempState?.attributes?.friendly_name
      ? String(tempState.attributes.friendly_name).replace(/ Rauchgastemperatur.*$/i, "").replace(/ flue gas.*$/i, "").trim()
      : t.title;
  }, [entities.temperature, hass.entities, hass.devices, tempState, t.title]);

  if (!entities.temperature) {
    return (
      <ha-card>
        <div className="error-banner">
          <ha-icon icon="mdi:alert-circle-outline" />
          {t.noEntry}
        </div>
      </ha-card>
    );
  }

  const nf1 = new Intl.NumberFormat(lang, { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const rateClass = rate === null ? "" : rate >= 0.2 ? "rate-up" : rate <= -0.2 ? "rate-down" : "";

  return (
    <ha-card ref={cardRef}>
      <div className="header">
        <span className={`fire-icon ${burnActive ? "pulse" : ""}`}>
          <ha-icon icon={burnActive ? "mdi:fire" : "mdi:fireplace-off"} />
        </span>
        <span className="name">{deviceName}</span>
        <span className={`phase-chip phase-${phase}`}>
          <span className="dot" />
          {t.phase[phase] || phase}
        </span>
      </div>

      {unavailable ? (
        <div className="error-banner">
          <ha-icon icon="mdi:thermometer-off" />
          {t.unavailable}
        </div>
      ) : (
        <>
          <Gauge value={temp} peak={peak} max={gaugeMax} thresholds={thresholds} lang={lang} needleFast={false} />
          {rate !== null && (
            <div className="rate-row">
              <ha-icon icon={rate >= 0 ? "mdi:arrow-up-bold" : "mdi:arrow-down-bold"} style={{ fontSize: ".9rem" }} />
              <span className={`rate-value ${rateClass}`}>
                {rate >= 0 ? "+" : ""}
                {nf1.format(rate)} °C/min
              </span>
              <span>· {t.rate}</span>
            </div>
          )}

          <div className={`recommendation rec-${recommendation}`}>
            <ha-icon icon={REC_ICON[recommendation] || REC_ICON.wait} />
            <div>
              <div className="rec-text">{t.recommendation[recommendation] || recommendation}</div>
              <div className="rec-hint">{t.recHint[recommendation] || ""}</div>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-label">
                <ha-icon icon="mdi:thermometer-high" style={{ fontSize: ".8rem" }} />
                {t.peak}
              </div>
              <div className="stat-value">{nf1.format(peak)} °C</div>
            </div>
            <div className="stat">
              <div className="stat-label">
                <ha-icon icon="mdi:timer-outline" style={{ fontSize: ".8rem" }} />
                {t.burnTime}
              </div>
              <div className="stat-value">{formatDuration(liveBurnSeconds)}</div>
            </div>
            <div className="stat">
              <div className="stat-label">
                <ha-icon icon={overtemp ? "mdi:alert-octagon" : "mdi:fire"} style={{ fontSize: ".8rem" }} />
                {t.status}
              </div>
              <div className="stat-value">
                {overtemp ? (
                  <span style={{ color: "var(--kfw-red)" }}>{t.overtemp}</span>
                ) : burnActive ? (
                  <span style={{ color: "var(--kfw-green)" }}>{t.active}</span>
                ) : (
                  <span>{t.inactive}</span>
                )}
              </div>
            </div>
          </div>

          {showHistory && (
            <Sparkline hass={hass} entity={entities.temperature} hours={hours} thresholds={thresholds} max={gaugeMax} lang={lang} />
          )}

          {showFan && entities.stove_fan && (
            <FanBlock hass={hass} fanEntity={entities.stove_fan} lang={lang} tick={tick} />
          )}

          <div className="footer-note">KaminOfenWaechter</div>
        </>
      )}
    </ha-card>
  );
}
