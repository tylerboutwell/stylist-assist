'use client';
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Wand2, Clock, Image as ImageIcon } from "lucide-react";

export default function Home() {
  const { user, loading: authLoad } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user && !authLoad) {
      router.push('/createpost');
    }
  }, [user, authLoad, router]);

  if (user) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy column */}
          <div className="animate-fade-up text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-rose-600 sm:text-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Built for hair stylists
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Stop spending 30 minutes
              <br className="hidden sm:block" />{" "}
              writing{" "}
              <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
                Instagram captions
              </span>
              .
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg lg:mx-0">
              Upload a photo or describe your client&apos;s transformation and let AI
              generate engaging captions, hashtags, and hooks in seconds.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/signup" className="w-full sm:w-auto">
                <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-rose-500/25 transition hover:bg-rose-600 hover:shadow-rose-500/35 active:scale-[0.98] sm:w-auto">
                  Generate your first caption
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </Link>
              <Link
                href="#example"
                className="text-sm font-medium text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-900"
              >
                See an example first
              </Link>
            </div>

            <p className="mt-6 text-xs text-neutral-500">
              No credit card required · Free to start
            </p>
          </div>

          {/* Visual column — desktop/tablet only, hidden on mobile to keep the phone view lean */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-full max-w-sm rotate-2 rounded-3xl border border-neutral-200 bg-white p-5 shadow-2xl shadow-neutral-900/10 transition duration-500 hover:rotate-0">
              <div className="flex items-center gap-2 border-b border-neutral-100 pb-4">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-rose-400 to-amber-300" />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">yourstudio.stylist</p>
                  <p className="text-xs text-neutral-400">Just now</p>
                </div>
              </div>

              <div className="mt-4 aspect-square w-full rounded-xl bg-gradient-to-br from-rose-100 via-amber-50 to-rose-50" />

              <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                A subtle refresh for summer ☀️ We brightened things up with soft
                balayage while keeping the grow-out natural and low-maintenance.
              </p>
              <p className="mt-2 text-sm font-medium text-rose-500">
                #balayage #hairstylist #blondehair
              </p>
            </div>

            <div className="absolute -left-6 top-10 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-xl shadow-neutral-900/10">
              <Wand2 className="h-4 w-4 text-rose-500" />
              <span className="text-xs font-semibold text-neutral-700">Generated in 4s</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-y border-neutral-200 bg-white/60 px-5 py-8 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <Clock className="h-5 w-5 shrink-0 text-rose-500" />
            <span className="text-sm font-medium text-neutral-700">Captions in seconds, not minutes</span>
          </div>
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <ImageIcon className="h-5 w-5 shrink-0 text-rose-500" />
            <span className="text-sm font-medium text-neutral-700">Works from a photo or a quick note</span>
          </div>
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <Sparkles className="h-5 w-5 shrink-0 text-rose-500" />
            <span className="text-sm font-medium text-neutral-700">Hashtags tuned for stylists</span>
          </div>
        </div>
      </section>

      {/* EXAMPLE */}
      <section id="example" className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              See what StylistAssist creates
            </h2>
            <p className="mt-3 text-neutral-600">
              Describe the transformation. Get a ready-to-post caption.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-xs">
                  1
                </span>
                Your input
              </p>
              <div className="rounded-xl bg-neutral-50 p-4 text-neutral-600">
                My client wanted to brighten her hair without making it high maintenance.
              </div>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 shadow-sm">
              <p className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-xs text-white">
                  ✨
                </span>
                AI-generated caption
              </p>
              <p className="rounded-xl bg-white p-4 leading-relaxed text-neutral-700">
                A subtle refresh for summer ☀️ We brightened things up with soft balayage while
                keeping the grow-out natural and easy to maintain. Love how seamlessly everything
                blended together. Thanks for trusting me with your hair! 🤍
                <br />
                <br />
                <span className="font-medium text-rose-500">
                  #balayage #hairstylist #blondehair #hairtransformation
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE CTA */}
      <section className="border-t border-neutral-200 px-5 py-16 text-center sm:px-8 sm:py-20">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Ready to create your next post?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-neutral-600">
          Join stylists creating better content in seconds.
        </p>
        <Link href="/signup">
          <button className="mt-8 rounded-xl bg-rose-500 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-rose-600 active:scale-[0.98]">
            Get started free
          </button>
        </Link>
      </section>

      <footer className="border-t border-neutral-200 px-5 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} StylistAssist
      </footer>
    </main>
  );
}