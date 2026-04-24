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

    await refreshPromise;
    isRefreshing = false;

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

  const res = await fetch("http://localhost:8000/api/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    logout();
    return;
  }

  const data = await res.json();
  localStorage.setItem("accessToken", data.access);
}

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}