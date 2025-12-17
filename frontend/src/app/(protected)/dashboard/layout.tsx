"use client";

import { useEffect, useState } from "react";
import {
  Camera,
  BarChart3,
  Calendar,
  Search,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Activity,
  Droplets,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import CalendarFull from "@/components/Calendar";
import CalendarMini from "@/components/CalendarMini";
import CalendarWeekly from "@/components/CalendarWeek";
import SkinLogForm from "@/components/SkinLogForm";
import { MdOutlineEditCalendar } from "react-icons/md";
import { DateProvider } from "@/context/DateContext";
import { SkinProvider } from "@/context/SkinContext";
import LoadingScreen from "@/components/LoadingScreen";
import ToggleTheme from "@/components/ToggleTheme";

// Mock data untuk komponen
const skinMetrics = [
  {
    name: "Kelembapan",
    value: 78,
    unit: "%",
    trend: "up",
    icon: <Droplets className="w-5 h-5" />,
    color: "text-blue-500",
  },
  {
    name: "Jerawat Aktif",
    value: 2,
    unit: "",
    trend: "down",
    icon: <AlertCircle className="w-5 h-5" />,
    color: "text-red-500",
  },
  {
    name: "Kesehatan",
    value: 85,
    unit: "%",
    trend: "up",
    icon: <Activity className="w-5 h-5" />,
    color: "text-green-500",
  },
  {
    name: "Perlindungan",
    value: 92,
    unit: "%",
    trend: "stable",
    icon: <Shield className="w-5 h-5" />,
    color: "text-cyan-500",
  },
];

const recentActivities = [
  {
    id: 1,
    action: "Analisis foto kulit",
    time: "2 jam lalu",
    status: "completed",
  },
  {
    id: 2,
    action: "Menambahkan log skincare",
    time: "Kemarin",
    status: "completed",
  },
  {
    id: 3,
    action: "Identifikasi pemicu baru",
    time: "3 hari lalu",
    status: "completed",
  },
  { id: 4, action: "Analisis mingguan", time: "Besok", status: "pending" },
];

const skinTips = [
  "Gunakan sunscreen setiap hari, bahkan di dalam ruangan",
  "Minum 2L air untuk menjaga hidrasi kulit",
  "Bersihkan wajah sebelum tidur",
  "Hindari menyentuh wajah dengan tangan kotor",
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data.user);
    };

    getUser();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/signin");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/signin");
  };

  if (loading) return <LoadingScreen />;

  return (
    <DateProvider>
      <SkinProvider>
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
          {/* Top Navigation */}
          <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-700">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo & Mobile Menu */}
                <div className="flex items-center gap-4">
                  {/* <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {sidebarOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </button> */}

                  <Link href="/dashboard" className="flex items-center gap-2">
                    {/* <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                    </div> */}
                    <span className="text-xl font-bold">Skindex</span>
                  </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                  {/* <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button> */}
                  <ToggleTheme />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                      <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div className="hidden md:flex items-center gap-5">
                      <p className="text-sm font-medium">{user?.email}</p>
                      {/* <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Pengguna Premium
                    </p> */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-600 dark:text-red-400"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex">
            {/* Sidebar - Desktop */}
            {/* <aside className="hidden md:block w-64 min-h-[calc(100vh-4rem)] border-r border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50">
              <div className="p-6">
                <nav className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="font-medium">Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard/daily-log"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    <MdOutlineEditCalendar className="w-5 h-5" />
                    <span>Daily Log</span>
                  </Link>

                  <Link
                    href="/dashboard/analysis"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Analisis Kulit</span>
                  </Link>

                  <Link
                    href="/dashboard/journal"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Skin Journal</span>
                  </Link>

                  <Link
                    href="/dashboard/triggers"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    <Search className="w-5 h-5" />
                    <span>Deteksi Pemicu</span>
                  </Link>

                  <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Pengaturan</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-600 dark:text-red-400"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Keluar</span>
                    </button>
                  </div>
                </nav>
              </div>
            </aside> */}

            {/* Sidebar - Mobile */}
            {/* {sidebarOpen && (
              <div className="md:hidden fixed inset-0 z-40">
                <div
                  className="fixed inset-0 bg-black/50"
                  onClick={() => setSidebarOpen(false)}
                />
                <div className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-zinc-800 border-r">
                  <div className="p-6">
                    <nav className="space-y-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <BarChart3 className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                      </Link>

                      <Link
                        href="/dashboard/analysis"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Camera className="w-5 h-5" />
                        <span>Analisis Kulit</span>
                      </Link>

                      <Link
                        href="/dashboard/journal"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Calendar className="w-5 h-5" />
                        <span>Skin Journal</span>
                      </Link>

                      <Link
                        href="/dashboard/triggers"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Search className="w-5 h-5" />
                        <span>Deteksi Pemicu</span>
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            )} */}

            {/* Main Content */}
            <main className="flex-1 p-2 md:p-6">
              {/* <CalendarWeekly /> */}

              {/* Welcome & Quick Actions */}
              {/* <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Selamat Pagi, John 👋
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Kondisi kulit Anda hari ini dalam keadaan baik
                </p>

                <div className="flex flex-wrap gap-4">
                <Link
                    href="/dashboard/analysis"
                    className="flex items-center gap-3 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                    <Camera className="w-5 h-5" />
                    <span>Analisis Kulit Baru</span>
                </Link>

                <Link
                    href="/dashboard/journal"
                    className="flex items-center gap-3 px-4 py-3 border border-cyan-600 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                >
                    <Calendar className="w-5 h-5" />
                    <span>Tambah Log Harian</span>
                </Link>
                </div>
            </div> */}
              {/* Skin Metrics Grid */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {skinMetrics.map((metric, idx) => (
                <div
                    key={idx}
                    className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700"
                >
                    <div className="flex items-center justify-between mb-4">
                    <div
                        className={`p-2 rounded-lg ${metric.color.replace(
                        "text-",
                        "bg-"
                        )}/10`}
                    >
                        {metric.icon}
                    </div>
                    <div
                        className={`text-sm px-2 py-1 rounded-full ${
                        metric.trend === "up"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : metric.trend === "down"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400"
                        }`}
                    >
                        {metric.trend === "up"
                        ? "↑"
                        : metric.trend === "down"
                        ? "↓"
                        : "→"}
                    </div>
                    </div>

                    <div className="mb-2">
                    <div className="text-3xl font-bold">
                        {metric.value}
                        <span className="text-lg text-zinc-500 dark:text-zinc-400 ml-1">
                        {metric.unit}
                        </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {metric.name}
                    </p>
                    </div>
                </div>
                ))}
            </div> */}
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                {/* <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Aktivitas Terbaru</h2>
                    <Link
                    href="/dashboard/activities"
                    className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                    >
                    Lihat semua
                    <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="space-y-4">
                    {recentActivities.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                    >
                        <div
                        className={`p-2 rounded-full ${
                            activity.status === "completed"
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-yellow-100 dark:bg-yellow-900/30"
                        }`}
                        >
                        {activity.status === "completed" ? (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : (
                            <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        )}
                        </div>

                        <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {activity.time}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                </div> */}

                {/* Skin Health Tips */}
                {/* <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                    <TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h2 className="text-lg font-semibold">Tips Kesehatan Kulit</h2>
                </div>

                <div className="space-y-4">
                    {skinTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-cyan-500 flex-shrink-0"></div>
                        <p className="text-zinc-700 dark:text-zinc-300">{tip}</p>
                    </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Analisis berikutnya
                        </p>
                        <p className="font-medium">Besok, 10:00</p>
                    </div>
                    <button className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
                        Atur Ulang
                    </button>
                    </div>
                </div>
                </div> */}
              </div>
              {/* Skin Progress Chart Placeholder */}
              <div className="max-w-7xl mx-auto mt-0 md:mt-8">
                {children}

                {/* <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold mb-1">Progress Kulit</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Perkembangan dalam 30 hari terakhir
                    </p>
                </div>

                <div className="flex gap-2">
                    {["week", "month", "year"].map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedPeriod === period
                            ? "bg-cyan-600 text-white"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                    >
                        {period === "week"
                        ? "Minggu"
                        : period === "month"
                        ? "Bulan"
                        : "Tahun"}
                    </button>
                    ))}
                </div>
                </div> */}

                {/* Chart Placeholder */}
                {/* <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                    Data visualisasi progress akan muncul di sini
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Lakukan analisis untuk melihat progress
                    </p>
                </div>
                </div> */}
              </div>
            </main>
          </div>
        </div>
      </SkinProvider>
    </DateProvider>
  );
}
