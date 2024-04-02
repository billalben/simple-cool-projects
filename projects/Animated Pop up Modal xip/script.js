const section = document.querySelector("section");
const hireBtn = section.querySelector("#hireBtn");
const closeBtn = section.querySelectorAll("#close");
const textArea = section.querySelector("textarea");
const submitBtn = section.querySelector(".send");

hireBtn.addEventListener("click", () => {
  section.classList.add("show");
  textArea.focus();
});

closeBtn.forEach((cBtn) => {
  cBtn.addEventListener("click", () => {
    section.classList.remove("show");
    textArea.value = "";
  });
});

submitBtn.addEventListener("click", () => {
  section.classList.remove("show");
  textArea.value = "";
});

textArea.addEventListener("input", () => {
  textArea.value !== ""
    ? submitBtn.classList.add("active")
    : submitBtn.classList.remove("active");
});
