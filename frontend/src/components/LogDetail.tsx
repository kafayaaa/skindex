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
  TbLoader3,
  TbMoodPuzzled,
  TbPhotoCheck,
  TbPhotoSearch,
} from "react-icons/tb";
import { useSkin } from "@/context/SkinContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { generateRecommendations } from "@/utils/recommendationEngine";
import { FaPlus } from "react-icons/fa6";
import { SkinInsightSection } from "./SkinInsightSection";
import { AnalysisResult, SkinInsightResponse } from "@/types/Skin";
import LoadingScreen from "./LoadingScreen";
import { getAnalysisByDate } from "@/lib/analysis";
import { usePathname } from "next/navigation";

export default function LogDetail({
  date,
  children,
}: {
  date: Date;
  children?: React.ReactNode;
}) {
  const [localAnalysis, setLocalAnalysis] = useState<AnalysisResult | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { selectedDayData, selectedDay, getRatingColor } = useDate();
  const {
    logs,
    analysis,
    analysisDetails,
    fetchAnalysisDetail,
    fetchSkinInsight,
    interpretations,
    skinInsight,
    error,
  } = useSkin();

  const pathname = usePathname();

  const formatDateToISO = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Ambil string tanggal yang diformat dari prop 'date'
  const selectedDateString = formatDateToISO(date);

  const filteredLogs = logs.filter((log) => log.date === selectedDateString);

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

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const data = await getAnalysisByDate(selectedDateString);
        setLocalAnalysis(data[0] ?? null);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
        setLocalAnalysis(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [selectedDateString]);

  useEffect(() => {
    fetchSkinInsight(selectedDateISO);
  }, [selectedDateISO]);

  const concerns = Array.from(new Set(todayInterpretation?.concerns));

  const concernLabels: Record<string, string> = {
    acne: "Jerawat",
    redness: "Kemerahan",
    oiliness: "Minyak Berlebih",
    dry: "Kulit Kering",
    sensitivity: "Kulit Sensitif",
  };

  if (loading)
    return (
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-2">
          <TbLoader3 className="text-3xl text-cyan-500 animate-spin" />
          <p className="text-lg font-semibold">Memuat Data...</p>
        </div>
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-zinc-900/50 rounded-xl px-3 py-5 md:p-5">
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
              <div className="p-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-800">
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

              <div className="p-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-800">
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                  Analisis Foto
                </p>
                <div className="flex items-center gap-2">
                  {localAnalysis ? (
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
              <div className="hidden md:block space-y-3 my-auto">
                {filteredLogs.length > 0 ? (
                  <button
                    className={`text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed`}
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

                {/* {localAnalysis.length > 0 ? (
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
                )} */}
              </div>
            </div>
          </div>

          {/* Day Status */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            {localAnalysis ? (
              <div
                key={localAnalysis.id}
                className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <SkinProgressCard
                  icon={
                    <IoIosCloseCircleOutline className="text-7xl text-pink-500" />
                  }
                  title="Acne"
                  value={localAnalysis.acne_score}
                  valueDesc="/10"
                  bgColor="bg-pink-100 dark:bg-pink-900/20"
                  valueColor="text-pink-500 dark:text-pink-700"
                />
                <SkinProgressCard
                  icon={<LuDroplets className="text-7xl text-yellow-500" />}
                  title="Oil"
                  value={localAnalysis.oiliness_score}
                  valueDesc="/10"
                  bgColor="bg-yellow-100 dark:bg-yellow-900/20"
                  valueColor="text-yellow-500"
                />
                <SkinProgressCard
                  icon={<GiHeatHaze className="text-7xl text-red-500" />}
                  title="Redness"
                  value={localAnalysis.redness_score}
                  valueDesc="/10"
                  bgColor="bg-red-100 dark:bg-red-900/20"
                  valueColor="text-red-500 dark:text-red-700"
                />
                <SkinProgressCard
                  icon={<TbDroplets className="text-7xl text-cyan-500" />}
                  title="Moisture"
                  value={localAnalysis.moisture_score}
                  valueDesc="/10"
                  bgColor="bg-cyan-100 dark:bg-cyan-900/20"
                  valueColor="text-cyan-500 "
                />
              </div>
            ) : null}
            {filteredLogs.map((log) => (
              <div key={log.id} className="col-span-2 grid grid-cols-2 gap-4">
                <SkinProgressCard
                  icon={<TbMoodPuzzled className="text-7xl text-violet-500" />}
                  title="Stress"
                  value={log.stress_level}
                  valueDesc="/10"
                  bgColor="bg-violet-100 dark:bg-violet-900/12"
                  valueColor="text-violet-500 dark:text-violet-700"
                />
                <SkinProgressCard
                  icon={<GiNightSleep className="text-7xl text-indigo-500" />}
                  title="Sleep"
                  value={log.sleep_hours}
                  valueDesc="jam"
                  bgColor="bg-indigo-100 dark:bg-indigo-900/20"
                  valueColor="text-indigo-500"
                />
              </div>
            ))}
          </div>

          {/* Notes */}
          <DailyLog date={selectedDayData?.date ?? selectedDay} />

          <div className="w-full my-10 grid grid-cols-2 items-end border-b border-zinc-200 dark:border-zinc-700">
            <div
              className={`w-full flex items-center justify-center py-3 ${
                pathname === "/dashboard/main/interpretation"
                  ? "border-b-4 border-cyan-500"
                  : ""
              }`}
            >
              <Link
                href="/dashboard/main/interpretation"
                className={`font-bold ${
                  pathname === "/dashboard/main/interpretation"
                    ? "text-cyan-500"
                    : ""
                }`}
              >
                Analisis Hari ini
              </Link>
            </div>
            <div
              className={`w-full flex items-center justify-center py-3 ${
                pathname === "/dashboard/main/insight"
                  ? "border-b-4 border-cyan-500"
                  : ""
              }`}
            >
              <Link
                href="/dashboard/main/insight"
                className={`font-bold ${
                  pathname === "/dashboard/main/insight" ? "text-cyan-500" : ""
                }`}
              >
                Progres Kulit
              </Link>
            </div>
          </div>
          {children}
          {/* Interpretation */}

          {/* Skin Analysis Insight */}
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
                className={`text-sm md:text-base w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed`}
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

            {/* {localAnalysis.length > 0 ? (
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
