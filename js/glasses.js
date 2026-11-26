// Brillen-Illustration (gezeichnet) und Vorschau auf der Startseite.
(function () {
  var euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

  var SHAPES = {
    round: { d: "M32 60a38 38 0 1 0 76 0a38 38 0 1 0 -76 0Z", top: 44 },
    square: { d: "M44 28h52a12 12 0 0 1 12 12v34a12 12 0 0 1 -12 12h-52a12 12 0 0 1 -12 -12v-34a12 12 0 0 1 12 -12Z", top: 36 },
    cateye: { d: "M32 34c14-6 40-8 58-4c14 4 18 18 18 34c0 18-16 26-36 26c-24 0-40-16-40-56Z", top: 36 },
    panto: { d: "M30 60a40 33 0 1 0 80 0a40 33 0 1 0 -80 0Z", top: 48 },
    half: { d: "M32 38h76v18c0 22-16 34-38 34s-38-12-38-34Z", top: 42 },
    aviator: { d: "M32 36c26-8 52-8 76 0c2 30-14 52-38 52s-40-22-38-52Z", top: 40 }
  };

  window.glassesSvg = function (p) {
    var s = SHAPES[p.shape] || SHAPES.round;
    var lensOpacity = p.sun ? 0.92 : 0.6;
    var lens =
      '<path d="' + s.d + '" fill="' + p.lens + '" fill-opacity="' + lensOpacity + '" stroke="' + p.frame + '" stroke-width="6" stroke-linejoin="round"/>' +
      '<path d="M46 52q5-9 14-12" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round"/>';
    return (
      '<svg viewBox="0 0 240 120" role="img" aria-label="Illustration der Brille ' + p.name + '">' +
      "<g>" + lens + "</g>" +
      '<g transform="translate(240 0) scale(-1 1)">' + lens + "</g>" +
      '<path d="M108 54q12-12 24 0" fill="none" stroke="' + p.frame + '" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M32 ' + s.top + "L8 " + (s.top - 5) + "M208 " + s.top + "l24 -5" + '" fill="none" stroke="' + p.frame + '" stroke-width="6" stroke-linecap="round"/>' +
      "</svg>"
    );
  };

  // Vorschau auf der Startseite: die ersten drei vorrätigen Modelle.
  var box = document.getElementById("featured");
  var products = window.PRODUCTS || [];
  if (box && products.length) {
    var picks = products.filter(function (p) { return p.inStock; }).slice(0, 4);
    box.innerHTML = picks
      .map(function (p) {
        return (
          '<li class="product product--mini">' +
          '<div class="product__art">' + window.glassesSvg(p) + "</div>" +
          '<div class="product__head"><h3 class="product__name">' + p.name + "</h3>" +
          '<span class="product__price">' + euro.format(p.price) + "</span></div>" +
          '<p class="product__cat">' + p.category + ", im Studio vorrätig</p>" +
          "</li>"
        );
      })
      .join("");
  }
})();
