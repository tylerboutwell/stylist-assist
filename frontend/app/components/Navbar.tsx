"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-neutral-800 bg-neutral-950 text-white">
      <Link href={"/"} className="text-xl font-semibold tracking-tight">
        StylistAssist
      </Link>
      <div className="space-x-6 text-sm text-neutral-300">
        <Link href="#" className="hover:text-white transition">AI Content</Link>
        <Link href="/login" className="hover:text-white transition">Login</Link>
      </div>
    </nav>
  );
}