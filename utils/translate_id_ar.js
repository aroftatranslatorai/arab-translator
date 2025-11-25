import { KAMUS_ID_AR } from "./kamus_id_ar.js";

export function translateIdToAr(text) {
  if (!text) return "";

  const words = text.toLowerCase().split(/\s+/);
  let result = [];

  for (const w of words) {
    const cleaned = w.replace(/[^a-z]/g, "");
    if (!cleaned) continue;

    const found = KAMUS_ID_AR[cleaned];
    if (found) {
      result.push(found);
    } else {
      result.push("[?]");
    }
  }

  return result.join(" ");
}

