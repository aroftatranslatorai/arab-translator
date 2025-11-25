import { kamus_ar_id } from "../utils/kamus_ar_id.js";

// Mengubah superkamus string -> object dictionary cepat
function buildDictionary(raw) {
  const dict = {};
  const rows = raw.split("|");

  for (const row of rows) {
    if (!row.includes(":")) continue;

    const [arab, indo] = row.split(":").map(x => x.trim());
    if (!arab || !indo) continue;

    dict[arab] = indo;
  }

  return dict;
}

const KAMUS = buildDictionary(kamus_ar_id);

export default function handler(req, res) {
  try {
    const text = req.query.text || req.body?.text || "";

    if (!text) {
      return res.status(400).json({ error: "text wajib dikirim" });
    }

    const words = text.trim().split(/\s+/);
    const results = [];

    for (const w of words) {
      const clean = w.replace(/[^\u0600-\u06FFa-zA-Z]/g, "");

      // Arab → Indonesia
      if (/[\u0600-\u06FF]/.test(clean)) {
        results.push(KAMUS[clean] || "[?]");
      }
      // Indonesia → Arab masih dikunci (akan dibuat pada B2)
      else {
        results.push("[ID→AR belum dibuat]");
      }
    }

    return res.status(200).json({
      success: true,
      input: text,
      result: results.join(" ")
    });

  } catch (err) {
    return res.status(500).json({
      error: "Error pada translate.js",
      detail: err.message
    });
  }
}
