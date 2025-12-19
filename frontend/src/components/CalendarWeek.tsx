"use client";

import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useDate } from "@/context/DateContext";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useSkin } from "@/context/SkinContext";

export default function CalendarWeekly({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    selectedDay,
    setSelectedDay,
    weekData,
    navigateWeek,
    goToCurrentWeek,
    formatDateRange,
  } = useDate();

  const { logs } = useSkin();

  const formatDateToISO = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateString = formatDateToISO(selectedDay);

  const filteredLogs = logs.filter((log) => log.date === selectedDateString);

  return (
    <>
      {/* Header */}
      <div className="w-full flex sm:items-center justify-between gap-4 mb-6">
        <div className="w-full flex items-center gap-3">
          <CalendarIcon className="size-10 text-cyan-600 dark:text-cyan-400 hidden md:block" />
          <div>
            <h2 className="text-base md:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-1">
              Progres Kulitmu
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
              {formatDateRange()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => navigateWeek("prev")}
            className="p-1 md:p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            title="Minggu sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToCurrentWeek}
            className="px-3 md:px-4 py-2 text-xs md:text-sm md:truncate bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            Minggu Ini
          </button>

          <button
            onClick={() => navigateWeek("next")}
            className="p-1 md:p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            title="Minggu berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Week Days Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekData.map((day, idx) => {
          const isSelected =
            day.date.getDate() === selectedDay.getDate() &&
            day.date.getMonth() === selectedDay.getMonth() &&
            day.date.getFullYear() === selectedDay.getFullYear();

          const currentDayString = formatDateToISO(day.date);

          // logs
          const dayLogs = logs.filter((log) => log.date === currentDayString);
          const hasLogForDay = dayLogs.length > 0;

          return (
            <button
              key={idx}
              onClick={() => setSelectedDay(day.date)}
              className={`
                flex flex-col items-center p-2 md:p-3 rounded-xl transition-all duration-200
                ${
                  isSelected
                    ? "bg-cyan-100 dark:bg-cyan-900/50 border-2 border-cyan-500"
                    : day.isToday
                    ? "bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800"
                    : "bg-white border border-zinc-200 dark:bg-zinc-700/30 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                }
              `}
            >
              {/* Day Name */}
              <div
                className={`
                text-[0.7rem] md:text-sm font-medium mb-1 md:mb-2
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
                w-6 md:w-10 h-6 md:h-10 rounded-full flex items-center justify-center text-sm md:text-lg font-semibold mb-3
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
                {/* Log Indicator */}
                <div className="flex items-center gap-1">
                  {hasLogForDay ? (
                    <>
                      <FiCheckCircle className="text-base md:text-xl text-emerald-500" />
                    </>
                  ) : (
                    <FiXCircle className="text-base md:text-xl text-zinc-500" />
                  )}
                </div>
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
      {children}
      {/* Week Navigation Tips */}
      {filteredLogs.length > 0 && (
        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-center">
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Hasil ini dianalisis oleh AI. Untuk diagnosa yang lebih mendalam dan
            akurat, sangat disarankan untuk berkonsultasi dengan dokter kulit
            yaaa...
          </p>
        </div>
      )}
      {/* <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-center">
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
          Gunakan tombol panah untuk navigasi minggu • Klik &quot;Minggu
          Ini&quot; untuk kembali ke minggu saat ini
        </p>
      </div> */}
    </>
  );
}
