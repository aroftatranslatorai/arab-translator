// Nahwu Hybrid Engine v2
// Penyusunan ulang Google Translate Arabic menjadi struktur Arab natural

module.exports = function nahwuHybrid(words) {
  if (!Array.isArray(words) || words.length === 0) return words;

  const arab = w => /[\u0600-\u06FF]/.test(w); // cek huruf arab

  // Pisahkan kategori utama
  let verbs = [];
  let subjects = [];
  let preps = [];
  let objects = [];
  let others = [];

  const hurufJar = ["إلى", "من", "في", "على", "عن", "ل", "ب"];

  for (let w of words) {
    if (!arab(w)) continue;

    if (hurufJar.includes(w.replace(/^ال/, ""))) {
      preps.push(w);
    }
    else if (/^(ي|ت|ن|أ)/.test(w) && w.length <= 6) {
      // Bentuk fi'il mudhari' singkat
      verbs.push(w);
    }
    else if (w.startsWith("أنا") || w.startsWith("هو") || w.startsWith("هي") || w.startsWith("نحن")) {
      subjects.push(w);
    }
    else if (w.length >= 4 && !w.startsWith("ال")) {
      // anggap sebagai isim/objek
      objects.push("ال" + w); // tambah ma’rifah otomatis
    }
    else {
      others.push(w);
    }
  }

  // Susunan Arab natural: V → S → Preposition → Object → Others
  const finalOrder = [];

  if (verbs.length > 0) finalOrder.push(verbs[0]);
  if (subjects.length > 0) finalOrder.push(subjects[0]);
  if (preps.length > 0) finalOrder.push(...preps);
  if (objects.length > 0) finalOrder.push(...objects);
  if (others.length > 0) finalOrder.push(...others);

  return finalOrder;
};

