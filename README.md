# Musterstudio Optik – Demo einer Kontaktlinsen- und Optik-Website

Statische Demo (HTML, CSS, JavaScript, ohne Build-Schritt) mit einem fiktiven Studio. Name, Telefonnummer, E-Mail-Adresse und Produkte sind Beispiele.
Öffnen: `index.html` im Browser, oder lokal mit `python3 -m http.server` und dann http://localhost:8000.

## Seiten

| Datei | Inhalt |
| --- | --- |
| `index.html` | Startseite mit Leistungsübersicht, Ablauf und Kontakt |
| `kontaktlinsen.html` | Seite mit Sprungmenü, Termin-Buttons je Abschnitt und FAQ |
| `brillen.html` | Mini-Shop: Produktkarten, Filter, Reservierung zur Abholung im Studio (keine Zahlung, kein Versand) |
| `data/products.js` | Beispielprodukte; hier Modelle, Preise und Verfügbarkeit pflegen |

## Für den echten Einsatz anpassen

- [ ] Name, Adresse, Öffnungszeiten, Telefon und E-Mail in `index.html` und in den Fußzeilen eintragen; LocalBusiness-Markup (JSON-LD) ergänzen.
- [ ] Termin-Buttons (`index.html#kontakt`) auf das Online-Terminsystem verlinken.
- [ ] Echte Fotos des Studios und der Produkte einbauen. Die Brillen-Bilder sind gezeichnete Platzhalter (`js/shop.js`, Funktion `glassesSvg`).
- [ ] Beispielprodukte in `data/products.js` ersetzen und den Demo-Hinweis auf `brillen.html` entfernen.
- [ ] Reservierung: Das Formular zeigt den vorbereiteten Text zum Kopieren und öffnet zusätzlich eine E-Mail (`mailto:`). Für den Betrieb an einen Formular-Dienst oder ein Backend anbinden.
- [ ] Impressum und Datenschutzerklärung ergänzen (Links sind Platzhalter).
- [ ] Medizinische Aussagen und Vertragsbedingungen fachlich und rechtlich prüfen lassen (Heilmittelwerbegesetz, Servicevereinbarung).
- [ ] `<meta name="robots" content="noindex">` aus allen Seiten entfernen und Canonical-URLs setzen.

## Technik

- Schriften sind lokal eingebunden (keine Anfragen an Google Fonts): Bricolage Grotesque und Atkinson Hyperlegible, beide unter der SIL Open Font License.
- Keine Cookies und keine Tracking-Skripte.
