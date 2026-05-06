'use client';
import {useEffect, useState} from "react";
import {apiFetch} from "@/lib/api";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";

type Booking = {
  id: number;
  client_name: string;
  service_name: string;
  start_time: string;
  status: string;
  notes?: string;
};

async function getBooking(id: string) {
  const res = await fetch(`http://localhost:8000/booking/bookings/${id}/`, {
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
          `http://localhost:8000/booking/bookings/${bookingId}/`
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
    return <div className="p-6">Loading...</div>;
  }

  if (error || !booking) {
    return <div className="p-6 text-red-500">{error || "Not found"}</div>;
  }

  const date = new Date(booking.start_time);
  const displayDate = date.toLocaleDateString();
  const displayTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

    return (
        <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Booking Details</h1>

        <div className="flex gap-3">
          <Link
            href={`/booking/${bookingId}/edit`}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-medium"
          >
            Edit
          </Link>

          <button
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-medium"
            onClick={async () => {
              if (!confirm("Delete this booking?")) return;

              await apiFetch(`/booking/bookings/${bookingId}/`, {
                method: "DELETE",
              });

              window.location.href = "/booking";
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
        <div>
          <p className="text-sm text-neutral-400">Client</p>
          <p className="text-lg font-semibold">{booking.client_name}</p>
        </div>

        <div>
          <p className="text-sm text-neutral-400">Service</p>
          <p className="text-lg font-semibold">{booking.service_name}</p>
        </div>

        <div>
          <p className="text-sm text-neutral-400">Date</p>
          <p className="text-lg">{displayDate}</p>
        </div>

        <div>
          <p className="text-sm text-neutral-400">Time</p>
          <p className="text-lg">{displayTime}</p>
        </div>

        <div>
          <p className="text-sm text-neutral-400 mb-1">Status</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              booking.status === "CONFIRMED"
                ? "bg-emerald-500/10 text-emerald-500"
                : booking.status === "CANCELLED"
                ? "bg-red-500/10 text-red-500"
                : "bg-amber-500/10 text-amber-500"
            }`}
          >
            {booking.status}
          </span>
        </div>

        {booking.notes && (
          <div>
            <p className="text-sm text-neutral-400">Notes</p>
            <p className="text-neutral-300">{booking.notes}</p>
          </div>
        )}
      </div>

      <Link
        href="/booking"
        className="inline-block mt-6 text-sm text-neutral-400 hover:text-white"
      >
        ← Back to bookings
      </Link>
    </div>
    );
}