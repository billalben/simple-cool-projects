// Ripple Effect JavaScript Code
const buttons = document.querySelectorAll(".button");
const t = null;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // preventing form submitting

    clearTimeout(t);

    const overlay = document.createElement("span"); //creating a tag(span)
    overlay.classList.add("overlay"); //adding a class inside the span
    e.target.appendChild(overlay); //adding overlay tag inside the anchor tag at in HTML

    const xValue = e.clientX - e.target.offsetLeft; //by this we get perfect value where we will click
    const yValue = e.clientY - e.target.offsetTop; //by this we get perfect value where we will click

    overlay.style.left = xValue + "px"; //changing the position of the overlay according to our clicks on the button
    overlay.style.top = yValue + "px"; //changing the position of the overlay according to our clicks on the button
  });

  button.addEventListener("click", (e) => {
    t = setTimeout(() => {
      const overlay = document.querySelector(".overlay");
      if (overlay) overlay.remove();
    }, 500);
  });
});
