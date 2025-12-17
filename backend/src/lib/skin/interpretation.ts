import { SkinConcern, SkinCondition } from "../../types/types";

type Level = "low" | "medium" | "high";

function level(score: number): Level {
  if (score <= 3) return "low";
  if (score <= 6) return "medium";
  return "high";
}

function determineSkinCondition(scores: {
  oiliness: number;
  moisture: number;
  acne: number;
  redness: number;
}): SkinCondition {
  const oil = level(scores.oiliness);
  const moisture = level(scores.moisture);
  const acne = level(scores.acne);
  const redness = level(scores.redness);

  // 1. Inflamed (prioritas tertinggi)
  if (redness === "high" && acne !== "low") {
    return "inflamed";
  }

  // 2. Sensitive
  if (redness === "high" && oil !== "high") {
    return "sensitive";
  }

  // 3. Oily - Acne Prone
  if (oil === "high" && acne === "high") {
    return "oily_acne_prone";
  }

  // 4. Oily Dehydrated
  if (oil === "high" && moisture === "low") {
    return "oily_dehydrated";
  }

  // 5. Dry Irritated
  if (oil === "low" && redness !== "low") {
    return "dry_irritated";
  }

  // 6. Dry Dehydrated
  if (oil === "low" && moisture === "low") {
    return "dry_dehydrated";
  }

  // 7. Oily
  if (oil === "high") {
    return "oily";
  }

  // 8. Dry
  if (oil === "low") {
    return "dry";
  }

  // 9. Balanced (default)
  return "balanced";
}

function determineConcerns(scores: {
  acne: number;
  oil: number;
  redness: number;
  moisture: number;
}): SkinConcern[] {
  const concerns: SkinConcern[] = [];

  if (scores.acne >= 4) concerns.push("acne");
  if (scores.redness >= 4) concerns.push("redness");
  if (scores.oil >= 6) concerns.push("oiliness");
  if (scores.moisture <= 4) concerns.push("dry");

  return concerns;
}

function skinConditionLabel(condition: SkinCondition): string {
  switch (condition) {
    case "balanced":
      return "cukup seimbang";
    case "oily":
      return "cenderung berminyak";
    case "oily_dehydrated":
      return "berminyak tapi kurang terhidrasi";
    case "oily_acne_prone":
      return "berminyak dan mudah berjerawat";
    case "dry":
      return "cenderung kering";
    case "dry_dehydrated":
      return "kering dan kurang terhidrasi";
    case "dry_irritated":
      return "kering dan sedang iritasi";
    case "sensitive":
      return "cukup sensitif saat ini";
    case "inflamed":
      return "sedang mengalami peradangan";
    default:
      return "cukup seimbang";
  }
}

function concernLabel(concern: SkinConcern): string {
  switch (concern) {
    case "acne":
      return "jerawat";
    case "oiliness":
      return "produksi minyak berlebih";
    case "redness":
      return "kemerahan pada kulit";
    case "dry":
      return "kulit yang kurang terhidrasi";
    default:
      return concern;
  }
}

const OPENING_LIGHT = [
  "Aku sudah melihat kondisi kulitmu hari ini, dan secara umum kondisinya cukup baik.",
  "Dari hasil analisis hari ini, kulitmu berada dalam kondisi yang relatif stabil.",
  "Kulitmu hari ini terlihat cukup seimbang, hanya ada beberapa hal kecil yang bisa kita perhatikan bersama.",
  "Secara keseluruhan, kondisi kulitmu hari ini masih tergolong baik dan terjaga.",
  "Hasil analisis hari ini menunjukkan bahwa kulitmu berada di kondisi yang cukup aman.",
];

const OPENING_MODERATE = [
  "Aku sudah menganalisis kondisi kulitmu hari ini, dan ada beberapa hal yang perlu kita perhatikan bersama.",
  "Dari hasil analisis hari ini, kulitmu menunjukkan beberapa tanda yang cukup umum terjadi.",
  "Kulitmu hari ini terlihat mengalami sedikit ketidakseimbangan, tapi masih bisa ditangani dengan baik.",
  "Hasil analisis menunjukkan bahwa kulitmu sedang beradaptasi, dan ada beberapa sinyal yang perlu kita jaga.",
  "Dari pengamatan hari ini, kondisi kulitmu masih wajar, meskipun ada beberapa hal yang sebaiknya mulai diperhatikan.",
];

