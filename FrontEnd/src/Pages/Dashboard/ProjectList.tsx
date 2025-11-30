import { FaTasks } from "react-icons/fa";
import { useState } from "react";

export default function ProjectList() {
  const [projects, setProjects] = useState([
    { name: "Website Redesign", description: "Update homepage and dashboard", status: "In Progress" },
    { name: "API Integration", description: "Connect backend to frontend", status: "Not Started" },
    { name: "Testing Suite", description: "Add unit and integration tests", status: "Completed" },
  ]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditName(projects[idx].name);
    setEditDesc(projects[idx].description);
  };

  const handleSave = (idx: number) => {
    const updated = [...projects];
    updated[idx].name = editName;
    updated[idx].description = editDesc;
    setProjects(updated);
    setEditIdx(null);
  };

  const handleStatusChange = (idx: number, status: string) => {
    const updated = [...projects];
    updated[idx].status = status;
    setProjects(updated);
  };

  return (
    <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-4">
        <FaTasks className="text-blue-500 text-xl mr-2" />
        <h2 className="text-xl font-bold text-blue-500">Projects</h2>
      </div>
      <hr className="mb-4 border-blue-100" />
      <table className="w-full">
        <thead>
          <tr className="text-left text-blue-500">
            <th>Project Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj, idx) => (
            <tr
              key={idx}
              className={`border-t ${idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100`}
            >
              <td className="py-3">
                {editIdx === idx ? (
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                ) : (
                  proj.name
                )}
              </td>
              <td className="py-3">
                {editIdx === idx ? (
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                  />
                ) : (
                  proj.description
                )}
              </td>
              <td className="py-3">
                <select
                  className="bg-white border rounded px-3 py-1 w-36"
                  value={proj.status}
                  onChange={e => handleStatusChange(idx, e.target.value)}
                  disabled={editIdx !== idx}
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </td>
              <td className="py-3 flex gap-2">
                {editIdx === idx ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm shadow hover:bg-green-600"
                      onClick={() => handleSave(idx)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-3 py-1 rounded text-sm shadow hover:bg-gray-500"
                      onClick={() => setEditIdx(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm shadow hover:bg-blue-600"
                      onClick={() => handleEdit(idx)}
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm shadow hover:bg-red-600">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}