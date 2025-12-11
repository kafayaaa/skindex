// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skindex - Your Skin Health Companion",
  description:
    "Website analisis kondisi wajah dengan journaling progress harian serta melacak penyebab pemicu breakout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className="scroll-smooth overflow-y-scroll"
      suppressHydrationWarning
    >
      <body
        // className={`${plusJakartaSans.variable} antialiased`}
        // className={inter.className}
        className={plusJakartaSans.className}
      >
        {/* HAPUS div wrapper dengan class font-plus-jakarta-sans */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
