'use client';
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Get Started with StylistAssist
          </h1>
          <p className="text-neutral-400 mt-4 text-lg max-w-2xl mx-auto">
            Set up your workspace in minutes. Start managing clients, bookings,
            and content like a pro.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="text-blue-400 font-semibold mb-2">Step 1</div>
            <h3 className="text-lg font-semibold">Create Your First Booking</h3>
            <p className="text-neutral-400 text-sm mt-2">
              Schedule appointments and automatically track service details.
            </p>
            <Link
                href="/booking/new"
                className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300"
            >
              Create Booking →
            </Link>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="text-blue-400 font-semibold mb-2">Step 2</div>
            <h3 className="text-lg font-semibold">Generate Content</h3>
            <p className="text-neutral-400 text-sm mt-2">
              Turn your work into captions and posts to grow your brand.
            </p>
            <Link
                href="/createpost"
                className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300"
            >
              Create Post →
            </Link>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="text-blue-400 font-semibold mb-2">Step 3</div>

            <h3 className="text-lg font-semibold">
              View Your Dashboard
            </h3>

            <p className="text-neutral-400 text-sm mt-2">
              Track your bookings, clients, and activity all in one place. See your
              business come together automatically.
            </p>

            <div className="flex flex-col gap-2 mt-4">
              <Link
                  href="/booking"
                  className="text-sm text-blue-400 hover:text-blue-300"
              >
                Go to Bookings →
              </Link>

              <Link
                  href="/"
                  className="text-sm text-blue-400 hover:text-blue-300"
              >
                Open Dashboard →
              </Link>
            </div>
          </div>

        </div>


        {/* Optional Demo Section */}
        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold">Want to explore first?</h2>
          <p className="text-neutral-400 mt-2">
            Load sample data to see how everything works without setting anything up.
          </p>

          <button
              className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-neutral-200 transition"
              onClick={() => alert("Hook this up to seed/demo data later")}
          >
            Load Demo Data
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Skip setup and go to dashboard →
          </Link>
        </div>
      </div>
    </main>
  );
}