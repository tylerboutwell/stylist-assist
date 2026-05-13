'use client';
import {useEffect, useState} from "react";
import {API_URL, apiFetch} from "@/lib/api";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import {Calendar, Clock, DollarSign, FileText, Scissors, User} from "lucide-react";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";

type Booking = {
  id: number;
  client_name: string;
  service_name: string;
  start_time: string;
  end_time: string;
  status: string;
  booked_price: string;
  notes?: string;
};

async function getBooking(id: string) {
  const res = await fetch(`${API_URL}/booking/bookings/${id}/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch booking");
  }

  return res.json();
}

export default function BookingDetail() {
  const { bookingId } = useParams() as { bookingId: string };

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await apiFetch(
          `${API_URL}/booking/bookings/${bookingId}/`
        );
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        setError("Failed to load booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <LoadingSpinner/>
  }

  if (error || !booking) {
    return <div className="p-6 text-red-500">{error || "Not found"}</div>;
  }

  const date = new Date(booking.start_time);
  const endDate = new Date(booking.end_time)
  const displayDate = date.toLocaleDateString();
  const startDisplayTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endDisplayTime = endDate.toLocaleTimeString([], {
    hour:"2-digit",
    minute: "2-digit",
  })

    return (
  <main className="min-h-screen bg-neutral-950 text-white">
    <Navbar/>
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
          <p className="text-sm text-neutral-400 mt-1">
            View and manage booking details
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/booking/${bookingId}/edit`}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-medium transition shadow"
          >
            Edit
          </Link>

          <button
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-medium transition shadow cursor-pointer"
            onClick={async () => {
              if (!confirm("Delete this booking?")) return;

              const res = await apiFetch(`${API_URL}/booking/bookings/${bookingId}/`, {
                method: "DELETE",
              });

              console.log(res.status);

              if (res.ok) {
                window.location.href = "/booking";
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl p-8 space-y-6 shadow-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.6)]">

        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-neutral-400"/>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">
                Client
              </p>
              <p className="text-lg font-semibold">{booking.client_name}</p>
            </div>
          </div>

          {/* Status Badge */}
          <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  booking.status === "CONFIRMED"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : booking.status === "CANCELLED"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}
          >
            {booking.status}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800"/>

        {/* Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="flex items-start gap-3">
            <Scissors className="w-5 h-5 text-neutral-400 mt-1"/>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">
                Service
              </p>
              <p className="text-base font-medium">{booking.service_name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-neutral-400 mt-1"/>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">
                Date
              </p>
              <p className="text-base font-medium">{displayDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-neutral-400 mt-1"/>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">
                Time
              </p>
              <p className="text-base font-medium">{startDisplayTime} - {endDisplayTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-neutral-400 mt-1"/>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">
                Booked price
              </p>
              <p className="text-base font-medium">{booking.booked_price}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
            <>
              <div className="border-t border-neutral-800"/>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-neutral-400 mt-1"/>
                <div>
                  <p className="text-xs text-neutral-400 uppercase tracking-wider">
                    Notes
                  </p>
                  <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                    {booking.notes}
                  </p>
                </div>
              </div>
            </>
        )}
      </div>

      {/* Back Link */}
      <Link
          href="/booking"
          className="inline-block mt-6 text-sm text-neutral-400 hover:text-white transition"
      >
        ← Back to bookings
      </Link>
    </div>
</main>
);
}