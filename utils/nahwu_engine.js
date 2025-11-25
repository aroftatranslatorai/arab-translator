// utils/nahwu_engine.js
// Engine Nahwu MODE A — Menjadikan struktur Arab natural (V → S → K → O)

module.exports = function nahwuEngine(sentenceParts) {
  if (!Array.isArray(sentenceParts) || sentenceParts.length === 0) {
    return sentenceParts;
  }

  // ----- 1. Identifikasi Fi'il (kata kerja) -----
  // Format dari shorofEngine: { arab: "...", type: "verb" }
  let verbIndex = sentenceParts.findIndex(p => typeof p === "object" && p.type === "verb");

  // Jika ada fi'il
  let verb = null;
  if (verbIndex !== -1) {
    verb = sentenceParts[verbIndex].arab;
    sentenceParts.splice(verbIndex, 1); // keluarkan dari list
  }

  // ----- 2. Ambil SUBJEK (kalau ada) -----
  // Subjek biasanya kata pertama Indonesia → Arab setelah mapping
  let subject = null;

  if (sentenceParts.length > 0) {
    // Ambil 1 kata saja
    subject = sentenceParts[0];
    sentenceParts = sentenceParts.slice(1);
  }

  // ----- 3. Tangani huruf jar (ke = إلى, dari = من) -----
  let prepositions = [];
  let others = [];

  sentenceParts.forEach(word => {
    if (word === "إلى" || word === "من" || word === "لِـ") {
      prepositions.push(word);
    } else {
      others.push(word);
    }
  });

  // ----- 4. Susun kembali kalimat menjadi pola Arab -----
  const finalOrder = [];

  if (verb) finalOrder.push(verb);
  if (subject) finalOrder.push(subject);
  if (prepositions.length > 0) finalOrder.push(...prepositions);
  if (others.length > 0) finalOrder.push(...others);

  return finalOrder;
};

