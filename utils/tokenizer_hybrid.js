// tokenizer_hybrid.js
// Smart Tokenizer untuk Hybrid Engine (Google/Libre outputs)

module.exports = function tokenizeHybrid(text) {
  if (!text) return [];

  // 1) Bersihkan harakat kacau & simbol Google
  let cleaned = text
    .replace(/[^\u0600-\u06FF\s]/g, "")   // hanya simpan huruf Arab + spasi
    .replace(/\s+/g, " ")                 // rapikan spasi
    .trim();

  if (!cleaned) return [];

  // 2) Pecah berdasarkan spasi
  let parts = cleaned.split(" ").filter(Boolean);

  // 3) Gabungkan huruf jar yang dipisahkan Google
  const merged = [];
  for (let i = 0; i < parts.length; i++) {
    const w = parts[i];

    // Google sering pisahkan huruf jar "ب" + "ال"
    if (w === "ب" && parts[i + 1] && parts[i + 1].startsWith("ال")) {
      merged.push("بال" + parts[i + 1].slice(2));
      i++;
      continue;
    }

    // Google kadang pisahkan "ل" + "لبيت" → "ل" + "بيت"
    if (w === "ل" && parts[i + 1]) {
      merged.push("لل" + parts[i + 1]);
      i++;
      continue;
    }

    merged.push(w);
  }

  return merged;
};

