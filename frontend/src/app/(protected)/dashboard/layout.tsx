"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { DateProvider } from "@/context/DateContext";
import { SkinProvider } from "@/context/SkinContext";
import LoadingScreen from "@/components/LoadingScreen";
import { ProfileProvider } from "@/context/ProfileContext";
import Navbar from "@/components/Navbar";

// Mock data untuk komponen
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  if (loading) return <LoadingScreen />;

  return (
    <ProfileProvider>
      <DateProvider>
        <SkinProvider>
          <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
            {/* Top Navigation */}
            <Navbar />
            <div className="flex">
              {/* Main Content */}
              <main className="flex-1 p-2 md:p-6">
                <div className="max-w-7xl mx-auto mt-0 md:mt-8">{children}</div>
              </main>
            </div>
          </div>
        </SkinProvider>
      </DateProvider>
    </ProfileProvider>
  );
}
