"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import AuthShell from "@/components/AuthShell";
import {API_URL, parseApiError} from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const { login, user, loading: authLoading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/");
    }
  }, [user, authLoading, router]);

  if (authLoading || user) {
    return null;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(parseApiError(data, "Failed to create account"));
        return;
      }

      const result = await login({ username, password });
      if (result.success) {
        router.push("/createpost?welcome=true");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Start managing clients, bookings, and content with StylistAssist."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-rose-500 hover:text-rose-600">
            Log in
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSignup}>
        <div>
          <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="yourstudio"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[15px] text-neutral-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-500/10"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@yourstudio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[15px] text-neutral-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-500/10"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[15px] text-neutral-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-500/10"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[15px] text-neutral-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-500/10"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex items-center justify-center rounded-xl bg-rose-500 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}