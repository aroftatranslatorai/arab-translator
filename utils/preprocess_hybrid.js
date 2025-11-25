// Hybrid Pre-Processing Engine
// Membersihkan hasil Google/Libre sebelum diproses MODE A

module.exports = function preprocessHybrid(text) {
  if (!text) return "";

  return text
    .replace(/\u0640/g, "")         // remove tatweel: ـ
    .replace(/[“”"]/g, "")          // remove quotes
    .replace(/[{}[\]()]/g, "")      // remove brackets
    .replace(/[،؛؟]/g, "")          // remove arabic punctuation
    .replace(/\s+/g, " ")           // normalize spacing
    .replace(/\\/g, "")             // remove backslashes
    .trim();
};

