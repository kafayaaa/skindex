"use client";

import CalendarWeekly from "@/components/CalendarWeek";
import InterpretationSection from "@/components/InterpretationSection";
import LogDetail from "@/components/LogDetail";
import { useDate } from "@/context/DateContext";

export default function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedDayData, selectedDay } = useDate();
  return (
    <div className="w-full">
      <CalendarWeekly>
        <LogDetail date={selectedDayData?.date ?? selectedDay}>
          {children}
        </LogDetail>
      </CalendarWeekly>
    </div>
  );
}
