import { RecommendationCategory, SkinConcern } from "../../types/types";

function generateRecommendations(
  concerns: SkinConcern[],
  scores: {
    acne: number;
    redness: number;
    oil: number;
    moisture: number;
  }
) {
  const recs: {
    title: string;
    description: string;
    category: RecommendationCategory;
    priority: 1 | 2 | 3;
  }[] = [];

  if (concerns.includes("acne")) {
    recs.push({
      title: "Bantu kulit mengontrol jerawat",
      description:
        "Jerawat bisa muncul saat kulit sedang tidak seimbang. Kamu bisa mulai dengan produk yang mengandung niacinamide atau salicylic acid dalam kadar ringan agar kulit punya waktu untuk beradaptasi.",
      category: "ingredient",
      priority: 1,
    });
  }

  if (concerns.includes("redness")) {
    recs.push({
      title: "Tenangkan kulit yang sedang sensitif",
      description:
        "Saat kulit terlihat kemerahan, sebaiknya perlakukan dengan lebih lembut. Coba hindari eksfoliasi fisik dulu dan pilih produk dengan klaim menenangkan agar kulit bisa pulih.",
      category: "warning",
      priority: 1,
    });
  }

  if (scores.moisture <= 4) {
    recs.push({
      title: "Jaga hidrasi kulit dengan lembut",
      description:
        "Kulit yang terhidrasi dengan baik akan lebih kuat. Kamu bisa menambahkan moisturizer ringan dengan kandungan humectant seperti glycerin atau hyaluronic acid untuk membantu menjaga kelembapan.",
      category: "routine",
      priority: 2,
    });
  }

  return recs;
}
