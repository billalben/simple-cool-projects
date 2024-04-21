const elements = {
  seconds: document.querySelector(".seconds .number"),
  minutes: document.querySelector(".minutes .number"),
  hours: document.querySelector(".hours .number"),
  days: document.querySelector(".days .number"),
};

let values = {
  seconds: 11,
  minutes: 2,
  hours: 2,
  days: 9,
};

function updateValue(key, value) {
  elements[key].textContent = String(value).padStart(2, "0");
}

const timeFunction = setInterval(() => {
  values.seconds--;

  if (values.seconds === 0) {
    values.minutes--;
    values.seconds = 59;
  }
  if (values.minutes === 0) {
    values.hours--;
    values.minutes = 59;
  }
  if (values.hours === 0) {
    values.days--;
    values.hours = 23;
  }

  if (values.days === 0) clearInterval(timeFunction);

  updateValue("seconds", values.seconds);
  updateValue("minutes", values.minutes);
  updateValue("hours", values.hours);
  updateValue("days", values.days);
}, 1000);
