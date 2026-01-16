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
const btnGuest = document.querySelector("#btnGuest");
btnGuest.addEventListener("click", (e) => {
  e.preventDefault();
  const guestName = document.querySelector("#name").value;
  const guestSurname = document.querySelector("#surname").value;
  const email = document.querySelector("#email").value;
  const year = document.querySelector("#year").value;
  const message = document.querySelector("#message").value;

  saveGuest(guestName, guestSurname, email, year, message);
});

// PREVENTS / REQUIRES
// Max signs for inputs and textareas
function setMaxSigns() {
  const guestName = document.querySelector("#name").length;
  const guestSurname = document.querySelector("#surname");
  const email = document.querySelector("#email");
  const year = document.querySelector("#year");
  const message = document.querySelector("#message");

  console.lop(guestName);
}
