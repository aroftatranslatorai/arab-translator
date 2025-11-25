import { detectLanguage } from "./detectLang.js";
import { translateArToId } from "./translate_ar_id.js";
import { translateIdToAr } from "./translate_id_ar.js";

export async function masterTranslate(text) {
  const lang = detectLanguage(text);

  if (lang === "arabic") {
    // Hasil langsung (arab → indo)
    return {
      direction: "AR → ID",
      base: translateArToId(text)
    };
  } else {
    // ID → AR (base)
    const arabic = translateIdToAr(text);

    // Tambah harakat lewat API kamu
    const harakat = await fetch(
      "https://arab-translator.vercel.app/api/harakat?text=" + encodeURIComponent(arabic)
    ).then(r => r.json()).catch(() => ({ result: arabic }));

    // Tambah shorof lewat API kamu
    const shorof = await fetch(
      "https://arab-translator.vercel.app/api/shorof?text=" + encodeURIComponent(arabic)
    ).then(r => r.json()).catch(() => ({ result: {} }));

    return {
      direction: "ID → AR",
      base: arabic,
      harakat: harakat.result || arabic,
      shorof: shorof.result || {},
    };
  }
}

