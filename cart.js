const cartItemsSection = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");
const checkoutBtn = document.getElementById("checkoutBtn");
const emptyMsg = document.getElementById("emptyMsg");
const themeToggle = document.getElementById("themeToggle");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function renderCart() {
  if(cart.length === 0) {
    cartItemsSection.innerHTML = "";
    cartSummary.innerHTML = "";
    checkoutBtn.disabled = true;
    emptyMsg.textContent = "Your cart is empty.";
    return;
  }
  emptyMsg.textContent = "";
  checkoutBtn.disabled = false;

  cartItemsSection.innerHTML = cart.map(item => `
    <div class="cart-item" tabindex="0" aria-label="${item.name}, quantity ${item.qty}, price ₹${item.price}">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <div class="cart-qty" aria-label="Change quantity for ${item.name}">
          <button aria-label="Decrease quantity" onclick="decreaseQty(${item.id})">−</button>
          <span>${item.qty}</span>
          <button aria-label="Increase quantity" onclick="increaseQty(${item.id})">+</button>
        </div>
        <button aria-label="Remove ${item.name} from cart" onclick="removeItem(${item.id})" style="margin-top:0.5rem; background:#cc0000;">Remove</button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartSummary.innerHTML = `<p>Total: ₹${total.toFixed(2)}</p>`;
}

function increaseQty(id) {
  const item = cart.find(i => i.id === id);
  if(item) {
    item.qty++;
    saveCart();
    renderCart();
  }
}

function decreaseQty(id) {
  const item = cart.find(i => i.id === id);
  if(item) {
    item.qty--;
    if(item.qty <= 0) {
      removeItem(id);
    } else {
      saveCart();
      renderCart();
    }
  }
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function initTheme() {
  if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}

window.onload = () => {
  initTheme();
  updateCartCount();
  renderCart();
};

themeToggle.addEventListener("click", toggleTheme);

window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.removeItem = removeItem;
