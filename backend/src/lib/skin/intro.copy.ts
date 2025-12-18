export const introCopy = {
  low: [
    "Secara umum kondisi kulitmu masih cukup terkendali. Tinggal sedikit penyesuaian saja.",
    "Kulitmu berada di jalur yang cukup baik. Beberapa langkah kecil bisa membuatnya lebih optimal.",
    "Wah, kulitmu kelihatan happy banget hari ini! Pertahankan terus ya kebiasaan baikmu.",
    "Progres yang bagus! Sedikit lagi menuju kondisi kulit impianmu, tetap konsisten ya.",
    "Segar banget kelihatannya! Tinggal dipoles sedikit lagi supaya makin glowing.",
    "Kerja bagus! Kulitmu menunjukkan hasil dari perawatan rutin yang kamu lakukan selama ini.",
  ],
  medium: [
    "Kulitmu terlihat sedang butuh perhatian ekstra. Tenang, kita bisa mulai pelan-pelan.",
    "Sepertinya kulitmu sedang tidak seimbang, tapi ini masih bisa kita atasi bersama.",
    "Kulitmu lagi 'curhat' nih, sepertinya butuh sedikit perhatian lebih dari biasanya.",
    "Jangan panik ya, kulitmu cuma lagi butuh waktu ekstra untuk istirahat dan bernapas.",
    "Lagi agak rewel ya? Tenang, pelan-pelan kita seimbangkan lagi kondisinya bareng-bareng.",
    "Yuk, kita kasih nutrisi ekstra hari ini supaya kulitmu bisa kembali ceria seperti sedia kala.",
  ],
  high: [
    "Kulitmu tampak sedang bekerja keras. Yuk, kita bantu dengan perawatan yang lebih lembut.",
    "Kondisi ini cukup umum dan bisa ditangani. Kita fokus satu langkah pada satu waktu.",
    "Kulitmu lagi butuh 'pelukan' ekstra nih. Ayo kita rawat dengan langkah-langkah paling lembut.",
    "Gak apa-apa kalau hari ini terasa kurang oke. Kita mulai dari langkah paling simpel untuk pemulihan ya.",
    "Wah, kulitmu sepertinya lagi capek banget. Yuk, kita bantu ringankan bebannya dengan perawatan minimalis.",
    "Jangan berkecil hati ya, ini cuma fase sementara. Fokus kita sekarang adalah menenangkan kulitmu dulu.",
  ],
};

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
