const fetch = require("node-fetch");

module.exports = async function googleTranslate(text) {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=ar&dt=t&q=" +
    encodeURIComponent(text);

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data[0][0][0]; // hasil arab kasar
  } catch (err) {
    return null;
  }
};

