"use client";

import {useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {API_URL} from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SignupPage() {
  const router = useRouter();

  const {login, user, loading:authLoading} = useContext(AuthContext)
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (!res.ok) {
        setError(data.detail || "Failed to create account");
        return;
      }
      console.log("SUCCESSFULLY CREATED USER!")

      const result = await login({ username, password });
      if (result.success) {
      router.push("/?welcome=true");
    } else {
      setError(result.success || "Login failed");
    }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }

    if (authLoading) {
    return <LoadingSpinner/>;
  }

  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md p-8 bg-neutral-900 rounded-xl border border-neutral-800">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Create your account
          </h2>

          <p className="text-neutral-400 text-sm text-center mb-6">
            Start managing clients, bookings, and content with StylistAssist.
          </p>

          {error && (
            <div className="bg-red-600 p-2 rounded mb-4 text-center text-sm">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 rounded bg-neutral-800 border border-neutral-700"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded bg-neutral-800 border border-neutral-700"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded bg-neutral-800 border border-neutral-700"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 rounded bg-neutral-800 border border-neutral-700"
              required
            />

            <button
              type="submit"
              className="p-3 rounded bg-white text-black font-medium hover:bg-neutral-200 transition"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-neutral-400 mt-6 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-white">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}