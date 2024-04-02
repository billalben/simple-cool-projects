import { allCharacters } from "./chars.js";

const captcha = document.querySelector(".captcha");
const reloadBtn = document.querySelector(".reload-btn");
const inputField = document.querySelector(".input-area input");
const checkBtn = document.querySelector(".check-btn");
const statusTxt = document.querySelector(".status-text");

function getCaptcha() {
  captcha.textContent = Array.from({ length: 6 }, () =>
    getRandomCharacter()
  ).join(" ");
}

function getRandomCharacter() {
  return allCharacters[Math.floor(Math.random() * allCharacters.length)];
}

function reloadCaptcha() {
  removeContent();
  getCaptcha();
  inputField.focus();
}

function checkCaptcha(e) {
  e.preventDefault();

  statusTxt.style.display = "block";
  const inputVal = inputField.value.split("").join(" ");

  if (inputVal === captcha.textContent) {
    statusTxt.style.color = "#4db2ec";
    statusTxt.innerText = "Nice! You don't appear to be a robot.";

    setTimeout(() => {
      reloadCaptcha();
    }, 2500);
  } else {
    statusTxt.style.color = "#ff0000";
    statusTxt.innerText = "Captcha not matched. Please try again!";
  }
}

function removeContent() {
  inputField.value = "";
  captcha.innerText = "";
  statusTxt.style.display = "none";
}

getCaptcha();
reloadBtn.addEventListener("click", reloadCaptcha);
checkBtn.addEventListener("click", checkCaptcha);
