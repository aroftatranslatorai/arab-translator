const detectLang = require("./detectLang");
const translateAR = require("./translate_ar_id");
const translateID = require("./translate_id_ar");

module.exports = function masterTranslator(text) {
  const lang = detectLang(text);

  if (lang === "ar") {
    return {
      direction: "AR → ID",
      result: translateAR(text)
    };
  }

  return {
    direction: "ID → AR",
    result: translateID(text)
  };
};