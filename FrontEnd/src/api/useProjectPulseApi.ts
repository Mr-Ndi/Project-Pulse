import { useState, useCallback } from "react";
import * as api from "./projectPulseApi";

// Generic hook for API calls
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useApi<T extends (...args: any[]) => Promise<any>>(fn: T) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<Awaited<ReturnType<T>> | null>(null);

  const call = useCallback(async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn(...args);
      setData(res);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fn]);

  return [call, { loading, error, data }] as const;
}

// Auth hooks
export function useRegisterUser() {
  return useApi(api.registerUser);
}
export function useLoginUser() {
  return useApi(api.loginUser);
}
export function useGetUserProfile() {
  return useApi(api.getUserProfile);
}
export function useUpdateUserProfile() {
  return useApi(api.updateUserProfile);
}
export function useChangePassword() {
  return useApi(api.changePassword);
}
export function useSubmitContactMessage() {
  return useApi(api.submitContactMessage);
}
export function useGetAllComplaints() {
  return useApi(api.getAllComplaints);
}
export function useUpdateComplaintStatus() {
  return useApi(api.updateComplaintStatus);
}

// Project hooks
export function useRegisterProject() {
  return useApi(api.registerProject);
}
export function useDeleteProject() {
  return useApi(api.deleteProject);
}
export function useGetProjectDetails() {
  return useApi(api.getProjectDetails);
}
export function useGetAllProjects() {
  return useApi(api.getAllProjects);
}
export function useEditProjectProfile() {
  return useApi(api.editProjectProfile);
}

// Health
export function useHealth() {
  return useApi(api.getHealth);
}
