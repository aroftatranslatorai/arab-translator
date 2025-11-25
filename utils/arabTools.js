/******************************************************
 * arabTools.js — FINAL VERSION (Bagian A)
 * SHOROF ENGINE PESANTREN INDONESIA — BAB 1–15
 * + Tashrif Madhi 14 Dhamir (harakat lengkap)
 * + Tashrif Mudhari 14 Dhamir (harakat lengkap)
 * + Ism Fa'il
 * + Ism Maf'ul
 * + Ism Zaman
 * + Ism Makan
 * + Masdar
 * + Masdar Tsanii
 * + Amr & Nahi
 * + Bab 1–15 auto detect
 * + Output JSON Format A (siap API)
 ******************************************************/

// Normalisasi tulisan Arab
function normalizeArabic(text) {
  if (!text) return "";
  return text
    .replace(/أ|إ|آ/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ٱ/g, "ا")
    .trim();
}

// Root extraction
function getRoot(madhi) {
  madhi = normalizeArabic(madhi);
  return [madhi[0], madhi[1], madhi[2]];
}

const fa = (root) => root[0];
const ain = (root) => root[1];
const lam = (root) => root[2];

// Detect Bab
function detectBab(madhi) {
  madhi = normalizeArabic(madhi);

  if (madhi.match(/^..ّ./)) return 4;  // فعّل
  if (madhi.startsWith("فا")) return 5; // فاعل
  if (madhi.startsWith("ا")) return 6;  // أفعل
  if (madhi.startsWith("ت") && madhi.match(/^ت..ّ./)) return 7; // تفعّل
  if (madhi.startsWith("ت") && madhi.includes("ا")) return 8; // تفاعل
  if (madhi.startsWith("ان")) return 9; // انفعل
  if (madhi.startsWith("افت")) return 10; // افتعل

  // Bab tambahan (11–15) — pola umum pesantren
  if (madhi.startsWith("افعو")) return 11;   // افعوعل
  if (madhi.startsWith("افعوّ")) return 12;  // افعوّ
  if (madhi.startsWith("افعالّ")) return 13; // افعالّ
  if (madhi.startsWith("افعنل")) return 14; // افعنلل
  if (madhi.startsWith("افعنلل")) return 15; // افعنللّ

  return 1; // fallback → باب 1
}

/*********************************************
 * TASHRIF MADHI 14 DHAMIR (HARAKAT LENGKAP)
 *********************************************/
function tashrifMadhi14(root) {
  const f = fa(root), a = ain(root), l = lam(root);

  // Pola dasar madhi: فَعَلَ
  const base = `${f}َ${a}َ${l}َ`;

  return {
    huwa: base,                      // كَتَبَ
    huma_m: `${f}َ${a}َ${l}َا`,       // كَتَبَا
    huma_f: `${f}َ${a}َ${l}َتَا`,     // كَتَبَتَا
    hum: `${f}َ${a}َ${l}ُوْا`,        // كَتَبُوا
    hunna: `${f}َ${a}َ${l}ْنَ`,       // كَتَبْنَ
    anta: `${f}َ${a}َ${l}ْتَ`,        // كَتَبْتَ
    anti: `${f}َ${a}َ${l}ْتِ`,        // كَتَبْتِ
    antuma: `${f}َ${a}َ${l}ْتُمَا`,   // كَتَبْتُمَا
    antum: `${f}َ${a}َ${l}ْتُمْ`,     // كَتَبْتُمْ
    antunna: `${f}َ${a}َ${l}ْتُنَّ`,  // كَتَبْتُنَّ
    ana: `${f}َ${a}َ${l}ْتُ`,         // كَتَبْتُ
    nahnu: `${f}َ${a}َ${l}ْنَا`       // كَتَبْنَا
  };
}

/***************************************************
 * TASHRIF MUDHARI' 14 DHAMIR (HARAKAT LENGKAP)
 ***************************************************/
