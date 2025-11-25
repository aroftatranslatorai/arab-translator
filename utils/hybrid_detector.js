// Smart Hybrid Fallback Detector
// Menentukan apakah hasil MODE A valid atau harus fallback ke Google/Libre

module.exports = function hybridDetector(input, output, lang) {
  if (!output) return false;
  if (!input) return false;

  const trimmedInput = input.trim().toLowerCase();
  const trimmedOutput = output.trim().toLowerCase();

  // 1) Jika output sama persis seperti input → gagal
  if (trimmedOutput === trimmedInput) return false;

  // 2) Jika output sangat pendek (misal input kalimat, output 1 kata)
  const inputWords = trimmedInput.split(/\s+/).length;
  const outputWords = trimmedOutput.split(/\s+/).length;

  if (inputWords >= 3 && outputWords <= 2) return false;

  // 3) Jika input Indonesia → Arab: output harus mengandung huruf Arab
  const arabicRegex = /[\u0600-\u06FF]/;

  if (lang === "id" && !arabicRegex.test(output)) return false;

  // 4) Jika output kosong / null
  if (!trimmedOutput || trimmedOutput.length < 1) return false;

  // 5) Jika output cuma huruf-huruf terpotong
  if (/^[a-zA-Z]+$/.test(trimmedOutput) && lang === "id") return false;

  // 6) Jika output hanya titik / simbol
  if (/^[\.\,\-\_ ]+$/.test(trimmedOutput)) return false;

  // 7) Jika output terlalu mirip input Indonesia (hanya penggantian kecil)
  const similarity = (a, b) =>
    a.split("").filter((c, i) => b[i] === c).length / Math.max(a.length, b.length);

  if (lang === "id") {
    if (similarity(trimmedInput, trimmedOutput) > 0.7) return false;
  }

  // === Jika semua pemeriksaan lolos, output MODE A dianggap valid ===
  return true;
};

