import React from "react";
import { createRoot } from "react-dom/client";
import Card from "./Card.jsx";
import Editor from "./Editor.jsx";
import STYLES from "./styles.js";

const CARD_TYPE = "kaminofenwaechter-card";
const EDITOR_TYPE = `${CARD_TYPE}-editor`;

// Lovelace-Card-Registrierung im Karten-Auswahlmenü
window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TYPE,
  name: "KaminOfenWaechter",
  description:
    "Kaminofen-Monitor: Rauchgastemperatur-Gauge, Abbrandphase, Empfehlung, Verlauf und Ventilator-Steuerung",
  preview: true,
});

// hass kommt bei jeder Zustandsänderung (typisch alle 30 s + Frontend-Aktionen);
// per requestAnimationFrame entprellen, damit React nicht pro Frame rendert.
function makeRenderer(element, renderFn) {
  let scheduled = false;
  return () => {
    if (scheduled || !element._reactRoot) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      renderFn();
    });
  };
}

class KaminOfenWaechterCard extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._config = {};
    this._reactRoot = null;
    this._renderScheduled = makeRenderer(
      this,
      () =>
        this._reactRoot?.render(
          React.createElement(Card, {
            hass: this._hass,
            config: this._config,
            key: this._config?.entities ? "manual" : "auto",
          })
        )
    );
  }

  set hass(hass) {
    this._hass = hass;
    this._renderScheduled();
  }

  get hass() {
    return this._hass;
  }

  setConfig(config) {
    this._config = typeof config === "string" ? JSON.parse(config) : config || {};
    this._mount();
    this._renderScheduled();
  }

  connectedCallback() {
    // Falls setConfig vor dem Einhängen kam, ist schon gemountet;
    // sonst jetzt mounten, damit hass sofort rendern kann.
    this._mount();
    this._renderScheduled();
  }

  _mount() {
    if (this._reactRoot) return;
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = STYLES;
    this.shadowRoot.appendChild(style);
    const container = document.createElement("div");
    this.shadowRoot.appendChild(container);
    this._reactRoot = createRoot(container);
  }

  getCardSize() {
    return 8;
  }

  // Sowohl statisch als auch am Objekt: je nach HA-Version fragt der
  // Sections-Editor die Klassen- oder Objektmethode ab.
  static getGridOptions() {
    return { columns: 6, min_columns: 3, rows: 9, min_rows: 6 };
  }

  getGridOptions() {
    return KaminOfenWaechterCard.getGridOptions();
  }

  static getConfigElement() {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig(hass) {
    const entities = {};
    for (const [, registration] of Object.entries(hass?.entities || {})) {
      if (
        registration?.platform === "flueguard" &&
        registration.translation_key === "temperature"
      ) {
        entities.entity = Object.keys(hass.entities).find(
          (id) => hass.entities[id] === registration
        );
        break;
      }
    }
    return entities.entity ? { entity: entities.entity } : {};
  }
}

class KaminOfenWaechterEditor extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._config = {};
    this._reactRoot = null;
    this._renderScheduled = makeRenderer(
      this,
      () =>
        this._reactRoot?.render(
          React.createElement(Editor, {
            hass: this._hass,
            config: this._config,
            onChange: (config) => {
              // undefined-Keys (z. B. entities: undefined bei Auto-Modus) entfernen
              const clean = JSON.parse(JSON.stringify(config, (k, v) => (v === undefined ? undefined : v)));
              this._config = clean;
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: { config: clean },
                  bubbles: true,
                  composed: true,
                })
              );
            },
          })
        )
    );
  }

  set hass(hass) {
    this._hass = hass;
    this._renderScheduled();
  }

  setConfig(config) {
    this._config = config || {};
    this._mount();
    this._renderScheduled();
  }

  _mount() {
    if (this._reactRoot) return;
    this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    this.shadowRoot.appendChild(container);
    this._reactRoot = createRoot(container);
  }
}

customElements.define(CARD_TYPE, KaminOfenWaechterCard);
customElements.define(EDITOR_TYPE, KaminOfenWaechterEditor);
