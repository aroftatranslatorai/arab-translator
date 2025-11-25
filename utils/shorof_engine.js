// utils/shorof_engine.js
// Mesin Shorof sederhana untuk MODE A (Fi'il mudhari', madhi, masdar, dll.)

module.exports = function shorofEngine(indonesiaWord) {
  if (!indonesiaWord) return null;

  const w = indonesiaWord.toLowerCase().trim();

  // Daftar fi'il dasar Indonesia → akar fi'il Arab
  const fiilTable = {
    "pergi":  { root: "ذهب", mudhari: "يذهب", ana: "أذهب" },
    "makan":  { root: "أكل", mudhari: "يأكل", ana: "آكل" },
    "minum":  { root: "شرب", mudhari: "يشرب", ana: "أشرب" },
    "belajar": { root: "درس", mudhari: "يدرس", ana: "أدرس" },
    "tidur":  { root: "نام", mudhari: "ينام", ana: "أنام" },
    "datang": { root: "جاء", mudhari: "يجيء", ana: "آتي" },
    "melihat": { root: "رأى", mudhari: "يرى", ana: "أرى" },
    "mengetahui": { root: "علم", mudhari: "يعلم", ana: "أعلم" },
    "memahami": { root: "فهم", mudhari: "يفهم", ana: "أفهم" },
  };

  // Jika kata dikenali dalam tabel fi'il
  if (fiilTable[w]) {
    return {
      arab: fiilTable[w].ana,      // Bentuk "aku" (MODE A)
      root: fiilTable[w].root,
      mudhari: fiilTable[w].mudhari,
      type: "verb"
    };
  }

  // Jika tidak dikenali, kembalikan null agar fallback ke kamus
  return null;
};

