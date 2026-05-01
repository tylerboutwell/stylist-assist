"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingForm from "./components/BookingForm";

export default function NewBookingPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Appointments
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">
            New Appointment
          </h1>
          <p className="text-neutral-400 mt-1">
            Create a new booking for a client.
          </p>
        </div>

        {/* Form */}
        <BookingForm />
      </div>
    </main>
  );
}