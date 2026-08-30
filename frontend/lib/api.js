let isRefreshing = false;
let refreshPromise = null;

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// DRF error responses come in two different shapes depending on the endpoint:
//   { detail: "some message" }                          — e.g. SimpleJWT's token endpoint
//   { fieldName: ["message one", "message two"], ... }   — e.g. serializer.errors,
//                                                            returned as-is by RegisterView
// This normalizes either shape into one readable string for display.
export function parseApiError(data, fallback = "Something went wrong") {
  if (!data || typeof data !== "object") return fallback;
  if (typeof data.detail === "string") return data.detail;

  const messages = [];
  for (const value of Object.values(data)) {
    if (Array.isArray(value)) {
      messages.push(...value.filter((m) => typeof m === "string"));
    } else if (typeof value === "string") {
      messages.push(value);
    }
  }
  return messages.length > 0 ? messages.join(" ") : fallback;
}

export async function apiFetch(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

    if (res.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshToken();
      }

    let success;

    try {
      success = await refreshPromise;
    } finally {
      isRefreshing = false;
    }

    if (!success) {
      throw new Error("Refresh failed");
    }

    const newToken = localStorage.getItem("accessToken");

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return res;
}

async function refreshToken() {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) {
    logout();
    return false;
  }

  const res = await fetch(`${API_URL}/api/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    logout();
    return false;
  }

  const data = await res.json();
  localStorage.setItem("accessToken", data.access);
  return true
}

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}