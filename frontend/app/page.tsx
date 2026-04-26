import Navbar from "@/components/Navbar";
import Link from "next/link";

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
          <Link href="/createpost" className="group">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-transparent group-hover:border-neutral-700 transition-all duration-200 h-full">
              <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">Smart Captions</h3>
              <p className="text-neutral-400 mt-2 text-sm">
                Turn your work into viral content with AI-generated captions and trending hashtags.
              </p>
            </div>
          </Link>

          <div className="bg-neutral-900 p-6 rounded-2xl border border-transparent opacity-80 cursor-not-allowed">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Booking & Records</h3>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase">Soon</span>
            </div>
            <p className="text-neutral-400 mt-2 text-sm">
              Seamlessly book clients and save their custom color formulas in one secure place.
            </p>
          </div>

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