const $daysTag = document.querySelector(".days");
const $currentDate = document.querySelector(".current-date");
const $prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

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

const renderCalendar = () => {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfMonth
  ).getDay();
  const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    const isToday =
      i === date.getDate() &&
      currentMonth === date.getMonth() &&
      currentYear === date.getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  $currentDate.textContent = `${months[currentMonth]} ${currentYear}`;
  $daysTag.innerHTML = liTag;
};

const updateCalendar = (increment) => {
  currentMonth += increment;

  if (currentMonth < 0 || currentMonth > 11) {
    date = new Date(currentYear, currentMonth, date.getDate());
    currentYear = date.getFullYear();
    currentMonth = date.getMonth();
  } else date = new Date();

  renderCalendar();
};

renderCalendar();

$prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    updateCalendar(icon.id === "prev" ? -1 : 1);
  });
});
