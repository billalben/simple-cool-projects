// DOM Elements
const boxElements = document.querySelectorAll(".box");
const imageElement = document.querySelector(".image");

// Event listeners
const handleDragOver = (e) => {
  e.preventDefault(); // Prevent default behavior
  e.currentTarget.classList.add("hovered");
};

const handleDragLeave = (e) => {
  e.currentTarget.classList.remove("hovered");
};

const handleDrop = (e) => {
  e.currentTarget.appendChild(imageElement);
  e.currentTarget.classList.remove("hovered");
};

// Add event listeners to each box
boxElements.forEach((box) => {
  box.addEventListener("dragover", handleDragOver);
  box.addEventListener("dragleave", handleDragLeave);
  box.addEventListener("drop", handleDrop);
});
