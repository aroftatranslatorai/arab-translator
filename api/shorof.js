// api/shorof.js — FINAL VERSION (CommonJS)

const { getShorof } = require("../utils/arabTools.js");

module.exports = (req, res) => {
  try {
    const madhi = req.query.madhi || req.query.text || req.body?.madhi;

    if (!madhi || madhi.trim() === "") {
      return res.status(400).json({ error: "madhi wajib dikirim" });
    }

    const hasil = getShorof(madhi);
    return res.status(200).json(hasil);

  } catch (err) {
    console.error("Error Shorof:", err);
    return res.status(500).json({ error: "Terjadi kesalahan pada server shorof" });
  }
};
