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

  // In-page navigation: smooth-scroll to the section and keep the URL clean
  // (no "#section" left in the address bar). The header is position:sticky, so
  // "#top" is handled as a scroll-to-zero rather than an anchor jump.
  function prefersReduced() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  [].slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (a) {
    if (a.classList.contains("skip-link")) return; // leave skip link native for a11y focus
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");
      var behavior = prefersReduced() ? "auto" : "smooth";
      if (href === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: behavior });
      } else {
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: behavior, block: "start" });
      }
      if (history.replaceState) {
        history.replaceState(null, "", location.pathname + location.search);
      }
    });
  });

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

  // Section scroller: highlight the current section, and flip the dots to
  // light when they sit over a dark band (thesis / contact) so they stay visible.
  var navLinks = [].slice.call(document.querySelectorAll(".section-nav a"));
  if (navLinks.length) {
    var nav = document.querySelector(".section-nav");
    var darkEls = [].slice.call(document.querySelectorAll(".thesis, .contact"));
    var spyTicking = false;

    function absTop(el) { return el.getBoundingClientRect().top + window.scrollY; }

    function spy() {
      spyTicking = false;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var probe = window.scrollY + vh * 0.4;
      var current = navLinks[0];
      navLinks.forEach(function (a) {
        var t = document.querySelector(a.getAttribute("href"));
        if (t && absTop(t) <= probe) current = a;
      });
      navLinks.forEach(function (a) { a.classList.toggle("active", a === current); });

      var centerY = window.scrollY + vh / 2;
      var onDark = darkEls.some(function (el) {
        var top = absTop(el);
        return centerY >= top && centerY < top + el.offsetHeight;
      });
      nav.classList.toggle("nav-dark", onDark);
    }

    function onSpyScroll() {
      if (!spyTicking) { spyTicking = true; requestAnimationFrame(spy); }
    }
    window.addEventListener("scroll", onSpyScroll, { passive: true });
    window.addEventListener("resize", onSpyScroll);
    spy();
  }
})();
