"use client";

import React, { useEffect, useState } from "react";
import { Scissors, Plus } from "lucide-react";
import {apiFetch} from "@/lib/api";

type Service = {
  id: number;
  name: string;
  description: string;
  base_price: number;
  duration: number;
};

type Props = {
  selectedService: number | null;
  onSelect: (id: number) => void;
};

export default function ServiceSelector({
  selectedService,
  onSelect,
}: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);

  const [newService, setNewService] = useState({
    name: "",
    base_price: "",
    duration: "",
    description:"",
  });

  useEffect(() => {
    const fetchServices = async () => {
      const res = await apiFetch("http://localhost:8000/booking/services/");
      const data = await res.json();
      setServices(data);
    };

    fetchServices();
  }, []);

  const createService = async () => {
    const res = await apiFetch("http://localhost:8000/booking/services/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService)
    });

    if (!res.ok) {
      alert("Failed to create service");
      return;
    }

    const created = await res.json();

    setServices((prev) => [...prev, created]);
    onSelect(created.id);
    setShowNewForm(false);

    setNewService({
      name: "",
      description: "",
      base_price: "",
      duration: "",
    });
  };

  return (
    <div className="space-y-4">
      {services.map((Service) => (
          <div>{Service.name} {Service.description} {Service.base_price}</div>
      ))}
      <label className="block text-sm font-medium">Service</label>

      <div className="flex items-center gap-3 bg-black border border-neutral-800 rounded-2xl px-4 py-3">
        <Scissors size={18} className="text-neutral-500" />
        <select
          value={selectedService ?? ""}
          onChange={(e) => onSelect(Number(e.target.value))}
          className="w-full bg-black text-white p-2 rounded outline-none"
        >
          <option value="" className='bg-black text-white'>Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id} className='bg-black text-white'>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => setShowNewForm(!showNewForm)}
        className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white"
      >
        <Plus size={16} />
        Add New Service
      </button>

      {showNewForm && (
        <div className="space-y-3 p-4 bg-black border border-neutral-800 rounded-2xl">
          <input
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700"
          />

          <input
            placeholder="Description"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700"
            />

          <input
            placeholder="Price"
            value={newService.base_price}
            onChange={(e) =>
              setNewService({ ...newService, base_price: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700"
          />

          <input
            placeholder="Duration (minutes)"
            value={newService.duration}
            onChange={(e) =>
              setNewService({
                ...newService,
                duration: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700"
          />

          <button
            type="button"
            onClick={createService}
            className="px-4 py-2 rounded-xl bg-white text-black font-semibold"
          >
            Save Service
          </button>
        </div>
      )}
    </div>
  );
}