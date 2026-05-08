'use client';
import React, {useEffect, useState} from "react";
import {apiFetch} from "@/lib/api";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import {ArrowLeft, Calendar, Clock, DollarSign, FileText, Scissors, User} from "lucide-react";
import Navbar from "@/components/Navbar";
import BookingForm from "@/app/booking/new/components/BookingForm";

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

export default function BookingDetail() {
  const { bookingId } = useParams() as { bookingId: string };
  const router = useRouter();

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
      <Link
        href={`/booking/${booking.id}`}
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={18} />
        Back to Booking
      </Link>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
          <p className="text-sm text-neutral-400 mt-1">
            View and manage booking details
          </p>
        </div>
        </div>

      <BookingForm
      initialData={booking}
      submitText="Save Changes"
      onSubmit={async (payload) => {
        const res = await apiFetch(
          `http://localhost:8000/booking/bookings/${bookingId}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) {
          throw new Error("Failed");
        }

        router.push(`/booking/${bookingId}`);
      }}
      />
    </div>
</main>
);
}