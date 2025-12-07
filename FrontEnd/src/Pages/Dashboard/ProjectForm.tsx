import React, { useState } from "react";
import { useRegisterProject } from "../../api/useProjectPulseApi";
import Toast from "../../Components/Toast/Toast";

export default function ProjectForm({ onRefresh }: { onRefresh: () => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("not_started");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const token = localStorage.getItem("token") || "";
  const [registerProject, { loading }] = useRegisterProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    if (!name || !desc) {
      setToast({ message: "Please enter project name and description.", type: 'error' });
      return;
    }
    try {
      await registerProject({ name, description: desc, status }, token);
      setToast({ message: "Project added successfully! 🎉", type: 'success' });
      setName("");
      setDesc("");
      setStatus("not_started");
      onRefresh();
    } catch (err: unknown) {
      // Show detailed backend error if available
      const error = err as Record<string, unknown>;
      if (error?.detail) {
        const errorMsg = Array.isArray(error.detail)
          ? (error.detail as Array<{msg: string}>).map((d) => d.msg).join("; ")
          : String(error.detail);
        setToast({ message: errorMsg, type: 'error' });
      } else {
        setToast({ message: (error?.message as string) || "Failed to add project", type: 'error' });
      }
      // Also log the error for debugging
      console.error('[ProjectForm] Backend error:', err);
    }
  };

  return (
    <>
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
      <form className="bg-white bg-opacity-80 rounded-xl shadow-md p-6 sticky top-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="w-1 h-8 bg-blue-600 mr-3 rounded"></span>
          Add New Project
        </h2>
        
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
    </>
  );
}