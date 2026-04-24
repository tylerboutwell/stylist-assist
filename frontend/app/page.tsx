import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* use navbar from components */}
      <Navbar/>

      {/* HERO SECTION */}
      <section className="flex flex-1 flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
          Your AI Assistant for Hair Stylists
        </h2>
        <p className="mt-6 text-neutral-400 max-w-xl text-lg">
          Create content, manage clients, and grow your brand — all in one place.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-neutral-200 transition">
            Get Started
          </button>
          <button className="border border-neutral-700 px-6 py-3 rounded-xl hover:bg-neutral-900 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 py-16 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-neutral-900 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold">AI Content</h3>
            <p className="text-neutral-400 mt-2 text-sm">
              Generate Instagram captions, hashtags, and post ideas instantly.
            </p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold">Client Tracking</h3>
            <p className="text-neutral-400 mt-2 text-sm">
              Keep notes, preferences, and history for every client.
            </p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold">Business Growth</h3>
            <p className="text-neutral-400 mt-2 text-sm">
              Tools to help stylists grow their brand and income.
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