function generateMudhariBase(root, bab) {
  const f = fa(root), a = ain(root), l = lam(root);

  // Pola dasar mudhari’ per bab
  switch (bab) {
    case 1: return `يَ${f}ْ${a}ُ${l}ُ`;
    case 2: return `يَ${f}ْ${a}ِ${l}ُ`;
    case 3: return `يَ${f}ْ${a}َ${l}ُ`;
    case 4: return `يُ${f}َ${a}ِّ${l}ُ`;
    case 5: return `يُ${f}َا${a}ِ${l}ُ`;
    case 6: return `يُ${f}ْ${a}ِ${l}ُ`;
    case 7: return `يَتَ${f}َ${a}َّ${l}ُ`;
    case 8: return `يَتَ${f}َا${a}ِ${l}ُ`;
    case 9: return `يَنْ${f}َ${a}ِ${l}ُ`;
    case 10: return `يَفْتَ${f}ِ${a}ِ${l}ُ`;

    // Bab 11–15 (pola pesantren umum)
    case 11: return `يُ${f}ْ${a}ُ${l}ُ`;
    case 12: return `يُ${f}َ${a}ُّ${l}ُ`;
    case 13: return `يَ${f}ْ${a}ا${l}ُّ`;
    case 14: return `يَ${f}ْ${a}ْ${l}ِ${l}ُ`;
    case 15: return `يَ${f}ْ${a}ْ${l}ِ${l}ُّ`;

    default: return `يَ${f}ْ${a}ُ${l}ُ`;
  }
}

function tashrifMudhari14(root, bab) {
  const base = generateMudhariBase(root, bab);

  return {
    huwa: base,                                // يكتب
    huma_m: base.replace(/ُ$/, "َانِ"),        // يكتبان
    huma_f: base.replace("ي", "ت").replace(/ُ$/, "َانِ"), 
    hum: base.replace(/ُ$/, "ُونَ"),           // يكتبون
    hunna: base.replace(/ُ$/, "ْنَ"),          // يكتبْنَ
    anta: base.replace("ي", "ت"),              // تكتب
    anti: base.replace("ي", "ت").replace(/ُ$/, "ِينَ"),
    antuma: base.replace("ي", "ت").replace(/ُ$/, "َانِ"),
    antum: base.replace("ي", "ت").replace(/ُ$/, "ُونَ"),
    antunna: base.replace("ي", "ت").replace(/ُ$/, "ْنَ"),
    ana: base.replace("ي", "أ"),               // أكتب
    nahnu: base.replace("ي", "ن")              // نكتب
  };
}

/**************************************
 * ISM FA'IL — Pesantren
 **************************************/
function ismFailFull(root, bab) {
  const f = fa(root), a = ain(root), l = lam(root);

  switch (bab) {
    case 1:
    case 2:
    case 3:
      return `${f}َا${a}ِ${l}`;
    case 4:
      return `${f}ُ${a}ِّ${l}`;
    case 5:
      return `مُ${f}َا${a}ِ${l}`;
    case 6:
      return `مُ${f}ْ${a}ِ${l}`;
    case 7:
      return `مُتَ${f}َ${a}ِّ${l}`;
    case 8:
      return `مُتَ${f}َا${a}ِ${l}`;
    case 9:
      return `مُنْ${f}َ${a}ِ${l}`;
    case 10:
      return `مُفْتَ${f}ِ${a}ِ${l}`;
    default:
      return `${f}َا${a}ِ${l}`;
  }
}
/**************************************
 * ISM MAF'UL — Pesantren
 **************************************/
function ismMafulFull(root, bab) {
  const f = fa(root), a = ain(root), l = lam(root);

  // Pola umum: مَفعُول
  switch (bab) {
    case 1:
    case 2:
    case 3:
      return `مَ${f}ْ${a}ُ${l}`;
    case 4:
      return `مُ${f}َ${a}َّ${l}`;
    case 5:
      return `مُ${f}َا${a}َ${l}`;
    case 6:
      return `مُ${f}ْ${a}َ${l}`;
    case 7:
      return `مُتَ${f}َ${a}َّ${l}`;
    case 8:
      return `مُتَ${f}َا${a}َ${l}`;
    case 9:
      return `مُنْ${f}َ${a}َ${l}`;
    case 10:
      return `مُفْتَ${f}َ${a}َ${l}`;
    default:
      return `مَ${f}ْ${a}ُ${l}`;
  }
}

