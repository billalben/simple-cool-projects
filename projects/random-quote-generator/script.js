const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const speechBtn = document.querySelector(".speech");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");
const synth = speechSynthesis;

async function fetchQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  try {
    const response = await fetch("https://api.quotable.io/random");
    const result = await response.json();
    quoteText.innerText = result.content;
    authorName.innerText = result.author;
    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "New Quote";
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    quoteBtn.innerText = "Failed to fetch quote. Try again.";
  }
}

function speakQuote() {
  if (!quoteBtn.classList.contains("loading")) {
    let quoteUtterance = new SpeechSynthesisUtterance(quoteText.innerText);
    let authorUtterance = new SpeechSynthesisUtterance(
      `by ${authorName.innerText}`
    );

    // Set the rate for a more realistic speed
    quoteUtterance.rate = 0.8;
    authorUtterance.rate = 0.8;

    // Speak the quote first
    synth.speak(quoteUtterance);

    // After the quote is finished, speak the author's name
    quoteUtterance.onend = () => {
      synth.speak(authorUtterance);
    };

    let intervalId = setInterval(() => {
      if (!synth.speaking) {
        clearInterval(intervalId);
        speechBtn.classList.remove("active");
      } else {
        speechBtn.classList.add("active");
      }
    }, 500);
  }
}

function copyQuote() {
  navigator.clipboard
    .writeText(quoteText.innerText)
    .then(() => {
      // Change the icon to clipboard
      const icon = copyBtn.querySelector("i");
      icon.classList.remove("fa-clipboard");
      icon.classList.add("fa-clipboard-check");

      // Change the icon back to copy after a delay
      setTimeout(() => {
        icon.classList.remove("fa-clipboard");
        icon.classList.add("fa-copy");
      }, 1000); // Change back after 1 second (1000 milliseconds)
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
}

function shareOnTwitter() {
  let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} by ${authorName.innerText}`;
  window.open(tweetUrl, "_blank");
}

quoteBtn.addEventListener("click", fetchQuote);
speechBtn.addEventListener("click", speakQuote);
copyBtn.addEventListener("click", copyQuote);
twitterBtn.addEventListener("click", shareOnTwitter);
