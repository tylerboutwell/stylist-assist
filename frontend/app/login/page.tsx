"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save tokens (localStorage is simple; you can later use cookies or context)
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        // Redirect to dashboard or AI page
        router.push("/generate");
      } else {
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
      <div className="w-full max-w-md p-8 bg-neutral-900 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-white"
            required
          />

          <button
            type="submit"
            className="bg-white text-black py-3 rounded-xl font-medium hover:bg-neutral-200 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-neutral-400 mt-4 text-sm">
          Don’t have an account? <a href="/register" className="text-white underline">Sign up</a>
        </p>
      </div>
    </main>
  );
}