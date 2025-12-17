import { useDate } from "@/context/DateContext";
import { useSkin } from "@/context/SkinContext";
import { generateRecommendations } from "@/utils/recommendationEngine";

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
        <div className="my-6 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-3 md:p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm">
              <svg
                className="w-5 h-5 text-cyan-600 dark:text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-zinc-900 dark:text-zinc-100">
                Kondisi Kulitmu Hari Ini
              </h3>
              <p className="text-xs md:text-sm text-cyan-600 dark:text-cyan-400">
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

          {/* Recommendations Section */}
          <div className="mb-6">
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
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                    {rec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div>
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Tips Cepat Harian
            </h4>

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

          {/* Footer */}
          {/* <div className="mt-6 pt-6 border-t border-cyan-200 dark:border-cyan-800">
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-zinc-500 dark:text-zinc-400">
                                Terakhir diperbarui:{" "}
                                {new Date().toLocaleDateString("id-ID")}
                              </div>
                              <button className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm font-medium">
                                Simpan Rekomendasi
                              </button>
                            </div>
                          </div> */}
        </div>
      )}
    </div>
  );
}
