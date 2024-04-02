const ul = document.querySelector("ul");
const input = document.querySelector("input");
const tagNumb = document.querySelector(".details span");

const maxTags = 10;
let tags = ["coding", "billal"];

loadTagsFromLocalStorage();
countTags();
createTag();

function loadTagsFromLocalStorage() {
  if (localStorage.getItem("tags")) {
    tags = JSON.parse(localStorage.getItem("tags"));
  } else {
    localStorage.setItem("tags", JSON.stringify(tags));
  }
}

function countTags() {
  input.focus();
  tagNumb.textContent = maxTags - tags.length;
}

function createTag() {
  ul.innerHTML = "";
  // ul.querySelectorAll("li").forEach((li) => li.remove());

  const tagList = tags.map((tag) => {
    return `<li>${tag} <i class="uit uit-multiply" data-tag="${tag}"></i></li>`;
  });

  ul.insertAdjacentHTML("afterbegin", tagList.join(""));
  localStorage.setItem("tags", JSON.stringify(tags));
  countTags();
}

function removeTag(tag) {
  const index = tags.indexOf(tag);
  tags.splice(index, 1);
  localStorage.setItem("tags", JSON.stringify(tags));
  createTag();
  checkInput(tags, maxTags);
}

function addTag(e) {
  if (e.key === "Enter") {
    const tag = e.target.value.replace(/\s+/g, " ");

    if (tag.length > 1 && !tags.includes(tag.toLowerCase())) {
      if (tags.length < maxTags) {
        tag.split(",").forEach((tag) => {
          tags.push(tag.trim());
        });
        createTag();
      }
    }
    e.target.value = "";

    checkInput(tags, maxTags);
  }
}

input.addEventListener("keyup", addTag);

const removeBtn = document.querySelector(".details button");

removeBtn.addEventListener("click", () => {
  tags = [];
  localStorage.setItem("tags", JSON.stringify(tags));

  // ul.querySelectorAll("li").forEach((li) => li.remove());
  ul.innerHTML = "";

  checkInput(tags, maxTags);
  countTags();
});

function checkInput(tags, maxTags) {
  if (tags.length >= maxTags) {
    input.disabled = true;
    input.placeholder = "You have reached the maximum limit of tags";
  } else {
    input.disabled = false;
    input.placeholder = "Add more tags";
  }
}

ul.addEventListener("click", (e) => {
  if (e.target.matches("i")) {
    const tag = e.target.dataset.tag;
    removeTag(tag);
  }
});
