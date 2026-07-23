import { db } from "./firebase-config.js";
import { collection, getDocs }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { startCheckout } from "./js/payment.js";
const CATEGORY_COLORS = {
  Worksheets: "#5CB84E",
  Books: "#E8386B",
  Activities: "#FF8A1E"
};

const grid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const filters = document.getElementById("filters");
const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

let allProducts = [];
let activeCategory = "all";

// ---------- Load products from Firestore ----------
async function loadProducts() {
  try {
    const snap = await getDocs(collection(db, "products"));
    allProducts = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(p => p.active === true)
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    render();
  } catch (err) {
    console.error("Failed to load products:", err);
    grid.innerHTML = "";
    emptyState.hidden = false;
    emptyState.textContent = "Couldn't load products right now. Please refresh.";
  }
}

// ---------- Render grid ----------
function render() {
  const list = activeCategory === "all"
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  grid.innerHTML = "";

  if (list.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  list.forEach(p => {
    const color = CATEGORY_COLORS[p.category] || "#1B3F94";
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.setProperty("--cat-color", color);
    card.innerHTML = `
      <img class="product-thumb" src="${p.thumbnailUrl || 'placeholder.png'}" alt="${p.title}" loading="lazy" />
      <div class="product-body">
        <span class="product-cat">${p.category || ""}</span>
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.shortDescription || ""}</p>
        <div class="product-foot">
          <span class="product-price">₹${p.price}</span>
          <button class="product-buy" data-id="${p.id}">View</button>
        </div>
      </div>
    `;
    card.addEventListener("click", () => openModal(p));
    grid.appendChild(card);
  });
}

// ---------- Product modal ----------
function openModal(p) {
  modalBody.innerHTML = `
    <img class="product-thumb" src="${p.thumbnailUrl || 'placeholder.png'}" alt="${p.title}" style="border-radius:12px;margin-bottom:16px;" />
    <span class="product-cat">${p.category || ""}</span>
    <h3 class="product-title" style="font-size:24px;margin:6px 0 12px;">${p.title}</h3>
    <p class="product-desc" style="font-size:14.5px;margin-bottom:20px;">${p.description || p.shortDescription || ""}</p>
    <div class="product-foot">
      <span class="product-price">₹${p.price}</span>
      <button class="btn btn-primary" id="checkoutBtn">Buy & Download</button>
    </div>
  `;
  modal.hidden = false;
 
  
  document.getElementById("checkoutBtn").addEventListener("click", () => {
  startCheckout(p);
});


}

modalClose.addEventListener("click", () => (modal.hidden = true));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });

// ---------- Category filters ----------
filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-pill");
  if (!btn) return;
  filters.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.cat;
  render();
});

loadProducts();
