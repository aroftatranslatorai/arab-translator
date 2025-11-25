const master = require("../utils/translator_master");

export default function handler(req, res) {

  // === CORS START ===
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // === CORS END ===

  try {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: "text is required" });

    const output = master(text);

    return res.status(200).json({
      input: text,
      direction: output.direction,
      result: output.result
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
