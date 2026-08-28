"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel — desktop/tablet only. Auth screens convert better with
          fewer distractions, so the marketing Navbar is intentionally not
          used here; this panel carries the branding instead. */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-neutral-900 p-12 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(244,63,94,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(251,191,36,0.25), transparent 45%)",
          }}
        />
        <Link href="/" className="relative z-10 flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-400 text-sm font-bold text-white">
            S
          </span>
          StylistAssist
        </Link>

        <div className="relative z-10 max-w-sm">
          <p className="text-2xl font-semibold leading-snug">
            &ldquo;Cut caption time from 30 minutes to 30 seconds.&rdquo;
          </p>
          <p className="mt-4 text-sm text-white/60">
            Join stylists who spend less time writing and more time behind the chair.
          </p>
        </div>

        <p className="relative z-10 text-xs text-white/40">© {new Date().getFullYear()} StylistAssist</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900 lg:hidden"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-400 text-sm font-bold text-white">
              S
            </span>
            StylistAssist
          </Link>

          <span className="text-xs font-semibold uppercase tracking-wide text-rose-500">{eyebrow}</span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-neutral-600">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-6 text-center text-sm text-neutral-600 lg:text-left">{footer}</div>
        </div>
      </div>
    </main>
  );
}