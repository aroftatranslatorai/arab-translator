// utils/translate_id_ar.js
// Wrapper agar tetap kompatibel, tapi memakai mesin MODE A

const translatePlus = require("./translate_id_ar_plus");

module.exports = function translateIndoToArabic(input) {
  return translatePlus(input);
};
