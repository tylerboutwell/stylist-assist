"use client";

import Link from "next/link";

export default function Navbar() {
    const isLoggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem("accessToken");

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-neutral-800 bg-neutral-950 text-white">
      <Link href={"/"} className="text-xl font-semibold tracking-tight">
        StylistAssist
      </Link>
      <div className="space-x-6 text-sm text-neutral-300">
        <Link href="/createpost" className="hover:text-white transition">AI Content</Link>
        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.reload(); // quick refresh
            }}
            className="hover:text-white transition cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="hover:text-white transition">Login</Link>
        )}
      </div>
    </nav>
  );
}