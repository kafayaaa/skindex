import { Request, Response } from "express";
import {
  getAnalysisByDate,
  getLatestAnalysis,
  getPreviousAnalysis,
} from "../services/analysis.service";
import { getSkinLogByDate } from "../services/skinLog.service";
import { generateSkinInsights } from "../services/skinInsight.service";
import { SkinInsightResponse } from "../types/skinInsight";

export async function getSkinInsight(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;
  const targetDate = req.query.date as string | undefined;

  const latest = targetDate
    ? await getAnalysisByDate(userId, targetDate)
    : await getLatestAnalysis(userId);

  if (!latest) {
    return res.json({
      date: targetDate ?? null,
      reason: "no_analysis",
      insights: [],
    });
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

  return res.json({
    date: latest.generated_at.split("T")[0],
    reason: "ok",
    insights,
  });
}
