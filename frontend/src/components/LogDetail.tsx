"use client";

import { useDate } from "@/context/DateContext";
import { Camera, CheckCircle, XCircle } from "lucide-react";
import DailyLog from "./DailyLog";
import SkinProgressCard from "./SkinProgressCard";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuDroplets } from "react-icons/lu";
import { GiHeatHaze, GiNightSleep } from "react-icons/gi";
import { TbDroplets, TbMoodPuzzled } from "react-icons/tb";
import { useSkin } from "@/context/SkinContext";
import Link from "next/link";
import { useEffect } from "react";
import { generateRecommendations } from "@/utils/recommendationEngine";

export default function LogDetail({ date }: { date: Date }) {
  const { selectedDayData, selectedDay, getRatingColor } = useDate();
  const {
    logs,
    analysis,
    analysisDetails,
    fetchAnalysisDetail,
    interpretations,
    loading,
    error,
  } = useSkin();
  console.log("INTERPRETATIONS RAW:", interpretations);

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

  if (loading) return <p>Memuat log...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-5">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Left Column - Day Info */}
        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 mb-6">
            <div className="col-span-6 flex items-center gap-3 mb-4">
              <div
                className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold
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
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedDayData?.dayName}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {selectedDayData?.date.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>

            <div className="col-span-3 p-3 rounded-lg bg-white dark:bg-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                Log Skincare
              </p>
              <div className="flex items-center gap-2">
                {filteredLogs.length > 0 ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-green-600 dark:text-green-400">
                      Tercatat
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-red-600 dark:text-red-400">
                      Belum
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="col-span-3 p-3 rounded-lg bg-white dark:bg-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                Analisis Foto
              </p>
              <div className="flex items-center gap-2">
                {filteredAnalysis.length > 0 ? (
                  <>
                    <Camera className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Selesai
                    </span>
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5 text-zinc-400" />
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">
                      Belum
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Day Status */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            {filteredAnalysis.map((analysis) => (
              <div
                key={analysis.id}
                className="col-span-4 grid grid-cols-4 gap-4"
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
          {todayInterpretation && (
            <div className="mt-6 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/30">
              <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                Catatan Kulit Hari Ini
              </h3>

              <p className="text-sm mb-3">{todayInterpretation.intro_text}</p>
              <p>{todayInterpretation.concerns}</p>
              <p>{todayInterpretation.severity}</p>
              {todayInterpretation.recommendations.map((rec, idx) => (
                <div key={idx} className="mb-4">
                  <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {rec.title}
                    {/* Opsional: Tampilkan Priority */}
                    <span className={`ml-2 text-xs font-normal text-cyan-600`}>
                      (Priority: {rec.priority})
                    </span>
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {rec.description}
                  </p>
                </div>
              ))}

              <ul className="list-disc ml-5 space-y-1 text-sm">
                {generateRecommendations(
                  todayInterpretation.severity,
                  todayInterpretation.concerns
                ).map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - Quick Actions & Skin Rating */}
        <div className="md:w-64 space-y-6">
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
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-zinc-300 text-zinc-500 cursor-not-allowed`}
                disabled={true}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Log harian terisi</span>
              </button>
            ) : (
              <Link
                href="/dashboard/daily-log"
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-cyan-600 hover:bg-cyan-700 text-white`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Tambah Log Harian</span>
              </Link>
            )}

            {filteredAnalysis.length > 0 ? (
              <button
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-zinc-300 text-zinc-500 cursor-not-allowed`}
                disabled={true}
              >
                <Camera className="w-4 h-4" />
                <span>Analisis foto selesai</span>
              </button>
            ) : (
              <Link
                href="/dashboard/analysis"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-cyan-600 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Analisis Foto</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
