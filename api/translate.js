// api/translate.js — HYBRID ENGINE API v3

import masterTranslator from "../../utils/translator_master"; // pakai ES import jika bisa
// Jika error ES import, gunakan require:
// const masterTranslator = require("../../utils/translator_master");

export default async function handler(req, res) {
  // ===========================
  // CORS
  // ===========================
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { text } = req.query;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Parameter 'text' wajib diisi"
      });
    }

    // ===============================================
    // Jalankan Hybrid Engine v3
    // ===============================================
    const output = await masterTranslator(text);

    return res.status(200).json({
      ok: true,
      input: text,
      direction: output.direction,
      result: output.result
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Server error",
      detail: err.message
    });
  }
}
