"use client";

import { useDate } from "@/context/DateContext";
import { useSkin } from "@/context/SkinContext";
import { generateRecommendations } from "@/utils/recommendationEngine";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbLoader3 } from "react-icons/tb";

export default function TipsPage() {
  const { interpretations } = useSkin();
  const { selectedDay } = useDate();
  const formatDateToISO = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const selectedDateISO = formatDateToISO(selectedDay);
  const todayInterpretation = interpretations.find(
    (i) => i.generated_at && i.generated_at?.startsWith(selectedDateISO)
  );

  if (!todayInterpretation) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <MdOutlineTipsAndUpdates className="text-xl md:text-3xl text-cyan-500" />
        <div>
          <h2 className="text-base md:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Tips Untukmu
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Coba beberapa tips ini untuk meningkatkan kondisi kulitmu
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {generateRecommendations(
          todayInterpretation.severity,
          todayInterpretation.concerns
        ).map((rec, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
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
  );
}
