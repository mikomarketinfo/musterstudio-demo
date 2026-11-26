// Chat-Assistent: beantwortet häufige Fragen mit festen Texten und bereitet Terminanfragen vor.
// Kein KI-Modell, kein Server: alle Antworten stehen unten in KB und gehören dem Studio.
// Terminanfragen werden in dieser Demo nur zusammengefasst, nicht gesendet.
(function () {
  var CFG = {
    studio: "Musterstudio Optik",
    phone: "03641 000000",
    hours: "Mo–Fr 9:00–18:00 Uhr, Sa 9:00–13:00 Uhr (Beispielzeiten)",
    address: "Beispielplatz 1, 07743 Jena (Beispieladresse)"
  };

  var SERVICES = [
    "Kontaktlinsen-Beratung",
    "Keratokonus",
    "Orthokeratologie",
    "Sklerallinsen",
    "Mehrstärkenlinsen",
    "Kontrolltermin",
    "Brillen-Anprobe",
    "Low Vision",
    "Etwas anderes"
  ];

  var EMERGENCY = [
    "schmerz", "starke rötung", "rotes auge", "rot und", "entzündung", "notfall", "brennt", "lichtempfindlich",
    "plötzlich", "verletzung", "eiter", "sehverschlechterung", "schlechter sehen"
  ];

  var KB = [
    {
      id: "ablauf",
      keys: ["ablauf", "wie läuft", "erstgespräch", "dauert", "probetragen"],
      a: "So läuft die Anpassung ab:\n1. Erstgespräch über Alltag und Sehgewohnheiten\n2. Vermessung von Hornhaut und Auge\n3. Probetragen der Linsen\n4. Kontrolle\nBeim ersten Termin klären wir, welche Linsenart für Sie infrage kommt.",
      link: ["index.html#ablauf", "Ablauf ansehen"]
    },
    {
      id: "kosten",
      keys: ["kost", "preis", "teuer", "bezahl", "krankenkasse", "kasse", "versicherung", "erstattung", "rezept", "zuzahlung"],
      a: "Für Anpassung und Beratung nennen wir hier keine Preise. Die Kosten hängen vom Einzelfall ab, und oft übernimmt die Krankenkasse sie. Bei Keratokonus zum Beispiel ab einem bestimmten Stadium, mit Rezept der Augenärztin oder des Augenarztes. Wir erstellen dafür den Kostenvoranschlag. In anderen Fällen klären wir es im Gespräch und nennen Ihnen vorab einen Richtwert.\nPreise für Brillen und Fassungen stehen bei jedem Modell im Bereich Brillen.",
      link: ["brillen.html", "Brillen mit Preisen"]
    },
    {
      id: "kontrolle",
      keys: ["kontrolle", "nachsorge", "wie oft", "nachkontrolle"],
      a: "Wir empfehlen eine Kontrolle alle 6 Monate. So stellen wir sicher, dass Sie weiterhin die passende Linse tragen."
    },
    {
      id: "keratokonus",
      keys: ["keratokonus", "kegelförmig", "kegel"],
      a: "Beim Keratokonus verdünnt sich die Hornhaut und wölbt sich kegelförmig vor. Spezielle formstabile Linsen üben keinen Druck auf die erkrankte Hornhaut aus. Ab einem bestimmten Stadium übernehmen die gesetzlichen Krankenkassen die Kosten. Dafür brauchen wir ein Rezept Ihrer Augenärztin oder Ihres Augenarztes.",
      link: ["kontaktlinsen.html#keratokonus", "Mehr zu Keratokonus"]
    },
    {
      id: "ortho",
      keys: ["orthokeratologie", "ortho", "über nacht", "nachts", "nachtlinse", "kurzsichtig", "kinder"],
      a: "Bei der Orthokeratologie tragen Sie formstabile Linsen über Nacht. Sie formen die Hornhaut, und tagsüber sehen Sie ohne Sehhilfe. Das Verfahren ist umkehrbar: Wenn Sie aufhören, bildet sich die Hornhautform zurück. Ob es für Sie oder Ihr Kind sinnvoll ist, besprechen wir im Beratungsgespräch.",
      link: ["kontaktlinsen.html#ortho-k", "Mehr zu Orthokeratologie"]
    },
    {
      id: "skleral",
      keys: ["sklera", "skleral", "trockene augen", "eyeprint", "unregelmäßige hornhaut"],
      a: "Sklerallinsen sind große formstabile Linsen. Sie überbrücken die Hornhaut und liegen auf der Lederhaut auf. Sinnvoll sind sie, wenn kleinere Linsen nicht passen, etwa bei sehr unregelmäßiger Hornhaut, nach Verletzungen oder bei sehr trockenen Augen.",
      link: ["kontaktlinsen.html#skleral", "Mehr zu Sklerallinsen"]
    },
    {
      id: "mehrstaerken",
      keys: ["mehrstärken", "mehrstaerken", "gleitsicht", "altersweitsicht", "presbyopie", "multifokal", "ohne lesebrille"],
      a: "Mehrstärkenlinsen korrigieren Ferne und Nähe. Es gibt sie weich und formstabil, oft auch bei Hornhautverkrümmung. Welche Art zu Ihnen passt, entscheiden wir nach Gespräch und Vermessung.",
      link: ["kontaktlinsen.html#mehrstaerken", "Mehr zu Mehrstärkenlinsen"]
    },
    {
      id: "weich",
      keys: ["weiche", "tageslinse", "monatslinse", "wochenlinse"],
      a: "Weiche Linsen gibt es als Tages-, Wochen- und Monatslinsen. Wir wählen Linsentyp und Pflegemittel mit Ihnen aus und prüfen, ob sie im Alltag funktionieren.",
      link: ["kontaktlinsen.html#weich", "Mehr zu weichen Linsen"]
    },
    {
      id: "formstabil",
      keys: ["formstabil", "harte linse", "maßlinse", "masslinse"],
      a: "Formstabile Linsen werden nach Maß gefertigt und bei uns vor Ort nachbearbeitet. Sie halten bei guter Pflege bis zu 3 Jahre.",
      link: ["kontaktlinsen.html#formstabil", "Mehr zu formstabilen Linsen"]
    },
    {
      id: "lowvision",
      keys: ["low vision", "lowvision", "sehbehinderung", "makula", "lupe", "vergrößer", "sehschwäche"],
      a: "Bei Low Vision erprobt man vergrößernde und kontrastverstärkende Sehhilfen für Lesen, Arbeit und Alltag. Bei uns können Sie verschiedene Hilfen in Ruhe ausprobieren.",
      link: ["low-vision.html", "Mehr zu Low Vision"]
    },
    {
      id: "technologie",
      keys: ["technologie", "topographie", "messgerät", "gerät"],
      a: "Mit Hornhauttopographie und weiteren Messverfahren sehen wir, welche Form Ihre Hornhaut hat. Daran richten wir Linse oder Brille aus.",
      link: ["technologie.html", "Mehr zur Technologie"]
    },
    {
      id: "brillen",
      keys: ["brille", "fassung", "sonnenbrille", "anprobe", "reservier", "gläser"],
      a: "Im Bereich Brillen finden Sie Fassungen, Sonnenbrillen und Lesebrillen mit Preis. Sie reservieren online, wir legen die Brille zurück. Bezahlt wird vor Ort, einen Versand gibt es nicht. Gläser passend zu Ihrer Sehstärke besprechen wir bei der Anprobe.",
      link: ["brillen.html", "Zu den Brillen"]
    },
    {
      id: "oeffnung",
      keys: ["öffnungszeit", "oeffnungszeit", "geöffnet", "offen", "wann habt", "samstag", " uhr ", "sprechzeit", "montag", "freitag"],
      a: "Unsere Öffnungszeiten: " + CFG.hours + "."
    },
    {
      id: "adresse",
      keys: ["adresse", "anfahrt", "wo seid", "wo finde", "wo ist", "parken", "straße", "standort"],
      a: "Sie finden uns hier: " + CFG.address + ".",
      link: ["kontakt.html", "Zur Kontaktseite"]
    },
    {
      id: "kontakt",
      keys: ["telefon", "anrufen", "nummer", "erreichen", "e-mail", "email", " kontakt ", "schreiben"],
      a: "Sie erreichen uns telefonisch unter " + CFG.phone + " oder über die Kontaktseite.",
      link: ["kontakt.html", "Zur Kontaktseite"]
    },
    {
      id: "datenschutz",
      keys: ["datenschutz", "speicher", "daten"],
      a: "In dieser Demo wird nichts gespeichert und nichts gesendet. Bitte schreiben Sie im Chat grundsätzlich keine Gesundheitsdaten."
    },
    {
      id: "mensch",
      keys: ["mensch", "mitarbeiter", "berater", "person"],
      a: "Gern persönlich: Rufen Sie uns an unter " + CFG.phone + ". " + CFG.hours + "."
    },
    {
      id: "gruss",
      keys: ["hallo", "guten tag", "guten morgen", "moin", "servus"],
      a: "Guten Tag! Ich beantworte häufige Fragen und bereite Terminanfragen vor. Wählen Sie ein Thema oder schreiben Sie Ihre Frage."
    },
    {
      id: "danke",
      keys: ["danke", "vielen dank"],
      a: "Gern geschehen! Kann ich noch etwas für Sie tun?"
    }
  ];

  var TERMIN_KEYS = ["termin", "buchen", "anmelden", "anmeldung", "vereinbaren", "appointment"];

  var QUICK = [
    { label: "Termin vereinbaren", flow: true },
    { label: "Ablauf der Anpassung", kb: "ablauf" },
    { label: "Kosten und Krankenkasse", kb: "kosten" },
    { label: "Öffnungszeiten", kb: "oeffnung" },
    { label: "Brillen reservieren", kb: "brillen" },
    { label: "Keratokonus", kb: "keratokonus" },
    { label: "Orthokeratologie", kb: "ortho" },
    { label: "Low Vision", kb: "lowvision" }
  ];

  // ---- Aufbau ----
  var fab, panel, log, quick, form, input;
  var flow = null;
  var summary = "";
  var started = false;
  var lastTrigger = null;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function build() {
    fab = el("button", "chat-fab");
    fab.type = "button";
    fab.setAttribute("aria-haspopup", "dialog");
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-controls", "chat");
    fab.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z"/></svg>';
    fab.appendChild(document.createTextNode("Fragen und Termin"));

    panel = el("section", "chat");
    panel.id = "chat";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "chat-title");

    var head = el("div", "chat__head");
    var title = el("h2");
    title.id = "chat-title";
    title.appendChild(document.createTextNode("Chat-Assistent"));
    title.appendChild(el("small", null, "Häufige Fragen und Terminanfrage"));
    var close = el("button", "chat__close", "Schließen");
    close.type = "button";
    head.appendChild(title);
    head.appendChild(close);

    log = el("div", "chat__log");
    log.id = "chat-log";
    log.setAttribute("role", "log");
    log.setAttribute("aria-live", "polite");

    quick = el("div", "chat__quick");

    form = el("form", "chat__form");
    var label = el("label", "sr", "Ihre Nachricht");
    label.setAttribute("for", "chat-input");
    input = el("input");
    input.id = "chat-input";
    input.type = "text";
    input.maxLength = 200;
    input.autocomplete = "off";
    input.placeholder = "Ihre Frage";
    var send = el("button", null, "Senden");
    send.type = "submit";
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(send);

    var hint = el("p", "chat__hint", "Automatischer Assistent, keine medizinische Beratung. Bitte keine Gesundheitsdaten eingeben.");

    panel.appendChild(head);
    panel.appendChild(log);
    panel.appendChild(quick);
    panel.appendChild(form);
    panel.appendChild(hint);
    document.body.appendChild(fab);
    document.body.appendChild(panel);

    fab.addEventListener("click", function () { lastTrigger = fab; open(false); });
    close.addEventListener("click", closeChat);
    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeChat();
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var t = input.value.trim();
      if (!t) return;
      input.value = "";
      userSays(t);
      handleText(t);
    });
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-chat]");
      if (!t) return;
      e.preventDefault();
      lastTrigger = t;
      open(t.getAttribute("data-chat") === "termin");
    });
  }

  function open(withFlow) {
    panel.hidden = false;
    fab.hidden = true;
    fab.setAttribute("aria-expanded", "true");
    if (!started) {
      started = true;
      botSay("Guten Tag! Ich bin der Chat-Assistent von " + CFG.studio + ". Ich beantworte häufige Fragen und bereite Terminanfragen vor.");
      note("Hinweis: Das ist ein automatischer Assistent ohne medizinische Beratung. In dieser Demo wird nichts gesendet.");
      showQuick();
    }
    if (withFlow) startFlow();
    input.focus();
  }

  function closeChat() {
    panel.hidden = true;
    fab.hidden = false;
    fab.setAttribute("aria-expanded", "false");
    (lastTrigger && document.contains(lastTrigger) && !lastTrigger.hidden ? lastTrigger : fab).focus();
  }

  // ---- Ausgabe ----
  function scrollDown() {
    log.scrollTop = log.scrollHeight;
  }
  function botSay(text, link) {
    var m = el("div", "msg msg--bot");
    m.appendChild(document.createTextNode(text));
    if (link) {
      m.appendChild(document.createElement("br"));
      var a = el("a", null, link[1]);
      a.href = link[0];
      m.appendChild(a);
    }
    log.appendChild(m);
    scrollDown();
  }
  function userSays(text) {
    log.appendChild(el("div", "msg msg--me", text));
    scrollDown();
  }
  function note(text) {
    log.appendChild(el("div", "msg msg--note", text));
    scrollDown();
  }
  function setQuick(items) {
    quick.textContent = "";
    items.forEach(function (it) {
      var b = el("button", "quick", it.label);
      b.type = "button";
      b.addEventListener("click", function () {
        userSays(it.label);
        it.run();
      });
      quick.appendChild(b);
    });
  }
  function showQuick() {
    setQuick(
      QUICK.map(function (q) {
        return {
          label: q.label,
          run: function () {
            if (q.flow) startFlow();
            else answer(q.kb);
          }
        };
      })
    );
  }

  // ---- Fragen beantworten ----
  function norm(s) {
    return " " + s.toLowerCase().replace(/[^a-zäöüß0-9\s-]/g, " ").replace(/\s+/g, " ").trim() + " ";
  }
  function has(text, keys) {
    return keys.some(function (k) { return text.indexOf(k) !== -1; });
  }
  function answer(id) {
    var e = KB.filter(function (x) { return x.id === id; })[0];
    if (e) botSay(e.a, e.link);
    showQuick();
  }
  function handleText(raw) {
    var t = norm(raw);
    if (flow) return flowInput(raw, t);
    if (has(t, EMERGENCY)) {
      botSay("Bei starken Schmerzen, Rötung, Lichtempfindlichkeit oder plötzlicher Sehverschlechterung: Nehmen Sie die Linsen sofort heraus und suchen Sie umgehend eine Augenärztin, einen Augenarzt oder den ärztlichen Notdienst auf. Dieser Chat kann keine medizinische Beratung ersetzen.");
      showQuick();
      return;
    }
    if (has(t, TERMIN_KEYS)) return startFlow();
    var best = null;
    var bestScore = 0;
    KB.forEach(function (e) {
      var s = 0;
      e.keys.forEach(function (k) {
        if (t.indexOf(k) !== -1) s += k.length;
      });
      if (s > bestScore) {
        bestScore = s;
        best = e;
      }
    });
    if (best && bestScore >= 3) {
      botSay(best.a, best.link);
    } else {
      botSay("Dazu habe ich leider keine Antwort. Rufen Sie uns gern an unter " + CFG.phone + " oder wählen Sie ein Thema.", ["kontakt.html", "Zur Kontaktseite"]);
    }
    showQuick();
  }

  // ---- Terminanfrage ----
  function cancelItem() {
    return { label: "Abbrechen", run: cancelFlow };
  }
  function cancelFlow() {
    flow = null;
    botSay("Alles klar, die Anfrage ist verworfen. Wie kann ich sonst helfen?");
    showQuick();
  }
  function startFlow() {
    flow = { step: "service", data: {} };
    botSay("Gern. Wofür möchten Sie einen Termin? Bitte schreiben Sie hier keine Gesundheitsdaten.");
    var items = SERVICES.map(function (s) {
      return { label: s, run: function () { flowInput(s, norm(s)); } };
    });
    items.push(cancelItem());
    setQuick(items);
  }
  function flowInput(raw, t) {
    if (has(t, ["abbrechen", "abbruch"])) return cancelFlow();
    var d = flow.data;
    var v = raw.trim().slice(0, 120);
    if (flow.step === "service") {
      d.service = v;
      flow.step = "when";
      botSay("Wann passt es Ihnen? Zum Beispiel „Dienstagvormittag“ oder „nächste Woche nachmittags“.");
      setQuick(
        ["Vormittags", "Nachmittags", "Egal"].map(function (w) {
          return { label: w, run: function () { flowInput(w, norm(w)); } };
        }).concat([cancelItem()])
      );
    } else if (flow.step === "when") {
      d.when = v;
      flow.step = "name";
      botSay("Wie lautet Ihr Name?");
      setQuick([cancelItem()]);
    } else if (flow.step === "name") {
      d.name = v;
      flow.step = "contact";
      botSay("Unter welcher Telefonnummer oder E-Mail-Adresse erreichen wir Sie?");
      setQuick([cancelItem()]);
    } else if (flow.step === "contact") {
      var digits = (v.match(/\d/g) || []).length;
      if (v.indexOf("@") === -1 && digits < 6) {
        botSay("Das sieht nicht nach einer Telefonnummer oder E-Mail-Adresse aus. Bitte versuchen Sie es noch einmal.");
        return;
      }
      d.contact = v;
      finish();
    }
  }
  function finish() {
    var d = flow.data;
    summary =
      "Terminanfrage an " + CFG.studio + "\n" +
      "Anliegen: " + d.service + "\n" +
      "Wunschzeit: " + d.when + "\n" +
      "Name: " + d.name + "\n" +
      "Kontakt: " + d.contact;
    flow = null;
    botSay("Danke! Das ist Ihre Anfrage:\n\n" + summary);
    note("Demo: Es wurde nichts gesendet. In der echten Version geht die Anfrage direkt an das Studio oder an dessen Terminsystem. Ein Termin gilt erst, wenn das Studio ihn bestätigt hat.");
    setQuick([
      { label: "Text kopieren", run: copySummary },
      { label: "Neue Anfrage", run: startFlow },
      { label: "Fertig", run: function () { botSay("Gern geschehen!"); showQuick(); } }
    ]);
  }
  function copySummary() {
    function fallback() {
      botSay("Das Kopieren hat nicht geklappt. Bitte markieren Sie den Text oben und kopieren Sie ihn selbst.");
    }
    try {
      navigator.clipboard.writeText(summary).then(function () { botSay("Der Text ist kopiert."); }, fallback);
    } catch (e) {
      fallback();
    }
  }

  build();
})();
