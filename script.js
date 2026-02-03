
  const productForm = document.getElementById("productForm");
  const productList = document.getElementById("productlist");
  const totalItem = document.getElementById("totalItem");
  const totalCost = document.getElementById("totalCost");

  let items = [];

  productForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = productForm.productName.value.trim();
    const price = parseFloat(productForm.productPrice.value);
    const quantity = parseInt(productForm.productQuantity.value);

    if (!name || price <= 0 || quantity <= 0) return;

    const product = { name, price, quantity };
    items.push(product);

    renderList();
    updateSummary();

    productForm.reset();
  });

  function renderList() {
    productList.innerHTML = "";
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
        <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
      `;
      productList.appendChild(li);
    });
  }

  function updateSummary() {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    totalItem.textContent = `Total Items: ${totalItems}`;
    totalCost.textContent = `Total Cost: $${totalPrice.toFixed(2)}`;
  }

  function removeItem(index) {
    items.splice(index, 1);
    renderList();
    updateSummary();
  }
