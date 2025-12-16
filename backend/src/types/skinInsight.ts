import { SkinMetric } from "../utils/skinRules";

export interface SkinInsightItem {
  metric: SkinMetric;
  status: "improved" | "worsened" | "stable";
  delta: number;
  causes: string[];
  recommendations: string[];
}

export interface SkinInsightResponse {
  date: string | null;
  reason: InsightReason;
  insights: SkinInsightItem[];
}

export type InsightReason =
  | "ok"
  | "no_analysis"
  | "first_analysis"
  | "missing_skin_log";
