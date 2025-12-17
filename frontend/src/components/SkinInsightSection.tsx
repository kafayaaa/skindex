import { SkinInsightResponse } from "@/types/Skin";
import { InsightList } from "./InsightList";
import { CTAState, EmptyState, InfoState } from "./CTA";
import { RiSparkling2Line } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa6";

interface Props {
  data: SkinInsightResponse;
}

export function SkinInsightSection({ data }: Props) {
  switch (data.reason) {
    case "no_analysis":
      return (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
          <EmptyState
            message="Belum ada analisis kulit. Upload foto untuk memulai."
            actionHref="/dashboard/analysis"
            actionLabel="Analisis Sekarang"
          />
        </div>
      );

    case "first_analysis":
      return (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
          <InfoState
            message="Insight akan tersedia setelah minimal 2 kali analisis untuk melihat pola perkembangan."
            subtitle="Lakukan analisis lagi dalam 3-7 hari untuk mendapatkan insight yang lebih akurat."
          />
        </div>
      );

    case "missing_skin_log":
      return (
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border border-cyan-200 dark:border-cyan-800 p-6">
          <CTAState
            message="Isi Skin Log hari ini untuk mengetahui penyebab perubahan kondisi kulit."
            actionLabel="Isi Log Harian"
            actionHref="/dashboard/journal"
            subtitle="Data log harian membantu AI memahami pola dan pemicu kulit Anda."
          />
        </div>
      );

    case "ok":
      return (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-3 md:p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaRegLightbulb className="text-xl md:text-3xl text-cyan-500" />
            <div>
              <h2 className="text-base md:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Kabar Kulitmu
              </h2>
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
                Analisis perkembangan kulit Anda
              </p>
            </div>
          </div>
          <InsightList insights={data.insights} />
        </div>
      );

    default:
      return (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
          <EmptyState
            message="Terjadi kesalahan dalam memuat insight."
            actionLabel="Coba Lagi"
          />
        </div>
      );
  }
}
