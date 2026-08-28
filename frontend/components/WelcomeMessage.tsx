"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function WelcomeMessage() {
  const searchParams = useSearchParams();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get("welcome") === "true") {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!showMessage) return null;

  return (
    <div className="fixed left-1/2 top-20 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 sm:top-24 sm:w-auto">
      <div className="flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-white px-5 py-3 shadow-lg shadow-neutral-900/10">
        <span className="text-lg">✨</span>
        <span className="text-sm font-medium text-neutral-800">
          Welcome to StylistAssist! Create your first AI-powered post below.
        </span>
      </div>
    </div>
  );
}