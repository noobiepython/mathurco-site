// MathurCo — small progressive-enhancement script.
// The site is fully readable without JS; this just adds niceties.

(function () {
  "use strict";

  // Current year in the footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after tapping a link (mobile)
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll-reveal: fade/rise elements as they enter the viewport.
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  function show(el) {
    // Stagger siblings that share a parent (lists, stat groups, hero stack).
    var group = [].slice.call(el.parentNode.children).filter(function (c) {
      return c.classList && c.classList.contains("reveal");
    });
    var index = Math.max(0, group.indexOf(el));
    el.style.transitionDelay = index * 80 + "ms";
    el.classList.add("is-visible");
  }

  function inView(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.9 && r.bottom > 0;
  }

  var ticking = false;
  function check() {
    ticking = false;
    reveals = reveals.filter(function (el) {
      if (inView(el)) { show(el); return false; }
      return true;
    });
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(check); }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", check);
  check(); // reveal whatever is already in view (e.g. the hero)
})();
