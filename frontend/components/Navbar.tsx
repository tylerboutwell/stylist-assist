"use client";

import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Navbar() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-400 text-sm font-bold text-white shadow-sm">
            S
          </span>
          StylistAssist
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {user ? (
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.reload();
              }}
              className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-900/5 hover:text-neutral-900"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-900/5 hover:text-neutral-900"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.97] sm:px-5"
              >
                Sign up free
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}