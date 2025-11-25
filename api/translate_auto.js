// FILE: api/translate_auto.js
import fetch from "node-fetch";
const master = require("../utils/translator_master");

// ===== Helper: CORS =====
function addCORS(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ===== Main Handler =====
export default async function handler(req, res) {
  addCORS(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: "text is required" });

    const isArabic = /[\u0600-\u06FF]/.test(text);

    // ======================================================
    // 1) ARAH ARAB → INDONESIA (LibreTranslate)
    // ======================================================
    if (isArabic) {
      const ltRes = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "ar",
          target: "id"
        })
      });

      const ltData = await ltRes.json();

      return res.status(200).json({
        mode: "AR → ID (Hybrid)",
        input: text,
        result: ltData.translatedText
      });
    }

    // ======================================================
    // 2) ARAH INDONESIA → ARAB (Google Translate)
    // ======================================================

    // Google Translate unofficial API
    const gRes = await fetch(
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=ar&dt=t&q=" +
        encodeURIComponent(text)
    );

    const gData = await gRes.json();
    const googleRaw = gData[0][0][0]; // hasil arab kasar

    // Masukkan ke grammar engine MODE A
    const improved = master(googleRaw);

    return res.status(200).json({
      mode: "ID → AR (Hybrid)",
      input: text,
      google_raw: googleRaw,
      result: improved.result
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

