const accordion = document.querySelectorAll(".silabus-accordion");

accordion.forEach(silabus => {
    silabus.addEventListener("click", () => {
        silabus.classList.toggle("active");
    })
})