const userAgent = navigator.userAgent.toLowerCase();
let browser = "";

switch (true) {
  case /edg/.test(userAgent):
    browser = "edge";
    break;
  case /firefox|fxios/.test(userAgent):
    browser = "firefox";
    break;
  case /opr\//.test(userAgent):
    browser = "opera";
    break;
  case /chrome|chromium|crios/.test(userAgent):
    browser = "chrome";
    break;
  case /safari/.test(userAgent):
    browser = "safari";
    break;
  default:
    browser = "other";
    break;
}

const logo = document.querySelector(`.logos .${browser}`);
if (logo) logo.style.opacity = "1";
