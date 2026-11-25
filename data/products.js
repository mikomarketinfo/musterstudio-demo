// Beispieldaten für den Mini-Shop. Modelle, Preise und Texte durch echte ersetzen.
// shape: round | square | cateye | panto | half | aviator
// sun: true = getönte Gläser (Sonnenbrille)
// inStock: true = im Studio vorrätig, false = auf Bestellung
// price: Endpreis in Euro inkl. MwSt.
window.PRODUCTS = [
  {
    id: "saale",
    name: "Saale",
    category: "Fassungen",
    shape: "round",
    frame: "#1b3a4b",
    lens: "#bfd9e4",
    sun: false,
    price: 129,
    inStock: true,
    desc: "Runde Fassung aus Edelstahl, sehr leicht. Wirkt auf schmalen und weichen Gesichtern gleichermaßen klar.",
    specs: { Material: "Edelstahl", Farbe: "Dunkelblau", Größe: "47-21-140" }
  },
  {
    id: "paradies",
    name: "Paradies",
    category: "Fassungen",
    shape: "square",
    frame: "#6b4a2f",
    lens: "#bfd9e4",
    sun: false,
    price: 149,
    inStock: true,
    desc: "Kräftige Fassung aus Acetat mit leicht gerundeten Ecken. Gut für den Alltag am Bildschirm.",
    specs: { Material: "Acetat", Farbe: "Havanna", Größe: "52-18-145" }
  },
  {
    id: "fuchsturm",
    name: "Fuchsturm",
    category: "Fassungen",
    shape: "cateye",
    frame: "#7a1f3d",
    lens: "#bfd9e4",
    sun: false,
    price: 139,
    inStock: false,
    desc: "Schmetterlingsform mit nach oben gezogenen Außenkanten. Lieferzeit nennen wir Ihnen bei der Reservierung.",
    specs: { Material: "Acetat", Farbe: "Burgund", Größe: "51-19-140" }
  },
  {
    id: "jenzig",
    name: "Jenzig",
    category: "Fassungen",
    shape: "panto",
    frame: "#55623a",
    lens: "#bfd9e4",
    sun: false,
    price: 119,
    inStock: true,
    desc: "Panto-Form, die oben etwas breiter ist als unten. Dünner Rahmen, wenig Gewicht auf der Nase.",
    specs: { Material: "Metall", Farbe: "Olivgrün", Größe: "49-20-140" }
  },
  {
    id: "kernberge",
    name: "Kernberge",
    category: "Sonnenbrillen",
    shape: "aviator",
    frame: "#b8923a",
    lens: "#2d3a3f",
    sun: true,
    price: 89,
    inStock: true,
    desc: "Pilotenform mit goldfarbenem Rahmen und grau getönten Gläsern mit UV-Schutz.",
    specs: { Material: "Metall", Farbe: "Gold, Glas grau", Größe: "58-14-135" }
  },
  {
    id: "lobeda",
    name: "Lobeda",
    category: "Sonnenbrillen",
    shape: "square",
    frame: "#161616",
    lens: "#2a2f2a",
    sun: true,
    price: 79,
    inStock: true,
    desc: "Eckige Sonnenbrille aus Kunststoff, schwarz, mit dunkel getönten Gläsern und UV-Schutz.",
    specs: { Material: "Kunststoff", Farbe: "Schwarz", Größe: "55-17-140" }
  },
  {
    id: "rathaus",
    name: "Rathaus",
    category: "Lesebrillen",
    shape: "half",
    frame: "#2c86ae",
    lens: "#d8e9ef",
    sun: false,
    price: 24.9,
    inStock: true,
    desc: "Halbmondform: oben durch die Gläser lesen, darüber hinweg in die Ferne schauen. Klappbar im Etui.",
    specs: { Material: "Kunststoff", Farbe: "Blau", Stärken: "+1,0 bis +3,0 dpt" }
  },
  {
    id: "markt",
    name: "Markt",
    category: "Lesebrillen",
    shape: "round",
    frame: "#8a8f93",
    lens: "#d8e9ef",
    sun: false,
    price: 29.9,
    inStock: false,
    desc: "Runde Lesebrille mit Federscharnier, schlank und leicht. Stärke nennen Sie uns bei der Reservierung.",
    specs: { Material: "Metall", Farbe: "Silber", Stärken: "+1,0 bis +3,0 dpt" }
  }
];
