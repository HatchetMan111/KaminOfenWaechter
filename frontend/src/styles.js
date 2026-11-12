// CSS für die Card (wird in den Shadow-DOM injiziert).
// Alle Farben über HA-Theming-Variablen mit Fallbacks.

export default `
:host {
  display: block;
  --kfw-card-bg: var(--card-background-color, #fff);
  --kfw-text: var(--primary-text-color, #212121);
  --kfw-text-dim: var(--secondary-text-color, #727272);
  --kfw-divider: var(--divider-color, rgba(0,0,0,.12));
  --kfw-accent: var(--accent-color, #ff9800);
  --kfw-state-ok: var(--state-icon-active-color, #43a047);
  --kfw-fire: #ff7043;
  --kfw-cold: var(--kfw-text-dim, #727272);
  --kfw-amber: #ffb300;
  --kfw-green: #43a047;
  --kfw-orange: #fb8c00;
  --kfw-red: #e53935;
  --kfw-blue: #1e88e5;
}
ha-card {
  padding: 14px 16px 12px;
  background: var(--kfw-card-bg);
  color: var(--kfw-text);
  transition: box-shadow .3s ease;
}
ha-card.alert {
  box-shadow: 0 0 0 2px var(--kfw-red), 0 4px 16px rgba(229,57,53,.25);
}
.header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.header .fire-icon {
  color: var(--kfw-fire);
  display: flex;
}
.header .fire-icon.pulse ha-icon {
  animation: kfw-pulse 1.6s ease-in-out infinite;
}
@keyframes kfw-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: .85; }
}
.header .name {
  font-weight: 600;
  font-size: 1.05rem;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.phase-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: .78rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 14px;
  white-space: nowrap;
}
.phase-chip .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}
.phase-idle { color: var(--kfw-text-dim); background: color-mix(in srgb, var(--kfw-text-dim) 12%, transparent); }
.phase-ignition { color: var(--kfw-amber); background: color-mix(in srgb, var(--kfw-amber) 14%, transparent); }
.phase-main { color: var(--kfw-green); background: color-mix(in srgb, var(--kfw-green) 14%, transparent); }
.phase-burnout { color: var(--kfw-orange); background: color-mix(in srgb, var(--kfw-orange) 14%, transparent); }

.gauge-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2px;
}
.gauge-svg { width: 100%; max-width: 320px; }
.gauge-needle { transition: transform .9s cubic-bezier(.4,.0,.2,1); }
.gauge-needle-fast { transition: transform .2s ease-out; }
.gauge-center-temp {
  font-size: 2.1rem;
  font-weight: 700;
  fill: var(--kfw-text);
  letter-spacing: -.02em;
}
.gauge-center-unit {
  font-size: .8rem;
  font-weight: 500;
  fill: var(--kfw-text-dim);
}
.gauge-center-label {
  font-size: .68rem;
  fill: var(--kfw-text-dim);
  text-transform: uppercase;
  letter-spacing: .08em;
}
.rate-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: .85rem;
  color: var(--kfw-text-dim);
  margin-top: -6px;
  margin-bottom: 6px;
}
.rate-row .rate-value { font-weight: 600; }
.rate-up { color: var(--kfw-green); }
.rate-down { color: var(--kfw-blue); }

.recommendation {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  padding: 10px 14px;
  margin: 6px 0 10px;
  border-left: 4px solid var(--kfw-accent);
}
.recommendation .rec-text { font-weight: 600; font-size: .92rem; }
.recommendation .rec-hint { font-size: .78rem; color: var(--kfw-text-dim); }
.rec-air_open { border-left-color: var(--kfw-blue); }
.rec-hold { border-left-color: var(--kfw-green); }
.rec-reduce_air { border-left-color: var(--kfw-orange); }
.rec-add_fuel { border-left-color: var(--kfw-amber); }
.rec-let_burn_out { border-left-color: var(--kfw-text-dim); }
.rec-wait { border-left-color: var(--kfw-divider); }

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 10px;
}
.stat {
  background: color-mix(in srgb, var(--kfw-text) 5%, transparent);
  border-radius: 10px;
  padding: 8px 10px;
  min-width: 0;
}
.stat .stat-label {
  font-size: .68rem;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--kfw-text-dim);
  display: flex;
  align-items: center;
  gap: 4px;
}
.stat .stat-value {
  font-size: 1.05rem;
  font-weight: 600;
  margin-top: 2px;
  white-space: nowrap;
}
.stat .stat-value ha-icon { font-size: .85rem; vertical-align: middle; }

.history-block { margin: 4px 0 8px; }
.block-title {
  font-size: .72rem;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--kfw-text-dim);
  margin-bottom: 4px;
}
.history-svg { width: 100%; height: 72px; display: block; border-radius: 8px; }

.fan-block {
  border-top: 1px solid var(--kfw-divider);
  padding-top: 10px;
  margin-top: 2px;
}
.fan-row {
  display: flex;
  align-items: center;
  gap: 14px;
}
.fan-ring { position: relative; width: 84px; height: 84px; flex-shrink: 0; }
.fan-ring svg { transform: rotate(-90deg); }
.fan-ring .fan-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.fan-ring .fan-pct { font-size: 1.1rem; font-weight: 700; }
.fan-ring .fan-reason {
  font-size: .58rem;
  color: var(--kfw-text-dim);
  width: 70px;
  text-align: center;
  line-height: 1.15;
  margin-top: 1px;
}
.fan-ring ha-icon {
  animation: kfw-spin 2.4s linear infinite;
}
@keyframes kfw-spin { to { transform: rotate(360deg); } }
.fan-controls { flex: 1; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.fan-presets { display: flex; gap: 8px; }
.fan-btn {
  flex: 1;
  border: 1px solid var(--kfw-divider);
  background: transparent;
  color: var(--kfw-text);
  border-radius: 10px;
  padding: 7px 0;
  font-size: .82rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: background .15s ease, border-color .15s ease;
}
.fan-btn:hover { background: color-mix(in srgb, var(--kfw-text) 8%, transparent); }
.fan-btn.active {
  border-color: var(--kfw-accent);
  background: color-mix(in srgb, var(--kfw-accent) 16%, transparent);
}
.fan-meta {
  font-size: .74rem;
  color: var(--kfw-text-dim);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.fan-meta ha-icon {
  --mdc-icon-size: 14px;
  font-size: 14px;
  flex-shrink: 0;
}
.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--kfw-red);
  font-size: .85rem;
  padding: 8px 0;
}
.footer-note {
  font-size: .66rem;
  color: var(--kfw-text-dim);
  text-align: right;
  margin-top: 4px;
}
`;
