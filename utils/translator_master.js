// utils/translator_master.js
import { detectLanguage } from "./detectLang.js";
import { translateArToId } from "./translate_ar_id.js";
import { translateIdToAr } from "./translate_id_ar.js";

export async function masterTranslate(text) {
  const lang = detectLanguage(text);

  // ==========================
  // MODE ARAB → INDONESIA
  // ==========================
  if (lang === "arabic") {
    return {
      direction: "AR → ID",
      base: translateArToId(text)
    };
  }

  // ==========================
  // MODE INDONESIA → ARAB
  // ==========================
  const arabic = translateIdToAr(text);

  // --- H A R A K A T ---
  const harakat = await fetch(
    "https://arab-translator.vercel.app/api/harakat?text=" + encodeURIComponent(arabic)
  )
    .then(res => res.json())
    .catch(() => ({ harakat: arabic }));

  // --- S H O R O F ---
  const shorof = await fetch(
    "https://arab-translator.vercel.app/api/shorof?madhi=" + encodeURIComponent(arabic)
  )
    .then(res => res.json())
    .catch(() => ({}));

  return {
    direction: "ID → AR",
    base: arabic,
    harakat: harakat.harakat || arabic,
    shorof: shorof || {}
  };
}
