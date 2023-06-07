fetch('http://127.0.0.1:3333/auth/check', {
  method: 'POST',
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => {
    console.log('data.message:', data.message);
    const path = window.location.pathname;
    const relativePath = path.substring(path.lastIndexOf('/') + 1);
    console.log('relativePath:', relativePath);

    if (data.message === 'not logged in') {
      window.location.href = '../log_reg.html';
    } else {

    }
  })
  .catch(error => {
    console.log(error);
  });
  
const courseTemplate = document.getElementById('course-template');
const listCourse = document.querySelector('.list-course');
const namaPengajar = document.getElementById('box-nama-pengajar');
const namaKelas = document.getElementById('box-nama-kelas');
const deskripsiKelas = document.getElementById('box-deskripsi-kelas');
const btnLearnNow = document.getElementById('btn-learn-now');

function addCourses() {

  fetch('http://mini-alb-436703962.ap-southeast-1.elb.amazonaws.com/course/notRegistered')
    .then(response => response.json())
    .then(courses => {
      courses.forEach(course => {
        const courseCard = courseTemplate.content.cloneNode(true);
        courseCard.querySelector('.course-card').setAttribute('data-idkelas', course.id_kelas);

        courseCard.querySelector('#kategori').textContent = course.id_kategori;
        courseCard.querySelector('#waktu').textContent = course.waktu;
        courseCard.querySelector('#nama-kelas').textContent = course.nama;

        if (course.deskripsi.length > 100) {
          const potonganDeskripsi = course.deskripsi.slice(0, 100) + '...';
          courseCard.querySelector('#deskripsi-kelas').textContent = potonganDeskripsi;
        } else {
          courseCard.querySelector('#deskripsi-kelas').textContent = course.deskripsi;
        }

        const hargaKelas = course.harga;
        const hargaIDRFormat = parseInt(hargaKelas).toLocaleString('id-ID');
        courseCard.querySelector('#harga-kelas').textContent = `Rp. ${hargaIDRFormat}`;

        listCourse.appendChild(courseCard);
      });
      //const detailCourse = document.querySelectorAll('.detail-kelas-location');
      const courseCards = document.querySelectorAll('.course-card');
      courseCards.forEach(courseCard => {
        const idKelas = courseCard.dataset.idkelas;
        courseCard.addEventListener('click', () => {
          console.log(idKelas);
          window.location.href = `../Pelajar/courseDetail.html?idKelas=${idKelas}`;
        });
      });
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}
addCourses();

const contentBox = document.querySelector('.content');
function addRandCourse() {
  fetch('http://127.0.0.1:3333/course/rand')
    .then(response => response.json())
    .then(course => {
      contentBox.setAttribute('data-idkelas', course.id_kelas);
      namaPengajar.textContent = course.pengajar.nama;
      namaKelas.textContent = course.nama;
      deskripsiKelas.textContent = course.deskripsi;
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}
addRandCourse();
btnLearnNow.addEventListener('click', (event) => {
  event.preventDefault();
  const idKelas = contentBox.dataset.idkelas;
  window.location.href = `../Pelajar/courseDetail.html?idKelas=${idKelas}`;
});
