
function showContainer(index) {
  const containers = document.querySelectorAll('.detail > div');
  const menuItems = document.querySelectorAll('.menu-item');

  containers.forEach((container, i) => {
    if (i === index) {
      container.classList.add('active');
      menuItems[i].classList.add('active');

    } else {
      container.classList.remove('active');
      menuItems[i].classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const silabusTemplate = document.getElementById('silabus-template');
  const submissionTemplate = document.getElementById('submission-template')
  const silabusItemContainer = document.getElementById('silabus-item-container');
  const submissionItemContainer = document.getElementById('submission-item-container');
  const btnCart = document.querySelector('.button-cart');
  const btnBuy = document.querySelector('.button-buy');

  const about = document.getElementById('about-bootcamp');
  const judulKelas = document.getElementById('judul-kelas');
  const harga = document.getElementById('harga');
  const urlParams = new URLSearchParams(window.location.search);
  const idKelas = urlParams.get('idKelas');

  function addAbout() {
    fetch(`http://127.0.0.1:3333/course/${idKelas}`)
      .then(response => response.json())
      .then(course => {
        judulKelas.textContent = course.nama;
        about.textContent = course.deskripsi;
        harga.textContent = `RP. ${parseInt(course.harga).toLocaleString('id-ID')}`;
        document.body.style.opacity = '1';
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }
  addAbout();

  function addSilabus() {
    fetch(`http://127.0.0.1:3333/course/${idKelas}/silabus`)
      .then(response => response.json())
      .then(silabuses => {

        silabuses.forEach(silabus => {
          const silabusAcc = silabusTemplate.content.cloneNode(true);
          silabusAcc.querySelector('#title-silabus').textContent = silabus.title;
          silabusAcc.querySelector('#description-silabus').textContent = silabus.deskripsi;
          silabusItemContainer.appendChild(silabusAcc);
        });

        const accordion = document.querySelectorAll(".silabus-accordion");
        accordion.forEach(silabus => {
          silabus.addEventListener("click", () => {
            silabus.classList.toggle("active");
          })
        });

      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }
  addSilabus();

  function addSubmission() {
    fetch(`http://127.0.0.1:3333/course/${idKelas}/tugas`)
      .then(response => response.json())
      .then(submissions => {
        submissions.forEach(submission => {
          const submissionAcc = submissionTemplate.content.cloneNode(true);
          submissionAcc.querySelector("#judul-tugas").textContent = submission.judul;
          submissionAcc.querySelector('#deadline-tugas').textContent = `Deadline:${submission.deadline.substring(0, 10)}`;
          submissionAcc.querySelector('#deskripsi-tugas').textContent = submission.deskripsi;
          submissionItemContainer.appendChild(submissionAcc);
        });
        const accordionHead = document.querySelectorAll(".silabus-title");
        const accordion = document.querySelector(".submission-accordion");
        accordionHead.forEach(submission => {
          submission.addEventListener("click", () => {
            accordion.classList.toggle("active");
          })
        });
      })
      .catch(error => {
        console.error('Error: ', error.message)
      })
  }
  addSubmission();

  function tambahCart() {
    fetch(`http://127.0.0.1:3333/payment/cart/${idKelas}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        btnCart.textContent = 'Go to Cart';
      })
      .catch(error => {
        console.error('Error: ', error.message)
      })
  }

  btnCart.addEventListener('click', () => {
    tambahCart();
  });
  btnBuy.addEventListener('click', () => {
    window.location.href  = '../'
  })
});





