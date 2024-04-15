const search = document.querySelector(".search-box input");
const images = document.querySelectorAll(".image-box");

let timeoutId;

function debounce(func, delay) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
}

search.addEventListener("input", () => {
  debounce(() => {
    const searchValue = search.value.trim().toLowerCase();

    images.forEach((image) => {
      const imageName = image.dataset.name.toLowerCase();
      image.style.display = imageName.includes(searchValue) ? "block" : "none";
    });
  }, 600); // 600ms debounce delay
});

// search.addEventListener("input", () => {
//   debounce(() => {
//     const searchValue = search.value.trim().toLowerCase();

//     images.forEach((image) => {
//       image.style.display = "none";
//     });

//     images.forEach((image, index) => {
//       const imageName = image.dataset.name.toLowerCase();
//       image.style.display = imageName.includes(searchValue) ? "block" : "none";

//         setTimeout(() => {
//           image.style.display = imageName.includes(searchValue)
//             ? "block"
//             : "none";
//         }, 100 * index);

//         image.animate(
//           [
//             { opacity: "0", transform: "translateY(-50px)" },
//             { opacity: "1", transform: "translateY(0px)" },
//           ],
//           {
//             duration: 500,
//             fill: "forwards",
//           }
//         );
//     });
//   }, 600); // 600ms debounce delay
// });
