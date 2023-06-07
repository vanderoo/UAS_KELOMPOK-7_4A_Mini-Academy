var form = document.getElementById("log-reg-form");
const checkBoxMentor = document.getElementById('checkbox-mentor');
const nama = document.getElementById('nama');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const conpas = document.getElementById('con-pass');
let role;

buttonLogin.addEventListener("click", () => {
  if (window.location.hash.slice(1) === "register") {
    // Registrasi
    if (checkBoxMentor.checked === true) {
      role = 'pengajar';
    } else {
      role = 'pelajar';
    }

    if (!validateForm()) {
      return;
    }

    let data = {
      nama: nama.value,
      email: email.value,
      username: username.value,
      password: password.value,
      conPas: conpas.value,
      role: role
    }

    fetch('http://127.0.0.1:3333/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Registrasi Berhasil',
            text: data.message
          });
          form.reset();
        } else if (data.status == 400) {
          Swal.fire({
            icon: 'error',
            title: 'Registrasi Gagal',
            text: data.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Terjadi Kesalahan',
            text: data.message
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Terjadi Kesalahan',
          text: 'Terjadi kesalahan saat melakukan registrasi'
        });
      });
  }else{

    if (!validateFormLogin()) {
      return;
    }

    let data = {
      username: username.value,
      password: password.value
    }
    fetch('http://127.0.0.1:3333/auth/login', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Login Berhasil',
            text: data.message,
            timer: 1000, 
            showConfirmButton: false 
          });
      
          setTimeout(() => {
            window.location.href = 'index.html'; 
          }, 1000); 
          form.reset();
        } else if (data.status == 400) {
          Swal.fire({
            icon: 'error',
            title: 'Login Gagal',
            text: data.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Terjadi Kesalahan',
            text: data.message
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Terjadi Kesalahan',
          text: 'Terjadi kesalahan saat melakukan Login'
        });
      });
  }
});

function validateFormLogin(){
  let isValid = true;
  if (username.value.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Kolom Username harus diisi',
    });
    isValid = false;
  }else if (password.value.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Kolom Password harus diisi',
    });
    isValid = false;
  }
  return isValid;
}

function validateForm() {
  let isValid = true;

  if (nama.value.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Kolom Nama harus diisi',
    });
    isValid = false;
  }else if (email.value.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Kolom Email harus diisi',
    });
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    Swal.fire({
      icon: 'warning',
      title: 'Email tidak valid',
    });
    isValid = false;
  }else if (username.value.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Kolom Username harus diisi',
    });
    isValid = false;
  }else if (password.value.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Kolom Password harus diisi',
    });
    isValid = false;
  }else if (conpas.value.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Kolom Konfirmasi Password harus diisi',
    });
    isValid = false;
  } else if (password.value.trim() !== conpas.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Konfirmasi Password tidak cocok',
    });
    isValid = false;
  }

  return isValid;
}

function isValidEmail(email) {
  // Validasi format email menggunakan regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
