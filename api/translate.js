const master = require("../utils/translator_master");

export default function handler(req, res) {
  try {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: "text is required" });

    const output = master(text);
    res.status(200).json({
      input: text,
      direction: output.direction,
      result: output.result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
