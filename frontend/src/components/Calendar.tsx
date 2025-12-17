/* eslint-disable react-hooks/purity */
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";

interface CalendarDay {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  hasLog: boolean;
  hasAnalysis: boolean;
  skinRating?: number; // 1-5
  notes?: string;
}

export default function CalendarFull() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Generate calendar days
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: CalendarDay[] = [];

    // Hari dari bulan sebelumnya
    const firstDayOfWeek = firstDay.getDay();
    const lastDayPrevMonth = new Date(year, month, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, lastDayPrevMonth - i);
      days.push({
        date,
        isToday: false,
        isCurrentMonth: false,
        hasLog: Math.random() > 0.7, // Mock data
        hasAnalysis: Math.random() > 0.8,
        skinRating:
          Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : undefined,
      });
    }

    // Hari di bulan ini
    const daysInMonth = lastDay.getDate();
    const today = new Date();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      days.push({
        date,
        isToday,
        isCurrentMonth: true,
        hasLog: Math.random() > 0.5, // Mock data - ganti dengan data real
        hasAnalysis: Math.random() > 0.6,
        skinRating:
          Math.random() > 0.4 ? Math.floor(Math.random() * 5) + 1 : undefined,
      });
    }

    // Hari dari bulan berikutnya
    const totalCells = 42; // 6 rows * 7 days
    const nextMonthDays = totalCells - days.length;

    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isToday: false,
        isCurrentMonth: false,
        hasLog: false,
        hasAnalysis: false,
      });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const dayNames = ["M", "S", "S", "R", "K", "J", "S"];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Get skin rating color
  const getRatingColor = (rating?: number) => {
    if (!rating) return "bg-zinc-200 dark:bg-zinc-700";
    if (rating <= 2) return "bg-red-500";
    if (rating <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Get selected day details
  const selectedDayDetails = selectedDate
    ? calendarDays.find(
        (day) =>
          day.date.getDate() === selectedDate.getDate() &&
          day.date.getMonth() === selectedDate.getMonth() &&
          day.date.getFullYear() === selectedDate.getFullYear()
      )
    : null;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Skin Journal Calendar
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Pantau rutinitas skincare Anda
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {currentMonth} {currentYear}
          </div>

          <button
            onClick={() => navigateMonth("next")}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Hari ini
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Log skincare
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Kulit baik (4-5)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Kulit sedang (3)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Kulit kurang (1-2)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day, idx) => (
              <div
                key={idx}
                className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              const isSelected =
                selectedDate &&
                day.date.getDate() === selectedDate.getDate() &&
                day.date.getMonth() === selectedDate.getMonth() &&
                day.date.getFullYear() === selectedDate.getFullYear();

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day.date)}
                  className={`
                    relative aspect-square rounded-lg transition-all duration-200
                    ${
                      isSelected
                        ? "bg-cyan-100 dark:bg-cyan-900/50 border-2 border-cyan-500"
                        : day.isToday
                        ? "bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800"
                        : "bg-zinc-50 dark:bg-zinc-900/30 border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                    }
                    ${!day.isCurrentMonth ? "opacity-40" : ""}
                    flex flex-col items-center justify-center p-2
                  `}
                >
                  {/* Date Number */}
                  <div
                    className={`
                    text-sm font-medium mb-1
                    ${
                      isSelected
                        ? "text-cyan-700 dark:text-cyan-300"
                        : day.isCurrentMonth
                        ? "text-zinc-700 dark:text-zinc-300"
                        : "text-zinc-400 dark:text-zinc-500"
                    }
                  `}
                  >
                    {day.date.getDate()}
                  </div>

                  {/* Indicators */}
                  <div className="flex flex-col items-center gap-1">
                    {/* Skin Rating Dot */}
                    {day.skinRating && (
                      <div
                        className={`w-2 h-2 rounded-full ${getRatingColor(
                          day.skinRating
                        )}`}
                        title={`Skin rating: ${day.skinRating}/5`}
                      />
                    )}

                    {/* Log Indicator */}
                    {day.hasLog && (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    )}

                    {/* Analysis Indicator */}
                    {day.hasAnalysis && (
                      <div className="text-xs px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                        📷
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-sm">Tambah Log Hari Ini</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-cyan-600 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
              </svg>
              <span className="text-sm">Analisis Foto</span>
            </button>
          </div>
        </div>

        {/* Selected Day Details */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-5 h-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              {selectedDate
                ? selectedDate.toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Pilih tanggal"}
            </h3>

            {selectedDayDetails ? (
              <div className="space-y-4">
                {/* Skin Status */}
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    Status Kulit
                  </p>
                  {selectedDayDetails.skinRating ? (
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${getRatingColor(
                          selectedDayDetails.skinRating
                        )} text-white`}
                      >
                        {selectedDayDetails.skinRating}
                      </div>
                      <div>
                        <p className="font-medium">
                          {selectedDayDetails.skinRating <= 2
                            ? "Perlu Perhatian"
                            : selectedDayDetails.skinRating <= 3
                            ? "Cukup Baik"
                            : "Sangat Baik"}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Rating: {selectedDayDetails.skinRating}/5
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-zinc-500 dark:text-zinc-400 italic">
                      Belum ada data
                    </p>
                  )}
                </div>

                {/* Activities */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      Log Skincare
                    </span>
                    {selectedDayDetails.hasLog ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Tercatat</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm">Belum</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      Analisis Foto
                    </span>
                    {selectedDayDetails.hasAnalysis ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Selesai</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <span className="text-sm">Belum</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    Catatan
                  </p>
                  {selectedDayDetails.notes ? (
                    <p className="text-zinc-700 dark:text-zinc-300 bg-white/50 dark:bg-zinc-800/50 rounded p-3">
                      {selectedDayDetails.notes}
                    </p>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                        <svg
                          className="w-6 h-6 text-zinc-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        Belum ada catatan
                      </p>
                      <button className="mt-2 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300">
                        + Tambah catatan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Pilih tanggal di kalender untuk melihat detail
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-4">
          Ringkasan Bulan Ini
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-cyan-50 dark:bg-cyan-900/20">
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              {calendarDays.filter((d) => d.hasLog && d.isCurrentMonth).length}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Hari dengan log
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {
                calendarDays.filter((d) => d.hasAnalysis && d.isCurrentMonth)
                  .length
              }
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Analisis foto
            </p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(
                calendarDays
                  .filter((d) => d.skinRating && d.isCurrentMonth)
                  .reduce((acc, d) => acc + (d.skinRating || 0), 0) /
                  calendarDays.filter((d) => d.skinRating && d.isCurrentMonth)
                    .length || 0
              ).toFixed(1)}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Rata-rata rating
            </p>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {
                calendarDays.filter(
                  (d) => d.skinRating && d.skinRating >= 4 && d.isCurrentMonth
                ).length
              }
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Hari kulit baik
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
