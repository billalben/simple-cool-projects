const gradientBox = document.querySelector(".gradient-box");
const selectMenu = document.querySelector(".select-box select");
const colorInputs = document.querySelectorAll(".colors input");
const textarea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

const generateGradient = (isRandom) => {
  if (isRandom) {
    colorInputs.forEach((input) => (input.value = getRandomColor()));
  }

  const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value}, ${colorInputs[1].value})`;
  gradientBox.style.background = gradient;
  textarea.value = `background: ${gradient};`;
  document.body.style.background = gradient;
};

const copyCode = () => {
  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      copyBtn.innerText = "Code Copied";
      setTimeout(() => (copyBtn.innerText = "Copy Code"), 1600);
    })
    .catch((err) => console.error(err));
};

colorInputs.forEach((input) =>
  input.addEventListener("input", generateGradient)
);

selectMenu.addEventListener("change", generateGradient);
refreshBtn.addEventListener("click", () => generateGradient(true));
copyBtn.addEventListener("click", copyCode);

generateGradient(true);
