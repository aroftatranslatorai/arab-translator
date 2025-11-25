export function detectLanguage(text) {
  if (!text) return "unknown";

  const arabicRegex = /[\u0600-\u06FF]/;
  const indonesianRegex = /[a-zA-Z]/;

  const hasArabic = arabicRegex.test(text);
  const hasLatin = indonesianRegex.test(text);

  if (hasArabic && !hasLatin) return "arabic";
  if (!hasArabic && hasLatin) return "indonesian";

  // Campur → default: bahasa Arab
  return hasArabic ? "arabic" : "indonesian";
}

