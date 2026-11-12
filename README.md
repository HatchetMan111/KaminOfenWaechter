# 🔥 FlueGuard – Rauchgasüberwachung für Holzöfen

**FlueGuard** ist eine HACS-Integration für Home Assistant, die einen beliebigen
Temperatursensor an deinem Holzofen auswertet und daraus erkennt, in welcher
Abbrandphase der Ofen gerade ist – und was du mit der Luftzufuhr tun solltest.

Kein Eingriff in die Feuerung, keine Typprüfung, keine Garantiefrage: FlueGuard
**misst und erinnert**, statt aktiv zu regeln. Damit ist es der sichere erste
Schritt zur effizienten Verbrennung – für ein paar Euro Hardware.

```
Rauchgas 380 °C · Hauptabbrand
→ „Luft drosseln“ · Push aufs Handy
```

---

## Inhaltsverzeichnis

1. [Das Problem](#das-problem)
2. [Was FlueGuard macht](#was-flueguard-macht)
3. [Einsparungspotenzial](#einsparungspotenzial)
4. [Hardware: womit messen?](#hardware-womit-messen)
   - [ESP32 + Thermoelement (empfohlen)](#esp32--thermoelement-empfohlen)
   - [„Fleischthermometer“ & fertige Funkthermometer](#fleischthermometer--fertige-funkthermometer)
   - [Weitere Optionen](#weitere-optionen)
5. [Montage in der Putzklappe](#montage-in-der-putzklappe)
6. [Sicherheit & Recht](#sicherheit--recht)
7. [Installation über HACS](#installation-über-hacs)
8. [Einrichtung](#einrichtung)
9. [Entitäten & Events](#entitäten--events)
10. [Beispiel-Automationen](#beispiel-automationen)
11. [Wie die Erkennung funktioniert](#wie-die-erkennung-funktioniert)
12. [Tuning & FAQ](#tuning--faq)
13. [Vor dem Veröffentlichen](#vor-dem-veröffentlichen)
14. [Lizenz & Haftung](#lizenz--haftung)

---

## Das Problem

Ein Kamin- oder Kachelofen hat keine Regelung. Die Luftzufuhr stellst du per
Hand ein – und ob das gerade richtig ist, merkst du erst am Feuer, am
Holzverbrauch oder am Glanzruß im Schornstein.

Die Physik dahinter ist unbarmherzig:

- **Zu viel Luft** → die Wärme geht heiß den Schornstein hoch. Der
  Abgasverlust steigt, der Wirkungsgrad sinkt.
- **Zu wenig Luft** → unvollständige Verbrennung, CO, Ruß, Glanzruß,
  Schornsteinbrandrisiko. Und der Ofen wird nicht richtig warm.
- **Der einzige schnelle Indikator für beides ist die Rauchgastemperatur.**

Kommerzielle Abbrandsteuerungen machen genau das – sie messen die Temperatur
und regeln die Luftklappe automatisch. Systeme wie die
[KBS Feuer Control ASG/ASM](https://www.ofen-schraps.de/kamin-und-kachelofenbau/elektronische-abbrandsteuerung/)
liegen bei ~595 € zzgl. Einbau und werden vom Ofenbauer eingerichtet. Das ist
sinnvoll – aber erst, wenn man weiß, dass man es braucht.

**FlueGuard ist der günstige, risikofreie Zwischenschritt:** 15–25 € Hardware,
30 Minuten Montage, und du siehst zum ersten Mal, was dein Ofen eigentlich tut.

---

## Was FlueGuard macht

Die Integration liest einen vorhandenen Temperatursensor (ESPHome, Zigbee,
Bluetooth, egal) und berechnet daraus:

| Ausgabe | Bedeutung |
|---|---|
| **Abbrandphase** | `Aus` · `Anzünden` · `Hauptabbrand` · `Ausbrand` |
| **Empfehlung** | `Luft offen lassen` · `Halten` · `Luft drosseln` · `Nachlegen` · `Ausbrennen lassen` |
| **Spitzentemperatur** | Maximum des aktuellen Abbrands – ideal für Statistik |
| **Abbranddauer** | Wie lange das Feuer schon läuft |
| **Temperaturänderung** | °C/min, geglättet – erkennt Anfeuern und Ausbrand |
| **Übertemperatur** | Binärsensor, wenn die Warnschwelle überschritten wird |
| **Abbrand aktiv** | Binärsensor für Automationen (Licht, Dunstabzug, Lüftung) |

Dazu:

- **Push-Benachrichtigungen** (optional) bei „zu heiß“, „drosseln“ und „nachlegen“
  – mit Cooldown, damit das Handy nicht nervt.
- **Events** auf dem HA-Bus für eigene Automationen.
- **Zustand überlebt Neustarts** – ein laufender Abbrand wird wieder aufgenommen.
- **Funktioniert mit °C und °F**, rechnet intern in °C.

FlueGuard regelt **nicht** aktiv. Das ist Absicht – siehe
[Sicherheit & Recht](#sicherheit--recht).

---

## Einsparungspotenzial

### Die Faustformel

Der Wirkungsgrad eines Holzofens wird maßgeblich vom **Abgasverlust** bestimmt.
Grob gilt für Holz im üblichen Betrieb:

> **100 K zu heiße Abgase ≈ 5–7 Prozentpunkte Wirkungsgradverlust.**

Bei 12 % CO₂ im Abgas und 20 °C Raumtemperatur ergibt sich überschlägig:

| Rauchgas | Abgasverlust | Ofenwirkungsgrad ca. |
|---|---|---|
| 250 °C | ~13 % | ~75 % |
| 350 °C | ~19 % | ~69 % |
| 450 °C | ~25 % | ~63 % |
| 550 °C | ~31 % | ~57 % |

*(Absolutwerte hängen von CO₂-Gehalt, Holzfeuchte und Ofentyp ab – die
Relationen sind aber belastbar.)*

### Was das in Holz und Euro bedeutet

Beispiel: 5.000 kWh Nutzwärme pro Jahr aus Holz (typisch für einen 6-kW-Ofen,
der im Winter abends läuft), Brennwert des Holzes ~4 kWh/kg.

| Fahrweise | Rauchgas | Wirkungsgrad | Holzbedarf |
|---|---|---|---|
| dauerhaft mit offener Luft | 450–550 °C | 60–65 % | **1.950–2.100 kg** |
| „nach Gefühl“ | 350–400 °C | 67–70 % | **1.790–1.870 kg** |
| gedrosselt nach Thermometer | 250–320 °C | 72–76 % | **1.640–1.740 kg** |

Das sind **15–20 % weniger Holz** gegenüber der schlechtesten Fahrweise und
**8–10 %** gegenüber „nach Gefühl“. Bei ofenfertigem Holz für ~200 €/t
(≈ 100–130 €/Schüttraummeter) sind das **40–80 € pro Jahr** – bei 25 €
Hardware also nach dem ersten Winter bezahlt.

### Die ehrliche Einordnung

- Die auf Herstellerseiten genannten „bis zu 30 %“ beziehen sich auf eine
  **aktive Regelung** an einem vorher schlecht bedienten Ofen. Mit reiner
  Überwachung sind realistisch **5–15 %** drin, wenn du dein Verhalten
  tatsächlich änderst. Wer schon perfekt heizt, spart 0–5 %.
- Der größte Hebel bleibt **trockenes Holz (< 20 %), Anzünden von oben und
  kleine Auflagen**. FlueGuard macht sichtbar, ob du das einhältst.
- **Zu starkes Drosseln ist auch ein Fehler.** Unter ~180 °C steigt die
  Versottung, es bildet sich Glanzruß, und die Verbrennung wird schmutzig.
  Deshalb warnt die Integration in **beide** Richtungen.

### Was sich nicht in Euro messen lässt

- **Weniger Glanzruß** → geringeres Schornsteinbrandrisiko.
- **Weniger Feinstaub** – relevant, wenn dein Ofen unter die
  1. BImSchV-Stufen fällt oder du nachrüsten musst.
- **Weniger CO** im Aufstellraum.
- **Längere Ofenlebensdauer**, weil Übertemperaturen sichtbar werden.
- **Daten für den Schornsteinfeger**: Wenn du belegen kannst, wie der Ofen
  läuft, lassen sich Fragen zu Wirkungsgrad, Nachrüstung und Abgasweg viel
  konkreter klären.

---

## Hardware: womit messen?

### Übersicht

| Lösung | Kosten | Max. Temp. | HA-fähig | Aufwand | Empfehlung |
|---|---|---|---|---|---|
| ESP32 + MAX31855 + Typ-K | 15–25 € | 600–900 °C | ✅ ESPHome | 30–60 min | ⭐ **erste Wahl** |
| ESP32 + MAX31865 + PT100 | 20–35 € | 400–600 °C | ✅ ESPHome | 45–90 min | sehr genau, etwas teurer |
| BBQ-/Fleischthermometer mit App | 30–80 € | oft nur 250–300 °C | ⚠️ meist nein | 10 min | nur als Test |
| Analoges Rauchgasthermometer | 15–25 € | 500 °C | ❌ | 5 min | als Backup/Gegenprobe |
| IR-Thermometer aufs Rauchrohr | 20–40 € | – | ❌ | 1 min | misst nur Oberfläche |

### ESP32 + Thermoelement (empfohlen)

Das ist die Lösung, die in Preis, Genauigkeit und HA-Integration klar gewinnt.

**Teileliste**

| Teil | Bemerkung | Preis |
|---|---|---|
| ESP32 DevKit (z. B. ESP32-WROOM) | reicht völlig, USB-Netzteil dabei | 5–8 € |
| MAX31855-Breakout | SPI, Kaltstellenkompensation, 0–1800 °C | 4–7 € |
| Typ-K-Mantelthermoelement | 1.4571/Inconel, **min. 600 °C**, 6 mm Ø, 150–300 mm lang, 1–2 m Silikon-/Glasfaserleitung | 8–15 € |
| Metall-Kabelverschraubung M20 + Ofenkitt/HT-Silikon (1200 °C) | für die Putzklappe | 5 € |
| Kleingehäuse + 5-V-USB-Netzteil | Elektronik **außerhalb** der Hitze | 5 € |

**Alternativen zum MAX31855:** MAX6675 (billiger, 0–1024 °C, etwas langsamer)
oder MAX31856 (präziser, mehr Aufwand). Wer noch eine PT100/PT1000 liegen hat:
MAX31865 funktioniert genauso gut.

**Verdrahtung (MAX31855 → ESP32)**

```
VIN   → 3V3
GND   → GND
DO    → GPIO19   (MISO)
CS    → GPIO5
CLK   → GPIO18   (SCK)
```

Wichtig:

- **Typ-K-Ausgleichsleitung verwenden**, keine Kupferleitung. Sonst misst du
  die Temperatur der Klemme, nicht des Ofens.
- **Polarität beachten** (Plus = rot bei Typ K, aber Hersteller prüfen).
- Das Breakout ist nur bis ~85 °C Umgebungstemperatur spezifiziert – also in
  ein Gehäuse **abseits** des Ofens, mindestens 30 cm weg von heißen Flächen.
- Die Leitung zur Putzklappe mit **Glasfasermantel** oder Edelstahlgeflecht
  führen, nicht mit PVC.

**ESPHome-Konfiguration** (vollständig in
[`examples/esphome-max31855.yaml`](examples/esphome-max31855.yaml)):

```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

sensor:
  - platform: max31855
    name: "Rauchgas Temperatur"
    cs_pin: GPIO5
    update_interval: 5s
    filters:
      - median:
          window_size: 5
          send_every: 5
      - clamp:
          min_value: -20
          max_value: 900
```

Danach in Home Assistant: **Einstellungen → Geräte & Dienste → Integration
hinzufügen → FlueGuard** und `sensor.kamin_rauchgas_temperatur` auswählen.
Fertig.

**Kalibrierung:** Thermoelemente haben typisch ±2,5 °C oder 0,75 % Toleranz.
Für die Phasenerkennung völlig irrelevant. Wenn du absolute Werte willst:
Vergleichsmessung mit einem Referenzthermometer bei niedriger Temperatur und
`offset:` im ESPHome-Sensor setzen, oder die Abweichung später in FlueGuard
über die Schwellwerte ausgleichen.

### „Fleischthermometer“ & fertige Funkthermometer

Die Idee liegt nahe: Es gibt günstige BBQ-/Fleischthermometer mit
Bluetooth, App und teils Home-Assistant-Anbindung. Warum es trotzdem meist
nicht funktioniert:

| Problem | Details |
|---|---|
| **Temperaturbereich** | Die mitgelieferten Einstichfühler sind oft nur bis 250–300 °C dauerfest. Im Rauchgas sind 400–600 °C normal. |
| **Material** | Kunststoffgriffe, PVC-Kabel, ungeeignete Dichtungen – im Dauerbetrieb am Schornstein ein Sicherheitsrisiko. |
| **Anbindung** | Viele Geräte sind **app-only** (Cloud/BLE ohne offene API). Ohne HA-Integration bleibt nur die Hersteller-App. |
| **Genauigkeit** | Im Bereich 300–600 °C sind die Billigfühler oft deutlich schlechter als ein 10-€-Typ-K-Element. |
| **Dauerbetrieb** | Die App-Thermometer sind für 2 Stunden Grillabend gebaut, nicht für 10 Jahre Schornstein. |

**Was trotzdem geht:**

- **Inkbird** hat einzelne Geräte mit lokaler BLE-Anbindung, für die es
  HA-Integrationen gibt. Achte aber auf den Messbereich: Die Raumfühler
  (IBS-TH-Serie) hören bei 60 °C auf – für Rauchgas unbrauchbar.
- **ThermoPro / Meater & Co.** liefern meist nur über die Hersteller-Cloud.
  Meater misst zudem die Kerntemperatur und ist für 275 °C Umgebung ausgelegt –
  nicht für Abgas.
- **Als temporäre Gegenprobe** ist so ein Gerät okay: einmal 30 Minuten mit
  einem Grillfühler im Rauchrohr messen, um zu sehen, ob die eigene
  ESP-Lösung plausible Werte liefert. Dauerhaft würde ich es nicht einbauen.

**Fazit:** Für 15 € mehr bekommst du mit ESP32 + MAX31855 + Typ-K eine Lösung,
die für genau diesen Zweck gebaut ist. Die „Fleischthermometer“-Variante ist
eine Bastellösung mit unklarer Lebensdauer.

### Weitere Optionen

- **PT100/PT1000 + MAX31865**: sehr linear, im Bereich 0–600 °C genauer als
  Typ K, aber teurer und die Fühler sind mechanisch empfindlicher.
- **Hochtemperatur-NTC** (z. B. 100 kΩ, bis 300–400 °C) an ESPHome `ntc`:
  billig, aber nichtlinear und die Auswahl ist unübersichtlich.
- **4–20-mA-Messumformer**: für lange Leitungen und industrielle Fühler,
  braucht aber einen ADC/Eingang (z. B. Shelly Add-on, ESP32 mit ADC-Modul).
- **Zigbee/Z-Wave**: Es gibt kaum bezahlbare Hochtemperatursensoren. Wer
  trotzdem Zigbee will, nimmt einen ESP32 als Zigbee-Sensor oder eine
  ESPHome-Bridge.
- **Vorhandene Ofensteuerung mit Lambdasonde**: Wenn dein Ofen schon eine
  Regelung hat, lies deren Temperatur aus (Modbus/HTTP) und speise sie in
  FlueGuard ein – dann bekommst du die Empfehlungsebene zusätzlich.

> **Wichtig:** Ein auf das Rauchrohr geklemmter Oberflächenfühler misst die
> **Rohrwand**, nicht das Gas. Die Werte liegen je nach Rohr, Dämmung und
> Luftzug 100–200 K unter der echten Rauchgastemperatur. Für die
> Phasenerkennung reicht das (die Kurvenform stimmt), für absolute
> Wirkungsgrad-Aussagen nicht.

### Weitere Ideen (Bonus)

Was sich mit FlueGuard kombinieren lässt, ohne die Integration zu ändern:

- **Türkontakt am Ofen** (`binary_sensor`): erkennt „Tür offen“ und bestätigt
  die Anzündphase. Praktisch für die Automation „Licht dimmen, wenn Tür auf“.
- **CO-Melder mit potentialfreiem Kontakt**: zweiter Sicherheitskanal. Wenn CO
  anschlägt und gleichzeitig ein Abbrand läuft → sofort lüften und Feuer
  kontrolliert ausbrennen lassen.
- **Außentemperatur & Wind** in die Auswertung nehmen: Der Schornsteinzug
  hängt stark davon ab. Bei −10 °C und Wind zieht derselbe Ofen deutlich
  heißer als bei +5 °C. Ein Diagramm „Rauchgas vs. Außentemperatur“ erklärt
  scheinbar unerklärliche Unterschiede.
- **Wärmemengenzähler** bei wasserführenden Öfen: Dann kannst du den
  tatsächlichen Wirkungsgrad (kWh Wärme / kg Holz) messen, statt ihn zu
  schätzen. FlueGuard liefert die Abgasdaten dazu.
- **Breitband-Lambdasonde** (nur für Fortgeschrittene): echte
  Verbrennungsluftzahl statt Temperatur-Proxy. Teuer, kalibrierbedürftig und
  für Kaminöfen kaum als Bausatz verfügbar – aber die „richtige“ Lösung, wenn
  man wirklich regeln will.
- **Kamera/OCR auf ein analoges Rauchgasthermometer**: Spielerei, aber witzig
  für Leute, die noch ein altes Zeigerthermometer am Ofen haben.

---

## Montage in der Putzklappe

Deine Idee ist gut – und sie ist der eleganteste Weg, weil man weder am Ofen
noch am Rauchrohr etwas sichtbar verändern muss. Die Putzklappe ist die
Reinigungsöffnung der Abgasanlage; dort herrscht echte Rauchgastemperatur.

### Warum Putzklappe?

- **Echte Abgastemperatur** statt Oberflächentemperatur.
- **Unsichtbar**: kein Kabel am Wohnzimmerofen, keine Bohrung im Sichtbereich.
- **Funktioniert auch beim Kachel-/Grundofen**, wo man nicht ans Rauchrohr kommt.
- **Nachrüstbar ohne Schweißen**, mit einer Kabelverschraubung.

### Der wichtige Unterschied zur kommerziellen Lösung

Die KBS-Steuerung misst **im Feuerraum**. Deine Messung in der Putzklappe ist
weiter weg vom Feuer und damit:

- **kühler** (das Abgas kühlt auf dem Weg ab),
- **träger** (die Wand und das Thermoelement brauchen ein paar Sekunden),
- **abhängig vom Abgasweg** (bei langer Leitung deutlich kühler).

Für die Phasenerkennung ist das kein Problem – die **Form** der Kurve bleibt
gleich. Aber die Default-Schwellwerte (100/150/180/250/350/450 °C) sind auf
eine Messung **nah am Ofen** ausgelegt. Miss deshalb die ersten 2–3 Abbrände
und passe die Schwellwerte an:

> **Faustregel:** Wenn dein Sensor bei einem richtig guten Abbrand nur
> 200–250 °C zeigt statt 350 °C, zieh alle Schwellwerte um den gleichen Faktor
> nach unten (z. B. `optimal_high` von 350 auf 240). Die *Relationen* bleiben.

### Einbau – Schritt für Schritt

1. **Vorher mit dem Schornsteinfeger sprechen.** Die Abgasanlage ist Teil der
   geprüften Anlage. Frag konkret:
   - Darf ich die Putzklappe für einen Temperaturfühler anbohren?
   - Welche Dichtheit / welches Material wird verlangt?
   - Brauchst du eine Dokumentation oder Abnahme?
   - Muss die Putzklappe weiterhin ohne Werkzeug zu öffnen sein?

   Hol dir die Antwort **schriftlich** (E-Mail reicht) und leg sie zu den
   Ofenpapieren.

2. **Messstelle wählen.** So nah wie möglich am Ofen, aber mit Zugang. Nicht
   direkt hinter eine Richtungsänderung, nicht in die Ecke, nicht in den
   Querschnitt der Reinigungsöffnung.

3. **Bohren.** Loch passend zur Kabelverschraubung (meist M20), entgraten.
   Die Putzklappe muss danach wieder **gasdicht** schließen – sonst tritt CO
   in den Aufstellraum. Das ist der kritischste Punkt der ganzen Montage.

4. **Fühler einsetzen.** Eintauchtiefe ca. **1/3 des Schornsteinquerschnitts**,
   Spitze im Kernstrom, nicht an der Wand. Bei rechteckigen Querschnitten
   mittig. Der Fühler darf die Klappe nicht blockieren.

5. **Abdichten.** Hitzefeste Dichtmasse (Ofenkitt oder HT-Silikon, 1200 °C)
   plus Kabelverschraubung. Keine normalen Gummidichtungen, kein Acryl.

6. **Kabel führen.** Typ-K-Ausgleichsleitung, Glasfaser-/Edelstahlmantel,
   **Tropfschleife** nach unten, damit Kondensat nicht ins Gehäuse läuft.
   Elektronik außerhalb des Schornsteins, Umgebungstemperatur < 60 °C,
   Metallgehäuse.

7. **Dichtheit prüfen.** Abgasfahne beobachten (Kerzen/Räucherstäbchen an der
   Klappe), idealerweise CO-Messung durch den Schornsteinfeger. Wenn es zieht:
   nachdichten.

8. **Erste Messung dokumentieren.** 2–3 Abbrände aufzeichnen, dann Schwellwerte
   in FlueGuard anpassen.

### Wartung

- Der Fühler wird mit der Zeit von Ruß/Condensat belegt → **jährlich reinigen**
  (weich abwischen, nicht kratzen).
- Eine Rußschicht dämpft die Messung und verschiebt die Werte nach unten.
  Nach der Reinigung ggf. Offset prüfen.
- Die Putzklappe bleibt Reinigungsöffnung – der Fühler darf das Kehren nicht
  behindern. Im Zweifel Fühler zur Reinigung abziehen (Stecker außerhalb).

---

## Sicherheit & Recht

**FlueGuard ist eine Anzeige, keine Regelung.** Das ist kein Zufall:

- Ein Eingriff in die Luftführung eines typgeprüften Ofens (DIN EN 13240 /
  DIN EN 13229) berührt die Bauartgenehmigung. Das kann die Betriebserlaubnis,
  den Versicherungsschutz und die Abnahme durch den Schornsteinfeger kosten.
- Eine Automatik, die Luft schließt, ohne die Verbrennung wirklich zu kennen,
  kann CO erzeugen. Ein Servo, der klemmt oder stromlos zufährt, ist
  lebensgefährlich.
- Deshalb: **keine Automation, die auf Basis dieser Sensoren die Luft
  schließt.** Die Empfehlung ist ein Hinweis an den Menschen, der davor steht.

Weitere Punkte:

- **1. BImSchV** und die regionale Kehr- und Überprüfungsordnung gelten
  weiterhin. Ein zusätzlicher Fühler ändert daran nichts, solange die Anlage
  dicht und unverändert bleibt.
- **CO-Melder** in den Aufstellraum – 20–30 €, unabhängig von diesem Projekt.
  Besonders wichtig, wenn die Putzklappe im Wohnraum liegt.
- **Sekundärluft bleibt offen.** Sie ist für die Nachverbrennung und die
  Glasfreispülung zuständig. Drosseln darf man die Primärluft.
- **230 V** nur durch eine Elektrofachkraft. Der ESP32 läuft mit 5 V USB.
- **Keine Änderung an Brennkammer, Dichtungen oder Abgaswegen.**
- **Versicherung**: Frag bei Umbauten an der Abgasanlage nach, ob der Schutz
  erhalten bleibt.

---

## Installation über HACS

### Voraussetzungen

- Home Assistant **2025.1** oder neuer
- HACS installiert
- Ein Temperatursensor, der die Rauchgastemperatur liefert (siehe oben)

### Variante A: HACS (empfohlen)

1. **HACS → Integrationen → ⋮ → Benutzerdefinierte Repositories**
2. URL dieses Repositories eintragen, Kategorie **Integration**
3. **FlueGuard** suchen → **Herunterladen**
4. Home Assistant neu starten
5. **Einstellungen → Geräte & Dienste → Integration hinzufügen → FlueGuard**

### Variante B: manuell

```bash
cd /config
git clone <repo-url> /tmp/flueguard
cp -r /tmp/flueguard/custom_components/flueguard /config/custom_components/
```

Danach Neustart und Integration hinzufügen.

### Updates

HACS zeigt Updates automatisch an. Nach dem Update Home Assistant neu starten.

---

## Einrichtung

### Assistent

| Feld | Bedeutung |
|---|---|
| **Rauchgas-Temperatursensor** | Der Sensor, der die Temperatur liefert. Jeder `sensor` mit Zahlenwert und °C/°F funktioniert. |
| **Abfrageintervall** | Standard 30 s. Kürzer = schnellere Reaktion, mehr Datenbankeinträge. |
| **Benachrichtigungen** | Push bei Übertemperatur, „drosseln“ und „nachlegen“. |
| **Notify-Service** | z. B. `notify.mobile_app_handy` (mit oder ohne `notify.`). |

### Optionen (nachträglich änderbar)

Unter **Einstellungen → Geräte & Dienste → FlueGuard → Konfigurieren**:

| Option | Default | Bedeutung |
|---|---|---|
| `cold_threshold` | 100 °C | Darunter gilt der Ofen als kalt (Abbrand beginnt/endet). |
| `refuel_threshold` | 150 °C | Darunter macht Nachlegen Sinn – **wenn noch Glut da ist**. |
| `optimal_low` | 180 °C | Unterkante des guten Bereichs. |
| `main_threshold` | 250 °C | Ab hier gilt der Hauptabbrand als etabliert. |
| `optimal_high` | 350 °C | Oberkante des guten Bereichs. |
| `warn_threshold` | 450 °C | Warnschwelle / „zu heiß“. |
| `ignition_max_minutes` | 15 min | Nach dieser Zeit geht die Anzündphase in Hauptabbrand über. |
| `burnout_rate` | −1,5 °C/min | Ab dieser Abkühlrate beginnt der Ausbrand. |

Die Reihenfolge muss aufsteigend sein, sonst lehnt der Assistent die Eingabe ab.

### Erste Schritte nach der Installation

1. **2–3 Abbrände normal heizen** und den Verlauf beobachten.
2. Prüfen: Kommen die Phasen plausibel? (`Anzünden` → `Hauptabbrand` → `Ausbrand`)
3. Wenn die Temperaturen insgesamt niedriger sind als erwartet (Messung weit
   weg vom Ofen): Schwellwerte proportional nach unten ziehen.
4. Erst dann Benachrichtigungen scharf schalten.

---

## Entitäten & Events

### Sensoren

| Entität | Einheit | Beschreibung |
|---|---|---|
| `sensor.<name>_rauchgastemperatur` | °C | Geglättete, nach °C konvertierte Temperatur |
| `sensor.<name>_temperaturaenderung` | °C/min | Geglättete Änderungsrate |
| `sensor.<name>_abbrandphase` | – | `idle`, `ignition`, `main`, `burnout` |
| `sensor.<name>_empfehlung` | – | `wait`, `air_open`, `hold`, `reduce_air`, `add_fuel`, `let_burn_out` |
| `sensor.<name>_abbranddauer` | s | Laufzeit des aktuellen Abbrands |
| `sensor.<name>_spitzentemperatur` | °C | Maximum des aktuellen Abbrands |

### Binärsensoren

| Entität | Beschreibung |
|---|---|
| `binary_sensor.<name>_abbrand_aktiv` | `on`, solange eine Phase ≠ `idle` ist |
| `binary_sensor.<name>_uebertemperatur` | `on`, wenn `warn_threshold` überschritten |

### Events

Alle Events landen auf dem HA-Bus und enthalten `entry_id`, `source_entity`,
`temperature` und `rate`.

| Event | Zusätzliche Felder |
|---|---|
| `flueguard_phase_changed` | `phase`, `previous` |
| `flueguard_recommendation_changed` | `recommendation`, `previous` |
| `flueguard_overtemperature` | `threshold` |

---

## Beispiel-Automationen

### Push-Nachricht bei Übertemperatur

Die Integration kann das selbst – wer volle Kontrolle will, baut es so:

```yaml
automation:
  - alias: "Ofen zu heiß"
    trigger:
      - platform: event
        event_type: flueguard_overtemperature
    action:
      - service: notify.mobile_app_handy
        data:
          title: "🔥 Ofen zu heiß"
          message: >-
            Rauchgas {{ trigger.event.data.temperature }} °C –
            Primärluft drosseln.
          data:
            channel: ofen
            importance: high
```

### Lampe wird rot, wenn gedrosselt werden soll

```yaml
automation:
  - alias: "Ofenampel"
    trigger:
      - platform: state
        entity_id: sensor.kamin_empfehlung
    action:
      - choose:
          - conditions:
              - condition: state
                entity_id: sensor.kamin_empfehlung
                state: "reduce_air"
            sequence:
              - service: light.turn_on
                target:
                  entity_id: light.wohnzimmer
                data:
                  color_name: red
          - conditions:
              - condition: state
                entity_id: sensor.kamin_empfehlung
                state: "add_fuel"
            sequence:
              - service: light.turn_on
                target:
                  entity_id: light.wohnzimmer
                data:
                  color_name: orange
        default:
          - service: light.turn_on
            target:
              entity_id: light.wohnzimmer
            data:
              color_name: warmwhite
```

### Abluft/Dunstabzug sperren, solange der Ofen läuft

```yaml
automation:
  - alias: "Dunstabzug bei Ofenbetrieb aus"
    trigger:
      - platform: state
        entity_id: binary_sensor.kamin_abbrand_aktiv
        to: "on"
    action:
      - service: switch.turn_off
        target:
          entity_id: switch.dunstabzug
```

> ⚠️ Das ersetzt **keinen** Differenzdruckwächter. Dunstabzug und Ofen
> gleichzeitig können den Schornstein umkehren. Im Zweifel Fachbetrieb fragen.

### Dashboard

Eine fertige Karte liegt in [`examples/dashboard.yaml`](examples/dashboard.yaml):

```yaml
type: vertical-stack
cards:
  - type: gauge
    entity: sensor.kamin_rauchgastemperatur
    name: Rauchgas
    min: 0
    max: 600
    severity:
      green: 180
      yellow: 350
      red: 450
  - type: entities
    entities:
      - sensor.kamin_abbrandphase
      - sensor.kamin_empfehlung
      - sensor.kamin_spitzentemperatur
      - sensor.kamin_abbranddauer
      - binary_sensor.kamin_uebertemperatur
  - type: history-graph
    entities:
      - sensor.kamin_rauchgastemperatur
    hours_to_show: 12
```

### Statistik: Holzverbrauch schätzen

`binary_sensor.abbrand_aktiv` lässt sich mit einem **Verlaufssensor** oder
`utility_meter` in Brennstunden umrechnen. Multipliziert mit dem
Durchsatz deines Ofens (kg/h, aus der Bedienungsanleitung) ergibt das eine
grobe Verbrauchsschätzung – gut, um Veränderungen zu sehen.

---

## Wie die Erkennung funktioniert

```
                  ┌──────────────┐
    kalt ────────►│  Anzünden    │  Luft offen lassen
                  └──────┬───────┘
                         │ ≥ main_threshold oder Zeit abgelaufen
                         ▼
                  ┌──────────────┐
                  │ Hauptabbrand │  halten / drosseln / Luft öffnen
                  └──────┬───────┘
                         │ Rate ≤ burnout_rate und ≥ peak − 25 K
                         ▼
                  ┌──────────────┐
                  │   Ausbrand   │  nachlegen oder ausbrennen lassen
                  └──────┬───────┘
                         │ < cold_threshold
                         ▼
                  ┌──────────────┐
                  │     Aus      │
                  └──────────────┘
```

- **Start** bei `cold_threshold + 5 K` (Hysterese gegen Flackern).
- **Rate** wird aus zwei Messpunkten berechnet und exponentiell geglättet
  (70 % alter Wert, 30 % neuer Wert), damit einzelne Ausreißer die Phase
  nicht kippen.
- **Ausbrand** wird erst erkannt, wenn die Temperatur mindestens 25 K unter
  dem Peak liegt **und** die Rate unter −1,5 °C/min fällt. So löst ein kurzer
  Einbruch (Tür auf, Wind) keinen falschen Ausbrand aus.
- **Persistenz**: Phase, Startzeit und Peak werden gespeichert und nach einem
  Neustart wiederhergestellt (max. 24 h alt).

Die Schwellwerte sind bewusst **einfach und erklärbar**. Ein PID-Regler wäre
hier die falsche Antwort – es gibt keinen Stellmotor, und die Physik eines
Holzabbrands ist zu träge und zu nichtlinear für eine sinnvolle Regelung ohne
Luftklappen-Aktor.

---

## Tuning & FAQ

**Mein Sensor zeigt im kalten Zustand 20 °C – ist das richtig?**
Ja. Ein Typ-K-Thermoelement in der Putzklappe misst die Umgebungsluft, solange
kein Feuer brennt. Erst ab ~100 °C beginnt die Erkennung.

**Die Werte springen.**
Bei MAX31855/MAX6675 fast immer ein Verdrahtungsproblem: schlechte
Masseverbindung, zu lange ungeschirmte Leitung, fehlende
Kaltstellenkompensation durch falsche Verlängerung (Kupfer statt Typ-K).
`median`-Filter in ESPHome hilft zusätzlich.

**MAX31855 meldet Fehler (OC/SCG/SCV).**
Open Circuit / Short to GND / Short to VCC – Fühler oder Leitung defekt.
Erst Stecker prüfen, dann Fühler tauschen.

**Warum keine automatische Luftklappe?**
Weil ein Eingriff in die Feuerung die Typprüfung berührt und eine fehlerhafte
Automatik CO erzeugen kann. Wer das trotzdem bauen will, braucht: fail-safe
öffnende Mechanik, harte Temperaturgrenzen im ESP (nicht nur in HA),
Watchdog, mechanische Endanschläge und die Freigabe vom Ofenhersteller.
FlueGuard liefert dafür die Sensorik und die Phasenlogik – die Aktorik ist
bewusst nicht enthalten.

**Kann ich mehrere Öfen überwachen?**
Ja, die Integration einfach mehrfach hinzufügen – jede Instanz bekommt ein
eigenes Gerät und eigene Entitäten.

**Funktioniert das mit °F?**
Ja. Die Integration rechnet intern in °C und zeigt in deiner HA-Einheit an.

**Wie viele Daten landen in der Datenbank?**
Bei 30 s Intervall ~2.880 Zustände/Tag. Wer das nicht will, kann die
Entitäten in `recorder:` ausschließen und nur die Phasen/Events behalten.

**Kann ich die Schwellwerte per Automation ändern?**
Aktuell nur über die Optionen (Konfigurieren). Wenn du das dynamisch brauchst,
leg ein Issue an – oder nutze die Events und baue die Logik in einer
Template-Automation.

**Mein Kachelofen ist viel träger.**
Dann `ignition_max_minutes` erhöhen und `burnout_rate` weniger negativ wählen
(z. B. −0,5 °C/min). Bei Grundöfen dauert der Ausbrand oft Stunden.

---

## Vor dem Veröffentlichen

Wenn du das Repo auf GitHub stellst, sind nur wenige Dinge anzupassen:

1. **`custom_components/flueguard/manifest.json`**
   - `codeowners`: deinen GitHub-Namen eintragen (`@dein-name`)
   - `documentation` und `issue_tracker`: deine Repo-URL
2. **Repo-Themen** setzen: `home-assistant`, `hacs`, `hacs-integration`,
   `wood-stove`, `kaminofen`, `flue-gas`.
3. **Release anlegen** (`v0.1.0`), damit HACS Updates erkennt.
4. Optional: In HACS als Standard-Repository vorschlagen
   (`hacs/default` Pull Request) – dann finden es andere ohne URL.

Die mitgelieferte GitHub Action prüft bei jedem Push Manifest und
HACS-Konformität.

Tests lokal:

```bash
pip install -r requirements_test.txt
pytest
```

---

## Lizenz & Haftung

MIT-Lizenz – siehe [LICENSE](LICENSE). Nutzung auf eigene Gefahr.

**Dieses Projekt ist kein Ersatz für eine fachgerechte Ofenplanung, keine
Abnahme und keine Brandschutzberatung.** Messungen an der Abgasanlage nur nach
Rücksprache mit dem Schornsteinfeger. Die Integration greift nicht in die
Verbrennung ein und darf nicht als Sicherheitseinrichtung verwendet werden.
Für Schäden durch unsachgemäße Montage, falsche Schwellwerte oder
Fehlinterpretationen wird keine Haftung übernommen.
