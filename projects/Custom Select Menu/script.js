const selectBtn = document.querySelector(".select-btn");
const items = document.querySelectorAll(".item");
const btnText = document.querySelector(".btn-text");

selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
});

items.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("checked");

    const checked = document.querySelectorAll(".checked");

    if (checked.length > 0) btnText.textContent = `${checked.length} Selected`;
    else btnText.textContent = "Select Language";
  });
});
