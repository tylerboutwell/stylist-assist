"use client";

import React, { useEffect, useState } from "react";
import { User, Plus } from "lucide-react";
import {API_URL, apiFetch} from "@/lib/api";
import {bgBlack} from "next/dist/lib/picocolors";

type Client = {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  general_notes: string;
};

type Props = {
  selectedClient: number | null;
  onSelect: (id: number) => void;
};

export default function ClientSelector({
  selectedClient,
  onSelect,
}: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);

  const [newClient, setNewClient] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    general_notes: "",
  });

  useEffect(() => {
    const fetchClients = async () => {
      const res = await apiFetch(`${API_URL}/booking/clients/`);
      const data = await res.json();
      setClients(data);
    };

    fetchClients();
  }, []);

  const createClient = async () => {
    const res = await apiFetch(`${API_URL}/booking/clients/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient)
    })

    if (!res.ok) {
      alert("Failed to create client");
      return;
    }

    const created = await res.json();

    setClients((prev) => [...prev, created]);
    onSelect(created.id);
    setShowNewForm(false);

    setNewClient({
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      general_notes: "",
    });
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Client</label>

      <div className="flex items-center gap-3 bg-black border border-neutral-800 rounded-2xl px-4 py-3">
        <User size={18} className="text-neutral-500" />
        <select
          value={selectedClient ?? ""}
          onChange={(e) => onSelect(Number(e.target.value))}
          className="w-full bg-black text-white p-2 rounded outline-none"
        >
          <option value="" className="bg-black text-white">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id} className="bg-black text-white">
              {client.first_name} {client.last_name}
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
        Add New Client
      </button>

      {showNewForm && (
          <div className="space-y-3 p-4 bg-black border border-neutral-800 rounded-2xl">
            <input
                placeholder="First Name"
                value={newClient.first_name}
                onChange={(e) =>
                    setNewClient({...newClient, first_name: e.target.value})
                }
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700"
            />

            <input
                placeholder="Last Name"
                value={newClient.last_name}
                onChange={(e) =>
                    setNewClient({...newClient, last_name: e.target.value})
                }
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700"
            />

            <input
                placeholder="Optional: Phone Number"
                value={newClient.phone_number}
                onChange={(e) =>
                    setNewClient({...newClient, phone_number: e.target.value})
                }
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700"
            />

            <input
                placeholder="Optional: Email"
                value={newClient.email}
                onChange={(e) =>
                    setNewClient({...newClient, email: e.target.value})
                }
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700"
            />

            <textarea
                placeholder="Notes"
                value={newClient.general_notes}
                onChange={(e) =>
                    setNewClient({...newClient, general_notes: e.target.value})
                }
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700"
            />

            <button
                type="button"
                onClick={createClient}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold"
            >
              Save Client
            </button>
          </div>
      )}
    </div>
  );
}