// api/translate.js — HYBRID ENGINE API (CommonJS untuk Vercel)

const masterTranslator = require("../../utils/translator_master");

module.exports = async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'text' wajib diisi"
      });
    }

    const output = await masterTranslator(text);

    return res.status(200).json({
      ok: true,
      input: text,
      direction: output.direction,
      result: output.result
    });

  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({
      ok: false,
      error: "Server error",
      detail: err.message
    });
  }
};
