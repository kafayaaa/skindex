export type Severity = "low" | "medium" | "high";

export function getSeverity(score: number): Severity {
  if (score <= 3) return "low";
  if (score <= 6) return "medium";
  return "high";
}
