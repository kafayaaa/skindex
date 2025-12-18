import { Severity } from "./severity";

/* =========================
   ACNE (Skor: Low <=3, Medium <=6, High >=7)
========================= */
export const acneRecommendations = {
  low: {
    title: "Jaga keseimbangan kulit agar jerawat tidak berkembang",
    descriptions: [
      "Beberapa tanda jerawat ringan mulai muncul, tapi masih mudah dikontrol. Gunakan perawatan ringan agar kulit tetap nyaman.",
      "Kulitmu terlihat cukup bersih hari ini! Tetap rutin bersihkan wajah ya agar pori-pori tidak tersumbat kotoran.",
      "Kondisi jerawatmu sangat minim. Menjaga pola makan dan kebersihan sarung bantal bisa membantu mempertahankannya.",
      "Sejauh ini semuanya aman terkendali. Cukup gunakan spot treatment tipis-tipis jika ada area yang terasa agak meradang.",
      "Hanya butuh perawatan dasar yang konsisten. Jangan lupa double cleansing setelah beraktivitas seharian ya!",
    ],
  },
  medium: {
    title: "Bantu kulit mengendalikan jerawat secara bertahap",
    descriptions: [
      "Jerawat terlihat cukup aktif, menandakan kulit sedang tidak seimbang. Fokus pada perawatan lembut dan konsisten.",
      "Sepertinya ada beberapa peradangan yang butuh perhatianmu. Gunakan produk berbahan dasar Salicylic Acid atau Tea Tree secara rutin.",
      "Kulitmu sedang berusaha melawan bakteri penyebab jerawat. Bantu prosesnya dengan tidak memencet jerawat yang sedang meradang ya.",
      "Kondisi jerawatmu mulai butuh penanganan lebih serius. Cobalah beralih ke skincare yang lebih minimalis dan bebas pewangi dulu.",
      "Ada tanda-tanda penyumbatan pori di beberapa area. Eksfoliasi lembut seminggu 2x bisa membantu meredakan kondisinya.",
    ],
  },
  high: {
    title: "Fokus menenangkan kulit dan mengontrol jerawat",
    descriptions: [
      "Jerawat tampak cukup dominan. Saat ini, menenangkan kulit dan menghindari terlalu banyak bahan aktif adalah langkah terbaik.",
      "Kulitmu sedang berjuang keras melawan peradangan. Fokus utama kita sekarang adalah menenangkan kulit yang sedang reaktif.",
      "Sebaiknya stop dulu produk dengan bahan aktif tinggi. Kulitmu butuh waktu untuk 'istirahat' dan pulih dari peradangan.",
      "Jerawat yang cukup banyak seringkali disebabkan oleh skin barrier yang terganggu. Ayo fokus pakai produk yang menenangkan.",
      "Kulitmu sedang dalam fase yang sensitif karena jerawat. Gunakan pembersih wajah yang sangat lembut agar tidak semakin iritasi.",
    ],
  },
};

/* =========================
   OILINESS
========================= */
export const oilRecommendations = {
  low: {
    title: "Jaga produksi minyak tetap seimbang",
    descriptions: [
      "Produksi minyak kulitmu masih tergolong normal. Pertahankan dengan pembersihan yang lembut agar kulit tetap nyaman.",
      "Wajahmu terlihat segar tanpa minyak berlebih. Cukup gunakan pelembap ringan berbahan dasar air agar tetap seimbang.",
      "Kadar minyak dan air di kulitmu terlihat sinkron. Jangan lupa tetap pakai sunscreen karena panas bisa memicu minyak berlebih.",
      "Sejauh ini area wajahmu masih cukup terkendali. Membersihkan wajah 2x sehari sudah cukup untuk menjaga kesegaranmu.",
      "Kulitmu tampak matte namun tetap sehat. Hindari mencuci muka terlalu sering agar minyak alami kulit tidak hilang sepenuhnya.",
    ],
  },
  medium: {
    title: "Bantu mengontrol minyak berlebih",
    descriptions: [
      "Minyak terlihat cukup aktif, terutama di area tertentu. Gunakan produk dengan klaim oil-control tanpa membuat kulit terasa kering.",
      "Area T-zone (dahi, hidung, dagu) mulai tampak berkilau. Kertas minyak atau bedak tabur halus bisa membantumu tetap segar.",
      "Produksi sebum meningkat, mungkin karena cuaca atau aktivitas. Coba gunakan toner yang membantu ringkas tampilan pori-pori.",
      "Kulitmu mulai terasa agak lengket. Gunakan pelembap tekstur gel agar kulit terhidrasi tanpa terasa berat atau berminyak.",
      "Minyak berlebih bisa menyumbat pori jika tidak dibersihkan. Pastikan double cleansing setiap malam untuk angkat sisa minyak ya.",
    ],
  },
  high: {
    title: "Fokus menyeimbangkan minyak tanpa mengiritasi",
    descriptions: [
      "Produksi minyak cukup tinggi dan bisa memicu masalah lain. Pilih perawatan ringan yang membantu mengontrol minyak tanpa mengganggu barrier.",
      "Kilap minyak terlihat sangat dominan di hampir seluruh wajah. Fokus pada bahan seperti Niacinamide untuk membantu regulasi sebum.",
      "Kondisi ini seringkali terjadi karena kulit 'haus'. Coba tambahkan hidrasi ekstra, jangan hanya fokus mengeringkan minyaknya.",
      "Kulitmu terasa sangat berminyak? Hindari produk berbahan dasar minyak (oil-based) dan pilih yang berlabel non-comedogenic.",
      "Minyak berlebih ini butuh perhatian khusus agar tidak menjadi jerawat. Pembersihan yang mendalam namun lembut sangat disarankan.",
    ],
  },
};

