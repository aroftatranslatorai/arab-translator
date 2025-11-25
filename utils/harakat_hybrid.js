// Harakat Hybrid Engine v2
// Memberi harakat fi'il & isim untuk hasil Google Translate yang sudah diperbaiki

module.exports = function harakatHybrid(word) {
  if (!word || typeof word !== "string") return word;

  // FI'IL POPULER (dari Google & umum dipakai)
  const fiil = {
    "اريد": "أُرِيدُ",
    "أريد": "أُرِيدُ",

    "اذهب": "أَذْهَبُ",
    "أذهب": "أَذْهَبُ",

    "اكل": "آكُلُ",
    "أكل": "آكُلُ",
    "آكل": "آكُلُ",

    "اشرب": "أَشْرَبُ",
    "أشرب": "أَشْرَبُ",

    "ادرس": "أَدْرُسُ",
    "أدرس": "أَدْرُسُ",

    "افتح": "أَفْتَحُ",
    "أفتح": "أَفْتَحُ",

    "اكتب": "أَكْتُبُ",
    "أكتب": "أَكْتُبُ"
  };

  // HURUF & PREPOSISI
  const huruf = {
    "في": "فِي",
    "الى": "إِلَى",
    "إلى": "إِلَى",
    "من": "مِنْ",
    "على": "عَلَى",
    "عن": "عَنْ",
    "ب": "بِـ",
    "ل": "لِـ"
  };

  // ISIM (benda / tempat yang sering muncul)
  const isim = {
    "السوق": "السُّوقِ",
    "البيت": "الْبَيْتِ",
    "المدرسة": "الْمَدْرَسَةِ",
    "البحر": "الْبَحْرِ",
    "الشارع": "الشَّارِعِ",
    "الوقت": "الوَقْتِ",
    "المدينة": "الْمَدِينَةِ",
    "اللغة": "اللُّغَةِ",
  };

  const clean = word.replace(/[ًٌٍَُِّْ]/g, ""); // buang harakat lama

  if (fiil[clean]) return fiil[clean];
  if (huruf[clean]) return huruf[clean];
  if (isim[clean]) return isim[clean];

  // fallback → tidak diberi harakat
  return word;
};

