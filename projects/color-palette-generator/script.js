const container = document.querySelector(".container");
const refreshBtn = document.querySelector(".refresh-btn");
const maxPaletteBoxes = 30;
let timeoutId = null;

const generatePalette = () => {
  container.innerHTML = "";

  for (let i = 0; i < maxPaletteBoxes; i++) {
    const randomHex = generateRandomHex();

    const color = createColorElement(randomHex);
    color.addEventListener("click", () => copyColor(color, randomHex));

    container.appendChild(color);
  }
};

const generateRandomHex = () => {
  // Generate a random integer between 0 and 16777215 (0xFFFFFF in hexadecimal)
  const randomInt = Math.floor(Math.random() * 0xffffff);

  // Convert the random integer to a hexadecimal string and pad with zeros if necessary
  return `#${randomInt.toString(16).padStart(6, "0")}`;
};

const createColorElement = (hexVal) => {
  const color = document.createElement("li");
  color.classList.add("color");
  color.innerHTML = `
    <div class="rect-box" style="background: ${hexVal}"></div>
    <span class="hex-value">${hexVal}</span>
  `;

  return color;
};

const copyColor = (element, hexVal) => {
  const colorElement = element.querySelector(".hex-value");
  navigator.clipboard
    .writeText(hexVal)
    .then(() => {
      colorElement.innerText = "Copied";

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => (colorElement.innerText = hexVal), 1000);
    })
    .catch(() => alert("Failed to copy the color code!"));
};

generatePalette();

refreshBtn.addEventListener("click", generatePalette);
