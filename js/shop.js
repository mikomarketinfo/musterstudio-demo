// Mini-Shop: Filter, Sortierung und Reservierung zur Abholung im Studio.
// Es gibt keine Zahlung und keinen Versand. Die Reservierung öffnet eine vorbereitete E-Mail.
(function () {
  var STUDIO_EMAIL = "kontakt@example.de";

  var products = window.PRODUCTS || [];
  var list = document.getElementById("product-list");
  var chips = document.querySelectorAll(".chip");
  var onlyStock = document.getElementById("only-stock");
  var sortSelect = document.getElementById("sort");
  var count = document.getElementById("shop-count");
  var dialog = document.getElementById("reserve");
  var form = document.getElementById("reserve-form");
  var dialogTitle = document.getElementById("reserve-title");
  var productField = document.getElementById("reserve-product");
  var status = document.getElementById("reserve-status");
  var closeBtn = document.getElementById("reserve-close");

  var activeCategory = "Alle";
  var lastTrigger = null;

  var euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

  // Brillen-Illustration; linke Linse wird für die rechte gespiegelt.
  var SHAPES = {
    round: { d: "M32 60a38 38 0 1 0 76 0a38 38 0 1 0 -76 0Z", top: 44 },
    square: { d: "M44 28h52a12 12 0 0 1 12 12v34a12 12 0 0 1 -12 12h-52a12 12 0 0 1 -12 -12v-34a12 12 0 0 1 12 -12Z", top: 36 },
    cateye: { d: "M32 34c14-6 40-8 58-4c14 4 18 18 18 34c0 18-16 26-36 26c-24 0-40-16-40-56Z", top: 36 },
    panto: { d: "M30 60a40 33 0 1 0 80 0a40 33 0 1 0 -80 0Z", top: 48 },
    half: { d: "M32 38h76v18c0 22-16 34-38 34s-38-12-38-34Z", top: 42 },
    aviator: { d: "M32 36c26-8 52-8 76 0c2 30-14 52-38 52s-40-22-38-52Z", top: 40 }
  };

  function glassesSvg(p) {
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
      '<path d="M32 ' + s.top + "L8 " + (s.top - 5) + 'M208 ' + s.top + "l24 -5" + '" fill="none" stroke="' + p.frame + '" stroke-width="6" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function specsHtml(specs) {
    return Object.keys(specs)
      .map(function (k) {
        return "<div><dt>" + k + "</dt><dd>" + specs[k] + "</dd></div>";
      })
      .join("");
  }

  function cardHtml(p) {
    var stock = p.inStock
      ? '<p class="stock">Im Studio vorrätig</p>'
      : '<p class="stock stock--order">Auf Bestellung</p>';
    return (
      '<li class="product">' +
      '<div class="product__art">' + glassesSvg(p) + "</div>" +
      '<div class="product__head"><h2 class="product__name">' + p.name + "</h2>" +
      '<span class="product__price">' + euro.format(p.price) + "</span></div>" +
      '<p class="product__cat">' + p.category + ", Preis inkl. MwSt.</p>" +
      '<p class="product__desc">' + p.desc + "</p>" +
      '<dl class="product__specs">' + specsHtml(p.specs) + "</dl>" +
      stock +
      '<button type="button" class="btn btn--primary" data-reserve="' + p.id + '">Zur Anprobe reservieren</button>' +
      "</li>"
    );
  }

  function render() {
    var items = products.filter(function (p) {
      var okCat = activeCategory === "Alle" || p.category === activeCategory;
      var okStock = !onlyStock.checked || p.inStock;
      return okCat && okStock;
    });
    var mode = sortSelect.value;
    items.sort(function (a, b) {
      if (mode === "price-asc") return a.price - b.price;
      if (mode === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name, "de");
    });
    list.innerHTML = items.map(cardHtml).join("");
    count.textContent = items.length === 1 ? "1 Modell" : items.length + " Modelle";
    if (!items.length) {
      list.innerHTML = '<li><p>Mit diesen Filtern gibt es keine Treffer. Wählen Sie „Alle“ oder nehmen Sie den Haken bei „Nur im Studio vorrätig“ heraus.</p></li>';
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      activeCategory = chip.dataset.category;
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c === chip));
      });
      render();
    });
  });
  onlyStock.addEventListener("change", render);
  sortSelect.addEventListener("change", render);

  // Reservierung
  list.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-reserve]");
    if (!btn) return;
    var p = products.find(function (x) {
      return x.id === btn.dataset.reserve;
    });
    if (!p) return;
    lastTrigger = btn;
    productField.value = p.name + " (" + p.category + ", " + euro.format(p.price) + ")";
    dialogTitle.textContent = "Reservieren: " + p.name;
    status.textContent = "";
    document.getElementById("reserve-fallback").hidden = true;
    dialog.showModal();
  });

  closeBtn.addEventListener("click", function () {
    dialog.close();
  });
  dialog.addEventListener("close", function () {
    if (lastTrigger) lastTrigger.focus();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    var lines = [
      "Guten Tag,",
      "",
      "ich möchte folgende Brille zur Anprobe reservieren:",
      data.get("product"),
      "",
      "Name: " + data.get("name"),
      "Telefon oder E-Mail: " + data.get("contact"),
      "Wunschtag: " + (data.get("day") || "egal"),
      "Hinweis: " + (data.get("note") || "–"),
      "",
      "Freundliche Grüße",
      data.get("name")
    ];
    var href =
      "mailto:" + STUDIO_EMAIL +
      "?subject=" + encodeURIComponent("Reservierung: " + data.get("product")) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    var text = "An: " + STUDIO_EMAIL + "\nBetreff: Reservierung: " + data.get("product") + "\n\n" + lines.join("\n");
    var box = document.getElementById("reserve-text");
    var fallback = document.getElementById("reserve-fallback");
    box.value = text;
    fallback.hidden = false;
    status.textContent = "Reservierung vorbereitet. Kopieren Sie den Text und senden Sie ihn per E-Mail an das Studio. In der echten Version geht die Anfrage direkt ans Studio.";
    try { window.location.href = href; } catch (e) { /* mailto ist nur eine Zusatzhilfe */ }
  });

  document.getElementById("reserve-copy").addEventListener("click", function () {
    var box = document.getElementById("reserve-text");
    function select() { box.focus(); box.select(); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(box.value).then(function () {
        status.textContent = "Text kopiert.";
      }, select);
    } else {
      select();
    }
  });

  render();
})();
