// Ambil template course-card
const courseTemplate = document.getElementById('course-template');

// Ambil elemen list-course untuk menambahkan course-card yang diisi
const listCourse = document.querySelector('.list-course');

// Fetch data course dari REST API
function addCourses(){
  fetch('http://127.0.0.1:3333/course/course')
    .then(response => response.json())
    .then(courses => {
      // Loop melalui setiap course
      courses.forEach(course => {
        // Kloning template course-card
        const courseCard = courseTemplate.content.cloneNode(true);
        courseCard.querySelector('.course-card').setAttribute('data-idkelas', course.id_kelas);

        // Mengisi data ke dalam elemen-elemen pada template
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

        // Tambahkan course-card yang diisi ke list-course
        listCourse.appendChild(courseCard);
      });
      const courseCards = document.querySelectorAll('.course-card');
      courseCards.forEach(courseCard => {
        courseCard.addEventListener('click', () => {
          const idKelas = courseCard.dataset.idkelas;
          console.log(idKelas);
          // Lakukan operasi lain sesuai dengan ID kelas yang ditekan
        });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

addCourses();
