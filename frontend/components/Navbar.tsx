"use client";

import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import AuthContext from "@/context/AuthContext";

export default function Navbar() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-neutral-800 bg-neutral-950 text-white mb-8">
      <Link href={"/"} className="text-xl font-semibold tracking-tight">
        StylistAssist
      </Link>
      <div className="space-x-6 text-sm text-neutral-300">
        {user ? (
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