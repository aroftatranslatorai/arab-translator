const { KAMUS_ID_AR } = require("./kamus_ar_id");

module.exports = function translateIndoToArabic(input) {
  // Normalisasi input
  const clean = input.toLowerCase().trim();

  // Pecah menjadi kata-kata
  const words = clean.split(/\s+/);

  // Terjemahkan per-kata
  const translatedWords = words.map((word) => {
    // Jika kata ada di kamus → terjemahkan
    if (KAMUS_ID_AR[word]) return KAMUS_ID_AR[word];

    // Jika tidak ditemukan → tetap kembalikan kata aslinya
    return word;
  });

  // Gabungkan kembali
  return translatedWords.join(" ");
};
