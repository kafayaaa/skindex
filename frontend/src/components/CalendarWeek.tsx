"use client";

import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import LogDetail from "./LogDetail";
import { useDate } from "@/context/DateContext";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useSkin } from "@/context/SkinContext";

export default function CalendarWeekly() {
  const {
    selectedDay,
    setSelectedDay,
    weekData,
    navigateWeek,
    goToCurrentWeek,
    formatDateRange,
    selectedDayData,
  } = useDate();

  const { logs } = useSkin();

  const formatDateToISO = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            Progres Kulitmu
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {formatDateRange()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateWeek("prev")}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            title="Minggu sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToCurrentWeek}
            className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            Minggu Ini
          </button>

          <button
            onClick={() => navigateWeek("next")}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            title="Minggu berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekly Stats */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {weeklyStats.daysWithLog}/7
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Hari dengan log</p>
            </div>
            <CheckCircle className="w-8 h-8 text-cyan-600/30 dark:text-cyan-400/30" />
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {weeklyStats.daysWithAnalysis}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Analisis foto</p>
            </div>
            <Camera className="w-8 h-8 text-green-600/30 dark:text-green-400/30" />
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {weeklyStats.averageRating.toFixed(1)}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Rata-rata rating</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600/30 dark:text-blue-400/30" />
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {weeklyStats.goodDays}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Hari kulit baik</p>
            </div>
            <div className="text-2xl opacity-30">😊</div>
          </div>
        </div>
      </div> */}

      {/* Week Days Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekData.map((day, idx) => {
          const isSelected =
            day.date.getDate() === selectedDay.getDate() &&
            day.date.getMonth() === selectedDay.getMonth() &&
            day.date.getFullYear() === selectedDay.getFullYear();

          const currentDayString = formatDateToISO(day.date);
          const dayLogs = logs.filter((log) => log.date === currentDayString);
          const hasLogForDay = dayLogs.length > 0;

          return (
            <button
              key={idx}
              onClick={() => setSelectedDay(day.date)}
              className={`
                flex flex-col items-center p-3 rounded-xl transition-all duration-200
                ${
                  isSelected
                    ? "bg-cyan-100 dark:bg-cyan-900/50 border-2 border-cyan-500"
                    : day.isToday
                    ? "bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800"
                    : "bg-zinc-50 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                }
              `}
            >
              {/* Day Name */}
              <div
                className={`
                text-sm font-medium mb-2
                ${
                  isSelected
                    ? "text-cyan-700 dark:text-cyan-300"
                    : "text-zinc-600 dark:text-zinc-400"
                }
              `}
              >
                {day.dayName.substring(0, 3)}
              </div>

              {/* Date Number */}
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold mb-3
                ${
                  isSelected
                    ? "bg-cyan-500 text-white"
                    : day.isToday
                    ? "bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400"
                    : "text-zinc-700 dark:text-zinc-300"
                }
              `}
              >
                {day.dateNumber}
              </div>

              {/* Indicators */}
              <div className="flex flex-col items-center gap-1.5">
                {/* Skin Rating */}
                {/* {day.skinRating && (
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${getRatingColor(
                        day.skinRating
                      )}`}
                      title={`Rating: ${day.skinRating}/5`}
                    />
                    <span className="text-xs">{day.skinRating}</span>
                  </div>
                )} */}

                {/* Log Indicator */}
                <div className="flex items-center gap-1">
                  {hasLogForDay ? (
                    <>
                      <FiCheckCircle className="text-xl text-emerald-500" />
                    </>
                  ) : (
                    <FiXCircle className="text-xl text-zinc-500" />
                  )}
                </div>

                {/* Mood */}
                {/* {day.mood && (
                  <div className="text-sm" title={`Mood: ${day.mood}`}>
                    {getMoodIcon(day.mood)}
                  </div>
                )} */}
              </div>

              {/* Month name for first day of month */}
              {day.dateNumber === 1 && (
                <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {day.monthName}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Details */}
      <LogDetail date={selectedDayData?.date ?? selectedDay} />

      {/* Week Navigation Tips */}
      <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Gunakan tombol panah untuk navigasi minggu • Klik &quot;Minggu
          Ini&quot; untuk kembali ke minggu saat ini
        </p>
      </div>
    </>
  );
}
