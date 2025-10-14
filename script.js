
let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];

function renderProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${cat}</h2>`;
    products.filter(p => p.category === cat).forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `<h3>${p.name}</h3><p>₹${p.price}</p><p>${p.description}</p><button onclick='addToCart("${p.name}")'>Add to Cart</button>`;
      section.appendChild(div);
    });
    container.appendChild(section);
  });
}

function addToCart(name) {
  const product = products.find(p => p.name === name);
  const existing = cart.find(item => item.name === name);
  if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.qty} - ₹${item.price * item.qty} <button onclick='removeItem("${item.name}")'>Remove</button>`;
    list.appendChild(li);
  });
  document.getElementById("cart-total").innerText = total.toFixed(2);
}

function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function checkout() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0) * 100;
  const options = {
    key: "rzp_test_YourKeyHere",
    amount: total,
    currency: "INR",
    name: "Lunaa Luxe",
    description: "Jewellery Purchase",
    handler: function (response) {
      document.getElementById("order-id").innerText = response.razorpay_payment_id;
      document.getElementById("payment-success").classList.add("show");
      cart = [];
      updateCart();
    },
    prefill: { name: "Customer", email: "customer@example.com", contact: "9999999999" },
    theme: { color: "#F37254" }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}

renderProducts();
