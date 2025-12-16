"use client";

import { useDate } from "@/context/DateContext";
import { Camera, CheckCircle, XCircle } from "lucide-react";
import DailyLog from "./DailyLog";
import SkinProgressCard from "./SkinProgressCard";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuDroplets } from "react-icons/lu";
import { GiHeatHaze, GiNightSleep } from "react-icons/gi";
import {
  TbDroplets,
  TbMoodPuzzled,
  TbPhotoCheck,
  TbPhotoSearch,
} from "react-icons/tb";
import { useSkin } from "@/context/SkinContext";
import Link from "next/link";
import { useEffect } from "react";
import { generateRecommendations } from "@/utils/recommendationEngine";
import { FaPlus } from "react-icons/fa6";
import { SkinInsightSection } from "./SkinInsightSection";
import { SkinInsightResponse } from "@/types/Skin";
import LoadingScreen from "./LoadingScreen";

export default function LogDetail({ date }: { date: Date }) {
  const { selectedDayData, selectedDay, getRatingColor } = useDate();
  const {
    logs,
    analysis,
    analysisDetails,
    fetchAnalysisDetail,
    interpretations,
    skinInsight,
    loading,
    error,
  } = useSkin();

  const formatDateToISO = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Ambil string tanggal yang diformat dari prop 'date'
  const selectedDateString = formatDateToISO(date);

  const filteredLogs = logs.filter((log) => log.date === selectedDateString);
  const filteredAnalysis = analysis.filter((item) => {
    const analysisDate = new Date(item.generated_at)
      .toISOString()
      .split("T")[0];

    return analysisDate === selectedDateString;
  });

  const getAnalysisForDate = (date: Date) => {
    const dateStr = formatDateToISO(date);

    return analysis.find((a) => a.generated_at.startsWith(dateStr));
  };
  const selectedAnalysis = getAnalysisForDate(selectedDay);
  const selectedDetail = selectedAnalysis
    ? analysisDetails[selectedAnalysis.photo_id]
    : null;

  useEffect(() => {
    if (selectedAnalysis) {
      fetchAnalysisDetail(selectedAnalysis.photo_id);
    }
  }, [selectedAnalysis?.photo_id]);

  const selectedDateISO = formatDateToISO(selectedDay);

  const todayInterpretation = interpretations.find(
    (i) => i.generated_at && i.generated_at?.startsWith(selectedDateISO)
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl px-3 py-5 md:p-5">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Left Column - Day Info */}
        <div className="w-full">
          <div className="grid md:grid-cols-12 gap-4 mb-6">
            <div className="col-span-6 flex justify-center md:justify-start items-center gap-2 md:gap-3 md:mb-4">
              <div
                className={`
                w-9 md:w-12 h-9 md:h-12 rounded-xl flex items-center justify-center text-lg font-bold
                ${
                  selectedDayData?.isToday
                    ? "bg-cyan-500 text-white"
                    : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                }
              `}
              >
                {selectedDayData?.dateNumber}
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedDayData?.dayName}
                </h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
                  {selectedDayData?.date.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>

            <div className="col-span-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-white dark:bg-zinc-800">
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                  Log Harian
                </p>
                <div className="flex items-center gap-2 text-sm md:text-base">
                  {filteredLogs.length > 0 ? (
                    <>
                      <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500" />
                      <span className="text-sm md:text-base font-medium text-green-600 dark:text-green-400">
                        Tercatat
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 md:w-5 h-4 md:h-5 text-red-500" />
                      <span className="text-sm md:text-base font-medium text-red-600 dark:text-red-400">
                        Belum
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-zinc-800">
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                  Analisis Foto
                </p>
                <div className="flex items-center gap-2">
                  {filteredAnalysis.length > 0 ? (
                    <>
                      <Camera className="w-4 md:w-5 h-4 md:h-5 text-blue-500" />
                      <span className="text-sm md:text-base font-medium text-blue-600 dark:text-blue-400">
                        Selesai
                      </span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 md:w-5 h-4 md:h-5 text-zinc-400" />
                      <span className="text-sm md:text-base font-medium text-zinc-500 dark:text-zinc-400">
                        Belum
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="hidden md:block space-y-3">
                {filteredLogs.length > 0 ? (
                  <button
                    className={`text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-zinc-300 text-zinc-500 cursor-not-allowed`}
                    disabled={true}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Log harian terisi</span>
                  </button>
                ) : (
                  <Link
                    href="/dashboard/daily-log"
                    className={`text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-cyan-600 hover:bg-cyan-700 text-white`}
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Log Harian</span>
                  </Link>
                )}

                {filteredAnalysis.length > 0 ? (
                  <button
                    className={`text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-zinc-300 text-zinc-500 cursor-not-allowed`}
                    disabled={true}
                  >
                    <TbPhotoCheck className="w-4 h-4" />
                    <span>Analisis selesai</span>
                  </button>
                ) : (
                  <Link
                    href="/dashboard/analysis"
                    className="text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 border border-cyan-600 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                  >
                    <TbPhotoSearch className="w-4 h-4" />
                    <span>Analisis</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Day Status */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            {filteredAnalysis.map((analysis) => (
              <div
                key={analysis.id}
                className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <SkinProgressCard
                  icon={
                    <IoIosCloseCircleOutline className="text-7xl text-pink-500" />
                  }
                  title="Acne"
                  value={analysis.acne_score}
                  valueDesc="/10"
                  bgColor="bg-pink-100"
                  valueColor="text-pink-500"
                />
                <SkinProgressCard
                  icon={<LuDroplets className="text-7xl text-yellow-500" />}
                  title="Oil"
                  value={analysis.oilness_score}
                  valueDesc="/10"
                  bgColor="bg-yellow-100"
                  valueColor="text-yellow-500"
                />
                <SkinProgressCard
                  icon={<GiHeatHaze className="text-7xl text-red-500" />}
                  title="Redness"
                  value={analysis.redness_score}
                  valueDesc="/10"
                  bgColor="bg-red-100"
                  valueColor="text-red-500"
                />
                <SkinProgressCard
                  icon={<TbDroplets className="text-7xl text-cyan-500" />}
                  title="Moisture"
                  value={analysis.moisture_score}
                  valueDesc="/10"
                  bgColor="bg-cyan-100"
                  valueColor="text-cyan-500"
                />
              </div>
            ))}
            {filteredLogs.map((log) => (
              <div key={log.id} className="col-span-2 grid grid-cols-2 gap-4">
                <SkinProgressCard
                  icon={<TbMoodPuzzled className="text-7xl text-violet-500" />}
                  title="Stress"
                  value={log.stress_level}
                  valueDesc="/10"
                  bgColor="bg-violet-100"
                  valueColor="text-violet-500"
                />
                <SkinProgressCard
                  icon={<GiNightSleep className="text-7xl text-indigo-500" />}
                  title="Sleep"
                  value={log.sleep_hours}
                  valueDesc="jam"
                  bgColor="bg-indigo-100"
                  valueColor="text-indigo-500"
                />
              </div>
            ))}
          </div>

          {/* Notes */}
          <DailyLog date={selectedDayData?.date ?? selectedDay} />

          {/* Interpretation */}
          {todayInterpretation && (
            <div className="mt-6 bg-linear-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border border-cyan-200 dark:border-cyan-800 p-3 md:p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm">
                  <svg
                    className="w-5 h-5 text-cyan-600 dark:text-cyan-400"
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
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-zinc-900 dark:text-zinc-100">
                    Interpretasi Kulit Hari Ini
                  </h3>
                  <p className="text-xs md:text-sm text-cyan-600 dark:text-cyan-400">
                    Berdasarkan analisis terbaru
                  </p>
                </div>
              </div>

              {/* Overview Section */}
              <div className="mb-6 p-4 rounded-lg bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm">
                <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 mb-4">
                  {todayInterpretation.intro_text}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-cyan-50/50 dark:bg-cyan-900/20">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                      Masalah Utama
                    </p>
                    <p className="text-sm md:text-base font-medium text-zinc-900 dark:text-zinc-100">
                      {todayInterpretation.concerns}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-cyan-50/50 dark:bg-cyan-900/20">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                      Tingkat Keparahan
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          todayInterpretation.severity
                            .toLowerCase()
                            .includes("ringan")
                            ? "bg-green-500"
                            : todayInterpretation.severity
                                .toLowerCase()
                                .includes("sedang")
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                      <p className="text-sm md:text-base font-medium text-zinc-900 dark:text-zinc-100">
                        {todayInterpretation.severity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations Section */}
              <div className="mb-6">
                <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-cyan-600 dark:text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Rekomendasi Perawatan
                </h4>

                <div className="space-y-4">
                  {todayInterpretation.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border ${
                        rec.priority === 1
                          ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10"
                          : rec.priority === 2
                          ? "border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10"
                          : "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          {rec.title}
                        </h5>
                        <span
                          className={`text-xs text-center md:text-left font-medium px-2 py-1 rounded-xl md:rounded-full ${
                            rec.priority === 1
                              ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                              : rec.priority === 2
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                              : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          }`}
                        >
                          {rec.priority === 1
                            ? "Prioritas Tinggi"
                            : rec.priority === 2
                            ? "Prioritas Sedang"
                            : "Prioritas Rendah"}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                        {rec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div>
                <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-cyan-600 dark:text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Tips Cepat Harian
                </h4>

                <div className="space-y-3">
                  {generateRecommendations(
                    todayInterpretation.severity,
                    todayInterpretation.concerns
                  ).map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="shrink-0 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                          {idx + 1}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
                        {rec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              {/* <div className="mt-6 pt-6 border-t border-cyan-200 dark:border-cyan-800">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-zinc-500 dark:text-zinc-400">
                    Terakhir diperbarui:{" "}
                    {new Date().toLocaleDateString("id-ID")}
                  </div>
                  <button className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm font-medium">
                    Simpan Rekomendasi
                  </button>
                </div>
              </div> */}
            </div>
          )}

          {/* Skin Analysis Insight */}
          <SkinInsightSection data={skinInsight} />
        </div>

        {/* Right Column - Quick Actions & Skin Rating */}
        <div className="block md:hidden md:w-64 space-y-6">
          {/* Skin Rating */}
          {/* <div className="p-4 rounded-lg bg-white dark:bg-zinc-800">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
              Rating Kulit
            </p>
            {selectedDayData?.skinRating ? (
              <div className="flex items-center gap-4">
                <div
                  className={`
                    w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white
                    ${getRatingColor(selectedDayData.skinRating)}
                  `}
                >
                  {selectedDayData.skinRating}
                </div>
                <div>
                  <p className="font-semibold">
                    {selectedDayData.skinRating <= 2
                      ? "Perlu Perhatian"
                      : selectedDayData.skinRating <= 3
                      ? "Cukup Baik"
                      : "Sangat Baik"}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Skala 1-5
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-zinc-500 dark:text-zinc-400 mb-3">
                  Belum ada rating
                </p>
                <button className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300">
                  Beri rating
                </button>
              </div>
            )}
          </div> */}

          {/* Quick Actions */}
          <div className="space-y-3">
            {filteredLogs.length > 0 ? (
              <button
                className={`text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-zinc-300 text-zinc-500 cursor-not-allowed`}
                disabled={true}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Log harian terisi</span>
              </button>
            ) : (
              <Link
                href="/dashboard/daily-log"
                className={`text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-cyan-600 hover:bg-cyan-700 text-white`}
              >
                <FaPlus className="w-4 h-4" />
                <span>Tambah Log Harian</span>
              </Link>
            )}

            {filteredAnalysis.length > 0 ? (
              <button
                className={`text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-zinc-300 text-zinc-500 cursor-not-allowed`}
                disabled={true}
              >
                <TbPhotoCheck className="w-4 h-4" />
                <span>Analisis foto selesai</span>
              </button>
            ) : (
              <Link
                href="/dashboard/analysis"
                className="text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 border border-cyan-600 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
              >
                <TbPhotoSearch className="w-4 h-4" />
                <span>Analisis Foto</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
