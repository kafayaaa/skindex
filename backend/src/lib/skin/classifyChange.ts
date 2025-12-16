import { AnalysisResult } from "./types";

export function classifyChange(delta: number) {
  if (delta >= 10) return "significant_worsening";
  if (delta >= 3) return "worsening";
  if (delta <= -10) return "significant_improvement";
  if (delta <= -3) return "improvement";
  return "stable";
}

export const METRIC_FIELD_MAP = {
  acne: "acne_score",
  oilness: "oilness_score",
  redness: "redness_score",
  moisture: "moisture_score",
} as const;

export type MetricKey = keyof typeof METRIC_FIELD_MAP;

function calculateDelta(
  metric: MetricKey,
  current: AnalysisResult,
  previous: AnalysisResult
) {
  const field = METRIC_FIELD_MAP[metric];
  return current[field] - previous[field];
}
