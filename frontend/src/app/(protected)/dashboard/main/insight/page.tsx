"use client";

import { SkinInsightSection } from "@/components/SkinInsightSection";
import { useDate } from "@/context/DateContext";
import { useSkin } from "@/context/SkinContext";
import { getAnalysisByDate } from "@/lib/analysis";
import { AnalysisResult } from "@/types/Skin";
import { useEffect, useState } from "react";
import { TbLoader3 } from "react-icons/tb";

export default function InsightPage() {
  const { logs, skinInsight, fetchSkinInsight } = useSkin();
  const { selectedDayData, selectedDay } = useDate();
  const [loading, setLoading] = useState(true);
  const [localAnalysis, setLocalAnalysis] = useState<AnalysisResult | null>(
    null
  );
  const date = selectedDayData?.date ?? selectedDay;
  const formatDateToISO = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const selectedDateString = formatDateToISO(date);
  const selectedDateISO = formatDateToISO(selectedDay);

  const filteredLogs = logs.filter((log) => log.date === selectedDateString);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const data = await getAnalysisByDate(selectedDateString);
        setLocalAnalysis(data[0] ?? null);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
        setLocalAnalysis(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [selectedDateString]);

  useEffect(() => {
    fetchSkinInsight(selectedDateISO);
  }, [selectedDateISO]);

  if (loading)
    return (
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-2">
          <TbLoader3 className="text-3xl text-cyan-500 animate-spin" />
          <p className="text-lg font-semibold">Memuat Data...</p>
        </div>
      </div>
    );
  return (
    <div className="w-full">
      {filteredLogs.length > 0 && localAnalysis ? (
        <SkinInsightSection data={skinInsight} />
      ) : null}
    </div>
  );
}
