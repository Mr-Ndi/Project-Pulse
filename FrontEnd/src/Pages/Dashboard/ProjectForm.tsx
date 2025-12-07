import React, { useState } from "react";
import { useRegisterProject } from "../../api/useProjectPulseApi";

export default function ProjectForm({ onRefresh }: { onRefresh: () => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("not_started");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token") || "";
  const [registerProject, { loading }] = useRegisterProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name || !desc) {
      setError("Please enter project name and description.");
      return;
    }
    try {
      await registerProject({ name, description: desc, status }, token);
      setSuccess("Project added!");
      setName("");
      setDesc("");
      setStatus("not_started");
      onRefresh();
    } catch (err: unknown) {
      // Show detailed backend error if available
      const error = err as Record<string, unknown>;
      if (error?.detail) {
        setError(
          Array.isArray(error.detail)
            ? (error.detail as Array<{msg: string}>).map((d) => d.msg).join("; ")
            : String(error.detail)
        );
      } else {
        setError(err?.message || "Failed to add project");
      }
      // Also log the error for debugging
      console.error('[ProjectForm] Backend error:', err);
    }
  };

  return (
    <form className="bg-white bg-opacity-80 rounded-xl shadow-md p-6 sticky top-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="w-1 h-8 bg-blue-600 mr-3 rounded"></span>
        Add New Project
      </h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 text-sm">
          {success}
        </div>
      )}
      
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter project name"
          required
        />
      </div>
      
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          rows={4}
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Enter project description"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
        <select
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" 
        type="submit" 
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Adding...
          </>
        ) : (
          "Add Project"
        )}
      </button>
    </form>
  );
}