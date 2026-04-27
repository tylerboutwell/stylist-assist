import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Plus, ChevronRight } from 'lucide-react';

// Mock data - you'll replace this with a fetch to your API later
const UPCOMING_APPOINTMENTS = [
  {
    id: 1,
    client: "Sarah Jenkins",
    service: "Full Balayage & Tone",
    time: "10:00 AM",
    date: "Oct 24",
    status: "Confirmed",
  },
  {
    id: 2,
    client: "Michael Chen",
    service: "Men's Fade & Beard Trim",
    time: "1:30 PM",
    date: "Oct 24",
    status: "Pending",
  },
  {
    id: 3,
    client: "Emma Rodriguez",
    service: "Root Touch-up",
    time: "4:00 PM",
    date: "Oct 25",
    status: "Confirmed",
  },
];

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <p className="text-neutral-400 mt-1">Manage your upcoming schedule and client slots.</p>
          </div>

          <Link href="/booking/new">
            <button className="flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-neutral-200 transition-colors">
              <Plus size={18} />
              New Appointment
            </button>
          </Link>
        </div>

        {/* List Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-4">Upcoming This Week</h2>

          {UPCOMING_APPOINTMENTS.length > 0 ? (
            UPCOMING_APPOINTMENTS.map((apt) => (
              <div
                key={apt.id}
                className="group relative bg-neutral-900 border border-neutral-800 p-5 rounded-2xl hover:border-neutral-700 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-neutral-800 p-3 rounded-xl text-blue-400">
                      <User size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">{apt.client}</h3>
                      <p className="text-neutral-400 text-sm mb-2">{apt.service}</p>

                      <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {apt.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`hidden sm:block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      apt.status === 'Confirmed' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {apt.status}
                    </span>
                    <ChevronRight size={20} className="text-neutral-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-neutral-900/50 rounded-3xl border border-dashed border-neutral-800">
              <p className="text-neutral-500">No appointments scheduled yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}