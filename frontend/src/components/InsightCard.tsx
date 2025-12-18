import { SkinInsightItem } from "@/types/Skin";
import { HiOutlineMinusCircle, HiOutlineSparkles } from "react-icons/hi2";
import { TiWarningOutline } from "react-icons/ti";

export function InsightCard({ item }: { item: SkinInsightItem }) {
  const statusConfig = {
    improved: {
      color:
        "bg-green-50 dark:bg-green-900/5 border-green-200 dark:border-green-900",
      textColor: "text-green-700 dark:text-green-400",
      icon: <HiOutlineSparkles className="w-5 h-5" />,
      label: "Makin Sehat",
      badgeColor:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    },
    worsened: {
      color: "bg-red-50 dark:bg-red-900/5 border-red-200 dark:border-red-900",
      textColor: "text-red-700 dark:text-red-400",
      icon: <TiWarningOutline className="w-5 h-5" />,
      label: "Butuh Perhatian",
      badgeColor:
        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    },
    stable: {
      color:
        "bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-700",
      textColor: "text-slate-700 dark:text-slate-400",
      icon: <HiOutlineMinusCircle className="w-5 h-5" />,
      label: "Terjaga",
      badgeColor:
        "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400",
    },
  };

  const config = statusConfig[item.status];

  const metricLabels: Record<string, string> = {
    acne_score: "Jerawat",
    oiliness_score: "Produksi Minyak",
    redness_score: "Kemerahan & Iritasi",
    moisture_score: "Kelembapan Kulit",
  };

  const displayLabel =
    metricLabels[item.metric] || item.metric.replace(/_/g, " ");

  return (
    <div className={`rounded-xl border p-3 md:p-5 ${config.color}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.badgeColor}`}>
            {config.icon}
          </div>
          <div>
            <h3 className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100 capitalize">
              {displayLabel}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs md:text-sm font-medium ${config.textColor}`}
              >
                {config.label}
              </span>
              {item.delta && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${config.badgeColor}`}
                >
                  {/* {item.status === "improved" ? "−" : "+"} */}
                  {item.delta}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Causes Section */}
        {item.causes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">
                Kemungkinan Penyebab
              </h4>
            </div>
            <div className="space-y-2">
              {item.causes.map((cause, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-zinc-700 dark:bg-zinc-300 mt-2 shrink-0"></div>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                    {cause}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {item.recommendations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">
                Saran
              </h4>
            </div>
            <div className="space-y-2">
              {item.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-zinc-700 dark:bg-zinc-300 mt-2 shrink-0"></div>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* No Data Fallback */}
      {item.causes.length === 0 && item.recommendations.length === 0 && (
        <div className="text-center py-4">
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Belum ada perubahan signifikan hari ini. Kulitmu masih dalam ritme
            yang sama seperti kemarin.
          </p>
        </div>
      )}
    </div>
  );
}
