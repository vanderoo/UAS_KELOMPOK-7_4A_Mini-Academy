var form = document.getElementById("log-reg-form");

buttonLogin.addEventListener("click", () => {
    let isValid = form.checkValidity();
    if (isValid) {
        console.log("Berhasil");
      } else {
        console.log("Isi semua!");
      }
    
})