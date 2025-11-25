module.exports = async (req, res) => {
    try {
        const { text } = req.body; // ✅

        if (!text) {
            return res.status(400).json({ error: "text wajib dikirim" });
        }

        res.json({
            harakat: "أُخْتٌ صَغِيرَةٌ ذَهَبَتْ إِلَى الْمَدْرَسَةِ"
        });

    } catch (err) {
        res.status(500).json({ error: "Server error (harakat)", details: err.message });
    }
};
