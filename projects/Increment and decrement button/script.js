"use strict";

const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const num = document.querySelector(".num");

let a = 1;

function updateNumber() {
  num.innerText = a.toString().padStart(2, "0");
}

plus.addEventListener("click", () => {
  a = Math.min(99, a + 1); // Limit a to 99
  updateNumber();
});

minus.addEventListener("click", () => {
  a = Math.max(1, a - 1); // Limit a to 1
  updateNumber();
});
