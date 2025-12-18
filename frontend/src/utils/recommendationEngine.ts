// utils/recommendationEngine.ts

const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

export function generateRecommendations(
  severity: "low" | "medium" | "high",
  concerns: string[]
): string[] {
  const ALL_RECOMMENDATIONS = {
    acne: {
      high: [
        "Fokus utama sekarang adalah menenangkan peradangan. Gunakan Pimple Patch agar jerawat terlindungi.",
        "Gunakan Skincare dengan Salicylic Acid atau Benzoyl Peroxide untuk meredakan jerawat aktif.",
        "Kulitmu sedang sensitif, gunakan pelembab dengan bahan Centella Asiatica, Mughwort, Panthenol untuk mengontrol kemerahan akibat peradangan.",
        "Gunakan Spot treatment yang mengandung Sulfur atau Tea Tree Oil tepat pada area jerawat.",
        "Hindari produk comedogenic (penyumbat pori) dan pertimbangkan konsultasi ke dokter kulit jika nyeri berlanjut.",
        "Jangan sering menyentuh atau menopang dagu dengan tangan agar bakteri tidak berpindah ke area jerawat.",
        "Coba gunakan produk dengan Azelaic Acid untuk membantu meredakan radang sekaligus memudarkan bekasnya, Tapi harus konsul ke dokter kulit dulu yaaa...",
      ],
      low: [
        "Gunakan cleanser yang lembut di pagi dan malam hari agar pori-pori tidak tersumbat kotoran.",
        "Jaga kebersihan benda yang menyentuh wajah, seperti rutin mengganti sarung bantal seminggu sekali.",
        "Pilih produk dengan kandungan Mugwort untuk menjaga kulit tetap bersih dan bebas bakteri.",
        "Pastikan melakukan double cleansing setelah beraktivitas untuk mengangkat sisa sunscreen secara sempurna.",
        "Gunakan pelembap ringan (gel-based) agar kulit tetap terhidrasi tanpa terasa berat atau berminyak.",
        "Selalu gunakan Sunscreen di pagi hari agar bekas jerawat tidak berubah menjadi noda hitam yang sulit hilang.",
        "Hindari penggunaan Scrub wajah yang kasar, lebih baik pilih eksfoliasi dengan bahan yang lembut seperti PHA.",
        "Pastikan asupan air putih tercukupi, karena kulit yang terhidrasi dengan baik lebih cepat menyembuhkan diri.",
      ],
    },
    oil: [
      "Pilih pelembap berbasis Gel yang ringan agar wajah tetap lembap tanpa rasa lengket.",
      "Gunakan masker Clay Mask 1-2 kali seminggu untuk menyerap kelebihan minyak di pori-pori.",
      "Cari bahan aktif Zinc PCA atau Niacinamide yang efektif membantu mengontrol produksi sebum.",
      "Gunakan sunscreen dengan hasil akhir matte atau oil-control agar wajah bebas kilap seharian.",
      "Hindari mencuci muka terlalu sering (over-cleansing) karena bisa memicu kulit memproduksi minyak lebih banyak.",
      "Gunakan Loose Powder (bedak tabur) tipis-tipis untuk membantu menyerap kelebihan minyak di siang hari.",
      "Bahan aktif BHA (Salicylic Acid) sangat bagus untuk membersihkan minyak yang 'terperangkap' di dalam pori-pori.",
      "Selalu sedia Blotting Paper (kertas minyak) untuk menepuk area berminyak tanpa perlu menggosok wajah.",
    ],
    redness: [
      "Hindari produk dengan kandungan alkohol kering dan pewangi (fragrance) yang bisa memicu iritasi.",
      "Gunakan produk dengan kandungan Centella Asiatica (Cica) untuk menenangkan area yang kemerahan.",
      "Serum dengan Panthenol atau Allantoin sangat baik untuk memperkuat pertahanan kulitmu.",
      "Cuci muka dengan air suhu ruang; air yang terlalu panas bisa membuat pembuluh darah melebar dan wajah makin merah.",
      "Gunakan hydrating toner dengan metode kompres (masker CSM) selama 5 menit untuk mendinginkan kulit.",
      "Lindungi kulit dari panas matahari langsung dengan topi atau payung, karena suhu panas bisa memicu kemerahan.",
      "Cari pelembap dengan kandungan Colloidal Oatmeal yang dikenal ampuh menenangkan kulit iritasi dan perih.",
      "Gunakan masker wajah bertekstur gel yang mengandung Aloe Vera dingin untuk efek soothing instan.",
    ],
    dry: [
      "Kunci kelembapan kulitmu dengan moisturizer yang kaya akan Ceramide untuk memperbaiki lapisan pelindung kulit.",
      "Gunakan produk berbahan Hyaluronic Acid pada kulit yang masih setengah basah agar hidrasi terserap maksimal.",
      "Pilih pembersih wajah bertekstur milk atau cream yang tidak memberikan efek 'ketarik' setelah dibilas.",
      "Tambahkan face oil seperti Squalane pada urutan terakhir skincare malammu untuk kelembutan ekstra.",
      "Lakukan layering (pelapisan) hydrating toner 2-3 kali untuk memberi asupan air yang cukup bagi kulit.",
      "Hindari mandi air panas terlalu lama (lebih dari 10 menit) karena bisa meluruhkan minyak alami pelindung kulit.",
      "Pilih produk yang mengandung Vitamin E atau Shea Butter untuk memberi nutrisi ekstra pada area yang mengelupas.",
      "Jika sering di ruangan ber-AC, gunakan humidifier agar udara tidak menyedot kelembapan dari kulitmu.",
    ],
  };

  const recommendations = [];

  if (concerns.includes("acne")) {
    const tips =
      severity === "high"
        ? ALL_RECOMMENDATIONS.acne.high
        : ALL_RECOMMENDATIONS.acne.low;
    recommendations.push(...shuffle(tips.slice(0, 3)));
  }

  if (concerns.includes("oil")) {
    recommendations.push(...shuffle(ALL_RECOMMENDATIONS.oil.slice(0, 3)));
  }

  if (concerns.includes("redness")) {
    recommendations.push(...shuffle(ALL_RECOMMENDATIONS.redness.slice(0, 3)));
  }

  if (concerns.includes("dry")) {
    recommendations.push(...shuffle(ALL_RECOMMENDATIONS.dry.slice(0, 3)));
  }

  return recommendations;
}
