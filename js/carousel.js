// Karussell: Pfeile, Punkte, Pause, Tastatur. Nicht sichtbare Folien sind inert.
(function () {
  var root = document.querySelector("[data-carousel]");
  if (!root) return;
  var track = root.querySelector(".slides");
  var slides = [].slice.call(track.children);
  var dots = [].slice.call(root.querySelectorAll(".dot"));
  var prev = root.querySelector("[data-prev]");
  var next = root.querySelector("[data-next]");
  var pause = root.querySelector("[data-pause]");
  var n = slides.length;
  var current = 0;
  var timer = null;
  var paused = false;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function mark(i) {
    current = i;
    slides.forEach(function (s, k) {
      if (k === i) s.removeAttribute("inert");
      else s.setAttribute("inert", "");
    });
    dots.forEach(function (d, k) {
      d.setAttribute("aria-current", String(k === i));
    });
  }

  function go(i) {
    i = (i + n) % n;
    track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
    mark(i);
  }

  var ticking = false;
  track.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== current && i >= 0 && i < n) mark(i);
    });
  });

  prev.addEventListener("click", function () { go(current - 1); });
  next.addEventListener("click", function () { go(current + 1); });
  dots.forEach(function (d, k) {
    d.addEventListener("click", function () { go(k); });
  });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
  });
  window.addEventListener("resize", function () {
    track.scrollTo({ left: current * track.clientWidth, behavior: "auto" });
  });

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  function start() {
    stop();
    if (!paused && !reduce) timer = setInterval(function () { go(current + 1); }, 8000);
  }
  function setPaused(p) {
    paused = p;
    pause.setAttribute("aria-pressed", String(p));
    pause.textContent = p ? "▶" : "❚❚";
    pause.setAttribute("aria-label", p ? "Automatischen Wechsel starten" : "Automatischen Wechsel anhalten");
    start();
  }
  pause.addEventListener("click", function () { setPaused(!paused); });
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  mark(0);
  // Ohne Bewegungswunsch startet der Wechsel; wer Bewegung reduziert, steuert selbst.
  setPaused(reduce);
})();
