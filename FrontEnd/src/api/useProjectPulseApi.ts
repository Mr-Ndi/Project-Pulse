import { useState, useCallback } from "react";
import * as api from "./projectPulseApi";

// Generic hook for API calls
function useApi(fn: (...args: any[]) => Promise<any>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const call = useCallback(async (...args: any[]) => {
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
export function useUpdateUserProfile() {
  return useApi(api.updateUserProfile);
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
