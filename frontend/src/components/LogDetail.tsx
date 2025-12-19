"use client";

import { useDate } from "@/context/DateContext";
import { Camera, CheckCircle, XCircle } from "lucide-react";
import DailyLog from "./DailyLog";
import SkinProgressCard from "./SkinProgressCard";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuDroplets } from "react-icons/lu";
import { GiHeatHaze, GiNightSleep } from "react-icons/gi";
import { TbDroplets, TbLoader3, TbMoodPuzzled } from "react-icons/tb";
import { useSkin } from "@/context/SkinContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChartColumn, FaPlus } from "react-icons/fa6";
import { AnalysisResult } from "@/types/Skin";
import { getAnalysisByDate } from "@/lib/analysis";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

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

  const { selectedDayData, selectedDay } = useDate();
  const { logs, refreshKey, fetchSkinInsight, error } = useSkin();
  const pathname = usePathname();

  const formatDateToISO = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateString = formatDateToISO(date);
  const selectedDateISO = formatDateToISO(selectedDay);

  const filteredLogs = logs.filter((log) => log.date === selectedDateString);

  /* ================= FETCH ANALYSIS ================= */
  useEffect(() => {
    let active = true;

    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const data = await getAnalysisByDate(selectedDateString);
        if (active) {
          setLocalAnalysis(data?.[0] ?? null);
        }
      } catch (err) {
        console.error("Failed to fetch analysis:", err);
        if (active) setLocalAnalysis(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchAnalysis();
    return () => {
      active = false;
    };
  }, [selectedDateString]);

  /* ================= FETCH INSIGHT ================= */
  useEffect(() => {
    if (!selectedDateISO) return;
    fetchSkinInsight(selectedDateISO);
  }, [selectedDateISO, refreshKey]);

  /* ================= LOADING & ERROR ================= */
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <div className="flex items-center gap-2">
          <TbLoader3 className="text-3xl text-cyan-500 animate-spin" />
          <p className="text-lg font-semibold">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  /* ================= RENDER UI ================= */
  return (
    <div className="bg-white dark:bg-zinc-900/50 rounded-xl px-3 py-5 md:p-5">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          {/* ===== HEADER DAY INFO ===== */}
          <div className="grid grid-cols-12 gap-4 mb-6">
            <div className="col-span-7 flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                  selectedDayData?.isToday
                    ? "bg-cyan-500 text-white"
                    : "bg-white dark:bg-zinc-800 border"
                }`}
              >
                {selectedDayData?.dateNumber}
              </div>
              <div>
                <h3 className="font-semibold">{selectedDayData?.dayName}</h3>
                <p className="text-sm text-zinc-500">
                  {selectedDayData?.date.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>

            {/* ===== STATUS BOX ===== */}
            <div className="col-span-5 flex justify-end gap-4">
              {/* LOG */}
              {/* <div className="w-1/3">
                <StatusBox title="Log Harian" done={filteredLogs.length > 0} />
              </div> */}

              {/* ACTION */}
              {filteredLogs.length === 0 && (
                <div className="my-auto">
                  <Link
                    href="/dashboard/daily-log"
                    className="w-full flex justify-center items-center gap-2 px-4 py-1.5 md:py-3 rounded-lg bg-cyan-600 text-white"
                  >
                    <FaPlus />
                    Log
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ===== ANALYSIS & LOG DATA ===== */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            {localAnalysis ? (
              <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
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

          {/* ===== DAILY LOG ===== */}
          <DailyLog date={selectedDayData?.date ?? selectedDay} />
          {localAnalysis && filteredLogs.length > 0 && (
            <div className="relative w-full h-28">
              <div className="absolute top-0 left-0 w-full my-10 flex md:grid md:grid-cols-3 items-end border-b border-zinc-200 dark:border-zinc-700 overflow-scroll md:overflow-hidden">
                <Link
                  href="/dashboard/main/interpretation"
                  className={`min-w-fit text-nowrap flex justify-center items-center gap-2 font-bold py-3 px-4 transition-all duration-200 ease-out ${
                    pathname === "/dashboard/main/interpretation"
                      ? "text-cyan-500 border-b-4 border-cyan-500"
                      : "hover:border-b-4 hover:border-cyan-500"
                  }`}
                >
                  <FaSearch />
                  Analisis Hari ini
                </Link>

                <Link
                  href="/dashboard/main/insight"
                  className={`min-w-fit text-nowrap flex justify-center items-center gap-2 font-bold py-3 px-4 transition-all duration-200 ease-out ${
                    pathname === "/dashboard/main/insight"
                      ? "text-cyan-500 border-b-4 border-cyan-500"
                      : "hover:border-b-4 hover:border-cyan-500"
                  }`}
                >
                  <FaChartColumn />
                  Progres Kulit
                </Link>

                <Link
                  href="/dashboard/main/tips"
                  className={`min-w-fit text-nowrap flex justify-center items-center gap-2 font-bold py-3 px-4 transition-all duration-200 ease-out ${
                    pathname === "/dashboard/main/tips"
                      ? "text-cyan-500 border-b-4 border-cyan-500"
                      : "hover:border-b-4 hover:border-cyan-500"
                  }`}
                >
                  <MdOutlineTipsAndUpdates />
                  Tips
                </Link>
              </div>
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}

/* ===== SMALL HELPER ===== */
function StatusBox({
  title,
  done,
  icon,
}: {
  title: string;
  done: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
      <p className="text-sm text-zinc-500 mb-1">{title}</p>
      <div className="flex items-center gap-2">
        {done ? (
          <>
            <CheckCircle className="text-green-500" />
            <span className="text-green-600">Tercatat</span>
          </>
        ) : (
          <>
            {icon ?? <XCircle className="text-red-500" />}
            <span className="text-zinc-500">Belum</span>
          </>
        )}
      </div>
    </div>
  );
}
