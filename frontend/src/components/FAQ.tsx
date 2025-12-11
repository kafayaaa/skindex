// components/FAQ.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Bagaimana cara kerja analisis kulit?",
    answer:
      "Kami menggunakan teknologi AI untuk menganalisis foto kulit Anda. Cukup upload foto wajah, dan sistem akan memberikan analisis kondisi kulit secara otomatis.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Ya, kami menggunakan enkripsi end-to-end dan tidak membagikan data pribadi Anda kepada pihak ketiga. Privasi adalah prioritas utama kami.",
  },
  {
    question: "Berapa kali saya bisa analisis dalam paket gratis?",
    answer:
      "Paket gratis memberikan 3 analisis per bulan. Untuk analisis unlimited, Anda dapat upgrade ke paket premium.",
  },
  {
    question: "Apakah perlu mengisi journaling setiap hari?",
    answer:
      "Tidak wajib, tetapi semakin konsisten Anda mengisi journaling, semakin akurat sistem dalam melacak progress dan mengidentifikasi pemicu breakout.",
  },
  {
    question: "Apakah aplikasi ini cocok untuk pemula?",
    answer:
      "Sangat cocok! Kami dirancang khusus untuk pemula yang baru memulai perawatan kulit dan bingung harus mulai dari mana.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden"
        >
          <button
            className="w-full p-6 text-left flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <span className="font-medium text-zinc-900 dark:text-zinc-100 pr-8">
              {faq.question}
            </span>
            {openIndex === idx ? (
              <ChevronUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />
            )}
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-6">
              <p className="text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
