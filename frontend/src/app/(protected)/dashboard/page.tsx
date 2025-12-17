"use client";

import CalendarWeekly from "@/components/CalendarWeek";
import InterpretationSection from "@/components/InterpretationSection";
import LogDetail from "@/components/LogDetail";
import { useDate } from "@/context/DateContext";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard/main");
}
