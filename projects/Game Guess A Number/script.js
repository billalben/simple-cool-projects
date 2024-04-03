// Get the DOM elements
const input = document.querySelector("input");
const guess = document.querySelector(".guess");
const checkButton = document.querySelector("button");
const remainChances = document.querySelector(".chances");

// Initialize game
input.focus();
const randomNum = Math.floor(Math.random() * 100);
let chance = 10;

// Listen for click event on check button
checkButton.addEventListener("click", () => {
  if (checkButton.textContent === "Replay") {
    location.reload();
    return;
  }

  chance--;
  let inputValue = parseInt(input.value);

  if (inputValue == randomNum) {
    guess.textContent = "Congratulations";
    input.disabled = true;
    checkButton.textContent = "Replay";
    guess.style.color = "#333";
  } else if (inputValue > randomNum && inputValue < 100) {
    updateGuess(`Your guess ${inputValue} is high`, chance);
  } else if (inputValue < randomNum && inputValue > 0) {
    updateGuess(`Your guess ${inputValue} is low`, chance);
  } else {
    updateGuess("Your number is invalid", chance, "#DE0611");
  }

  if (chance <= 0) {
    checkButton.textContent = "Replay";
    input.disabled = true;
    input.value = "";
    updateGuess("You lost the game", 0, "#DE0611");
  }
});

// Listen for Enter key press on input
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkButton.click();
    input.value = "";
  }
});

// Function to update guess text and remaining chances
function updateGuess(text, remainingChances, color = "#333") {
  guess.textContent = text;
  remainChances.textContent = remainingChances;
  guess.style.color = color;
}
