// utils/harakat_engine.js
// Harakat Engine MODE A — menambah harakat dasar pada fi'il & isim umum

module.exports = function harakatEngine(word) {
  if (!word || typeof word !== "string") return word;

  // FI'IL mudhari' (bentuk "aku")
  const fiilHarakat = {
    "أذهب": "أَذْهَبُ",
    "آكل": "آكُلُ",
    "أشرب": "أَشْرَبُ",
    "أدرس": "أَدْرُسُ",
    "أنام": "أَنَامُ",
    "آتي": "آتِي"
  };

  // ISIM / kata benda yang umum
  const isimHarakat = {
    "مدرسة": "المَدْرَسَةِ",
    "مدرسه": "المَدْرَسَةِ",
    "كتاب": "كِتَاب",
    "بيت": "بَيْت",
    "مدينة": "مَدِينَة",
    "لغة": "لُغَة",
  };

  // Jika kata fi'il dikenali
  if (fiilHarakat[word]) return fiilHarakat[word];

  // Jika kata isim dikenali
  if (isimHarakat[word]) return isimHarakat[word];

  // fallback: tidak diubah
  return word;
};

