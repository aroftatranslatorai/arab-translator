export default function handler(req, res) {
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