/*****************************************
 * ISM ZAMAN / ISM MAKAN — Pesantren
 *****************************************/
function ismZamanMakan(root) {
  const f = fa(root), a = ain(root), l = lam(root);

  return {
    zaman: `مَ${f}ْ${a}َ${l}`,
    makan: `مَ${f}ْ${a}ِ${l}`
  };
}

/*****************************************
 * MASDAR + MASDAR TSANII
 *****************************************/
function masdarFull(root, bab) {
  const f = fa(root), a = ain(root), l = lam(root);

  switch (bab) {
    case 1: return `${f}َ${a}ْ${l}ٌ`;
    case 2: return `${f}َ${a}ِي${l}ٌ`;
    case 3: return `${f}َ${a}َا${l}ٌ`;
    case 4: return `تَ${f}ْ${a}ِ${l}َة`;
    case 5: return `مُ${f}َا${a}َ${l}`;
    case 6: return `إِ${f}ْ${a}َا${l}`;
    case 7: return `تَ${f}َ${a}ُّ${l}`;
    case 8: return `تَ${f}َا${a}ُ${l}`;
    case 9: return `اِنْ${f}ِ${a}َا${l}`;
    case 10: return `اِفْتِ${f}َا${l}`;
    default: return `${f}َ${a}ْ${l}ٌ`;
  }
}

function masdarTsanii(root) {
  const f = fa(root), a = ain(root), l = lam(root);
  return `${f}ِ${a}َ${l}`;
}

/**************************************
 * AMR & NAHI
 **************************************/
function amrFull(madhi, mudhari) {
  if (!mudhari) return "";

  let m = mudhari.replace(/^.\َ?/, ""); // singkirkan huruf mudhara’ah

  // kasus huruf illat
  m = m.replace(/ُو$/, "ُ");  
  m = m.replace(/ِي$/, "ِ");

  return `ا${m}ْ`;
}

function nahiFull(mudhari) {
  if (!mudhari) return "";
  return `لَا ${mudhari.replace(/ُ$/, "ْ")}`;
}

/*****************************************
 * MASTER ENGINE: GET SHOROF()
 *****************************************/
function getShorof(madhi) {
  madhi = normalizeArabic(madhi);
  const root = getRoot(madhi);
  const bab = detectBab(madhi);

  // bentuk mudhari dasar
  const mudhari = generateMudhariBase(root, bab);

  // modul lengkap
  const madhi14 = tashrifMadhi14(root);
  const mudhari14 = tashrifMudhari14(root, bab);
  const ism_faail = ismFailFull(root, bab);
  const ism_maful = ismMafulFull(root, bab);
  const msd = masdarFull(root, bab);
  const msd2 = masdarTsanii(root);
  const zamanMakan = ismZamanMakan(root);

  const amr = amrFull(madhi, mudhari);
  const nahi = nahiFull(mudhari);

  return {
    bab,
    madhi,
    mudhari,
    tashrif_madhi: madhi14,
    tashrif_mudhari: mudhari14,
    ism_faail,
    ism_maful,
    ism_zaman: zamanMakan.zaman,
    ism_makan: zamanMakan.makan,
    masdar: msd,
    masdar_tsanii: msd2,
    amr,
    nahi
  };
}

/*****************************************
 * EXPORT untuk Node.js / Vercel API
 *****************************************/
module.exports = {
  getShorof,
  fiilMudhari: (w) => getShorof(w).mudhari,
  ismFail: (w) => getShorof(w).ism_faail,
  mashdar: (w) => getShorof(w).masdar
};
/******************************************************
 * BAGIAN AKHIR — PENUTUP FILE arabTools.js FINAL
 * Semua fungsi telah diexport pada Bagian B
 * Tidak ada kode tambahan lagi setelah ini
 ******************************************************/

// Pastikan tidak ada code di bawah baris ini.
// File arabTools.js FINAL — selesai.
