"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        <h1>SKINDEX</h1>
        <Link href={"/signin"}>Sign In</Link>
      </div>
    </main>
  );
}
