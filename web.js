const businessInput = document.getElementById("businessName");
const clientInput = document.getElementById("clientName");
const itemDescInput = document.getElementById("itemDesc");
const itemAmountInput = document.getElementById("itemAmount");
const addItemBtn = document.getElementById("addItemBtn");
const printBtn = document.getElementById("printBtn");

const previewBusiness = document.getElementById("previewBusiness");
const previewClient = document.getElementById("previewClient");
const itemsBody = document.getElementById("itemsBody");
const totalAmountEl = document.getElementById("totalAmount");

let items = [];

function updateHeaderPreview() {
  const biz = businessInput ? businessInput.value.trim() : "";
  const client = clientInput ? clientInput.value.trim() : "";

  if (previewBusiness) {
    previewBusiness.textContent = biz || "Your Business Name";
  }
  if (previewClient) {
    previewClient.textContent = client ? `Client: ${client}` : "Client: —";
  }
}

function renderItems() {
  if (!itemsBody || !totalAmountEl) return;

  itemsBody.innerHTML = "";
  let total = 0;

  items.forEach((item) => {
    total += item.amount;
    const row = document.createElement("tr");

    const descCell = document.createElement("td");
    descCell.textContent = item.desc;

    const amountCell = document.createElement("td");
    amountCell.className = "right";
    amountCell.textContent = `₹${item.amount.toLocaleString("en-IN")}`;

    row.appendChild(descCell);
    row.appendChild(amountCell);
    itemsBody.appendChild(row);
  });

  totalAmountEl.textContent = `₹${total.toLocaleString("en-IN")}`;
}

if (addItemBtn) {
  addItemBtn.addEventListener("click", () => {
    const desc = itemDescInput ? itemDescInput.value.trim() : "";
    const amount = itemAmountInput ? Number(itemAmountInput.value) : 0;

    if (!desc) {
      alert("Please type a Service / Item name first.");
      if (itemDescInput) itemDescInput.focus();
      return;
    }

    if (Number.isNaN(amount) || amount <= 0) {
      alert("Please enter an Amount greater than 0.");
      if (itemAmountInput) itemAmountInput.focus();
      return;
    }

    items.push({ desc, amount });
    renderItems();

    itemDescInput.value = "";
    itemAmountInput.value = "";
    itemDescInput.focus();
  });
}

if (printBtn) {
  printBtn.addEventListener("click", () => {
    try {
      window.print();
    } catch (err) {
      alert("Printing was blocked here. Press Ctrl + P in your browser to print or Save as PDF.");
    }
  });
}

if (businessInput) {
  businessInput.addEventListener("input", updateHeaderPreview);
}
if (clientInput) {
  clientInput.addEventListener("input", updateHeaderPreview);
}