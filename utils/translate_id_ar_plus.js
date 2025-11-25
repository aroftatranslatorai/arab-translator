// utils/translate_id_ar_plus.js
// Mesin Translasi MODE A (Paling Natural untuk Indonesia → Arab)

const normalizeIndo = require("./id_normalizer");
const baseMap = require("./base_mapper");
const shorofEngine = require("./shorof_engine");
const nahwuEngine = require("./nahwu_engine");
const harakatEngine = require("./harakat_engine");
const { KAMUS_ID_AR } = require("./kamus_ar_id");

module.exports = function translateIndoToArabicPlus(text) {
  if (!text) return "";

  // ---- 1. Normalisasi Indonesia ----
  const normalized = normalizeIndo(text);

  // Pisahkan per kata
  const words = normalized.split(/\s+/);

  const processed = [];

  for (const w of words) {
    const word = w.toLowerCase().trim();

    // ---- 2. Base Mapper (kata dasar) ----
    if (baseMap[word] !== undefined) {
      if (baseMap[word] !== "") processed.push(baseMap[word]);
      continue;
    }

    // ---- 3. Shorof Engine ----
    const shorof = shorofEngine(word);
    if (shorof) {
      processed.push({
        arab: shorof.arab,
        type: "verb",
        root: shorof.root
      });
      continue;
    }

    // ---- 4. Kamus ID → AR fallback ----
    if (KAMUS_ID_AR[word]) {
      processed.push(KAMUS_ID_AR[word]);
      continue;
    }

    // ---- 5. Kata tidak dikenal → tampilkan apa adanya ----
    processed.push(word);
  }

  // ---- 6. Nahwu Engine ----
  const nahwuOrdered = nahwuEngine(processed);

  // ---- 7. Harakat Engine ----
  const finalWords = nahwuOrdered.map(w => {
    if (typeof w === "object" && w.arab) {
      return harakatEngine(w.arab);
    }
    return harakatEngine(w);
  });

  // ---- 8. Gabungkan ----
  return finalWords.join(" ");
};

