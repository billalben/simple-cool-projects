const sortableList = document.querySelector(".sortable-list");

const handleDragStart = (e) => {
  const item = e.target;
  // Adding dragging class to item after a delay
  setTimeout(() => item.classList.add("dragging"), 0);
};

const handleDragEnd = (e) => {
  const item = e.target;
  item.classList.remove("dragging");
};

const initSortableList = (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  // Getting all items except currently dragging and making an array of them
  let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

  // Finding the sibling after which the dragging item should be placed
  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  // Inserting the dragging item before the found sibling
  sortableList.insertBefore(draggingItem, nextSibling);
};

sortableList.addEventListener("dragstart", handleDragStart);
sortableList.addEventListener("dragend", handleDragEnd);
sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", (e) => e.preventDefault());
