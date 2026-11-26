# Musterstudio Optik – Demo-Website (Version 2)

Vollständig erfundene Demo für ein Kontaktlinsen- und Brillenstudio. Alle Namen, Adressen, Telefonnummern und Preise sind Beispiele. Die Seite ist `noindex`, verwendet keine Cookies und lädt keine externen Dienste (Schriften liegen im Repository).

## Seiten
Start (Karussell, Leistungen, Brillen-Vorschau) · Über uns · Kontaktlinsen · Brillen (Mini-Shop: Karten mit Beschreibung und Preis, Reservierung zur Abholung im Studio, kein Versand, keine Online-Zahlung) · Low Vision · Technologie · Kontakt

## Chat-Assistent
Unten rechts: „Fragen und Termin“. Regelbasiert, ohne KI und ohne Server.
- Beantwortet häufige Fragen (Ablauf, Kosten/Krankenkasse, Kontrolltermine, Linsenarten, Öffnungszeiten, Adresse, Datenschutz).
- Nennt keine Preise für Anpassung und Beratung; Preise gibt es nur bei Brillen und Fassungen.
- Terminanfrage: Anliegen → Wunschzeit → Name → Kontakt → Zusammenfassung zum Kopieren.
- In dieser Demo wird **nichts gesendet**. Für den Echtbetrieb wird die Anfrage an das Terminsystem oder per E-Mail des Studios übergeben (je nach System und Schnittstelle).
- Bei Warnzeichen (Schmerz, Rötung usw.) verweist er an Ärztin oder Arzt.

## Anpassen
- Daten des Studios: `js/chat.js` (Block `CFG`), Seitenköpfe/-füße in den HTML-Dateien
- Produkte: `data/products.js`
- Bilder: Illustrationen in `img/*.svg`; echte Fotos einfach unter gleichem Namen oder per `<img>` ersetzen

## Veröffentlichen mit GitHub Pages
Settings → Pages → Source: Deploy from branch → Branch `main`, Ordner `/ (root)` → Save. Adresse danach: `https://<benutzer>.github.io/musterstudio-demo/`

Lokal ansehen: `python3 -m http.server` im Ordner, dann http://localhost:8000
