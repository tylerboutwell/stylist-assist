"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Scissors,
  Save,
} from "lucide-react";

export default function NewBookingPage() {
  const [formData, setFormData] = useState({
    client: "",
    service: "",
    date: "",
    time: "",
    status: "Pending",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with API call later
    console.log("Booking created:", formData);

    alert("Booking created successfully!");
  };

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
            Add a new booking to your schedule.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6"
        >
          {/* Client */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Client Name
            </label>
            <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-2xl px-4 py-3">
              <User size={18} className="text-neutral-500" />
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                placeholder="Enter client name"
                className="w-full bg-transparent outline-none text-white placeholder:text-neutral-600"
                required
              />
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium mb-2">Service</label>
            <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-2xl px-4 py-3">
              <Scissors size={18} className="text-neutral-500" />
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="Enter service type"
                className="w-full bg-transparent outline-none text-white placeholder:text-neutral-600"
                required
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-2xl px-4 py-3">
                <Calendar size={18} className="text-neutral-500" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-2xl px-4 py-3">
                <Clock size={18} className="text-neutral-500" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-4 py-3 outline-none text-white"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Add appointment details..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-4 py-3 outline-none text-white placeholder:text-neutral-600"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-2xl font-semibold hover:bg-neutral-200 transition-colors"
          >
            <Save size={18} />
            Save Appointment
          </button>
        </form>
      </div>
    </main>
  );
}