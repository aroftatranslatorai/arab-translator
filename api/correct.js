export default function handler(req, res) {

// CORS
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({ error: "Parameter 'text' wajib diisi" });
    }

    // KAMUS KOREKSI (berdasarkan file kamu)
    const corrections = {
      كتبو: "كتبوا",
      كتابت: "كتابة",
      حفض: "حفظ",
      // tambahkan sesuai kebutuhan kamu
    };

    const hasil = corrections[text] || text;

    res.status(200).json({
      input: text,
      corrected: hasil,
      corrected_flag: hasil !== text,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
}
