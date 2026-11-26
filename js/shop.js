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

  var glassesSvg = window.glassesSvg;

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
