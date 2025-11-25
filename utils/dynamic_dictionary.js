// Dynamic Dictionary for Auto-Learning Translation Results
// Menambahkan kata baru otomatis ke kamus setelah fallback Hybrid

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "dynamic_db.json");

// Load database
function loadDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return { id_to_ar: {}, ar_to_id: {} };
  }
}

// Save database
function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Add new entry
function addToDictionary(sourceLang, sourceWord, translatedWord) {
  const db = loadDB();

  if (sourceLang === "id") {
    if (!db.id_to_ar[sourceWord]) {
      db.id_to_ar[sourceWord] = translatedWord;
      saveDB(db);
    }
  }

  if (sourceLang === "ar") {
    if (!db.ar_to_id[sourceWord]) {
      db.ar_to_id[sourceWord] = translatedWord;
      saveDB(db);
    }
  }
}

module.exports = { loadDB, addToDictionary };

