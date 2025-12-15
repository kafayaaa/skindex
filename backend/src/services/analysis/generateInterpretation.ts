export async function generateInterpretationAndRecommendation(
  supabase,
  analysisResult: {
    id: number;
    acne_score: number;
    oil_score: number;
    redness_score: number;
    moisture_score: number;
  }
) {
  const skinType = determineSkinType(
    analysisResult.oil_score,
    analysisResult.moisture_score
  );

  const concerns = determineConcerns({
    acne: analysisResult.acne_score,
    oil: analysisResult.oil_score,
    redness: analysisResult.redness_score,
    moisture: analysisResult.moisture_score,
  });

  const summary = generateSummary(skinType, concerns, {
    acne: analysisResult.acne_score,
    oil: analysisResult.oil_score,
    redness: analysisResult.redness_score,
    moisture: analysisResult.moisture_score,
  });

  const { data: interpretation } = await supabase
    .from("analysis_interpretations")
    .insert({
      analysis_result_id: analysisResult.id,
      skin_type: skinType,
      main_concerns: concerns,
      overall_summary: summary,
    })
    .select()
    .single();

  const recommendations = generateRecommendations(concerns, {
    acne: analysisResult.acne_score,
    redness: analysisResult.redness_score,
    oil: analysisResult.oil_score,
    moisture: analysisResult.moisture_score,
  });

  if (recommendations.length) {
    await supabase.from("skin_recommendations").insert(
      recommendations.map((r) => ({
        interpretation_id: interpretation.id,
        ...r,
      }))
    );
  }

  return interpretation;
}
