"use client";

import React, { useState } from "react";
import { Calendar, Clock, Save, StickyNote } from "lucide-react";
import ClientSelector from "./ClientSelector";
import ServiceSelector from "./ServiceSelector";

export default function BookingForm() {
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    appointment_date: "",
    start_time: "",
    end_time: "",
    status: "PENDING",
    booked_price: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClient || !selectedService) {
      alert("Please select a client and service.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        client: selectedClient,
        service: selectedService,
        ...formData,
      };

      const res = await fetch("/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create booking");
      }

      alert("Booking created successfully!");

      setFormData({
        appointment_date: "",
        start_time: "",
        end_time: "",
        status: "PENDING",
        booked_price: "",
        notes: "",
      });

      setSelectedClient(null);
      setSelectedService(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6"
    >
      <ClientSelector
        selectedClient={selectedClient}
        onSelect={setSelectedClient}
      />

      <ServiceSelector
        selectedService={selectedService}
        onSelect={setSelectedService}
      />

      {/* Date + Time */}
  <div className="grid md:grid-cols-3 gap-4">
    {/* Appointment Date */}
    <div className="md:col-span-1">
      <label className="block text-sm font-medium mb-2">
        Appointment Date
      </label>
      <div className="flex items-center gap-3 bg-black border border-neutral-800 rounded-2xl px-4 py-3">
        <Calendar size={18} className="text-neutral-500" />
        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          className="w-full bg-transparent outline-none text-white"
          required
        />
      </div>
    </div>

    {/* Start Time */}
    <div className="md:col-span-1">
      <label className="block text-sm font-medium mb-2">
        Start Time
      </label>
      <div className="flex items-center gap-3 bg-black border border-neutral-800 rounded-2xl px-4 py-3">
        <Clock size={18} className="text-neutral-500" />
        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className="w-full bg-transparent outline-none text-white"
          required
        />
      </div>
    </div>

    {/* End Time */}
    <div className="md:col-span-1">
      <label className="block text-sm font-medium mb-2">
        End Time
      </label>
      <div className="flex items-center gap-3 bg-black border border-neutral-800 rounded-2xl px-4 py-3">
        <Clock size={18} className="text-neutral-500" />
        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          className="w-full bg-transparent outline-none text-white"
          required
        />
      </div>
    </div>
  </div>

  {/* Status */
  }
  <div>
    <label className="block text-sm font-medium mb-2">Status</label>
    <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full bg-black border border-neutral-800 rounded-2xl px-4 py-3 outline-none text-white"
    >
      <option value="PENDING">Pending</option>
      <option value="CONFIRMED">Confirmed</option>
      <option value="COMPLETED">Completed</option>
      <option value="CANCELLED">Cancelled</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">Price</label>
    <input
        name="booked_price"
        value={formData.booked_price}
        onChange={handleChange}
        placeholder="Booked price total"
        className="w-full bg-black border border-neutral-800 text-white
             outline-none placeholder:text-neutral-600 resize-none px-4 py-3 rounded-2xl"
    />
  </div>

  {/* Notes */
  }
  <div>
    <label className="block text-sm font-medium mb-2">Notes</label>
    <div className="flex gap-3 bg-black border border-neutral-800 rounded-2xl px-4 py-3">
          <StickyNote size={18} className="text-neutral-500 mt-1" />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Add any appointment notes..."
            className="w-full bg-transparent outline-none text-white placeholder:text-neutral-600 resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-2xl font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50"
      >
        <Save size={18} />
        {loading ? "Saving..." : "Save Booking"}
      </button>
    </form>
  );
}