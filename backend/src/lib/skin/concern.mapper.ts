import { concernThreshold } from "./concern.config";
import { SkinConcern } from "./types";

export function mapConcernsFromScore(scores: {
  acne: number;
  oil: number;
  redness: number;
  moisture: number;
}): SkinConcern[] {
  const concerns: SkinConcern[] = [];

  if (scores.acne >= concernThreshold.acne.min) {
    concerns.push("acne");
  }

  if (scores.oil >= concernThreshold.oil.min) {
    concerns.push("oiliness");
  }

  if (scores.redness >= concernThreshold.redness.min) {
    concerns.push("redness");
  }

  if (scores.moisture <= concernThreshold.dry.max) {
    concerns.push("dry");
  }

  return concerns;
}
