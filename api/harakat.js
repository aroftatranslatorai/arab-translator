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

    // === ALGORITMA HARAKAT (diambil dari file kamu) ===
    function addHarakat(word) {
      const harakatMap = {
        ك: "كَ",
        ت: "تَ",
        ب: "بَ",
        // tambahkan sesuai kebutuhan kamu
      };

      let result = "";
      for (let i = 0; i < word.length; i++) {
        const c = word[i];
        result += harakatMap[c] || c;
      }
      return result;
    }

    const hasil = addHarakat(text);

    res.status(200).json({
      input: text,
      harakat: hasil,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
}
