import { Request, Response } from "express";
import { analyzeSkinWithGemini } from "../services/skin.service";
import { supabase } from "../utils/supabase";
import { mapConcernsFromScore } from "../lib/skin/concern.mapper";
import { buildAnalysisResult } from "../lib/skin/orchestrator";

export const analyzeSkin = async (req: Request, res: Response) => {
  try {
    // 🔒 AUTH GUARD (INI WAJIB)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.id;
    const file = req.file;
    const logId: string | null = req.body.log_id ?? null;
    console.log("REQ FILE:", req.file);
    console.log("REQ BODY:", req.body);

    if (!file || !file.buffer) {
      return res.status(400).json({ message: "Photo is required" });
    }

    // Check if log_id is valid
    if (logId) {
      const { data: logExists } = await supabase
        .from("skin_logs")
        .select("id")
        .eq("id", logId)
        .eq("user_id", userId)
        .single();

      if (!logExists) {
        return res.status(400).json({ message: "Invalid log_id" });
      }
    }

    // 1. Upload ke storage
    const filePath = `${userId}/${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("skin-photos")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) throw uploadError;

    const { data: publicUrl } = supabase.storage
      .from("skin-photos")
      .getPublicUrl(filePath);

    // 2. Insert photo
    const { data: photo, error: photoError } = await supabase
      .from("photos")
      .insert({
        user_id: userId,
        log_id: logId,
        url: publicUrl.publicUrl,
        taken_at: new Date().toISOString(),
        analysis_status: "processing",
      })
      .select()
      .single();

    if (photoError || !photo) {
      throw new Error(photoError?.message || "Failed to create photo");
    }

    // 3. Gemini
    const base64Image = file.buffer.toString("base64");
    const scores = await analyzeSkinWithGemini(base64Image);

    // 4. Save analysis
    const { error: analysisError } = await supabase
      .from("analysis_results")
      .insert({
        photo_id: photo.id,
        user_id: userId,
        acne_score: scores.acne_score,
        oilness_score: scores.oiliness_score,
        redness_score: scores.redness_score,
        moisture_score: scores.moisture_score,
      });

    if (analysisError) throw analysisError;

    // 4.1 Mapping concern otomatis
    const concerns = mapConcernsFromScore({
      acne: scores.acne_score,
      oil: scores.oiliness_score,
      redness: scores.redness_score,
      moisture: scores.moisture_score,
    });

    // 4.2 Build interpretation & recommendation
    const interpretation = buildAnalysisResult({
      concerns,
      scores: {
        acne: scores.acne_score,
        oil: scores.oiliness_score,
        redness: scores.redness_score,
        moisture: scores.moisture_score,
      },
    });

    // 4.3 Save interpretation
    const { error: interpretationError } = await supabase
      .from("analysis_interpretations")
      .insert({
        user_id: userId,
        photo_id: photo.id,
        severity: interpretation.severity,
        intro_text: interpretation.intro,
        concerns,
        recommendations: interpretation.recommendations, // jsonb
        generated_at: new Date().toISOString(),
      });

    if (interpretationError) throw interpretationError;

    // 5. Update status
    await supabase
      .from("photos")
      .update({ analysis_status: "completed" })
      .eq("id", photo.id);

    return res.json({
      message: "Skin analysis completed",
      photo_id: photo.id,
      scores,
      interpretation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to analyze skin" });
  }
};
