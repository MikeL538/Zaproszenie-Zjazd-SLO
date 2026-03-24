import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://fmesivvwhqitrmlbwcdb.supabase.co";
const supabaseKey = "sb_publishable_kSmSt52th8XAYGbce3CtwA_uIdN8fKL";

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.querySelector("#form");
const msg = document.querySelector("#msg");
const publicGuestsList = document.querySelector("#publicGuestsList");

async function saveGuest(guestName, guestSurname, email, gradYear, addInfo) {
  const { error } = await supabase.from("guest_data").insert([
    {
      name: guestName,
      surname: guestSurname,
      e_mail: email,
      graduation: gradYear,
      add_info: addInfo,
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

  publicGuestsList.innerHTML = "";

  if (!guests.length) {
    const li = document.createElement("li");
    li.textContent = "Brak zapisanych osób.";
    publicGuestsList.appendChild(li);
    return;
  }

  guests.forEach((guest) => {
    const li = document.createElement("li");
    li.textContent = `${guest.display_name} - ${guest.graduation}`;
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

    if (
      !(nameInput instanceof HTMLInputElement) ||
      !(surnameInput instanceof HTMLInputElement) ||
      !(emailInput instanceof HTMLInputElement) ||
      !(yearInput instanceof HTMLInputElement) ||
      !(addInfoInput instanceof HTMLTextAreaElement)
    ) {
      return;
    }

    const guestName = nameInput.value.trim().toLowerCase();
    const guestSurname = surnameInput.value.trim().toLowerCase();
    const email = emailInput.value.trim().toLowerCase();
    const year = Number(yearInput.value.trim());
    const addInfo = addInfoInput.value.trim();

    if (msg) {
      msg.textContent = "";
    }

    if (guestName.length < 3) {
      if (msg)
        msg.textContent = "Imię musi składać się z co najmniej 3 znaków.";
      return;
    }

    if (guestName.length > 66) {
      if (msg) msg.textContent = "Imię jest za długie.";
      return;
    }

    if (guestSurname.length < 3) {
      if (msg)
        msg.textContent = "Nazwisko musi składać się z co najmniej 3 znaków.";
      return;
    }

    if (guestSurname.length > 66) {
      if (msg) msg.textContent = "Nazwisko jest za długie.";
      return;
    }

    if (!emailInput.checkValidity()) {
      if (msg) msg.textContent = "Podaj prawidłowy adres e-mail.";
      return;
    }

    if (year < 1950 || year > 2025 || Number.isNaN(year)) {
      if (msg) msg.textContent = "Rok ukończenia musi być między 1950 a 2025.";
      return;
    }

    if (addInfo.length > 255) {
      if (msg) {
        msg.textContent =
          "Maksymalna długość dodatkowych informacji to 255 znaków.";
      }
      return;
    }

    const saved = await saveGuest(
      guestName,
      guestSurname,
      email,
      year,
      addInfo,
    );

    if (!saved) return;

    if (msg) {
      msg.textContent = "Zapisano pomyślnie.";
    }

    form.reset();
    await renderPublicGuests();
  });
}

renderPublicGuests();
