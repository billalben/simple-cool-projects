const taskInput = document.querySelector(".task-input input");
const filters = document.querySelector(".filters");
const clearAll = document.querySelector(".clear-btn");
const taskBox = document.querySelector(".task-box");

let editId;
let isEditTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

filters.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    const filter = e.target.id;
    document.querySelector("span.active").classList.remove("active");
    e.target.classList.add("active");
    showTodo(filter);
  }
});

function createTaskHTML(todo, id) {
  const completed = todo.status === "completed" ? "checked" : "";

  return `<li class="task">
              <label for="${id}">
                  <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                  <p class="${completed}">${todo.name}</p>
              </label>
              <div class="settings">
                  <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                  <ul class="task-menu">
                      <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                      <li onclick='deleteTask(${id}, "${todo.status}")'><i class="uil uil-trash"></i>Delete</li>
                  </ul>
              </div>
          </li>`;
}

function showTodo(filter) {
  const filteredTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.status === filter);

  const liTags = filteredTodos
    .map((todo, id) => createTaskHTML(todo, id))
    .join("");

  taskBox.innerHTML = liTags || `<span>You don't have any task here</span>`;
  clearAll.classList.toggle("active", filteredTodos.length > 0);
  taskBox.classList.toggle("overflow", taskBox.offsetHeight >= 300);
}

function showMenu(selectedTask) {
  const menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.toggle("show");

  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "I" || e.target !== selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function updateStatus(selectedTask) {
  const taskName = selectedTask.parentElement.lastElementChild;
  const id = Number(selectedTask.id);
  todos[id].status = selectedTask.checked ? "completed" : "pending";
  taskName.classList.toggle("checked", selectedTask.checked);
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
}

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
});

taskInput.addEventListener("keyup", (e) => {
  const userTask = taskInput.value.trim();

  if (e.key === "Enter" && userTask) {
    if (!isEditTask) {
      todos.push({ name: userTask, status: "pending" });
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }

    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  }
});

showTodo("all");
