function toggleAccordion(index) {
  const accordionItem =
    document.getElementsByClassName("accordion-item")[index];
  accordionItem.classList.toggle("active");
  const accordionBody = accordionItem.querySelector(".accordion-body");
  if (accordionItem.classList.contains("active")) {
    accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
  } else {
    accordionBody.style.maxHeight = "0";
  }
}
