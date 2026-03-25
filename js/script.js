import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://fmesivvwhqitrmlbwcdb.supabase.co";
const supabaseKey = "sb_publishable_kSmSt52th8XAYGbce3CtwA_uIdN8fKL";

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.querySelector("#form");
const msg = document.querySelector("#msg");
const publicGuestsList = document.querySelector("#publicGuestsList");
const termsConsent = document.querySelector("#termsConsent");
const termsTrigger = document.querySelector("#termsTrigger");
const termsModal = document.querySelector("#termsModal");
const termsClose = document.querySelector("#termsClose");
let lastFocusedElement = null;

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

async function saveGuest(
  guestName,
  guestSurname,
  email,
  gradYear,
  addInfo,
  school,
  profession,
  workCountry,
) {
  const { error } = await supabase.from("guest_data").insert([
    {
      name: guestName,
      surname: guestSurname,
      e_mail: email,
      graduation: gradYear,
      add_info: addInfo,
      school: school,
      profession: profession,
      work_country: workCountry,
    },
  ]);

  if (error) {
    console.error("Błąd przy zapisywaniu:", error);
    if (msg) {
      msg.textContent = "Błąd przy zapisywaniu formularza.";
    }
    return false;
  }

  return true;
}

async function loadPublicGuests() {
  const { data, error } = await supabase.rpc("get_public_guests");

  if (error) {
    console.error("Błąd pobierania publicznych danych:", error);
    return [];
  }

  return data ?? [];
}

async function renderPublicGuests() {
  if (!publicGuestsList) return;

  const guests = await loadPublicGuests();

  publicGuestsList.innerHTML =
    "<li>Rok ukończenia - Inicjały - Edukacja - Profesja - Kraj pracy ";

  if (!guests.length) {
    const li = document.createElement("li");
    li.textContent = "Brak zapisanych osób.";
    publicGuestsList.appendChild(li);
    return;
  }

  guests.forEach((guest) => {
    const li = document.createElement("li");
    if (!guest.school) guest.school = "—";
    if (!guest.profession) guest.profession = "—";
    if (!guest.work_country) guest.work_country = "—";
    li.textContent = `${guest.graduation} - ${guest.display_name} - ${guest.school} - ${guest.profession} - ${guest.work_country}`;
    publicGuestsList.appendChild(li);
  });
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.querySelector("#name");
    const surnameInput = document.querySelector("#surname");
    const emailInput = document.querySelector("#email");
    const yearInput = document.querySelector("#year");
    const addInfoInput = document.querySelector("#addInfo");
    const schoolInput = document.querySelector("#school");
    const professionInput = document.querySelector("#profession");
    const workCountryInput = document.querySelector("#workCountry");
    const websiteField = document.querySelector("#websiteField");

    if (
      !(nameInput instanceof HTMLInputElement) ||
      !(surnameInput instanceof HTMLInputElement) ||
      !(emailInput instanceof HTMLInputElement) ||
      !(yearInput instanceof HTMLInputElement) ||
      !(addInfoInput instanceof HTMLTextAreaElement) ||
      !(termsConsent instanceof HTMLInputElement)
    ) {
      if (websiteField.value !== "" || !websiteField) return;
      return;
    }

    const guestName = nameInput.value.trim().toLowerCase();
    const guestSurname = surnameInput.value.trim().toLowerCase();
    const email = emailInput.value.trim().toLowerCase();
    const year = Number(yearInput.value.trim());
    const addInfo = addInfoInput.value.trim();
    const school = schoolInput.value.trim();
    const profession = professionInput.value.trim();
    const workCountry = workCountryInput.value.trim();

    if (msg) {
      msg.style.color = "red";
      msg.textContent = "";
    }

    if (guestName.length < 3) {
      if (msg) {
        msg.textContent =
          "Imię musi składać się z co najmniej 3 znaków.";
      }
      return;
    }

    if (guestName.length > 66) {
      if (msg) {
        msg.textContent = "Imię jest za długie.";
      }
      return;
    }

    if (guestSurname.length < 3) {
      if (msg) {
        msg.textContent =
          "Nazwisko musi składać się z co najmniej 3 znaków.";
      }
      return;
    }

    if (guestSurname.length > 66) {
      if (msg) {
        msg.textContent = "Nazwisko jest za długie.";
      }
      return;
    }

    if (!emailInput.checkValidity()) {
      if (msg) {
        msg.textContent = "Podaj prawidłowy adres e-mail.";
      }
      return;
    }

    if (year < 1995 || year > 2026 || Number.isNaN(year)) {
      if (msg) {
        msg.textContent =
          "Rok ukończenia musi być między 1995 a 2026.";
      }
      return;
    }

    if (addInfo.length > 255) {
      if (msg) {
        msg.textContent =
          "Maksymalna długość dodatkowych informacji to 255 znaków.";
      }
      return;
    }

    if (!termsConsent.checked) {
      if (msg) {
        msg.textContent =
          "Aby wysłać formularz, zaakceptuj regulamin.";
      }
      termsConsent.focus();
      return;
    }

    const saved = await saveGuest(
      guestName,
      guestSurname,
      email,
      year,
      addInfo,
      school,
      profession,
      workCountry,
    );

    if (!saved) return;

    if (msg) {
      msg.style.color = "green";
      msg.textContent = "Zapisano pomyślnie.";
    }

    form.reset();
    await renderPublicGuests();
  });
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

renderPublicGuests();
