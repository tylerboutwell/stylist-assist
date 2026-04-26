let isRefreshing = false;
let refreshPromise = null;

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

  const res = await fetch("http://localhost:8000/api/token/refresh/", {
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