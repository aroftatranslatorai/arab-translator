export default function handler(req, res) {
  try {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({ error: "Parameter 'text' wajib diisi" });
    }

    // DIAMBIL dari file translate.js kamu
    const kamus = {
      "aku pergi ke sekolah": "أَنَا أَذْهَبُ إِلَى المَدْرَسَةِ",
      rumah: "بَيْت",
      makan: "يَأْكُلُ",
      minum: "يَشْرَبُ",
    };

    const hasil = kamus[text] || "Tidak ditemukan";

    res.status(200).json({
      indonesia: text,
      arab: hasil,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
}
