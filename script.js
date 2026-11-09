// Get the form
const form = document.querySelector("#age-form");
// Get input fields
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
// Get today's date
const today = new Date();
// Show error messages
function showError(input, message) {
  const field = document.querySelector(`#${input}-field`);

  field.querySelector(".error").textContent = message;

  field.querySelector("label").classList.add("text-red-500");

  field.querySelector("input").classList.add("border-red-500");
}
// Clear error messages
function clearErrors() {
  document.querySelectorAll(".field");

  document.querySelectorAll(".error").forEach((error) => {
    error.textContent = "";
  });

  document.querySelectorAll("label").forEach((label) => {
    label.classList.remove("text-red-500");
  });

  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("border-red-500");
  });
}
// Animate the result
function animateNumber(element, finalValue) {
  const duration = 700;

  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);

    const value = Math.floor(finalValue * progress);

    element.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
// Validate date
function validateDate(day, month, year) {
  let valid = true;

  // Day validation
  if (dayInput.value === "") {
    showError("day", "This field is required");

    valid = false;
  } else if (!Number.isInteger(day) || day < 1 || day > 31) {
    showError("day", "Must be a valid day");

    valid = false;
  }

  // Month validation
  if (monthInput.value === "") {
    showError("month", "This field is required");

    valid = false;
  } else if (!Number.isInteger(month) || month < 1 || month > 12) {
    showError("month", "Must be a valid month");

    valid = false;
  }

  // Year validation
  if (yearInput.value === "") {
    showError("year", "This field is required");

    valid = false;
  } else if (
    !Number.isInteger(year) ||
    year < 1 ||
    year > today.getFullYear()
  ) {
    showError("year", "Must be in the past");

    valid = false;
  }

  if (!valid) {
    return false;
  }

  // Check whether the date actually exists
  const birthDate = new Date(year, month - 1, day);

  const dateExists =
    birthDate.getFullYear() === year &&
    birthDate.getMonth() === month - 1 &&
    birthDate.getDate() === day;

  if (!dateExists) {
    showError("day", "Must be a valid date");

    return false;
  }

  // Check future dates
  if (birthDate > today) {
    showError("day", "Must be in the past");

    return false;
  }

  return birthDate;
}
// Calculate age
function calculateAge(birthDate) {
  let years = today.getFullYear() - birthDate.getFullYear();

  let months = today.getMonth() - birthDate.getMonth();

  let days = today.getDate() - birthDate.getDate();

  // Adjust days
  if (days < 0) {
    months--;

    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    days += previousMonth.getDate();
  }

  // Adjust months
  if (months < 0) {
    years--;

    months += 12;
  }

  return {
    years,
    months,
    days,
  };
}
// Form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Clear old errors
  clearErrors();

  // Get values
  const day = Number(dayInput.value);

  const month = Number(monthInput.value);

  const year = Number(yearInput.value);

  // Validate the date
  const birthDate = validateDate(day, month, year);

  if (!birthDate) {
    return;
  }

  // Calculate age
  const age = calculateAge(birthDate);

  // Display animated results
  animateNumber(document.querySelector("#years"), age.years);

  animateNumber(document.querySelector("#months"), age.months);

  animateNumber(document.querySelector("#days"), age.days);
});
