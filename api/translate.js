const fetch = require("node-fetch");

module.exports = async (req, res) => {
    try {
        const { text } = req.body;  // ✅ gunakan req.body

        if (!text) {
            return res.status(400).json({ error: "text wajib dikirim" });
        }

        const result = {
            arabic: "أخت صغيرة ذهبت إلى المدرسة"
        };

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Server error (translate)", details: err.message });
    }
};
