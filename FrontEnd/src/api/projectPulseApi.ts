// src/api/projectPulseApi.ts
// Centralized API service for Project Pulse backend

const BASE_URL = "https://project-pulse-backend-ew63.onrender.com";
// const BASE_URL = "http://localhost:8000";
// Helper for requests
async function request(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}`;

  const { headers: optionsHeaders, ...restOptions } = options;
  const res = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...(optionsHeaders || {}),
    },
  });

  const text = await res.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!res.ok) {
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

export function getAllUsers(token: string) {
  return request("/api/users", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}


export function loginUser(payload: { email: string; password: string }) {
  return request("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getUserProfile(token: string) {
  return request("/api/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateUserProfile(payload: Record<string, unknown>, token: string) {
  return request("/api/update-profile", {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function changePassword(payload: { current_password: string; new_password: string }, token: string) {
  return request("/api/change-password", {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function submitContactMessage(payload: { name: string; email: string; message: string }) {
  return request("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getAllComplaints(token: string) {
  return request("/api/complaints", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateComplaintStatus(id: string, status: string, token: string) {
  return request(`/api/complaints/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
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
