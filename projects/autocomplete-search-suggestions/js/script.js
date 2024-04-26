import { suggestions } from "./suggestions.js";

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggestionBox = searchWrapper.querySelector(".autocomplete-box");
const icon = searchWrapper.querySelector(".icon");
const linkTag = searchWrapper.querySelector("a");

function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout => setTimeout(() => fn.apply(this, args), delay);
  }
}

inputBox.addEventListener("keyup", handleKeyUp);
suggestionBox.addEventListener("click", handleSuggestionClick);

function handleKeyUp(e) {
  const userData = e.target.value.toLowerCase();
  const filteredSuggestions = suggestions.filter((data) =>
    data.toLowerCase().startsWith(userData)
  );

  if (userData) {
    icon.addEventListener("click", handleIconClick);
    searchWrapper.classList.add("active");
    showSuggestions(filteredSuggestions);
  } else {
    searchWrapper.classList.remove("active");
  }
}

function handleIconClick() {
  const userData = inputBox.value;
  const webLink = `https://www.google.com/search?q=${userData}`;
  linkTag.setAttribute("href", webLink);
  linkTag.click();
}

function handleSuggestionClick(e) {
  if (e.target.tagName === "LI") {
    const selectData = e.target.textContent;
    inputBox.value = selectData;
    handleIconClick();
    searchWrapper.classList.remove("active");
  }
}

function showSuggestions(list) {
  const listData = list.map((data) => `<li>${data}</li>`).join("");
  suggestionBox.innerHTML = listData;
}
