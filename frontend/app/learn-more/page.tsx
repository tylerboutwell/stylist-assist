import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function LearnMorePage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
            <Navbar />

            {/* HERO */}
            <section className="px-6 pt-28 pb-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="text-sm uppercase tracking-[0.2em] text-blue-400">
                        Built for modern stylists
                    </span>

                    <h1 className="mt-4 text-5xl md:text-7xl font-bold leading-tight">
                        Run your salon business smarter with AI
                    </h1>

                    <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">
                        StylistAssist helps hairstylists create content, manage
                        bookings, organize client records, and save hours every week.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/get-started">
                            <button className="bg-white text-black px-7 py-3 rounded-xl font-medium hover:bg-neutral-200 transition">
                                Get Started
                            </button>
                        </Link>

                        <Link href="/booking">
                            <button className="border border-neutral-700 px-7 py-3 rounded-xl hover:bg-neutral-900 transition">
                                View Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="px-6 py-20 border-t border-neutral-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Everything you need in one place
                        </h2>

                        <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
                            Stop juggling multiple apps. Manage your business,
                            marketing, and clients from one clean dashboard.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl">
                                ✨
                            </div>

                            <h3 className="mt-6 text-xl font-semibold">
                                AI Content Creation
                            </h3>

                            <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                                Generate captions, hashtags, and post ideas tailored
                                to your work so you can stay consistent online without
                                spending hours writing content.
                            </p>
                        </div>

                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl">
                                📅
                            </div>

                            <h3 className="mt-6 text-xl font-semibold">
                                Booking Management
                            </h3>

                            <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                                Track appointments, organize schedules, and manage
                                client information with a streamlined booking system
                                designed specifically for stylists.
                            </p>
                        </div>

                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 text-xl">
                                💇
                            </div>

                            <h3 className="mt-6 text-xl font-semibold">
                                Client Records
                            </h3>

                            <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                                Save formulas, appointment history, notes, and client
                                preferences so every appointment feels personalized.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="px-6 py-20 border-t border-neutral-800">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            How it works
                        </h2>

                        <p className="text-neutral-400 mt-4">
                            Get started in minutes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="relative bg-neutral-900 rounded-3xl border border-neutral-800 p-8">
                            <span className="absolute top-5 right-5 text-neutral-700 text-5xl font-bold">
                                1
                            </span>

                            <h3 className="text-xl font-semibold">
                                Create your account
                            </h3>

                            <p className="mt-3 text-sm text-neutral-400">
                                Set up your stylist profile and access your dashboard.
                            </p>
                        </div>

                        <div className="relative bg-neutral-900 rounded-3xl border border-neutral-800 p-8">
                            <span className="absolute top-5 right-5 text-neutral-700 text-5xl font-bold">
                                2
                            </span>

                            <h3 className="text-xl font-semibold">
                                Add clients & services
                            </h3>

                            <p className="mt-3 text-sm text-neutral-400">
                                Start organizing appointments, formulas, and notes.
                            </p>
                        </div>

                        <div className="relative bg-neutral-900 rounded-3xl border border-neutral-800 p-8">
                            <span className="absolute top-5 right-5 text-neutral-700 text-5xl font-bold">
                                3
                            </span>

                            <h3 className="text-xl font-semibold">
                                Grow your brand
                            </h3>

                            <p className="mt-3 text-sm text-neutral-400">
                                Use AI-powered tools to create content and attract more
                                clients online.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-24 border-t border-neutral-800">
                <div className="max-w-4xl mx-auto text-center bg-neutral-900 border border-neutral-800 rounded-[2rem] p-12">
                    <h2 className="text-4xl font-bold">
                        Spend less time managing.
                        <br />
                        Spend more time styling.
                    </h2>

                    <p className="mt-6 text-neutral-400 max-w-2xl mx-auto">
                        Join stylists using AI to simplify their workflow and grow
                        their business faster.
                    </p>

                    <div className="mt-10">
                        <Link href="/get-started">
                            <button className="bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-neutral-200 transition">
                                Start Free
                            </button>
                        </Link>
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