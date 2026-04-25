const supabaseUrl = "https://fmesivvwhqitrmlbwcdb.supabase.co";
const supabaseKey = "sb_publishable_kSmSt52th8XAYGbce3CtwA_uIdN8fKL";
const submitGuestUrl = `${supabaseUrl}/functions/v1/submit-guest`;

const form = document.querySelector("#form");
const msg = document.querySelector("#msg");
const termsConsent = document.querySelector("#termsConsent");
const termsTrigger = document.querySelector("#termsTrigger");
const termsModal = document.querySelector("#termsModal");
const termsClose = document.querySelector("#termsClose");
const btnSubmit = document.querySelector("#btnSubmit");
let lastFocusedElement = null;

const VALIDATION_ERRORS = {
  nameTooShort: "Imię musi składać się z co najmniej 3 znaków.",
  nameTooLong: "Imię jest za długie.",
  surnameTooShort: "Nazwisko musi składać się z co najmniej 3 znaków.",
  surnameTooLong: "Nazwisko jest za długie.",
  invalidContact: "Podaj prawidłowy kontakt.",
  invalidYear: "Rok ukończenia musi być między 1995 a 2026.",
  addInfoTooLong: "Maksymalna długość dodatkowych informacji to 255 znaków.",
  termsRequired: "Aby wysłać formularz, zaakceptuj regulamin.",
  captchaRequired: "Potwierdź, że nie jesteś botem.",
};

function setMessage(text = "", color = "red") {
  if (!(msg instanceof HTMLParagraphElement)) return;

  msg.style.color = color;
  msg.textContent = text;
}

function validateFormData({
  guestName,
  guestSurname,
  contactInput,
  year,
  addInfo,
  termsConsent,
}) {
  if (guestName.length < 3) {
    return VALIDATION_ERRORS.nameTooShort;
  }

  if (guestName.length > 66) {
    return VALIDATION_ERRORS.nameTooLong;
  }

  if (guestSurname.length < 3) {
    return VALIDATION_ERRORS.surnameTooShort;
  }

  if (guestSurname.length > 66) {
    return VALIDATION_ERRORS.surnameTooLong;
  }

  if (!contactInput.checkValidity()) {
    return VALIDATION_ERRORS.invalidContact;
  }

  if (year < 1995 || year > 2026 || Number.isNaN(year)) {
    return VALIDATION_ERRORS.invalidYear;
  }

  if (addInfo.length > 255) {
    return VALIDATION_ERRORS.addInfoTooLong;
  }

  if (!termsConsent.checked) {
    return VALIDATION_ERRORS.termsRequired;
  }

  return null;
}

async function saveGuest(
  guestName,
  guestSurname,
  contact,
  gradYear,
  addInfo,
  school,
  profession,
  workCountry,
  captchaToken,
) {
  const response = await fetch(submitGuestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
    },
    body: JSON.stringify({
      guestName,
      guestSurname,
      contact,
      year: gradYear,
      addInfo,
      school,
      profession,
      workCountry,
      captchaToken,
    }),
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    console.error("Błąd przy zapisywaniu:", data);
    setMessage(data?.error || "Błąd przy zapisywaniu formularza.");
    return false;
  }

  return true;
}

// ========================
// ===== FORM =============
// ========================
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.querySelector("#name");
    const surnameInput = document.querySelector("#surname");
    const contactInput = document.querySelector("#contact");
    const yearInput = document.querySelector("#year");
    const addInfoInput = document.querySelector("#addInfo");
    const schoolInput = document.querySelector("#school");
    const professionInput = document.querySelector("#profession");
    const workCountryInput = document.querySelector("#workCountry");
    const websiteField = document.querySelector("#websiteField");
    const captchaInput = document.querySelector(
      '[name="cf-turnstile-response"]',
    );

    if (
      !(nameInput instanceof HTMLInputElement) ||
      !(surnameInput instanceof HTMLInputElement) ||
      !(contactInput instanceof HTMLInputElement) ||
      !(yearInput instanceof HTMLInputElement) ||
      !(addInfoInput instanceof HTMLTextAreaElement) ||
      !(schoolInput instanceof HTMLInputElement) ||
      !(professionInput instanceof HTMLInputElement) ||
      !(workCountryInput instanceof HTMLInputElement) ||
      !(websiteField instanceof HTMLInputElement) ||
      !(captchaInput instanceof HTMLInputElement) ||
      !(termsConsent instanceof HTMLInputElement)
    ) {
      return;
    }

    if (websiteField.value !== "") return;

    if (btnSubmit instanceof HTMLButtonElement) {
      btnSubmit.disabled = true;
    }

    const guestName = nameInput.value.trim().toLowerCase();
    const guestSurname = surnameInput.value.trim().toLowerCase();
    const contact = contactInput.value.trim().toLowerCase();
    const year = Number(yearInput.value.trim());
    const addInfo = addInfoInput.value.trim();
    const school = schoolInput.value.trim();
    const profession = professionInput.value.trim();
    const workCountry = workCountryInput.value.trim();
    const captchaToken = captchaInput.value.trim();

    setMessage();

    const validationError = validateFormData({
      guestName,
      guestSurname,
      contactInput,
      year,
      addInfo,
      termsConsent,
    });

    if (validationError) {
      setMessage(validationError);

      if (btnSubmit instanceof HTMLButtonElement) {
        btnSubmit.disabled = false;
      }

      if (!termsConsent.checked) {
        termsConsent.focus();
      }

      return;
    }

    if (!captchaToken) {
      setMessage(VALIDATION_ERRORS.captchaRequired);

      if (btnSubmit instanceof HTMLButtonElement) {
        btnSubmit.disabled = false;
      }

      return;
    }

    let saved = false;

    if (
      guestName === "michał" &&
      guestSurname === "ledzion" &&
      year === 2005
    ) {
      setMessage("Wystąpił błąd.");
      form.reset();
      if (btnSubmit instanceof HTMLButtonElement) {
        btnSubmit.disabled = false;
      }
      return;
    }

    try {
      saved = await saveGuest(
        guestName,
        guestSurname,
        contact,
        year,
        addInfo,
        school,
        profession,
        workCountry,
        captchaToken,
      );
    } catch (error) {
      console.log(error);
      setMessage(error);
      return;
    } finally {
      if (btnSubmit instanceof HTMLButtonElement) {
        btnSubmit.disabled = false;
      }
    }

    if (!saved) return;

    setMessage("Zapisano pomyślnie.", "green");
    form.reset();

    if (window.turnstile && typeof window.turnstile.reset === "function") {
      window.turnstile.reset();
    }
  });
}

// ========================
// ===== Terms ============
// ========================
function openTermsModal() {
  if (!(termsModal instanceof HTMLDivElement)) return;

  lastFocusedElement =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  termsModal.hidden = false;
  termsModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  if (termsClose instanceof HTMLButtonElement) {
    termsClose.focus();
  }
}

function closeTermsModal() {
  if (!(termsModal instanceof HTMLDivElement)) return;

  termsModal.hidden = true;
  termsModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

if (termsTrigger instanceof HTMLButtonElement) {
  termsTrigger.addEventListener("click", openTermsModal);
}

if (termsClose instanceof HTMLButtonElement) {
  termsClose.addEventListener("click", closeTermsModal);
}

if (termsModal instanceof HTMLDivElement) {
  termsModal.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
      closeTermsModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    termsModal instanceof HTMLDivElement &&
    !termsModal.hidden
  ) {
    closeTermsModal();
  }
});
