const accordion = document.querySelectorAll(".silabus-accordion");

accordion.forEach(silabus => {
    silabus.addEventListener("click", () => {
        silabus.classList.toggle("active");
    })
});

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
  