// translator_master.js — SUPER HYBRID ENGINE v3
// Engine gabungan MODE A + Google + Libre + Hybrid Filters

const detectLang = require("./detectLang");

// MODE A engines (buatanmu)
const translateAR_local = require("./translate_ar_id");
const translateID_local = require("./translate_id_ar_plus");

// Hybrid helpers
const preprocessHybrid = require("./preprocess_hybrid");
const tokenizeHybrid = require("./tokenizer_hybrid");
const nahwuHybrid = require("./nahwu_hybrid");
const harakatHybrid = require("./harakat_hybrid");
const hybridDetector = require("./hybrid_detector");

// Online fallback engines
const googleTranslate = require("./google_translate");
const libreTranslate = require("./libre_translate");

// Dynamic dictionary learning
const { addToDictionary } = require("./dynamic_dictionary");

module.exports = async function masterTranslator(text) {
  const lang = detectLang(text);

  // =============================================================
  // 🔵 1) ARAB → INDONESIA
  // =============================================================
  if (lang === "ar") {
    // 1. Coba MODE lokal (kamus_ar_id.js)
    const localResult = translateAR_local(text);

    if (localResult && localResult.trim() !== "") {
      return {
        direction: "AR → ID",
        result: localResult
      };
    }

    // 2. Jika gagal → fallback LibreTranslate
    const lt = await libreTranslate(text);

    if (lt) {
      addToDictionary("ar", text, lt); // simpan
      return {
        direction: "AR → ID (Hybrid)",
        result: lt
      };
    }

    // fallback terakhir
    return {
      direction: "AR → ID",
      result: "(tidak dapat menerjemahkan)"
    };
  }

  // =============================================================
  // 🔴 2) INDONESIA → ARAB
  // =============================================================

  // 1. Coba MODE A engine kamu
  const modeA = translateID_local(text);

  if (hybridDetector(text, modeA, "id")) {
    return {
      direction: "ID → AR (MODE A)",
      result: modeA
    };
  }

  // 2. Jika MODE A gagal → fallback ke Google
  const googleRaw = await googleTranslate(text);

  if (!googleRaw) {
    return {
      direction: "ID → AR (Hybrid)",
      result: "(gagal via Google dan Engine)"
    };
  }

  // Simpan hasil Google di kamus dinamis
  addToDictionary("id", text, googleRaw);

  // 3. Preprocess hasil Google
  const cleaned = preprocessHybrid(googleRaw);

  // 4. Tokenize
  const tokens = tokenizeHybrid(cleaned);

  // 5. Nahwu Hybrid
  const ordered = nahwuHybrid(tokens);

  // 6. Harakat Hybrid
  const finalWords = ordered.map(w => harakatHybrid(w));

  const finalSentence = finalWords.join(" ");

  return {
    direction: "ID → AR (Hybrid)",
    result: finalSentence
  };
};
