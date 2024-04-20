// Selecting elements
const passwordInput = document.querySelector(".password-box input");
const copyIcon = document.querySelector(".password-box .copy-icon");
const rangeInput = document.querySelector(".range-box input");
const sliderNumber = document.querySelector(".range-box .slider-number");
const generateButton = document.querySelector(".generate-button");

// Characters for password generation
const allCharacters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789^!$%&|[](){}:;.,*+-#@<>~";

// Function to generate a random password
const generatePassword = () => {
  let newPassword = "";
  for (let i = 0; i < rangeInput.value; i++) {
    let randomIndex = Math.floor(Math.random() * allCharacters.length);
    newPassword += allCharacters[randomIndex];
  }
  passwordInput.value = newPassword;
  copyIcon.classList.replace("uil-file-check-alt", "uil-copy");
};

// Update slider number text and generate password on input change
rangeInput.addEventListener("input", () => {
  sliderNumber.innerText = rangeInput.value;
  generatePassword();
});

// Copy password to clipboard on icon click
copyIcon.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.classList.replace("uil-copy", "uil-file-check-alt");
});

// Initial password generation and event listener for button click
generatePassword();
generateButton.addEventListener("click", generatePassword);
