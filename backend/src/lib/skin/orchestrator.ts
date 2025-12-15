import { generateRecommendations } from "./recommendation.engine";
import { getSeverity } from "./severity";
import { introCopy, pickRandom } from "./intro.copy";
import { SkinConcern } from "./types";

export function buildAnalysisResult({
  concerns,
  scores,
}: {
  concerns: SkinConcern[];
  scores: {
    acne: number;
    oil: number;
    redness: number;
    moisture: number;
  };
}) {
  const overallSeverity = getSeverity(
    Math.max(scores.acne, scores.oil, scores.redness, scores.moisture)
  );

  return {
    intro: pickRandom(introCopy[overallSeverity]),
    severity: overallSeverity,
    recommendations: generateRecommendations(concerns, scores),
  };
}
