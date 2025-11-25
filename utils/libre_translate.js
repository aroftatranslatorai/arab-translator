const fetch = require("node-fetch");

module.exports = async function libreTranslate(text) {
  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "ar",
        target: "id"
      })
    });

    const data = await res.json();
    return data.translatedText;
  } catch (err) {
    return null;
  }
};

