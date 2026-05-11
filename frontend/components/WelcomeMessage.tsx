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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-emerald-500/90 text-black px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md border border-emerald-300/30 flex items-center gap-2">
        <span className="text-lg">🎉</span>
        <span className="font-medium">Account created successfully</span>
      </div>
    </div>
  );
}