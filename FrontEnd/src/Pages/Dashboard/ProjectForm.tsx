import { useState } from "react";

export default function ProjectForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Not Started");

  return (
    <form className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-blue-500 mb-4">Add Project</h2>
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
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <button className="bg-blue-500 text-white w-full py-2 rounded font-bold shadow hover:bg-blue-600" type="submit">
        Add Project
      </button>
    </form>
  );
}