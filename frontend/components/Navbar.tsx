"use client";

import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import AuthContext from "@/context/AuthContext";

export default function Navbar() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-neutral-200 mb-8">
      <Link href={"/"} className="text-xl font-semibold tracking-tight">
        StylistAssist
      </Link>
      <div className="space-x-6 text-sm">
        {user ? (
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.reload(); // quick refresh
            }}
            className="hover:text-rose-400 transition cursor-pointer"
          >
            Logout
          </button>
        ) : (
            <div className="flex gap-3">
                <Link href="/signup" className="hover:text-rose-400 transition">Sign up </Link>
                <Link href="/login" className="hover:text-rose-400 transition">Login</Link>
            </div>
        )}
      </div>
    </nav>
  );
}