"use client";

import { useState } from "react";
import { Camera, Upload, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnalysisResult } from "@/types/Skin";

export default function AnalysisPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //   const handleAnalyze = () => {
  //     setIsAnalyzing(true);
  //     // Simulasi analisis
  //     setTimeout(() => {
  //       setAnalysisResult({
  //         skinType: "Combination",
  //         moistureLevel: 78,
  //         acneCount: 2,
  //         recommendations: [
  //           "Gunakan moisturizer non-comedogenic",
  //           "Hindari produk dengan alkohol",
  //         ],
  //       });
  //       setIsAnalyzing(false);
  //     }, 2000);
  //   };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Analisis Kulit</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Upload foto untuk analisis kondisi kulit
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Upload Area */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center mb-8">
          {image ? (
            <div>
              <Image
                src={image}
                alt="Preview"
                className="max-w-md mx-auto rounded-lg mb-4"
              />
              <button
                onClick={() => setImage(null)}
                className="text-sm text-red-600 dark:text-red-400"
              >
                Hapus gambar
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Foto Kulit</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Pastikan pencahayaan baik dan wajah terlihat jelas
              </p>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg cursor-pointer">
                <Upload className="w-5 h-5" />
                <span>Pilih Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </>
          )}
        </div>

        {/* Analysis Button */}
        {image && !analysisResult && (
          <div className="text-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-50"
            >
              {isAnalyzing ? "Menganalisis..." : "Mulai Analisis"}
            </button>
          </div>
        )}

        {/* Results */}
        {analysisResult && (
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Hasil Analisis</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Analisis selesai pada {new Date().toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Tipe Kulit
                </p>
                <p className="text-xl font-semibold">
                  {analysisResult.skinType}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Kelembapan
                </p>
                <p className="text-xl font-semibold">
                  {analysisResult.moistureLevel}%
                </p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Jerawat Aktif
                </p>
                <p className="text-xl font-semibold">
                  {analysisResult.acneCount}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Rekomendasi</h3>
              <ul className="space-y-2">
                {analysisResult.recommendations.map(
                  (rec: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                      <span>{rec}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
