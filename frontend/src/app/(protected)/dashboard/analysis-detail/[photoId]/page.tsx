"use client";

import { useEffect } from "react";
import { useSkin } from "@/context/SkinContext";

export default function AnalysisDetailPage({
  params,
}: {
  params: { photoId: string };
}) {
  const photoId = Number(params.photoId);
  const { analysisDetails, fetchAnalysisDetail } = useSkin();

  const detail = analysisDetails[photoId];

  useEffect(() => {
    fetchAnalysisDetail(photoId);
  }, [photoId]);

  if (!detail) {
    return (
      <div className="p-6 text-zinc-500">Menganalisis kondisi kulitmu...</div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      {/* Interpretation */}
      <section className="rounded-xl bg-white dark:bg-zinc-900 p-4 shadow">
        <p className="text-sm text-zinc-500 mb-2">{detail.opening}</p>

        <p className="text-base font-medium text-zinc-800 dark:text-zinc-100">
          {detail.summary}
        </p>

        <div className="mt-4 flex gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-cyan-100 text-cyan-700">
            {detail.skin_condition}
          </span>
          <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
            {detail.severity}
          </span>
        </div>
      </section>

      {/* Recommendations */}
      <section className="space-y-3">
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
          Rekomendasi untukmu
        </h3>

        {detail.analysis_recommendations
          .sort((a, b) => a.priority - b.priority)
          .map((rec) => (
            <div
              key={rec.id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-4"
            >
              <p className="font-medium">{rec.title}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {rec.description}
              </p>
            </div>
          ))}
      </section>
    </div>
  );
}
