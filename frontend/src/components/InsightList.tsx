import { SkinInsightItem } from "@/types/Skin";
import { InsightCard } from "./InsightCard";

interface Props {
  insights: SkinInsightItem[];
}

export function InsightList({ insights }: Props) {
  return (
    <div className="space-y-4">
      {insights.map((item) => (
        <InsightCard key={item.metric} item={item} />
      ))}
    </div>
  );
}
