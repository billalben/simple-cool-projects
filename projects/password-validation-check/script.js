// Selecting elements
const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li");

// Password requirements with corresponding regular expressions
const requirements = [
  { label: "Minimum of 8 characters", regex: /.{8,}/ },
  { label: "At least one number", regex: /[0-9]/ },
  { label: "At least one lowercase letter", regex: /[a-z]/ },
  { label: "At least one special character", regex: /[^A-Za-z0-9]/ },
  { label: "At least one uppercase letter", regex: /[A-Z]/ },
];

// Function to update the password requirements list
const updateRequirements = (value) => {
  requirements.forEach((requirement, index) => {
    const isValid = requirement.regex.test(value);
    const requirementItem = requirementList[index];

    requirementItem.classList.toggle("valid", isValid);
    requirementItem.firstElementChild.className = `fa-solid fa-${
      isValid ? "check" : "circle"
    }`;
  });
};

// Event listener for keyup on the password input
passwordInput.addEventListener("keyup", (e) => {
  updateRequirements(e.target.value);
});

// Event listener for click on the eye icon to toggle password visibility
eyeIcon.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  eyeIcon.className = `fa-solid fa-eye${
    passwordInput.type === "password" ? "" : "-slash"
  }`;
});
