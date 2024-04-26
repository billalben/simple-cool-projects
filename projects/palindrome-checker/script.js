const txtInput = document.querySelector("input");
const checkBtn = document.querySelector(".inputs button");
const infoTxt = document.querySelector(".info-txt");

let userInput = "";

checkBtn.addEventListener("click", checkReverse);

txtInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") checkBtn.click();

  if (event.target.value !== "") checkBtn.classList.add("active");
  else {
    checkBtn.classList.remove("active");
    infoTxt.style.display = "none";
  }
});

function checkReverse() {
  userInput = txtInput.value.trim().toLowerCase();

  const reverseInput = userInput.split("").reverse().join("");
  infoTxt.style.display = "block";

  if (userInput !== reverseInput)
    infoTxt.innerHTML = `No, <span> '${userInput}' </span> isn't a palindrome!`;
  else infoTxt.innerHTML = `Yes, <span>'${userInput}'</span> is a palindrome!`;
}
