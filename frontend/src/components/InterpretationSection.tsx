import { useDate } from "@/context/DateContext";
import { useSkin } from "@/context/SkinContext";
import { FaSearch } from "react-icons/fa";
import DietAnalyzeSection from "./DietAnalyzeSection";

export default function InterpretationSection() {
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
  console.log(todayInterpretation?.recommendations);
  const concerns = Array.from(new Set(todayInterpretation?.concerns));

  const concernLabels: Record<string, string> = {
    acne: "Jerawat",
    redness: "Kemerahan",
    oiliness: "Minyak Berlebih",
    dry: "Kulit Kering",
    sensitivity: "Kulit Sensitif",
  };
  return (
    <div className="w-full">
      {todayInterpretation && (
        <div className="mb-6 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-3 md:p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <FaSearch className="text-xl md:text-3xl text-cyan-500" />
            <div>
              <h2 className="text-base md:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Kondisi Kulitmu Hari Ini
              </h2>
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
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
              <div className="p-3 rounded-lg bg-cyan-50/50 dark:bg-zinc-700">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  Masalah Utama
                </p>
                <p className="text-sm md:text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {concerns.map((c) => concernLabels[c] ?? c).join(", ")}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-cyan-50/50 dark:bg-zinc-700">
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
                    {todayInterpretation.severity == "low"
                      ? "Ringan"
                      : todayInterpretation.severity == "medium"
                      ? "Sedang"
                      : "Tinggi"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Diet Analyze Section */}
          <DietAnalyzeSection />
          {/* Recommendations Section */}
          <div className="">
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
                      ? "border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-900/5"
                      : rec.priority === 2
                      ? "border-yellow-200 dark:border-yellow-900 bg-yellow-50/50 dark:bg-yellow-900/5"
                      : "border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-900/5"
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
                  <ul className="space-y-2">
                    {rec.descriptions.map((desc, i) => (
                      <li
                        key={i}
                        className="text-sm text-zinc-800 dark:text-zinc-200 flex items-start gap-2"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
