(function () {
  var sectionIds = ["section1", "section2", "section3", "section4"];
  var links = document.querySelectorAll(".case-study-toc-link");

  function updateActive() {
    var mid = window.innerHeight * 0.35;
    var current = sectionIds[0];
    for (var i = 0; i < sectionIds.length; i++) {
      var id = sectionIds[i];
      var el = document.getElementById(id);
      if (!el) continue;
      var rect = el.getBoundingClientRect();
      if (rect.top <= mid) {
        current = id;
      }
    }
    links.forEach(function (link) {
      var href = link.getAttribute("href");
      var isActive = href === "#" + current;
      link.classList.toggle("is-active", isActive);
    });
  }

  if (!links.length) return;

  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive, { passive: true });
  updateActive();
})();
