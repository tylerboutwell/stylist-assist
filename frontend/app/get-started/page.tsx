'use client';
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function GetStartedPage() {
  return (
      <main className="min-h-screen flex flex-col">
        <Navbar/>

        <section className="flex flex-1 items-center justify-center px-6">
          <div className="max-w-xl w-full text-center">

          <span className="inline-flex rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-600">
            Welcome 👋
          </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              Start Creating Better Social Media Posts
            </h1>

            <p className="mt-6 text-lg text-neutral-600">
              Create engaging captions, hashtags, and content ideas in
              seconds. Built specifically for hairstylists and beauty
              professionals.
            </p>

            <div className="mt-10 flex flex-col gap-4">

              <Link href="/signup">
                <button
                    className="w-full rounded-xl bg-rose-500 py-4 text-lg font-semibold text-white hover:bg-rose-600 transition">
                  Create Free Account
                </button>
              </Link>

              <Link href="/login">
                <button
                    className="w-full rounded-xl border border-neutral-300 py-4 font-medium hover:bg-neutral-100 transition">
                  I Already Have an Account
                </button>
              </Link>

            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 text-left">

              <div className="rounded-xl border border-neutral-200 p-4 bg-white">
                ✨ AI Captions
              </div>

              <div className="rounded-xl border border-neutral-200 p-4 bg-white">
                📈 Viral Hooks
              </div>

              <div className="rounded-xl border border-neutral-200 p-4 bg-white">
                🏷 Trending Hashtags
              </div>

              <div className="rounded-xl border border-neutral-200 p-4 bg-white">
                💡 Unlimited Ideas
              </div>

            </div>

          </div>
        </section>
      </main>
  );
}