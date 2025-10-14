
let products = JSON.parse(localStorage.getItem("products")) || [];

function renderTable() {
  const tbody = document.querySelector("#product-table tbody");
  tbody.innerHTML = "";
  products.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${p.name}</td><td>₹${p.price}</td><td>${p.category}</td><td>${p.stock}</td>
      <td><button onclick='editProduct(${i})'>Edit</button><button onclick='deleteProduct(${i})'>Delete</button></td>`;
    tbody.appendChild(row);
  });
}

document.getElementById("product-form").onsubmit = function(e) {
  e.preventDefault();
  const p = {
    name: document.getElementById("name").value,
    price: parseFloat(document.getElementById("price").value),
    description: document.getElementById("description").value,
    image: document.getElementById("image").value,
    category: document.getElementById("category").value,
    stock: parseInt(document.getElementById("stock").value)
  };
  products.push(p);
  localStorage.setItem("products", JSON.stringify(products));
  renderTable();
  e.target.reset();
};

function editProduct(i) {
  const p = products[i];
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("description").value = p.description;
  document.getElementById("image").value = p.image;
  document.getElementById("category").value = p.category;
  document.getElementById("stock").value = p.stock;
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderTable();
}

function deleteProduct(i) {
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderTable();
}

renderTable();
