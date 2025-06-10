// Elements
const productGrid = document.getElementById("productGrid");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
const cartCount = document.getElementById("cartCount");
const themeToggle = document.getElementById("themeToggle");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
}

// Add to cart handler
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart`);
}

// Render products based on filters
function renderProducts() {
  const searchTerm = searchBox.value.toLowerCase();
  const category = categoryFilter.value;
  const sort = priceSort.value;

  let filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) &&
    (category === "all" || p.category === category)
  );

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  productGrid.innerHTML = filtered.map(p => `
    <article class="product-card" tabindex="0" aria-label="${p.name}, Price: ₹${p.price}">
      <img src="${p.image}" alt="${p.name}" />
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-category">${p.category}</p>
        <p class="product-price">₹${p.price}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${p.id})" aria-label="Add ${p.name} to cart">Add to Cart</button>
      </div>
    </article>
  `).join("");
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
  renderProducts();
};

searchBox.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
priceSort.addEventListener("change", renderProducts);
themeToggle.addEventListener("click", toggleTheme);

// Expose addToCart globally for inline onclick
window.addToCart = addToCart;
