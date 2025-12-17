import { SKIN_RULES, SkinMetric } from "../utils/skinRules";
import { generateRecommendations } from "../utils/recommendations";
import { AnalysisResult } from "../types/types";
import { SkinLog } from "../types/skinLog";
import { SkinInsightItem } from "../types/skinInsight";

function classifyDelta(delta: number): SkinInsightItem["status"] {
  if (delta >= 3) return "worsened";
  if (delta <= -3) return "improved";
  return "stable";
}

export function generateSkinInsights(
  current: AnalysisResult,
  previous: AnalysisResult,
  skinLog: SkinLog
): SkinInsightItem[] {
  const metrics: SkinMetric[] = [
    "acne_score",
    "oiliness_score",
    "redness_score",
    "moisture_score",
  ];

  return metrics.map((metric) => {
    const delta = current[metric] - previous[metric];
    const status = classifyDelta(delta);

    const causes =
      status === "stable"
        ? []
        : SKIN_RULES[metric]
            .filter((rule) => rule.condition(skinLog))
            .map((rule) => rule.reason);

    return {
      metric,
      delta,
      status,
      causes,
      recommendations: generateRecommendations(metric, causes),
    };
  });
}
