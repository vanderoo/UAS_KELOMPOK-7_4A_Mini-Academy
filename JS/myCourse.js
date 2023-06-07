document.addEventListener('DOMContentLoaded', () => {
  const courseTemplate = document.getElementById('course-template');

  const waitingPaymentContainer = document.querySelector('.waitingFP-container');
  const waitingPaymentCourses = document.getElementById('waitingPayment');
  const notRegisteredCourses = document.getElementById('notRegistered');
  const myCourses = document.getElementById('myCourse');
  const contentKosong = document.querySelector('.content');
  const listCourse = document.querySelector('.list-myCourse-container');

  const urls = {
    myCourse: 'http://127.0.0.1:3333/course/myCourse',
    notRegistered: 'http://127.0.0.1:3333/course/notRegistered',
    waitingPayment: 'http://127.0.0.1:3333/course/waitingPayment'
  }
  function addCourses(container) {
    const url = urls[container.id]
    console.log(`${container.id} : ${urls[container.id]}`)
    fetch(url, {
      credentials:"include"
    })
      .then(response => response.json())
      .then(courses => {
        if (courses.length === 0 && container.id === 'myCourse') {
          contentKosong.style.display = 'block';
          listCourse.style.display = 'none';
        } else {
          if(container.id === 'myCourse'){
            contentKosong.style.display = 'none';
            listCourse.style.display = 'block';
          }
          if(container.id === 'waitingPayment' && courses.length > 0){
            waitingPaymentContainer.style.display = 'block';
          }

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

            container.appendChild(courseCard);

          });
          const courseCards = document.querySelectorAll('.course-card');
          courseCards.forEach(courseCard => {
            const idKelas = courseCard.dataset.idkelas;
            courseCard.addEventListener('click', () => {
              console.log(idKelas);
              window.location.href = `../Pelajar/courseDetail.html?idKelas=${idKelas}`;
            });
          });
          document.body.style.opacity = '1';
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  addCourses(myCourses);
  addCourses(waitingPaymentCourses);
  addCourses(notRegisteredCourses);
});
