
let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  let totalSum = 0;

  products.forEach((p, index) => {
    totalSum += p.total;
    list.innerHTML += `
      <div class="item">
        <button class="delete-btn" onclick="deleteProduct(${index})">حذف</button>
        <strong>${p.name}</strong><br>
        السعر: ${p.price} × ${p.quantity} كغ = <strong>${p.total}</strong> دينار
      </div>
    `;
  });

  document.getElementById("total-sum").innerText = `💰 المجموع الكلي: ${totalSum} دينار`;
}

function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseFloat(document.getElementById("quantity").value);

  if (!name || isNaN(price) || isNaN(quantity)) {
    alert("يرجى تعبئة كل الحقول بشكل صحيح");
    return;
  }

  const total = price * quantity;
  const product = { name, price, quantity, total };

  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();

  // ← تنبيه للتأكد
  alert("✅ تمت إضافة المنتج بنجاح");

  // تفريغ الحقول
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function clearAll() {
  if (confirm("هل أنت متأكد من حذف جميع المنتجات؟")) {
    products = [];
    localStorage.removeItem("products");
    renderProducts();
  }
}

renderProducts();
