'use client';
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {useContext, useEffect} from "react";
import AuthContext from "@/context/AuthContext";
import {useRouter} from "next/navigation";


export default function Home() {
  const {user, loading: authLoad} = useContext(AuthContext)
    const router = useRouter();

  useEffect(() => {
    if (user && !authLoad) {
      router.push('/createpost')}
  }, [user, authLoad, router])

  if (user) {
    return null
  }

  return (
      <main className="min-h-screen flex flex-col">
        <Navbar/>

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
            <Link href="/signup">
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
                  My client wanted to brighten her hair without making it high maintenance.
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <p className="font-semibold mb-3">
                  ✨ AI Caption
                </p>

                <p className="rounded-xl bg-neutral-100 p-4 text-neutral-600">
                  A subtle refresh for summer ☀️ We brightened things up with soft balayage while keeping the grow-out natural and easy to maintain. Love how seamlessly everything blended together. Thanks for trusting me with your hair! 🤍
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

          <Link href="/signup">
            <button
                className="mt-8 rounded-xl bg-rose-500 px-8 py-4 text-white font-semibold hover:bg-rose-600 transition shadow-sm">
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