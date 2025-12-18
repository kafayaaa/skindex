"use client";

import { useEffect, useState } from "react";
import { analyzeSkin, getLogByDate } from "@/services/skin.service";
import { useSkin } from "@/context/SkinContext";
import { useDate } from "@/context/DateContext";
import { useRouter } from "next/navigation";
import {
  Camera,
  Upload,
  AlertCircle,
  Calendar,
  CheckCircle,
} from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import Image from "next/image";

export default function SkinUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todayLog, setTodayLog] = useState<any | null>(null);
  const [checkingLog, setCheckingLog] = useState(true);

  const { refreshAnalysis, loading, setLoading } = useSkin();
  const { selectedDayData } = useDate();
  const router = useRouter();

  // Handle file selection with preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    const fetchTodayLog = async () => {
      if (!selectedDayData) return;

      try {
        setCheckingLog(true);
        const dateString = selectedDayData.date.toISOString().split("T")[0];

        const log = await getLogByDate(dateString);
        setTodayLog(log);
      } catch (err) {
        console.error(err);
        setTodayLog(null);
      } finally {
        setCheckingLog(false);
      }
    };

    fetchTodayLog();
  }, [selectedDayData]);

  if (checkingLog) {
    return <LoadingScreen />;
  }

  if (loading) return <LoadingScreen />;

  if (!todayLog) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Log Harian Belum Tersedia
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Buat log harian terlebih dahulu sebelum analisis kulit
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/dashboard/journal")}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors font-medium"
        >
          Buat Log Harian
        </button>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!file || !todayLog) return;

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeSkin(file, todayLog.id);
      console.log("ANALYSIS RESULT:", data);
      refreshAnalysis();
      // setAnalysis(data.result);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        "Gagal menganalisis gambar. Pastikan foto jelas dan pencahayaan baik."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1 md:p-3">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
          <Camera className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base md:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Analisis Foto Kulit
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Upload foto wajah untuk analisis kondisi kulit
          </p>
        </div>
      </div>

      {/* Date Info */}
      <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 mb-6">
        <div className="p-2 rounded bg-white dark:bg-zinc-800">
          <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        </div>
        <div>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Log untuk tanggal
          </p>
          <p className="text-sm md:text-base font-medium text-zinc-900 dark:text-zinc-100">
            {selectedDayData?.date.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs md:text-sm font-medium">Log tersedia</span>
        </div>
      </div>

      {/* Upload Area */}
      <div className="mb-6">
        <div
          className={`
          border-2 ${
            preview
              ? "border-cyan-500"
              : "border-dashed border-zinc-300 dark:border-zinc-700"
          } 
          rounded-xl p-6 text-center transition-colors mb-4
        `}
        >
          {preview ? (
            <div className="space-y-4">
              <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg">
                <Image
                  height={35}
                  width={35}
                  src={preview}
                  alt="Preview foto kulit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                  Foto siap dianalisis
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {file?.name} •{" "}
                  {(file?.size || 0) / 1024 > 1024
                    ? `${((file?.size || 0) / (1024 * 1024)).toFixed(1)} MB`
                    : `${Math.round((file?.size || 0) / 1024)} KB`}
                </p>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                Pilih foto lain
              </button>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Camera className="w-8 h-8 text-zinc-400" />
              </div>
              <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 mb-2">
                Upload foto wajah Anda
              </p>
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Format: JPG, PNG. Maks 5MB. Pastikan pencahayaan baik.
              </p>
              <label className="inline-flex items-center gap-2 px-4 md:px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg cursor-pointer transition-colors">
                <Upload className="w-4 md:w-5 h-4 md:h-5" />
                <span className="text-sm md:text-base">Pilih Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>

        {/* Upload Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Pencahayaan cukup</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Wajah menghadap kamera</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>Tanpa menggunakan makeup</span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
          loading || !file
            ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-not-allowed"
            : "bg-cyan-600 hover:bg-cyan-700 text-white"
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>Menganalisis...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm md:text-base">
              Analisis Kulit Sekarang
            </span>
          </>
        )}
      </button>

      {/* Footer Note */}
      <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
          Analisis AI kami akan mengevaluasi kelembapan, tekstur, dan kondisi
          kulit Anda. Hasil akan tersedia di dashboard.
        </p>
      </div>
    </div>
  );
}
