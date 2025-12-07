// src/api/projectPulseApi.ts
// Centralized API service for Project Pulse backend

const BASE_URL = "https://ppulse-backend.onrender.com";
// const BASE_URL = "http://localhost:8000";
// Helper for requests
async function request(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}`;
  console.log('[API Request]', options.method || 'GET', url, options.body ? JSON.parse(options.body as string) : null);

  const { headers: optionsHeaders, ...restOptions } = options;
  const res = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...(optionsHeaders || {}),
    },
  });

  const text = await res.text();
  console.log('[API Response]', res.status, res.statusText, text);

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!res.ok) {
    console.error('[API Error]', res.status, data);
    // Extract error message from various formats
    const errorMessage = data?.detail || data?.message || data?.error || res.statusText;
    throw { message: errorMessage, status: res.status, ...data };
  }
  return data;
}

// --- Authentication ---
export function registerUser(payload: { email: string; password: string; full_name: string }) {
  return request("/api/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: { email: string; password: string }) {
  return request("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateUserProfile(payload: Record<string, unknown>, token: string) {
  return request("/api/update-profile", {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  });
}

// --- Project ---
export function registerProject(payload: Record<string, unknown>, token: string) {
  return request("/plan/register", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteProject(payload: Record<string, unknown>, token: string) {
  return request("/plan/delete", {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getProjectDetails(id: string, token: string) {
  return request(`/plan/details?id=${encodeURIComponent(id)}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getAllProjects(token: string) {
  return request("/plan/all", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function editProjectProfile(payload: Record<string, unknown>, token: string) {
  return request("/plan/edit", {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  });
}

// --- Health ---
export function getHealth() {
  return request("/");
}
