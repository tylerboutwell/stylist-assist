"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    const searchParams = useSearchParams();
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
    if (searchParams.get("welcome") === "true") {
      setShowMessage(true);

      // optional: auto-hide
      setTimeout(() => setShowMessage(false), 4000);
    }
    }, [searchParams]);
  return (
      <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
          {/* use navbar from components */}
          <Navbar/>

          {/* If user just registered display welcome message */}
          {showMessage && (
              <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-emerald-500/90 text-black px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md border border-emerald-300/30 flex items-center gap-2 animate-fade-in cursor-pointer">
                  <span className="text-lg">🎉</span>
                  <span className="font-medium">Account created successfully</span>
                </div>
              </div>
            )}

          {/* HERO SECTION */}
          <section className="flex flex-1 flex-col justify-center items-center text-center px-6">
              <h2 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
                  Your AI Assistant for Hair Stylists
              </h2>
              <p className="mt-6 text-neutral-400 max-w-xl text-lg">
                  Create content, manage clients, and grow your brand — all in one place.
              </p>

              <div className="mt-8 mb-4 flex gap-4">
                    <Link href="get-started/">
                      <button className="cursor-pointer bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-neutral-200 transition">
                          Get Started
                      </button>
                    </Link>
                    <Link href="learn-more">
                      <button className="cursor-pointer border border-neutral-700 px-6 py-3 rounded-xl hover:bg-neutral-900 transition">
                          Learn More
                      </button>
                    </Link>
              </div>
          </section>

          {/* FEATURES */}
          <section className="px-8 py-16 border-t border-neutral-800">
              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                  <Link href="/createpost" className="group">
                      <div className="bg-neutral-900 p-6 rounded-2xl border border-transparent group-hover:border-neutral-700 transition-all duration-200 h-full">
                          <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">Smart Captions</h3>
                          <p className="text-neutral-400 mt-2 text-sm">
                              Turn your work into viral content with AI-generated captions and trending hashtags.
                          </p>
                      </div>
                  </Link>

                  <Link href='/booking' className='group'>
                      <div className="bg-neutral-900 p-6 rounded-2xl border border-transparent group-hover:border-neutral-700 transition-all duration-200 h-full">
                          <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">Booking & Records</h3>
                          <p className="text-neutral-400 mt-2 text-sm">
                              Seamlessly book clients and save their custom color formulas in one secure place.
                          </p>
                      </div>
                  </Link>

                  <div className="bg-neutral-900 p-6 rounded-2xl border border-transparent opacity-80 cursor-not-allowed">
                      <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">Digital Consults</h3>
                          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase">Soon</span>
                      </div>
                      <p className="text-neutral-400 mt-2 text-sm">
                          Send custom intake forms to new clients to save time and prevent surprises.
                      </p>
                  </div>

              </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center text-neutral-500 text-sm py-6 border-t border-neutral-800">
              © {new Date().getFullYear()} StylistAssist
          </footer>
      </main>
  );
}