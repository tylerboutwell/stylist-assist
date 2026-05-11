"use client";

import React, {useEffect, useState} from "react";
import { Calendar, Clock, Save, StickyNote } from "lucide-react";
import ClientSelector from "./ClientSelector";
import ServiceSelector from "./ServiceSelector";
import {API_URL, apiFetch} from "@/lib/api";

type Service = {
  id: number;
  name: string;
  description: string;
  base_price: number;
  duration: number;
};

type Booking = {
  client?: number;
  service?: number;
  start_time: string;
  end_time: string;
  status: string;
  booked_price: string;
  notes?: string;
};

type BookingFormProps = {
  initialData?: Booking;
  onSubmit: (data: any) => Promise<void>;
  submitText?: string;
};

export default function BookingForm({
  initialData,
  onSubmit,
  submitText = "Save Booking",
}: BookingFormProps) {
  const [selectedClient, setSelectedClient] = useState<number | null>(
  initialData?.client || null
);
const [selectedService, setSelectedService] = useState<number | null>(
  initialData?.service || null
);

  const [services, setServices] = useState<Service[]>([]);

  const [formData, setFormData] = useState({
    start_time: initialData?.start_time || "",
    end_time: initialData?.end_time || "",
    status: initialData?.status || "PENDING",
    booked_price: initialData?.booked_price || "",
    notes: initialData?.notes || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await apiFetch(`${API_URL}/booking/services/`);
          const data = await response.json();
          setServices(data);
        } catch (error) {
          console.error("Failed to load services:", error);
        }
      };

      fetchServices();
    }, []);

  useEffect(() => {
    if (selectedService && formData.start_time) {
      const service = services.find((s) => s.id === Number(selectedService));

      if (service) {
        const parts = service.duration.toString().split(":");
        const hours = parseInt(parts[1], 10);
        const minutes = parseInt(parts[2], 10);

        const start = new Date(formData.start_time);
        const end = new Date(start.getTime());

        end.setHours(start.getHours() + hours);
        end.setMinutes(start.getMinutes() + minutes);

        // Format to YYYY-MM-DDTHH:mm for the input field
        const formattedStart = start.toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16);
        const formattedEnd = end.toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16);

        setFormData((prev) => ({
          ...prev,
          start_time: formattedStart,
          end_time: formattedEnd,
        }));
      }
    }
  }, [selectedService, formData.start_time, services]);

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
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString(),
      };

      await onSubmit(payload);
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
            onServiceCreated={(newService) => {
              setServices((prev) => [...prev, newService]);
              setSelectedService(newService.id);
            }}
        />

        <div className="grid md:grid-cols-2 gap-4">
          {/* Start Time Input */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-neutral-400">
              Appointment Start
            </label>
            <div
                className="flex items-center gap-3 bg-black border border-neutral-800 rounded-2xl px-4 py-3 focus-within:border-white transition-colors">
              <Calendar size={18} className="text-neutral-500"/>
              <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-white [color-scheme:dark]"
                  required
              />
            </div>
          </div>

          {/* Display Calculated End Time (Read Only) */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-neutral-400">
              Estimated End Time
            </label>
            <div
                className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 opacity-70">
              <Clock size={18} className="text-neutral-500"/>
              <input
                  type="datetime-local"
                  value={formData.end_time}
                  readOnly
                  className="w-full bg-transparent outline-none text-neutral-400 cursor-not-allowed"
              />
            </div>
            {formData.end_time && (
                <p className="text-xs text-neutral-500 mt-2 ml-1">
                  Duration based on selected service.
                </p>
            )}
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
            <StickyNote size={18} className="text-neutral-500 mt-1"/>
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
          <Save size={18}/>
          {loading ? "Saving..." : submitText}
        </button>
      </form>
  );
}