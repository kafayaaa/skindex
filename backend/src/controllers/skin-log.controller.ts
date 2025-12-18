import { Request, Response } from "express";
import { supabase } from "../utils/supabase";
import {
  analyzeDietWithGemini,
  isValidDietResult,
} from "../services/dietAnalyze.service";

export const createSkinLog = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.id;
    const { date, notes, stress_level, sleep_hours, diet_notes, mood } =
      req.body;

    const { data: log, error } = await supabase
      .from("skin_logs")
      .insert({
        user_id: userId,
        date,
        notes,
        stress_level,
        sleep_hours,
        diet_notes,
        mood,
      })
      .select()
      .single();

    if (error) throw error;

    if (diet_notes?.trim()) {
      const aiResult = await analyzeDietWithGemini(diet_notes);

      if (aiResult && isValidDietResult(aiResult) && aiResult.is_trigger) {
        await supabase.from("triggers_detected").insert({
          user_id: userId,
          log_id: log.id,
          trigger_type: "diet",
          confidence: aiResult.confidence,
          description: aiResult.explanation,
        });
      }
    }

    return res.status(201).json(log);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to analyze diet" });
  }
};
