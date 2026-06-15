/* ==========================================================================
   Mint Dentistry Pune — interactions
   Vanilla JS, no dependencies. Loaded with `defer`.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile navigation drawer ---- */
  var toggle = document.getElementById("navToggle");
  var drawer = document.getElementById("navDrawer");

  function setMenu(open) {
    if (!drawer || !toggle) return;
    drawer.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      setMenu(!drawer.classList.contains("open"));
    });
    // Close after choosing a destination
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    // Close when tapping outside
    document.addEventListener("click", function (e) {
      if (drawer.classList.contains("open") &&
          !drawer.contains(e.target) && !toggle.contains(e.target)) {
        setMenu(false);
      }
    });
  }

  /* ---- Click-to-load maps (keeps the page light until needed) ---- */
  document.querySelectorAll(".map__placeholder").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = btn.getAttribute("data-map");
      var title = btn.getAttribute("data-title") || "Clinic location map";
      if (!src) return;
      var iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = title;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.setAttribute("allowfullscreen", "");
      btn.replaceWith(iframe);
    });
  });

  /* ---- Scroll-reveal animations (respecting reduced-motion) ---- */
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
