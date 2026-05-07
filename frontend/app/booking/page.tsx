'use client';
import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  Plus,
  ChevronRight,
  DollarSign,
} from 'lucide-react';
import {apiFetch} from "@/lib/api";
import {useRouter} from "next/navigation";
import AuthContext from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

interface Booking {
  id: number;
  client_name: string;
  service_name: string;
  start_time: string;
  end_time: string;
  status: string;
  booked_price: string;
}

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {user, loading: authLoad} = useContext(AuthContext)

  useEffect(() => {
    if (!user && !authLoad) {
      router.push('/login')}
  }, [user, authLoad, router])

  useEffect(() => {
    if (!user || authLoad) return;
    const getBookings = async () => {
      const res = await apiFetch('http://localhost:8000/booking/bookings/');
      const data = await res.json();
      setBookings(data);
      setLoading(false);
    };
    getBookings();
  }, [user, authLoad]);

  if (authLoad) return <p>Loading...</p>;

  if (!user) return null;

  if (loading) return <p>Loading bookings...</p>;
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar/>
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

          {bookings.length > 0 ? (
          bookings.map((booking:Booking) => {
            const startDateObj = new Date(booking.start_time);
            const endDateObj = new Date(booking.end_time);
            const displayDate = startDateObj.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            });
            const startDisplayTime = startDateObj.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });
            const endDisplayTime = endDateObj.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })

            return (
              <Link href={`booking/${booking.id}`} key={booking.id} className='block group relative bg-neutral-900 border border-neutral-800 p-5 rounded-2xl hover:border-neutral-700 transition-all cursor-pointer'>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-neutral-800 p-3 rounded-xl text-blue-400">
                        <User size={20}/>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg">{booking.client_name}</h3>
                        <p className="text-neutral-400 text-sm mb-2">{booking.service_name}</p>

                        <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14}/>
                            {displayDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14}/>
                            {startDisplayTime} - {endDisplayTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                          className={`hidden sm:block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              booking.status === 'CONFIRMED'
                                  ? 'bg-emerald-500/10 text-emerald-500'
                                  : booking.status === 'CANCELLED'
                                      ? 'bg-red-500/10 text-red-500'
                                      : 'bg-amber-500/10 text-amber-500'
                          }`}>
                        {booking.status}
                      </span>
                      <span className="flex items-center text-neutral-400 group-hover:text-white transition-colors">
                        <DollarSign size={14}/>
                        {booking.booked_price}
                      </span>
                      <ChevronRight size={20} className="text-neutral-600 group-hover:text-white transition-colors"/>
                    </div>
                  </div>
              </Link>
            )
          })
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