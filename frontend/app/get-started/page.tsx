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

            <h3 className="text-lg font-semibold">
              Create Your Account
            </h3>

            <p className="text-neutral-400 text-sm mt-2">
              Set up your stylist workspace and unlock booking management,
              AI content tools, and client records.
            </p>

            <Link
                href="/signup"
                className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300"
            >
              Create Account →
            </Link>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="text-blue-400 font-semibold mb-2">Step 2</div>
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
            <div className="text-blue-400 font-semibold mb-2">Step 3</div>
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

        </div>


        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold">
            Ready to start managing your business?
          </h2>

          <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
            Create bookings, manage clients, and grow your brand from one dashboard.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Link
                href="/signup"
                className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-neutral-200 transition"
            >
              Create Account
            </Link>

            <Link
                href="/"
                className="border border-neutral-700 px-6 py-3 rounded-xl hover:border-neutral-500 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}