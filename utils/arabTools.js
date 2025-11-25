module.exports = {
  cleanArabic(text) {
    return text
      .replace(/[ًٌٍَُِّْ]/g, "")
      .replace(/ـ/g, "")
      .trim();
  }
};
