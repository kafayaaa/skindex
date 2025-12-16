import { SkinInsightResponse } from "@/types/Skin";
import { InsightList } from "./InsightList";
import { CTAState, EmptyState, InfoState } from "./CTA";

interface Props {
  data: SkinInsightResponse;
}

export function SkinInsightSection({ data }: Props) {
  switch (data.reason) {
    case "no_analysis":
      return (
        <EmptyState message="Belum ada analisis kulit. Upload foto untuk memulai." />
      );

    case "first_analysis":
      return (
        <InfoState message="Insight akan tersedia setelah minimal 2 kali analisis." />
      );

    case "missing_skin_log":
      return (
        <CTAState
          message="Isi Skin Log hari ini untuk mengetahui penyebab perubahan kondisi kulit."
          // //   actionLabel="Isi Skin Log"
          //   actionHref="/skin-log"
        />
      );

    case "ok":
      return <InsightList insights={data.insights} />;

    default:
      return null;
  }
}
