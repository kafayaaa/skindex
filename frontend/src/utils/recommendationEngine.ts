// utils/recommendationEngine.ts
export function generateRecommendations(
  severity: "low" | "medium" | "high",
  concerns: string[]
): string[] {
  const recommendations: string[] = [];

  if (concerns.includes("acne")) {
    recommendations.push(
      severity === "high"
        ? "Hindari produk comedogenic dan pertimbangkan konsultasi dermatolog."
        : "Gunakan cleanser lembut dan jaga kebersihan wajah."
    );
  }

  if (concerns.includes("oil")) {
    recommendations.push(
      "Gunakan moisturizer berbasis gel dan hindari over-cleansing."
    );
  }

  if (concerns.includes("redness")) {
    recommendations.push(
      "Hindari produk dengan alkohol dan fragrance berlebih."
    );
  }

  if (concerns.includes("dry")) {
    recommendations.push(
      "Gunakan moisturizer dengan kandungan ceramide atau hyaluronic acid."
    );
  }

  return recommendations;
}
