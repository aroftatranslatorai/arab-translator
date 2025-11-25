module.exports = function detectLang(text) {
  const ar = /[\u0600-\u06FF]/;
  if (ar.test(text)) return "ar";
  return "id";
};
