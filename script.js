// ─────────────────────────────────────────────────────────────
// 🧩 DASHBOARD LOGIC WITH LOADERS AND DOWNLOAD FIX
// ─────────────────────────────────────────────────────────────
let rawData = [];

window.addEventListener("DOMContentLoaded", () => {
  const endpoint = "https://script.google.com/macros/s/AKfycbzdodFUBrKpC6di1fMXloWe6yPnz5_pdR0qyv1BGJQGoU0IRsODhMSHbYbipaxpzVig/exec";

  const entitySelect = document.getElementById("entityType");
  const entityLoader = document.getElementById("entityLoader");

  entitySelect.innerHTML = '<option>Loading...</option>';
  entityLoader.style.display = "inline-block";

  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      rawData = data;
      console.log("Loaded data:", rawData);
      populateEntityDropdown();
    })
    .catch(err => {
      console.error("Failed to load data:", err);
      entitySelect.innerHTML = '<option value="">Failed to load</option>';
    })
    .finally(() => {
      entityLoader.style.display = "none";
    });

  document.getElementById("entityType").addEventListener("change", onEntityChange);
  document.getElementById("firmName").addEventListener("change", onNameChange);
  document.getElementById("docType").addEventListener("change", updateDocumentDisplay);
});

/* 🚀 Populate initial entity types */
function populateEntityDropdown() {
  const entities = [...new Set(rawData.map(item => item.entity))];
  populateDropdown("entityType", entities);
}

/* 🎛 Entity → Name */
function onEntityChange() {
  const entity = document.getElementById("entityType").value;
  const nameLoader = document.getElementById("nameLoader");
  const docLoader = document.getElementById("docLoader");

  nameLoader.style.display = "inline-block";
  docLoader.style.display = "none";

  const names = [...new Set(
    rawData.filter(entry => entry.entity === entity).map(entry => entry.name)
  )];

  populateDropdown("firmName", names);
  populateDropdown("docType", []);
  updateLogo(""); // clear logo
  document.getElementById("documentDisplay").src = "";

  nameLoader.style.display = "none";
}

/* 👤 Name → Document Types + Logo Update */
function onNameChange() {
  const entity = document.getElementById("entityType").value;
  const name = document.getElementById("firmName").value;
  const docLoader = document.getElementById("docLoader");

  docLoader.style.display = "inline-block";

  const firmEntries = rawData.filter(entry =>
    entry.entity === entity && entry.name === name
  );

  const docTypes = [...new Set(firmEntries.map(entry => entry.docType))];
  populateDropdown("docType", docTypes);
  document.getElementById("documentDisplay").src = "";

  updateLogo(name);

  docLoader.style.display = "none";
}

/* 📄 Update Document Preview */
function updateDocumentDisplay() {
  const entity = document.getElementById("entityType").value;
  const name = document.getElementById("firmName").value;
  const docType = document.getElementById("docType").value;

  const match = rawData.find(entry =>
    entry.entity === entity &&
    entry.name === name &&
    entry.docType === docType
  );

  const previewLink = match?.link ? transformPreviewLink(match.link) : "";
  document.getElementById("documentDisplay").src = previewLink;
}

/* 🔧 Convert Drive link to preview format */
function transformPreviewLink(link) {
  const match = link.match(/\/d\/([^\/]+)\//);
  return match && match[1]
    ? `https://drive.google.com/file/d/${match[1]}/preview`
    : "";
}

/* 📥 Convert Drive link to download format */
function transformDownloadLink(link) {
  const match = link.match(/\/d\/([^\/]+)\//);
  return match && match[1]
    ? `https://drive.google.com/uc?export=download&id=${match[1]}`
    : "";
}

/* 📥 Download Button */
function downloadDocument() {
  const entity = document.getElementById("entityType").value;
  const name = document.getElementById("firmName").value;
  const docType = document.getElementById("docType").value;

  const match = rawData.find(entry =>
    entry.entity === entity &&
    entry.name === name &&
    entry.docType === docType
  );

  const downloadLink = match?.link ? transformDownloadLink(match.link) : "";

  if (downloadLink) {
    const anchor = document.createElement("a");
    anchor.href = downloadLink;
    anchor.download = ""; // browser will infer filename
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } else {
    alert("No document selected to download.");
  }
}

/* 🛠 Dropdown utility */
function populateDropdown(id, options) {
  const select = document.getElementById(id);
  select.innerHTML = '<option value="">--Choose--</option>';
  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}

/* 🎨 Logo updater using local image files */
function updateLogo(firmName) {
  const mainLogo = document.getElementById("firmLogo");
  const smallLogo = document.getElementById("firmLogoSmall");

  const normalized = firmName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/gi, "");

  const filePath = normalized ? `codes/${normalized}.png` : "PlaceHolder.gif";
  const filePathSmall = normalized ? `codes/${normalized}-small.png` : "PlaceHolderSmall.gif";

  console.log("Trying logos:", filePath, filePathSmall);

  const handleError = () => {
    console.warn("Logo failed to load, using fallback.");
    mainLogo.src = "PlaceHolder.gif";
    smallLogo.src = "PlaceHolderSmall.gif";
  };

  const handleSuccess = () => {
    mainLogo.classList.add("loaded");
    smallLogo.classList.add("loaded");
  };

  mainLogo.onerror = handleError;
  smallLogo.onerror = handleError;

  mainLogo.onload = handleSuccess;
  smallLogo.onload = handleSuccess;

  mainLogo.classList.remove("loaded");
  smallLogo.classList.remove("loaded");

  mainLogo.src = filePath;
  smallLogo.src = filePathSmall;
}
// ─────────────────────────────────────────────────────────────
// ✨ LOGIN SCREEN ENHANCEMENTS
// ─────────────────────────────────────────────────────────────

const quotes = [
  "The stars are not in the sky. They are on Earth.",
  "Code is poetry.",
  "Simplicity is the ultimate sophistication.",
  "Dream big. Dare bigger.",
  "Design is intelligence made visible.",
  "Every pixel counts.",
  "Creativity takes courage.",
  "Stay curious."
];

const fonts = [
  "'Courier New', monospace",
  "'Georgia', serif",
  "'Arial', sans-serif",
  "'Lucida Console', monospace",
  "'Comic Sans MS', cursive",
  "'Times New Roman', serif",
  "'Trebuchet MS', sans-serif"
];

function createQuote() {
  const quote = document.createElement('div');
  quote.className = 'floating-quote';
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  quote.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
  quote.style.fontSize = `${Math.floor(Math.random() * 24 + 12)}px`;
  quote.style.top = `${Math.floor(Math.random() * 90)}%`;
  quote.style.left = `${Math.floor(Math.random() * 90)}%`;
  quote.style.opacity = 0.6;

  document.getElementById("quoteLayer").appendChild(quote);
  setTimeout(() => quote.remove(), 8000);
}

setInterval(createQuote, 3000);

/* 🕒 Date & Time Display */
function updateDateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });

  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');

  if (timeEl && dateEl) {
    timeEl.textContent = time;
    dateEl.textContent = date;
  }
}

setInterval(updateDateTime, 1000);
updateDateTime();