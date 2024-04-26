const $section = document.querySelector("section");
const $hireBtn = $section.querySelector("[data-hire-btn]");
const $closeBtn = $section.querySelectorAll("[data-close]");
const $textArea = $section.querySelector("textarea");
const $submitBtn = $section.querySelector("[data-submit]");

$hireBtn.addEventListener("click", () => {
  $section.classList.add("show");
  $textArea.focus();
});

$closeBtn.forEach((cBtn) => {
  cBtn.addEventListener("click", (e) => {
    e.preventDefault();
    $section.classList.remove("show");
    $textArea.value = "";
  });
});

$submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  $section.classList.remove("show");
  $textArea.value = "";
});

$textArea.addEventListener("input", () => {
  $textArea.value !== ""
    ? $submitBtn.classList.add("active")
    : $submitBtn.classList.remove("active");
});
