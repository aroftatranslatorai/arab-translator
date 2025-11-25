// utils/translator_master.js
// MASTER TRANSLATOR — versi aman + MODE A untuk Indonesia → Arab

const detectLang = require("./detectLang");
const translateArabicToIndo = require("./translate_ar_id");

// === Mesin baru MODE A ===
const translateIDPlus = require("./translate_id_ar_plus");

module.exports = function masterTranslator(text) {
  const lang = detectLang(text);

  // ---- Arah Arab → Indonesia (tetap sama, tidak diubah) ----
  if (lang === "ar") {
    return {
      direction: "AR → ID",
      result: translateArabicToIndo(text)
    };
  }

  // ---- Arah Indonesia → Arab (MODE A) ----
  return {
    direction: "ID → AR (MODE A)",
    result: translateIDPlus(text)
  };
};
