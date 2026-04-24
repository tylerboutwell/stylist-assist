"use client";

import {useContext, useState} from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
  const {login} = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login({ username, password });

    if (result.success) {
      router.push("/");
    } else {
      setError(result.success || "Login failed");
    }
  };

  return (
      <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
        <Navbar/>

        {/* Center the login card */}
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md p-8 bg-neutral-900 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

            {error && (
                <div className="bg-red-600 p-2 rounded mb-4 text-center text-sm">
                  {error}
                </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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

              <button
                  type="submit"
                  className="p-3 rounded bg-white text-black font-medium hover:bg-neutral-200"
                  disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-neutral-400 mt-4 text-sm">
              Don’t have an account? <a href="/register" className="underline text-white">Sign up</a>
            </p>
          </div>
        </div>
      </main>
  );
}