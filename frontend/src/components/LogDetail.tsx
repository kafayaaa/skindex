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

export default function LogDetail({ date }: { date: Date }) {
  const { selectedDayData, selectedDay, getRatingColor } = useDate();
  const { logs, analysis, loading, error } = useSkin();

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

  if (loading) return <p>Memuat log...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-5">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Left Column - Day Info */}
        <div className="flex-1">
          <div className="w-full grid grid-cols-12 gap-4 mb-6">
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
              <div key={analysis.id} className="col-span-4 flex gap-4">
                <SkinProgressCard
                  icon={
                    <IoIosCloseCircleOutline className="text-2xl text-pink-500" />
                  }
                  title="Acne"
                  value={analysis.acne_score}
                  valueDesc="/10"
                  bgColor="bg-pink-100"
                  valueColor="text-pink-500"
                />
                <SkinProgressCard
                  icon={<LuDroplets className="text-2xl text-yellow-500" />}
                  title="Oil"
                  value={analysis.oilness_score}
                  valueDesc="/10"
                  bgColor="bg-yellow-100"
                  valueColor="text-yellow-500"
                />
                <SkinProgressCard
                  icon={<GiHeatHaze className="text-2xl text-red-500" />}
                  title="Redness"
                  value={analysis.redness_score}
                  valueDesc="/10"
                  bgColor="bg-red-100"
                  valueColor="text-red-500"
                />
                <SkinProgressCard
                  icon={<TbDroplets className="text-2xl text-cyan-500" />}
                  title="Moisture"
                  value={analysis.moisture_score}
                  valueDesc="/10"
                  bgColor="bg-cyan-100"
                  valueColor="text-cyan-500"
                />
              </div>
            ))}
            {filteredLogs.map((log) => (
              <div key={log.id} className="col-span-2 flex gap-4">
                <SkinProgressCard
                  icon={<TbMoodPuzzled className="text-2xl text-violet-500" />}
                  title="Stress"
                  value={log.stress_level}
                  valueDesc="/10"
                  bgColor="bg-violet-100"
                  valueColor="text-violet-500"
                />
                <SkinProgressCard
                  icon={<GiNightSleep className="text-2xl text-indigo-500" />}
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
            <Link
              href="/dashboard/daily-log"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Tambah Log Harian</span>
            </Link>

            <Link
              href="/dashboard/analysis"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-cyan-600 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>Analisis Foto</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
