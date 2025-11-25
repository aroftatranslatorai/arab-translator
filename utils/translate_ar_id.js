import { KAMUS_AR_ID } from "./kamus_ar_id.js";

export function translateArToId(text) {
  if (!text) return "";

  const words = text.split(/\s+/);
  let result = [];

  for (const word of words) {
    const lower = word.trim();
    const key = lower.replace(/[^\u0600-\u06FF]/g, "");

    if (!key) continue;

    const found = KAMUS_AR_ID[key];
    if (found) {
      result.push(found);
    } else {
      result.push("[?]");
    }
  }

  return result.join(" ");
}

