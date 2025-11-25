import { masterTranslate } from "../utils/translator_master.js";

export default async function handler(req, res) {
  try {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({ error: "Parameter 'text' wajib diisi" });
    }

    const result = await masterTranslate(text);

    return res.status(200).json({
      input: text,
      ...result
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      detail: err.message
    });
  }
}
