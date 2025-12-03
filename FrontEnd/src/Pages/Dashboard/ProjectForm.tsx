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
    } catch (err: any) {
      setError(err?.message || "Failed to add project");
    }
  };

  return (
    <form className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-blue-500 mb-4">Add Project</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-700 mb-1">Project Name</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
        <textarea
          className="w-full px-3 py-2 border rounded"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
        <select
          className="w-full px-3 py-2 border rounded"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button className="bg-blue-500 text-white w-full py-2 rounded font-bold shadow hover:bg-blue-600" type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}