// app/page.tsx
"use client";

import { useTheme } from "next-themes";
import {
  Camera,
  Search,
  BookOpen,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import ProblemSolutionCard from "@/components/ProblemSolutionCard";
import PricingCard from "@/components/PricingCard";
import FAQ from "@/components/FAQ";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Analisis Foto Kulit",
      description:
        "Upload foto wajah untuk analisis kondisi kulit secara otomatis",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Skin Journaling",
      description: "Log harian untuk memantau progress dan perubahan kulit",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Deteksi Pemicu Breakout",
      description: "Identifikasi penyebab jerawat melalui data log harian",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Progress Tracking",
      description:
        "Visualisasi perkembangan kesehatan kulit dari waktu ke waktu",
    },
  ];

  const problems = [
    {
      problem: "Bingung memulai skincare dari mana",
      solution: "Analisis kondisi kulit untuk rekomendasi personalized",
    },
    {
      problem: "Sulit melacak progress kulit",
      solution: "Fitur log harian dengan visualisasi progress",
    },
    {
      problem: "Tidak tahu pemicu breakout",
      solution: "Analisis data untuk identifikasi pola penyebab jerawat",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "Rp 0",
      features: [
        "Analisis foto dasar",
        "Journaling harian",
        "Pelacakan pemicu breakout",
        "3 analisis per bulan",
      ],
      cta: "Mulai Gratis",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "Rp 49.999",
      period: "/bulan",
      features: [
        "Semua fitur Free",
        "Analisis foto lanjutan",
        "Fitur kamera real-time",
        "Analisis unlimited",
        "Export data progress",
        "Prioritas support",
      ],
      cta: "Upgrade Sekarang",
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Solusi Modern untuk Perawatan Kulit
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
              Analisis & Tracking{" "}
              <span className="text-cyan-600 dark:text-cyan-400">
                Kondisi Kulit
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
              Website yang menawarkan fitur analisis kondisi wajah dengan
              journaling progress harian serta melacak penyebab pemicu breakout
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Coba Gratis Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { icon: <Shield />, text: "Privasi data terjamin" },
                { icon: <Users />, text: "10.000+ pengguna puas" },
                { icon: <Smartphone />, text: "Akses di semua device" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-zinc-800/50"
                >
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400">
                    {item.icon}
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {item.text}
                  </span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Problems & Solutions Section */}
      <section className="px-4 py-20 bg-white dark:bg-zinc-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Solusi untuk{" "}
              <span className="text-cyan-600 dark:text-cyan-400">
                Masalah Kulit
              </span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Kami memahami permasalahan yang sering dihadapi dalam perawatan
              kulit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((item, idx) => (
              <ProblemSolutionCard
                key={idx}
                problem={item.problem}
                solution={item.solution}
                index={idx + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="feature" className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Fitur{" "}
              <span className="text-cyan-600 dark:text-cyan-400">Unggulan</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk perawatan kulit yang lebih baik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="px-4 py-20 bg-white dark:bg-zinc-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Cara Kerja yang{" "}
              <span className="text-cyan-600 dark:text-cyan-400">
                Sederhana
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload & Analisis",
                description:
                  "Upload foto wajah untuk analisis kondisi kulit otomatis",
              },
              {
                step: "02",
                title: "Journaling Harian",
                description:
                  "Catat rutinitas skincare dan kondisi kulit setiap hari",
              },
              {
                step: "03",
                title: "Insight & Rekomendasi",
                description: "Dapatkan insight pola dan rekomendasi perawatan",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-600 text-white text-2xl font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-cyan-200 dark:bg-cyan-800 -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Pilih{" "}
              <span className="text-cyan-600 dark:text-cyan-400">Paket</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Mulai dari gratis hingga fitur premium lengkap
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <PricingCard key={idx} {...plan} />
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id="faq" className="px-4 py-20 bg-white dark:bg-zinc-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Pertanyaan yang{" "}
              <span className="text-cyan-600 dark:text-cyan-400">
                Sering Diajukan
              </span>
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Mulai Perjalanan{" "}
              <span className="text-cyan-600 dark:text-cyan-400">
                Kulit Sehat
              </span>
              <br />
              Anda Hari Ini
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
              Bergabung dengan ribuan pengguna yang telah menemukan solusi
              perawatan kulit yang tepat
            </p>
            <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2">
              Daftar Gratis Sekarang
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-600 dark:text-zinc-400">
            © 2024 SkinProgress. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </footer>
    </div>
  );
}
