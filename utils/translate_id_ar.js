const { KAMUS_ID_AR } = require("./kamus_ar_id");

module.exports = function translateIndoToArabic(input) {
  const key = input.toLowerCase().trim();
  return KAMUS_ID_AR[key] || null;
};
