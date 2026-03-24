(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");
  const rootError = document.getElementById("contact-root-error");
  const successEl = document.getElementById("contact-success");
  const submitBtn = document.getElementById("contact-submit");

  function getErrors() {
    const name = (nameInput.value || "").trim();
    const email = (emailInput.value || "").trim();
    const message = (messageInput.value || "").trim();
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    if (!message) errors.message = "Message is required";

    return errors;
  }

  function setFieldError(field, msg) {
    const errEl = document.getElementById("contact-" + field + "-error");
    const input =
      field === "name"
        ? nameInput
        : field === "email"
          ? emailInput
          : messageInput;
    if (!errEl || !input) return;

    if (msg) {
      errEl.textContent = msg;
      errEl.hidden = false;
      input.setAttribute("aria-invalid", "true");
    } else {
      errEl.textContent = "";
      errEl.hidden = true;
      input.removeAttribute("aria-invalid");
    }
  }

  function clearErrors() {
    ["name", "email", "message"].forEach((f) => setFieldError(f, ""));
    if (rootError) {
      rootError.textContent = "";
      rootError.hidden = true;
    }
  }

  function showErrors(errors) {
    if (errors.name) setFieldError("name", errors.name);
    if (errors.email) setFieldError("email", errors.email);
    if (errors.message) setFieldError("message", errors.message);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearErrors();

    const errors = getErrors();
    const keys = Object.keys(errors);
    if (keys.length) {
      showErrors(errors);
      const first = keys[0];
      const el =
        first === "name"
          ? nameInput
          : first === "email"
            ? emailInput
            : messageInput;
      el.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    form.classList.add("is-submitting");

    try {
      await new Promise(function (resolve) {
        setTimeout(resolve, 1000);
      });

      successEl.hidden = false;
      requestAnimationFrame(function () {
        successEl.classList.add("is-visible");
      });

      form.reset();

      setTimeout(function () {
        successEl.classList.remove("is-visible");
      }, 4500);

      setTimeout(function () {
        successEl.hidden = true;
      }, 5000);
    } catch {
      if (rootError) {
        rootError.textContent =
          "Something went wrong. Please try again.";
        rootError.hidden = false;
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-busy");
      form.classList.remove("is-submitting");
    }
  });
})();
