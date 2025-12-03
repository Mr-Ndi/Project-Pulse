// src/api/projectPulseApi.ts
// Centralized API service for Project Pulse backend

// const BASE_URL = "https://ppulse-backend.onrender.com";
const BASE_URL = "http://localhost:8000";
// Helper for requests
async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data || { message: res.statusText };
  return data;
}

// --- Authentication ---
export function registerUser(payload: { email: string; password: string; name: string }) {
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

export function updateUserProfile(payload: any, token: string) {
  return request("/api/update-profile", {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  });
}

// --- Project ---
export function registerProject(payload: any, token: string) {
  return request("/plan/register", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteProject(payload: any, token: string) {
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

export function editProjectProfile(payload: any, token: string) {
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
