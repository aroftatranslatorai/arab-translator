const { KAMUS_AR_ID } = require("./kamus_ar_id");
const { cleanArabic } = require("./arabTools");

module.exports = function translateArabicToIndo(input) {
  const cleaned = cleanArabic(input);
  return KAMUS_AR_ID[cleaned] || null;
};
