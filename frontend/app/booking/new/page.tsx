"use client";

import React, {useContext, useEffect} from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingForm from "./components/BookingForm";
import {useRouter} from "next/navigation";
import AuthContext from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import {apiFetch} from "@/lib/api";

export default function NewBookingPage() {
  const router = useRouter();
  const {user, loading: authLoad} = useContext(AuthContext)

  useEffect(() => {
    if (!user && !authLoad) {
      router.push('/login')}
  }, [user, authLoad, router])

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar/>
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
        <BookingForm
        submitText="Create Booking"
        onSubmit={async (payload) => {
          const res = await apiFetch(
            "http://localhost:8000/booking/bookings/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );

          if (!res.ok) {
            throw new Error("Failed");
          }

          router.push("/booking");
        }}
        />
      </div>
    </main>
  );
}