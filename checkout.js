const checkoutForm = document.getElementById("checkoutForm");
const orderStatus = document.getElementById("orderStatus");
const themeToggle = document.getElementById("themeToggle");

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function initTheme() {
  if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}

checkoutForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!checkoutForm.checkValidity()) {
    orderStatus.style.color = "red";
    orderStatus.textContent = "Please fill all required fields correctly.";
    return;
  }

  // Simulate order processing
  orderStatus.style.color = "#0077cc";
  orderStatus.textContent = "Processing your order...";

  setTimeout(() => {
    orderStatus.style.color = "green";
    orderStatus.textContent = "Thank you for your purchase! Your order has been placed.";

    // Clear cart
    localStorage.removeItem("cart");

    // Reset form
    checkoutForm.reset();
  }, 1500);
});

window.onload = () => {
  initTheme();
};

themeToggle.addEventListener("click", toggleTheme);
