// Selecting necessary DOM elements
const captchaTextBox = document.querySelector(".captch_box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captch_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");

// Variable to store generated captcha
let captchaText = null;

// Function to generate captcha
const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomStringArray = randomString.split("");

  const changeString = randomStringArray.map((char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char
  );

  captchaText = changeString.join("   ");
  captchaTextBox.value = captchaText;
};

// Function to refresh captcha
const refreshCaptcha = () => {
  generateCaptcha();
  captchaInputBox.value = "";
  captchaInputBox.focus();
  message.classList.remove("active");
};

// Function to validate the entered captcha
const validateCaptcha = () => {
  captchaText = captchaText.split(" ").join("");

  message.classList.add("active");

  // Check if the entered captcha text is correct or not
  if (captchaInputBox.value === captchaText) {
    message.textContent = "Entered captcha is correct";
    message.style.color = "#826afb";
  } else {
    message.textContent = "Entered captcha is not correct";
    message.style.color = "#FF2525";
  }
};

// Function to handle keyup event on captcha input box
const handleCaptchaKeyUp = (e) => {
  if (e.key === "Enter") submitButton.click();

  // Toggle submit button disable class based on captcha input field.
  submitButton.classList.toggle("disabled", !captchaInputBox.value);

  if (!captchaInputBox.value) message.classList.remove("active");
};

// Add event listeners
refreshButton.addEventListener("click", refreshCaptcha);
captchaInputBox.addEventListener("keyup", handleCaptchaKeyUp);
submitButton.addEventListener("click", validateCaptcha);

// Generate a captcha when the page loads
generateCaptcha();
