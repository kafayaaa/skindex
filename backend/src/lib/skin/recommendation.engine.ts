import {
  acneRecommendations,
  oilRecommendations,
  rednessRecommendations,
  moistureRecommendations,
} from "./recommendation.copy";
import { getSeverity } from "./severity";
import { SkinConcern, RecommendationCategory } from "./types";

export function generateRecommendations(
  concerns: SkinConcern[],
  scores: {
    acne: number;
    oil: number;
    redness: number;
    moisture: number;
  }
) {
  const recs = [];

  if (concerns.includes("acne")) {
    const severity = getSeverity(scores.acne);
    recs.push({
      ...acneRecommendations[severity],
      category: "ingredient" as RecommendationCategory,
      priority: severity === "high" ? 1 : 2,
      severity,
    });
  }

  if (concerns.includes("oiliness")) {
    const severity = getSeverity(scores.oil);
    recs.push({
      ...oilRecommendations[severity],
      category: "routine" as RecommendationCategory,
      priority: severity === "high" ? 1 : 2,
      severity,
    });
  }

  if (concerns.includes("redness")) {
    const severity = getSeverity(scores.redness);
    recs.push({
      ...rednessRecommendations[severity],
      category: "warning" as RecommendationCategory,
      priority: 1,
      severity,
    });
  }

  if (concerns.includes("dry")) {
    const severity = getSeverity(scores.moisture);
    recs.push({
      ...moistureRecommendations[severity],
      category: "routine" as RecommendationCategory,
      priority: severity === "high" ? 1 : 2,
      severity,
    });
  }

  return recs.sort((a, b) => a.priority - b.priority);
}
