const UHO_CONFIG = {
  checkoutEndpoint: "https://wdvtwkwcjvvrspbfurje.supabase.co/functions/v1/create-checkout",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdnR3a3djanZ2cnNwYmZ1cmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NTgxMzIsImV4cCI6MjA5NjMzNDEzMn0.Ap0JaCCljpA-SCBy8ayt_KfN8V0zB_jw-8Rjc1gFCfY",
  downloadUrl: "https://github.com/toantonchik-dv/uhodictation-site/releases/download/v1.1.0/uho-dictation-1.1.0-arm64.dmg",
  supportEmail: "support@mail.uhodictation.com",
  appVersion: "landing-v1",
  emailStorageKey: "uho_purchase_email",
};

const checkoutMessages = {
  en: {
    invalidEmail: "Enter a valid email before opening checkout.",
    preparing: "Preparing secure checkout…",
    openingButton: "Opening…",
    openingCheckout: "Checkout is opening…",
    unavailable: "Checkout is not available right now.",
  },
  uk: {
    invalidEmail: "Введи коректний email перед відкриттям оплати.",
    preparing: "Готуємо безпечну оплату…",
    openingButton: "Відкриваємо…",
    openingCheckout: "Оплата відкривається…",
    unavailable: "Оплата зараз недоступна.",
  },
};

function currentLanguage() {
  return window.UHOI18N?.getLanguage?.() || "en";
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setStatus(node, text, kind = "") {
  if (!node) return;
  node.textContent = text;
  node.className = kind ? `status-text ${kind}` : "status-text";
}

function syncEmailFields(value) {
  document.querySelectorAll("[data-purchase-email]").forEach((input) => {
    if (input !== document.activeElement) {
      input.value = value;
    }
  });
}

async function openCheckout(email, statusNode, submitButton) {
  const lang = currentLanguage();
  const t = checkoutMessages[lang] || checkoutMessages.en;
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    setStatus(statusNode, t.invalidEmail, "error");
    return;
  }

  localStorage.setItem(UHO_CONFIG.emailStorageKey, normalizedEmail);
  syncEmailFields(normalizedEmail);
  setStatus(statusNode, t.preparing);

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalLabel = submitButton.textContent;
    submitButton.textContent = t.openingButton;
  }

  try {
    const response = await fetch(UHO_CONFIG.checkoutEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: UHO_CONFIG.supabaseAnonKey,
        Authorization: `Bearer ${UHO_CONFIG.supabaseAnonKey}`,
      },
      body: JSON.stringify({
        customerEmail: normalizedEmail,
        appVersion: UHO_CONFIG.appVersion,
        deviceHash: null,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.status !== "ready" || !payload.checkoutURL) {
      throw new Error(payload.error || t.unavailable);
    }

    setStatus(statusNode, t.openingCheckout, "success");
    window.location.assign(payload.checkoutURL);
  } catch (error) {
    setStatus(statusNode, error instanceof Error ? error.message : t.unavailable, "error");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalLabel || submitButton.textContent;
    }
  }
}

function handleDownload() {
  if (!UHO_CONFIG.downloadUrl) {
    return;
  }
  window.location.href = UHO_CONFIG.downloadUrl;
}

function attachBuyForms() {
  document.querySelectorAll("[data-buy-form]").forEach((form) => {
    const input = form.querySelector("[data-purchase-email]");
    const status = form.querySelector("[data-status]");
    const button = form.querySelector("[data-submit]");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await openCheckout(input.value, status, button);
    });
  });
}

function attachModal() {
  const modal = document.querySelector("[data-buy-modal]");
  const openButtons = document.querySelectorAll("[data-open-buy]");
  const closeButtons = document.querySelectorAll("[data-close-buy]");
  if (!modal) return;

  const open = () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    const firstInput = modal.querySelector("[data-purchase-email]");
    if (firstInput) firstInput.focus();
  };

  const close = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  openButtons.forEach((button) => button.addEventListener("click", open));
  closeButtons.forEach((button) => button.addEventListener("click", close));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function attachDownloadButtons() {
  document.querySelectorAll("[data-download]").forEach((button) => {
    button.addEventListener("click", handleDownload);
  });
}

function hydrateSavedEmail() {
  const savedEmail = localStorage.getItem(UHO_CONFIG.emailStorageKey) || "";
  if (savedEmail) {
    syncEmailFields(savedEmail);
  }
}

function attachSupportEmail() {
  document.querySelectorAll("[data-support-email]").forEach((node) => {
    node.textContent = UHO_CONFIG.supportEmail;
    if (node.tagName.toLowerCase() === "a") {
      node.href = `mailto:${UHO_CONFIG.supportEmail}`;
    }
  });
}

attachBuyForms();
attachModal();
attachDownloadButtons();
hydrateSavedEmail();
attachSupportEmail();
