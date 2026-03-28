(function () {
  const panel = document.getElementById("nav-mobile-panel");
  const toggle = document.getElementById("nav-menu-toggle");
  const closeBtn = document.getElementById("nav-mobile-close");
  const timeEl = document.querySelectorAll("[data-nav-time]");
  const mq = window.matchMedia("(min-width: 768px)");

  function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  function tick() {
    const s = formatTime();
    timeEl.forEach((el) => {
      el.textContent = s;
    });
  }

  tick();
  setInterval(tick, 1000);

  function openMenu() {
    if (!panel || !toggle) return;
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-mobile-open");
  }

  function closeMenu() {
    if (!panel || !toggle) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-mobile-open");
  }

  function toggleMenu() {
    if (!panel) return;
    if (panel.classList.contains("is-open")) closeMenu();
    else openMenu();
  }

  if (toggle) {
    toggle.addEventListener("click", toggleMenu);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  if (panel) {
    panel.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  mq.addEventListener("change", () => {
    if (mq.matches) closeMenu();
  });

  // Hide navbar on scroll down, show on scroll up
  var navSection = document.querySelector(".nav-section");
  if (navSection) {
    var lastScrollY = window.scrollY;
    var scrollThreshold = 10;

    function onScroll() {
      var currentY = window.scrollY;
      if (panel && panel.classList.contains("is-open")) return;

      if (currentY > lastScrollY && currentY > 80 && currentY - lastScrollY > scrollThreshold) {
        navSection.classList.add("nav-hidden");
      } else if (lastScrollY - currentY > scrollThreshold) {
        navSection.classList.remove("nav-hidden");
      }
      lastScrollY = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
