import { useState } from "react";
import { useDeleteProject } from "../../api/useProjectPulseApi";
import { FaTasks } from "react-icons/fa";

interface ProjectListProps {
  projects: any[];
  loading: boolean;
  error: any;
  onRefresh: () => void;
}

export default function ProjectList({ projects, loading, error, onRefresh }: ProjectListProps) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const token = localStorage.getItem("token") || "";
  const [deleteProject] = useDeleteProject();
  const [localError, setLocalError] = useState("");

  const handleEdit = (idx: number) => {
    if (!projects) return;
    setEditName(projects[idx].name);
    setEditDesc(projects[idx].description);
  };

  const handleSave = (_idx: number) => {
    // TODO: Implement edit API
    setEditIdx(null);
  };

  const handleStatusChange = (_idx: number, _status: string) => {
    // TODO: Implement status update API
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject({ id }, token);
      onRefresh();
    } catch (err: any) {
      setLocalError(err?.message || "Delete failed");
    }
  };

  return (
    <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-4">
        <FaTasks className="text-blue-500 text-xl mr-2" />
        <h2 className="text-xl font-bold text-blue-500">Projects</h2>
      </div>
      <hr className="mb-4 border-blue-100" />
      {error && <div className="text-red-500 mb-2">{error.message || "Failed to load projects"}</div>}
      {localError && <div className="text-red-500 mb-2">{localError}</div>}
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
          {loading && (
            <tr><td colSpan={4} className="text-center py-4">Loading projects...</td></tr>
          )}
          {projects && projects.length === 0 && (
            <tr><td colSpan={4} className="text-center py-4">No projects found.</td></tr>
          )}
          {projects && projects.map((proj: any, idx: number) => (
            <tr
              key={proj.id || idx}
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
                  className="border rounded px-2 py-1"
                  value={proj.status}
                  onChange={e => handleStatusChange(idx, e.target.value)}
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </td>
              <td className="py-3 flex gap-2">
                {editIdx === idx ? (
                  <>
                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleSave(idx)}>
                      Save
                    </button>
                    <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditIdx(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(idx)}>
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(proj.id)}>
                      Delete
                    </button>
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