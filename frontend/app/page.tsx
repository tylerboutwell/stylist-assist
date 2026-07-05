import Navbar from "@/components/Navbar";
import Link from "next/link";
import WelcomeMessage from "@/components/WelcomeMessage";
import { Suspense } from "react";

export default function Home() {
  return (
      <main className="min-h-screen flex flex-col">
        <Navbar/>

        <Suspense fallback={null}>
          <WelcomeMessage/>
        </Suspense>

        {/* HERO */}
        <section className="flex flex-1 flex-col items-center justify-center text-center px-6 py-20">
    <span className="mb-4 rounded-full bg-rose-100 text-rose-600 px-4 py-1 text-sm font-medium">
      Built for Hair Stylists
    </span>

          <h1 className="max-w-4xl text-5xl md:text-6xl font-bold tracking-tight">
            Stop Spending 30 Minutes
            <br/>
            Writing Instagram Captions.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-neutral-600">
            Upload a photo or describe your client's transformation and let AI
            generate engaging captions, hashtags, and hooks in seconds.
          </p>

          <div className="mt-10">
            <Link href="/createpost">
              <button
                  className="rounded-xl bg-rose-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-rose-600 shadow-lg shadow-rose-500/20">
                Generate Your First Caption →
              </button>
            </Link>
          </div>
        </section>

        {/* EXAMPLE */}
        <section className="border-t border-neutral-200 py-20 px-6">
          <div className="mx-auto max-w-5xl">

            <h2 className="text-3xl font-bold text-center">
              See what StylistAssist creates
            </h2>

            <div className="mt-12 grid md:grid-cols-2 gap-8">

              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <p className="font-semibold mb-3">
                  📷 Input
                </p>

                <div className="rounded-xl bg-neutral-100 p-4 text-neutral-600">
                  Fresh balayage with soft blonde highlights.
                  Client wanted a natural, low-maintenance look.
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <p className="font-semibold mb-3">
                  ✨ AI Caption
                </p>

                <p className="text-neutral-700 leading-7">
                  Obsessed with this gorgeous dimensional blonde ✨
                  We kept everything soft, bright, and easy to maintain.
                  Perfect for anyone wanting a lived-in blonde that grows out beautifully.
                  💛
                  <br/><br/>
                  #balayage #hairstylist #blondehair #hairtransformation
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* SIMPLE CTA */}
        <section className="border-t border-neutral-200 py-20 text-center px-6">
          <h2 className="text-3xl font-bold">
            Ready to create your next post?
          </h2>

          <p className="mt-4 text-neutral-600">
            Join stylists creating better content in seconds.
          </p>

          <Link href="/createpost">
            <button
                className="mt-8 rounded-xl bg-rose-500 px-8 py-4 text-white font-semibold hover:bg-rose-600 transition">
              Get Started Free
            </button>
          </Link>
        </section>

        <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} StylistAssist
        </footer>
      </main>
  );
}