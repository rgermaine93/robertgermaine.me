(function () {
  const STORAGE_KEY = "kartee-theme";

  function effectiveIsDark() {
    const h = document.documentElement;
    if (h.classList.contains("dark")) {
      return true;
    }
    if (h.classList.contains("light")) {
      return false;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function setDark(dark) {
    const h = document.documentElement;
    h.classList.remove("light", "dark");
    if (dark) {
      h.classList.add("dark");
      localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      h.classList.add("light");
      localStorage.setItem(STORAGE_KEY, "light");
    }
    h.style.colorScheme = dark ? "dark" : "light";
    syncCheckboxes();
  }

  function syncCheckboxes() {
    const on = effectiveIsDark();
    document.querySelectorAll("#theme-toggle-input, #theme-toggle-input-mobile, #theme-toggle-input-bar").forEach((el) => {
      el.checked = on;
      el.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  function applyFromStorage(key, value) {
    const h = document.documentElement;
    h.classList.remove("light", "dark");
    if (value === "dark") {
      h.classList.add("dark");
    } else if (value === "light") {
      h.classList.add("light");
    }
    h.style.colorScheme = effectiveIsDark() ? "dark" : "light";
    syncCheckboxes();
  }

  function init() {
    const toggles = document.querySelectorAll("#theme-toggle-input, #theme-toggle-input-mobile, #theme-toggle-input-bar");
    if (!toggles.length) {
      return;
    }

    document.documentElement.style.colorScheme = effectiveIsDark() ? "dark" : "light";
    syncCheckboxes();

    function onChange(e) {
      setDark(e.target.checked);
    }

    toggles.forEach((el) => el.addEventListener("change", onChange));

    window.addEventListener("storage", (e) => {
      if (e.key !== STORAGE_KEY || e.storageArea !== localStorage) {
        return;
      }
      if (e.newValue === null) {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.style.colorScheme = effectiveIsDark() ? "dark" : "light";
        syncCheckboxes();
        return;
      }
      applyFromStorage(e.key, e.newValue);
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (localStorage.getItem(STORAGE_KEY)) {
        return;
      }
      document.documentElement.style.colorScheme = effectiveIsDark() ? "dark" : "light";
      syncCheckboxes();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
