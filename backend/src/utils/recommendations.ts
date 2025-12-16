import { SkinMetric } from "./skinRules";

export function generateRecommendations(
  metric: SkinMetric,
  causes: string[]
): string[] {
  const recommendations: string[] = [];

  // Rekomendasi berdasarkan faktor Stres
  if (causes.some((c) => c.includes("stres"))) {
    recommendations.push(
      "Coba luangkan waktu sejenak untuk relaksasi atau meditasi ya, supaya pikiran dan kulitmu jadi lebih tenang."
    );
  }

  // Rekomendasi berdasarkan faktor Tidur
  if (causes.some((c) => c.includes("tidur"))) {
    recommendations.push(
      "Yuk, usahakan tidur minimal 7-8 jam malam ini! Istirahat yang cukup adalah kunci kulit glowing dan segar."
    );
  }

  // Rekomendasi berdasarkan Skor Kelembapan
  if (metric === "moisture_score") {
    recommendations.push(
      "Jangan lupa minum air putih yang cukup sepanjang hari agar hidrasi kulitmu tetap terjaga dari dalam."
    );
  }

  // Rekomendasi tambahan jika nilai kelembapan rendah (Opsional namun bagus untuk user)
  if (metric === "moisture_score") {
    recommendations.push(
      "Gunakan pelembap yang sesuai dengan jenis kulitmu setelah mencuci muka untuk mengunci hidrasi."
    );
  }

  return [...new Set(recommendations)];
}
