//  Get references to the input element, alert message element, and alert box element
const inpDate = document.getElementById("inp-date");
const alertMsg = document.getElementById("alert-msg");
const alertBox = document.getElementById("alert-box");

inpDate.max = new Date().toISOString().split("T")[0];

document.getElementById("calc-btn").addEventListener("click", function () {
  // Check if the input date is empty
  if (!inpDate.value) {
    alertBox.style.top = "7%";
    setTimeout(function () {
      alertBox.style.top = "-20%"; // Hide alert after 3 seconds
    }, 3000);
    alertMsg.innerHTML = "Please enter a valid date.";
    return;
  }

  const birthDate = new Date(inpDate.value);
  const today = new Date();

  // Check if the birth date is in the future
  if (birthDate > today) {
    alertBox.style.top = "7%";
    setTimeout(function () {
      alertBox.style.top = "-20%"; // Hide alert after 3 seconds
    }, 3000);
    alertMsg.innerHTML =
      "The date entered is in the future. Please enter a valid birth date.";
    document.getElementById("years").textContent = "--";
    document.getElementById("months").textContent = "--";
    document.getElementById("days").textContent = "--";
    return;
  }
  // Calculate age
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }
  // Display the calculated age
  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;

  alertMsg.innerHTML = ""; // Clear any previous alert
});
