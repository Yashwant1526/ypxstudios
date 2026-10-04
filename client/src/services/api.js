const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("ypx-token");
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = payload?.message || "Request failed.";
    throw new Error(message);
  }

  return payload;
}

export async function fetchDashboardSummary() {
  return request("/dashboard/summary");
}

export async function fetchPortfolioItems() {
  return request("/portfolio");
}

export async function submitEnquiry(payload) {
  return request("/enquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
