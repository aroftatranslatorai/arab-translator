// utils/id_normalizer.js
// Normalisasi & autocorrect Bahasa Indonesia untuk pipeline MODE A

module.exports = function normalizeIndo(text) {
  if (!text) return "";

  // Kamus autocorrect dasar
  const autocorrect = {
    "aq": "aku",
    "sy": "saya",
    "gua": "aku",
    "gw": "aku",
    "gue": "aku",
    "pergi": "pergi",
    "skolah": "sekolah",
    "sklh": "sekolah",
    "ke": "ke",
    "ke sekolah": "ke sekolah"
  };

  // Normalisasi dasar
  let cleaned = text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Autocorrect kata per kata
  const words = cleaned.split(" ").map(w => {
    return autocorrect[w] || w;
  });

  return words.join(" ");
};

