export const introCopy = {
  low: [
    "Secara umum kondisi kulitmu masih cukup terkendali. Tinggal sedikit penyesuaian saja.",
    "Kulitmu berada di jalur yang cukup baik. Beberapa langkah kecil bisa membuatnya lebih optimal.",
  ],
  medium: [
    "Kulitmu terlihat sedang butuh perhatian ekstra. Tenang, kita bisa mulai pelan-pelan.",
    "Sepertinya kulitmu sedang tidak seimbang, tapi ini masih bisa kita atasi bersama.",
  ],
  high: [
    "Kulitmu tampak sedang bekerja keras. Yuk, kita bantu dengan perawatan yang lebih lembut.",
    "Kondisi ini cukup umum dan bisa ditangani. Kita fokus satu langkah pada satu waktu.",
  ],
};

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
