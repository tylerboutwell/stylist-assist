"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {apiFetch} from "@/lib/api";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async (_: { username: string; password: string }) => ({
    success: false,
  }),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await apiFetch("http://localhost:8000/api/users/me/");

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        //Clean up bad tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null)
      }
    } catch (err) {
      console.error("Auth check failed", err);
    } finally {
      setLoading(false);
    }
  };
  const login = async (credentials: any) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        await checkUser();
        return { success: true };
      } else {
        setLoading(false)
        return { success: false, error: data.detail || "Login failed" };
      }
    } catch (err) {
      setLoading(false);
      return { success: false, error: "Server error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken")
    setUser(null);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext value={{ user, loading, login, logout }}>
      {children}
    </AuthContext>
  );
};

export default AuthContext;