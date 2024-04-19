const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("input");
const descriptionTag = popupBox.querySelector("textarea");
const addBtn = popupBox.querySelector("button");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false;
let updateId;

addBox.addEventListener("click", () => {
  popupTitle.textContent = "Add a new Note";
  addBtn.textContent = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descriptionTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
  if (!notes) return;

  document.querySelectorAll(".note").forEach((li) => li.remove());

  notes.forEach((note, id) => {
    const filterDescription = note.description.replaceAll("\n", "<br/>");

    const liTag = `
      <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${filterDescription}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li
                onclick="updateNote(${id}, '${note.title}', '${filterDescription}')"
              >
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick="deleteNote(${id})">
                <i class="uil uil-trash"></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
    `;

    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

showNotes();

function showMenu(element) {
  element.parentElement.classList.add("show");

  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != element) {
      element.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  const confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;

  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, filterDesc) {
  const description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descriptionTag.value = description;
  popupTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = titleTag.value.trim();
  const description = descriptionTag.value.trim();

  if (title || description) {
    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    const noteInfo = { title, description, date: `${month} ${day}, ${year}` };

    if (!isUpdate) notes.push(noteInfo);
    else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});
