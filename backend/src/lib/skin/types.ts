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
