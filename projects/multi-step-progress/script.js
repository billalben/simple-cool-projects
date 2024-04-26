const circles = document.querySelectorAll(".circle");
const progressBar = document.querySelector(".indicator");
const buttons = document.querySelectorAll("button");

let currentStep = 1;

const updateButtons = () => {
  buttons[0].disabled = currentStep === 1;
  buttons[1].disabled = currentStep === circles.length;
};

const updateProgressBar = () => {
  const progress = ((currentStep - 1) / (circles.length - 1)) * 100;
  progressBar.style.width = `${progress}%`;
};

const updateCircles = () => {
  circles.forEach((circle, index) => {
    circle.classList.toggle("active", index < currentStep);
  });
};

const updateSteps = (e) => {
  currentStep = e.target.id === "next" ? currentStep + 1 : currentStep - 1;
  updateButtons();
  updateProgressBar();
  updateCircles();
};

buttons.forEach((button) => {
  button.addEventListener("click", updateSteps);
});

updateButtons();
updateProgressBar();
updateCircles();
