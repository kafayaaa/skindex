export interface AnalysisResult {
  id: number; // bigserial
  photo_id: number; // bigint FK
  user_id: string; // uuid
  acne_score: number;
  oiliness_score: number;
  redness_score: number;
  moisture_score: number;
  acne_locations: string[];
  redness_locations: string[];
  generated_at: string; // timestamptz
}

export type SkinCondition =
  | "balanced"
  | "oily"
  | "oily_dehydrated"
  | "oily_acne_prone"
  | "dry"
  | "dry_dehydrated"
  | "dry_irritated"
  | "sensitive"
  | "inflamed";

export type SkinConcern = "acne" | "redness" | "oiliness" | "dry";

export interface SkinRecommendation {
  id: number;
  interpretation_id: number;

  title: string;
  description: string;

  category: RecommendationCategory;
  priority: 1 | 2 | 3;

  created_at: string;
}

export type RecommendationCategory =
  | "routine"
  | "ingredient"
  | "lifestyle"
  | "warning";

export interface SkinInsight {
  id: number;
  user_id: string;
  analysis_result_id: number;

  metric: "acne" | "oiliness" | "redness" | "moisture";

  change_type:
    | "significant_improvement"
    | "improvement"
    | "stable"
    | "worsening"
    | "significant_worsening";

  delta: number;

  causes: string[];
  recommendations: string[];

  created_at: string;
}
