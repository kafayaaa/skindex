import { Severity } from "./severity";

/* =========================
   ACNE
========================= */
export const acneRecommendations = {
  low: {
    title: "Jaga keseimbangan kulit agar jerawat tidak berkembang",
    description:
      "Beberapa tanda jerawat ringan mulai muncul, tapi masih mudah dikontrol. Gunakan perawatan ringan agar kulit tetap nyaman.",
  },
  medium: {
    title: "Bantu kulit mengendalikan jerawat secara bertahap",
    description:
      "Jerawat terlihat cukup aktif, menandakan kulit sedang tidak seimbang. Fokus pada perawatan lembut dan konsisten.",
  },
  high: {
    title: "Fokus menenangkan kulit dan mengontrol jerawat",
    description:
      "Jerawat tampak cukup dominan. Saat ini, menenangkan kulit dan menghindari terlalu banyak bahan aktif adalah langkah terbaik.",
  },
};

/* =========================
   OILINESS
========================= */
export const oilRecommendations = {
  low: {
    title: "Jaga produksi minyak tetap seimbang",
    description:
      "Produksi minyak kulitmu masih tergolong normal. Pertahankan dengan pembersihan yang lembut agar kulit tetap nyaman.",
  },
  medium: {
    title: "Bantu mengontrol minyak berlebih",
    description:
      "Minyak terlihat cukup aktif, terutama di area tertentu. Gunakan produk dengan klaim oil-control tanpa membuat kulit terasa kering.",
  },
  high: {
    title: "Fokus menyeimbangkan minyak tanpa mengiritasi",
    description:
      "Produksi minyak cukup tinggi dan bisa memicu masalah lain. Pilih perawatan ringan yang membantu mengontrol minyak tanpa mengganggu skin barrier.",
  },
};

/* =========================
   REDNESS
========================= */
export const rednessRecommendations = {
  low: {
    title: "Perhatikan tanda awal sensitivitas kulit",
    description:
      "Terlihat sedikit kemerahan, yang bisa menjadi tanda awal kulit sensitif. Rawat dengan lembut agar tidak berkembang.",
  },
  medium: {
    title: "Tenangkan kulit yang mulai mudah iritasi",
    description:
      "Kemerahan cukup terlihat dan menandakan kulit sedang sensitif. Hindari produk keras dan fokus pada soothing ingredients.",
  },
  high: {
    title: "Prioritaskan pemulihan skin barrier",
    description:
      "Kemerahan tampak dominan dan bisa terasa tidak nyaman. Fokuskan perawatan pada calming dan barrier-repair terlebih dahulu.",
  },
};

/* =========================
   MOISTURE
========================= */
export const moistureRecommendations = {
  low: {
    title: "Pertahankan hidrasi kulit",
    description:
      "Kelembapan kulit masih cukup baik. Menjaga hidrasi secara konsisten akan membantu kulit tetap sehat.",
  },
  medium: {
    title: "Bantu kulit mempertahankan kelembapan",
    description:
      "Kulit mulai kekurangan hidrasi. Menambahkan moisturizer ringan dapat membantu menjaga kenyamanan kulit.",
  },
  high: {
    title: "Pulihkan hidrasi kulit secara bertahap",
    description:
      "Kulit terlihat cukup kering atau dehidrasi. Fokuskan perawatan pada hidrasi agar kulit tidak semakin sensitif.",
  },
};