/* =========================
   REDNESS
========================= */
export const rednessRecommendations = {
  low: {
    title: "Perhatikan tanda awal sensitivitas kulit",
    descriptions: [
      "Terlihat sedikit kemerahan, yang bisa menjadi tanda awal kulit sensitif. Rawat dengan lembut agar tidak berkembang.",
      "Warna kulitmu sedikit tidak merata di beberapa titik. Yuk, lebih lembut saat mencuci muka agar tidak memicu iritasi.",
      "Ada rona merah tipis yang muncul. Gunakan produk berbahan Centella Asiatica atau Aloe Vera untuk sensasi dingin yang menenangkan.",
      "Kulitmu terlihat agak hangat. Pastikan air yang kamu gunakan untuk mencuci muka tidak terlalu panas agar kemerahan mereda.",
      "Sensitivitas kulitmu masih sangat rendah. Cukup lindungi dengan sunscreen setiap hari agar kemerahan tidak semakin terlihat.",
    ],
  },
  medium: {
    title: "Tenangkan kulit yang mulai mudah iritasi",
    descriptions: [
      "Kemerahan cukup terlihat dan menandakan kulit sedang sensitif. Hindari produk keras dan fokus pada soothing ingredients.",
      "Kulitmu sepertinya sedang reaktif terhadap sesuatu. Coba evaluasi produk barumu dan fokuslah pada hidrasi yang menenangkan.",
      "Kemerahan di pipi atau hidung mulai menetap. Ini saatnya menggunakan serum calming untuk membantu meredakan inflamasi.",
      "Waspada, skin barrier-mu mungkin sedang sedikit menipis. Gunakan produk yang mengandung Ceramide untuk memperkuat pelindung kulit.",
      "Hindari dulu menggosok wajah terlalu kuat dengan handuk. Kulit yang merah butuh sentuhan yang jauh lebih halus dan sabar.",
    ],
  },
  high: {
    title: "Prioritaskan pemulihan skin barrier",
    descriptions: [
      "Kemerahan tampak dominan dan bisa terasa tidak nyaman. Fokuskan perawatan pada calming dan barrier-repair terlebih dahulu.",
      "Kulitmu sedang dalam fase sangat sensitif. Stop semua eksfoliasi fisik maupun kimia sampai kemerahannya benar-benar mereda ya.",
      "Aduh, sepertinya kulitmu lagi protes keras! Gunakan kompres air dingin atau masker penenang untuk meredakan rasa panasnya.",
      "Iritasi terlihat cukup luas. Gunakan skincare yang sangat minimalis, tanpa parfum, dan tanpa alkohol untuk sementara waktu.",
      "Prioritas utama kita adalah 'memadamkan api' di kulitmu. Fokus pada hidrasi penguatan barrier agar kulit tidak terasa perih.",
    ],
  },
};

/* =========================
   MOISTURE
========================= */
export const moistureRecommendations = {
  low: {
    title: "Pertahankan hidrasi kulit",
    descriptions: [
      "Kelembapan kulit masih cukup baik. Menjaga hidrasi secara konsisten akan membantu kulit tetap sehat.",
      "Kulitmu terasa kenyal dan terhidrasi dengan pas! Pertahankan asupan air putihmu agar kelembapan alami tetap terjaga.",
      "Kadar air di kulitmu sangat ideal. Rutin menggunakan pelembap pagi dan malam akan menjaga elastisitas kulitmu.",
      "Semuanya terlihat seimbang! Kulit yang lembap adalah kunci kulit glowing, jadi tetap rajin pakai moisturizer ya.",
      "Permukaan kulitmu tampak halus. Menambahkan face mist saat cuaca panas bisa membantu mempertahankan kesegarannya.",
    ],
  },
  medium: {
    title: "Bantu kulit mempertahankan kelembapan",
    descriptions: [
      "Kulit mulai kekurangan hidrasi. Menambahkan moisturizer ringan dapat membantu menjaga kenyamanan kulit.",
      "Kulitmu mulai terasa agak tertarik atau kaku setelah mencuci muka. Mungkin ini saatnya mencoba pembersih yang lebih melembapkan.",
      "Ada tanda-tanda dehidrasi ringan. Coba gunakan teknik layering toner untuk memberikan cadangan air di lapisan kulitmu.",
      "Tekstur kulit mulai terasa kurang halus karena kurang air. Pastikan kamu tidak melewatkan tahap pelembap setiap hari.",
      "Kulitmu butuh asupan hidrasi ekstra. Penggunaan sheet mask seminggu sekali bisa menjadi booster yang bagus untuk kekenyalan.",
    ],
  },
  high: {
    title: "Pulihkan hidrasi kulit secara bertahap",
    descriptions: [
      "Kulit terlihat cukup kering atau dehidrasi. Fokuskan perawatan pada hidrasi agar kulit tidak semakin sensitif.",
      "Kulitmu tampak kusam dan muncul garis halus karena dehidrasi. Segera gunakan pelembap dengan tekstur krim yang lebih kaya.",
      "Barrier kulitmu terancam karena terlalu kering. Gunakan produk yang mengandung Hyaluronic Acid dan kunci dengan pelembap.",
      "Awas, kulit kering berlebihan bisa memicu gatal. Kurangi durasi mandi dengan air panas karena bisa mengikis kelembapan alami.",
      "Kulitmu sedang sangat 'haus'. Berikan perawatan intensif dengan sleeping mask di malam hari agar kulit kembali tenang.",
    ],
  },
};
