// UI-Texte. Deutsch ist Primärsprache (Phil/LichtValley), Englisch als Fallback.

const DE = {
  title: "KaminOfenWaechter",
  phase: {
    idle: "Aus",
    ignition: "Anzünden",
    main: "Hauptabbrand",
    burnout: "Ausbrand",
  },
  recommendation: {
    wait: "Keine Aktivität",
    air_open: "Luft offen lassen",
    hold: "Halten – alles gut",
    reduce_air: "Luft drosseln",
    add_fuel: "Nachlegen",
    let_burn_out: "Ausbrennen lassen",
  },
  recHint: {
    wait: "Ofen ist kalt – Zeit für ein neues Feuer.",
    air_open: "Luftklappen offen, damit das Feuer angeht.",
    hold: "Optimales Band – nichts tun.",
    reduce_air: "Primärluft drosseln, sonst geht die Wärme hoch.",
    add_fuel: "Glut vorhanden? 1–2 Scheite nachlegen.",
    let_burn_out: "Ausbrennen lassen – Glut ausnutzen.",
  },
  peak: "Spitze",
  burnTime: "Abbrand",
  rate: "Änderung",
  flue: "Rauchgas",
  fan: {
    title: "Ofenventilator",
    auto: "Automatik",
    boost: "Boost",
    off: "Aus",
    on: "Ein",
    reason: {
      off: "aus – Rauchgas zu kühl",
      ramp: "folgt der Rauchgastemperatur",
      overtemp: "Übertemperatur – volle Drehzahl",
      night: "Nachtmodus-Grenze",
      room: "Raum warm genug",
      night_room: "Nachtmodus + Raum warm",
      manual: "Handsteuerung aktiv",
    },
    override: "Handsteuerung",
    autoTarget: "Automatik-Ziel",
  },
  unavailable: "Sensor nicht verfügbar",
  history: "Verlauf",
  historyEmpty: "Noch keine Verlaufsdaten.",
  noEntry: "Keine KaminOfenWaechter-Entitäten gefunden – Entität in den Card-Optionen setzen.",
  active: "Abbrand aktiv",
  inactive: "Kein Abbrand",
  overtemp: "Übertemperatur",
  status: "Status",
};

const EN = {
  title: "KaminOfenWaechter",
  phase: {
    idle: "Idle",
    ignition: "Ignition",
    main: "Main burn",
    burnout: "Burnout",
  },
  recommendation: {
    wait: "No activity",
    air_open: "Keep air open",
    hold: "Hold – all good",
    reduce_air: "Reduce air",
    add_fuel: "Reload",
    let_burn_out: "Let it burn out",
  },
  recHint: {
    wait: "Stove is cold – time for a new fire.",
    air_open: "Keep the air vents open so the fire catches.",
    hold: "Optimal band – nothing to do.",
    reduce_air: "Close primary air, or heat goes up the chimney.",
    add_fuel: "Embers left? Add one or two logs.",
    let_burn_out: "Let it burn out – use the embers.",
  },
  peak: "Peak",
  burnTime: "Burn",
  rate: "Change",
  flue: "Flue gas",
  fan: {
    title: "Stove fan",
    auto: "Auto",
    boost: "Boost",
    off: "Off",
    on: "On",
    reason: {
      off: "off – flue gas too cool",
      ramp: "follows flue gas temperature",
      overtemp: "overtemperature – full speed",
      night: "night mode limit",
      room: "room is warm enough",
      night_room: "night mode + warm room",
      manual: "manual override",
    },
    override: "Manual",
    autoTarget: "Auto target",
  },
  unavailable: "Sensor unavailable",
  history: "History",
  historyEmpty: "No history data yet.",
  noEntry: "No KaminOfenWaechter entities found – set an entity in the card options.",
  active: "Burn active",
  inactive: "No burn",
  overtemp: "Overtemperature",
  status: "Status",
};

export function textsFor(language) {
  return (language || "").toLowerCase().startsWith("de") ? DE : EN;
}

export function formatDuration(seconds) {
  const total = Math.max(0, Math.round(seconds || 0));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")} h`;
  return `${m}:${String(s).padStart(2, "0")} min`;
}

export function formatClock(seconds) {
  const total = Math.max(0, Math.round(seconds || 0));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
