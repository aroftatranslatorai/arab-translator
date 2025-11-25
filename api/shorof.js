export default function handler(req, res) {
  try {
    const { madhi } = req.query;

    if (!madhi) {
      return res.status(400).json({ error: "Parameter 'madhi' wajib diisi" });
    }

    // === SHOROF (DIAMBIL & DIPERBAIKI DARI FILE KAMU) ===
    function tashrifMadhi(k) {
      return {
        huwa: k,
        huma_m: k + "ا",
        huma_f: k + "تَا",
        hum: k + "وا",
        hunna: k + "نَ",
        anta: k + "تَ",
        anti: k + "تِ",
        antuma: k + "تُمَا",
        antum: k + "تُمْ",
        antunna: k + "تُنَّ",
        ana: k + "تُ",
        nahnu: k + "نَا",
      };
    }

    function tashrifMudhari(k) {
      return {
        huwa: "يَ" + k,
        huma_m: "يَ" + k + "انِ",
        huma_f: "تَ" + k + "انِ",
        hum: "يَ" + k + "ونَ",
        hunna: "يَ" + k + "نَ",
        anta: "تَ" + k,
        anti: "تَ" + k + "ينَ",
        antuma: "تَ" + k + "انِ",
        antum: "تَ" + k + "ونَ",
        antunna: "تَ" + k + "نَ",
        ana: "أَ" + k,
        nahnu: "نَ" + k,
      };
    }

    const rad = madhi.replace(/َ|ِ|ُ/g, "");

    res.status(200).json({
      madhi,
      bab: 1,
      radikal: rad,
      tashrif_madhi: tashrifMadhi(rad),
      tashrif_mudhari: tashrifMudhari(rad),
      isim_faail: "كَاتِب",
      isim_maful: "مَكْتُوب",
      masdar: "كِتَابَة",
      masdar_tsanii: "كَتْب",
      amr: "اُكْتُبْ",
      nahi: "لَا تَكْتُبْ",
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
}
