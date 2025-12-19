// components/Header.tsx
"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  // HAPUS: const [mounted, setMounted] = useState(false);
  // HAPUS: useEffect untuk setMounted;

  const navItems = [
    { label: "Fitur", href: "#features" },
    { label: "Cara Kerja", href: "#how" },
    { label: "Harga", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
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
            <span className="text-xl font-black text-zinc-900 dark:text-zinc-100">
              Skindex
            </span>
          </div>

          {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav> */}

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle - SOLUSI KUNCI */}
            <ToggleTheme />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              )}
            </button>

            {/* CTA Button */}
            <div className="hidden md:block space-x-4">
              <Link
                href="/signin"
                className="w-full py-2 px-5 text-cyan-500 border border-cyan-500 hover:bg-cyan-500 hover:text-white font-medium rounded-lg transition-colors mt-2"
              >
                Masuk
              </Link>
              <Link
                href="/signup"
                className="w-full py-2 px-5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors mt-2"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              {/* {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))} */}
              <Link
                href="/signin"
                className="w-full py-2 px-5 text-cyan-500 border border-cyan-500 hover:bg-cyan-500 hover:text-white font-medium rounded-lg transition-colors mt-2"
              >
                Masuk
              </Link>
              <Link
                href="/signup"
                className="w-full py-2 px-5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors mt-2"
              >
                Daftar
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
