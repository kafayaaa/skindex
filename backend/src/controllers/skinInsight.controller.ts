import { Request, Response } from "express";
import {
  getLatestAnalysis,
  getPreviousAnalysis,
} from "../services/analysis.service";
import { getSkinLogByDate } from "../services/skinLog.service";
import { generateSkinInsights } from "../services/skinInsight.service";
import { SkinInsightResponse } from "../types/skinInsight";

export async function getSkinInsight(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  const userId = req.user.id;

  const latest = await getLatestAnalysis(userId);
  if (!latest) {
    const response: SkinInsightResponse = {
      date: null,
      reason: "no_analysis",
      insights: [],
    };
    return res.json(response);
  }

  const previous = await getPreviousAnalysis(userId, latest.generated_at);
  if (!previous) {
    return res.json({
      date: latest.generated_at.split("T")[0],
      reason: "first_analysis",
      insights: [],
    });
  }

  const skinLog = await getSkinLogByDate(userId, latest.generated_at);
  if (!skinLog) {
    return res.json({
      date: latest.generated_at.split("T")[0],
      reason: "missing_skin_log",
      insights: [],
    });
  }

  const insights = generateSkinInsights(latest, previous, skinLog);

  const response: SkinInsightResponse = {
    date: latest.generated_at.split("T")[0],
    reason: "ok",
    insights,
  };

  return res.json(response);
}
