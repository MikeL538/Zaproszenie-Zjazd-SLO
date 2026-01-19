import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://fmesivvwhqitrmlbwcdb.supabase.co";
const supabaseKey = "sb_publishable_kSmSt52th8XAYGbce3CtwA_uIdN8fKL";

const supabase = createClient(supabaseUrl, supabaseKey);

async function saveGuest(guestName, guestSurname, eMail, gradYear, addInfo) {
  const { data, error } = await supabase.from("guest_data").insert([
    {
      name: guestName,
      surname: guestSurname,
      e_mail: eMail,
      graduation: gradYear,
      add_info: addInfo,
    },
  ]);

  if (error) {
    console.error(error);
    alert("Błąd przy zapisywaniu!");
    return;
  }

  alert("Zapisano!");
}

// HANDLER FOR register form request
const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const guestName = document.querySelector("#name").value.trim().toLowerCase();
  const guestSurname = document
    .querySelector("#surname")
    .value.trim()
    .toLowerCase();
  const email = document.querySelector("#email");
  const year = document.querySelector("#year").value.trim();
  const addInfo = document.querySelector("#addInfo").value.trim();
  const msg = document.querySelector("#msg");

  if (guestName.length < 3) {
    msg.textContent = "Imię musi składać się z co najmniej 3 znaków.";
    return;
  }
  if (guestName.length > 66) {
    msg.textContent = "Imię jest za długie.";
    return;
  }

  if (guestSurname.length < 3) {
    msg.textContent = "Nazwisko musi składać się z co najmniej 3 znaków.";
    return;
  }
  if (guestSurname.length > 66) {
    msg.textContent = "Nazwisko jest za długie.";
    return;
  }

  if (!email.checkValidity()) {
    msg.textContent = "Podaj prawidłowy adres e-mail.";
    return;
  }

  if (year < 1950 || year > 2025) {
    msg.textContent = "Rok ukończenia musi być między 1950 a 2025.";
    return;
  }

  if (addInfo.length > 255) {
    msg.textContent =
      "Maksymalna długość dodatkowych informacji to 255 znaków.";
    return;
  }

  msg.textContent = "";

  saveGuest(
    guestName,
    guestSurname,
    email.value.trim().toLowerCase(),
    year,
    addInfo,
  );
});
