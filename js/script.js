// Dark & Light toggle

const toggleSwitch = document.querySelector('.day-night input[type="checkbox"]');

toggleSwitch.addEventListener("change", () => {
  document.querySelector("body").classList.toggle("light");
});