const OPENING_SEVERE = [
  "Aku sudah melihat kondisi kulitmu hari ini, dan sepertinya kulitmu sedang butuh perhatian ekstra.",
  "Hasil analisis hari ini menunjukkan bahwa kulitmu sedang mengalami stres, jadi kita perlu lebih berhati-hati.",
  "Dari kondisi hari ini, kulitmu terlihat cukup sensitif dan sebaiknya diperlakukan dengan lebih lembut.",
  "Hari ini kulitmu memberi sinyal bahwa ada peradangan yang perlu kita perhatikan bersama.",
  "Aku memahami kondisi kulitmu hari ini mungkin terasa tidak nyaman, tapi tenang, kita bisa menanganinya secara bertahap.",
];

const CLOSING_LIGHT = [
  "Pertahankan rutinitas perawatanmu seperti sekarang, karena kulitmu sudah berada di jalur yang baik.",
  "Dengan perawatan yang konsisten, kondisi kulitmu bisa tetap terjaga seperti ini.",
  "Tidak perlu perubahan besar, cukup lanjutkan perawatan yang sudah kamu lakukan.",
  "Kulitmu sedang dalam kondisi yang cukup baik, jadi fokus saja pada menjaga keseimbangannya.",
  "Konsistensi kecil setiap hari akan membantu menjaga kondisi kulitmu tetap stabil.",
];

const CLOSING_MODERATE = [
  "Dengan penyesuaian perawatan yang tepat, kondisi kulit seperti ini bisa membaik secara bertahap.",
  "Tidak perlu terburu-buru, fokus saja pada perawatan yang lembut dan konsisten.",
  "Perubahan kecil dalam rutinitas harianmu bisa memberi dampak yang cukup besar untuk kulit.",
  "Kulitmu hanya sedang butuh perhatian ekstra, dan itu sangat wajar.",
  "Berikan waktu pada kulitmu untuk beradaptasi, karena proses perbaikan memang tidak instan.",
];

const CLOSING_SEVERE = [
  "Saat ini yang terpenting adalah memberi waktu dan perawatan yang lembut agar kulitmu bisa pulih.",
  "Fokuslah pada menenangkan kulit terlebih dahulu, dan hindari perubahan perawatan yang drastis.",
  "Kondisi ini memang bisa terasa tidak nyaman, tapi dengan pendekatan yang tepat, kulitmu bisa membaik.",
  "Tidak apa-apa jika hasilnya belum langsung terlihat, yang penting kamu sudah merawat kulitmu dengan benar.",
  "Jika kulit terasa semakin tidak nyaman, istirahatkan dulu dari produk aktif dan fokus pada pemulihan.",
];

function getOpeningByCondition(condition: SkinCondition): string {
  if (
    condition === "inflamed" ||
    condition === "dry_irritated" ||
    condition === "sensitive"
  ) {
    return randomFrom(OPENING_SEVERE);
  }

  if (
    condition === "oily_acne_prone" ||
    condition === "oily_dehydrated" ||
    condition === "dry_dehydrated"
  ) {
    return randomFrom(OPENING_MODERATE);
  }

  return randomFrom(OPENING_LIGHT);
}

function getClosingByCondition(condition: SkinCondition): string {
  if (
    condition === "inflamed" ||
    condition === "dry_irritated" ||
    condition === "sensitive"
  ) {
    return randomFrom(CLOSING_SEVERE);
  }

  if (
    condition === "oily_acne_prone" ||
    condition === "oily_dehydrated" ||
    condition === "dry_dehydrated"
  ) {
    return randomFrom(CLOSING_MODERATE);
  }

  return randomFrom(CLOSING_LIGHT);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSummary(
  skinCondition: SkinCondition,
  concerns: SkinConcern[],
  scores: {
    acne: number;
    oil: number;
    redness: number;
    moisture: number;
  }
) {
  const opening = getOpeningByCondition(skinCondition);
  const closing = getClosingByCondition(skinCondition);
  let summary = `${opening} `;
  summary += `Dari hasil analisis hari ini, kulitmu terlihat ${skinConditionLabel(
    skinCondition
  )}. `;

  if (concerns.length > 0) {
    summary += `Beberapa hal yang perlu kamu perhatikan saat ini adalah `;
    summary += concerns.map((c) => concernLabel(c)).join(", ");
    summary += `. `;
  }

  summary += `Kadar kelembapan kulitmu berada di tingkat ${level(
    scores.moisture
  )}, `;
  summary += `sementara produksi minyaknya berada di tingkat ${level(
    scores.oil
  )}. `;

  summary += `${closing}`;

  return summary;
}
