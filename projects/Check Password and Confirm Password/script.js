const createPwInput = document.querySelector("#create_pw");
const confirmPwInput = document.querySelector("#confirm_pw");
const pwVisibilityToggle = document.querySelector(".show");
const errorIcon = document.querySelector(".error");
const errorText = document.querySelector(".text");
const submitButton = document.querySelector("#button");

pwVisibilityToggle.addEventListener("click", togglePasswordVisibility);
createPwInput.addEventListener("input", handlePasswordInput);
submitButton.addEventListener("click", checkPasswordMatch);

createPwInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") confirmPwInput.focus();
});
confirmPwInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") submitButton.click();
});

function togglePasswordVisibility() {
  const isPasswordVisible =
    createPwInput.type === "password" && confirmPwInput.type === "password";

  createPwInput.type = isPasswordVisible ? "text" : "password";
  confirmPwInput.type = isPasswordVisible ? "text" : "password";

  pwVisibilityToggle.classList.toggle("fa-eye-slash");
  pwVisibilityToggle.classList.toggle("fa-eye");
}

function handlePasswordInput() {
  const val = createPwInput.value.trim();

  if (val.length >= 8) {
    confirmPwInput.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
    submitButton.classList.add("active");
  } else {
    confirmPwInput.setAttribute("disabled", true);
    submitButton.setAttribute("disabled", true);
    submitButton.classList.remove("active");
    confirmPwInput.value = "";
    errorText.style.color = "#a6a6a6";
    errorText.innerText = "Enter at least 8 characters";
    errorIcon.style.display = "none";
  }
}

function checkPasswordMatch() {
  if (createPwInput.value === "") {
    errorText.innerText = "Please enter a password";
    errorText.style.color = "#D93025";
    errorIcon.style.display = "block";
  }
  else if (createPwInput.value === confirmPwInput.value) {
    errorText.innerText = "Password matched";
    errorIcon.style.display = "none";
    errorText.style.color = "#4070F4";
  } else {
    errorText.innerText = "Password didn't match";
    errorIcon.style.display = "block";
    errorText.style.color = "#D93025";
  }
}
