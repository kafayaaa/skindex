"use client";

import { useDate } from "@/context/DateContext";
import { useSkin } from "@/context/SkinContext";
import { MdOutlineFastfood } from "react-icons/md";

export default function DietAnalyzeSection() {
  const { triggers, logs } = useSkin();
  const { selectedDayData, selectedDay } = useDate();

  const date = selectedDayData?.date ?? selectedDay;
  const formatDateToISO = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const selectedDateString = formatDateToISO(date);
  const filteredLogs = logs.filter((log) => log.date === selectedDateString);
  const todayLogsId = filteredLogs.map((log) => log.id);
  //   Analisis Diet Hari Ini
  const filteredTriggers = triggers.filter(
    (trigger) => trigger.log_id.toString() === todayLogsId[0]
  );

  return (
    <div className="w-full rounded-xl mb-10">
      <div className="flex items-center gap-2 mb-3">
        <MdOutlineFastfood className="text-lg text-cyan-500" />
        <p className="text-sm md:text-base font-bold">Analisis Konsumsi</p>
      </div>
      <div className="p-4 md:p-5 text-sm md:text-base text-justify bg-zinc-100 dark:bg-zinc-700 rounded-xl">
        <p>
          {filteredTriggers.map((trigger) => trigger.description).join(", ")}
        </p>
      </div>
    </div>
  );
}
