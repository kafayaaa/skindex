"use client";

import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { User } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import Image from "next/image";

export default function Navbar() {
  const { profile } = useProfile();
  return (
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

            <Link href="/dashboard" className="flex items-center">
              {/* <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                    </div> */}
              <Image
                width={75}
                height={75}
                src="/logo.webp"
                alt="Logo"
                className="w-15 h-15"
              />
              <span className="text-xl font-bold">Skindex</span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button> */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-5">
                <p className="text-sm font-medium">{profile.username}</p>
                {/* <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Pengguna Premium
                    </p> */}
                {/* <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                </button> */}
              </div>
              <Link href="/dashboard/profile">
                {profile.photo ? (
                  <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                    <Image
                      width={32}
                      height={32}
                      src={profile.photo}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                    <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                )}
              </Link>
            </div>
            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
