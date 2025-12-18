import { SkinInsightItem } from "@/types/Skin";
import { InsightCard } from "./InsightCard";
import { HiOutlineMinusCircle, HiOutlineSparkles } from "react-icons/hi2";
import { TiWarningOutline } from "react-icons/ti";

interface Props {
  insights: SkinInsightItem[];
}

export function InsightList({ insights }: Props) {
  const categories = {
    improved: insights.filter((item) => item.status === "improved"),
    worsened: insights.filter((item) => item.status === "worsened"),
    stable: insights.filter((item) => item.status === "stable"),
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      {/* <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="relative p-3 md:p-4 flex justify-center items-center gap-2 md:gap-3 rounded-xl bg-green-50 dark:bg-green-900/30 overflow-clip">
          <HiOutlineSparkles className="absolute top-0 -left-4 text-6xl text-green-500/10" />
          <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">
            {categories.improved.length}
          </p>
          <p className="text-xs md:text-sm font-semibold">Makin Sehat</p>
        </div>
        <div className="relative p-3 md:p-4 flex justify-center items-center gap-2 md:gap-3 rounded-xl bg-red-50 dark:bg-red-900/30 overflow-clip">
          <TiWarningOutline className="absolute top-0 -left-4 text-6xl text-red-500/10" />
          <p className="text-2xl font-extrabold text-red-600 dark:text-red-400">
            {categories.worsened.length}
          </p>
          <p className="text-xs md:text-sm font-semibold">Lagi Sensitif</p>
        </div>
        <div className="relative p-3 md:p-4 flex justify-center items-center gap-2 md:gap-3 rounded-xl bg-slate-50 dark:bg-slate-900/30 overflow-clip">
          <HiOutlineMinusCircle className="absolute top-0 -left-4 text-6xl text-slate-500/10" />
          <p className="text-2xl font-extrabold text-slate-600 dark:text-slate-400">
            {categories.stable.length}
          </p>
          <p className="text-xs md:text-sm font-semibold">Terjaga</p>
        </div>
      </div> */}

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((item) => (
          <InsightCard key={item.metric} item={item} />
        ))}
      </div>
    </div>
  );
}
