import { useState } from "react";
import { useDeleteProject, useEditProjectProfile } from "../../api/useProjectPulseApi";
import { FaTasks } from "react-icons/fa";

interface Project {
  id?: string;
  name: string;
  description?: string;
  status: string;
  [key: string]: unknown;
}

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  error: unknown;
  onRefresh: () => void;
}

export default function ProjectList({ projects, loading, error, onRefresh }: ProjectListProps) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const token = localStorage.getItem("token") || "";
  const [deleteProject] = useDeleteProject();
  const [editProject, { loading: editLoading }] = useEditProjectProfile();
  const [localError, setLocalError] = useState<string>("");

  const handleEdit = (idx: number) => {
    if (!projects) return;
    const project = projects[idx];
    setEditIdx(idx);
    setEditName(project.name);
    setEditDesc(project.description || "");
    // Normalize status value (handle both "not_started" and "Not Started" formats)
    const statusValue = project.status === "Not Started" ? "not_started" 
                      : project.status === "In Progress" ? "in_progress"
                      : project.status === "Completed" ? "completed"
                      : project.status || "not_started";
    setEditStatus(statusValue);
  };

  const handleSave = async (idx: number): Promise<void> => {
    if (!projects) return;
    const project: Project = projects[idx];
    
    // Validate required fields
    if (!editName.trim()) {
      setLocalError("Project name is required");
      return;
    }
    
    setLocalError("");
    try {
      // FastAPI with multiple Body(...) expects all fields as top-level keys
      // Backend expects: project_id (UUID) and project_update fields (name, description, status) all at top level
      await editProject(
        {
          project_id: project.id,
          name: editName.trim(),
          description: editDesc.trim() || null,
          status: editStatus,
        },
        token
      );
      setEditIdx(null);
      setEditName("");
      setEditDesc("");
      setEditStatus("");
      onRefresh();
    } catch (err: unknown) {
      const error = err as Record<string, unknown>;
      const errorMsg = error?.detail 
        ? (Array.isArray(error.detail) ? (error.detail as Array<{msg: string}>).map((d) => d.msg || d).join("; ") : String(error.detail))
        : (error?.message as string) || "Failed to update project";
      setLocalError(errorMsg);
    }
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditName("");
    setEditDesc("");
    setEditStatus("");
    setLocalError("");
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteProject({ id }, token);
      onRefresh();
    } catch (err: unknown) {
      const error = err as Record<string, unknown>;
      setLocalError((error?.message as string) || "Delete failed");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusText = status === "not_started" || status === "Not Started" ? "Not Started" :
                       status === "in_progress" || status === "In Progress" ? "In Progress" :
                       status === "completed" || status === "Completed" ? "Completed" :
                       status;
    
    const statusClass = status === "not_started" || status === "Not Started" 
      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
      : status === "in_progress" || status === "In Progress"
      ? "bg-blue-100 text-blue-800 border-blue-300"
      : "bg-green-100 text-green-800 border-green-300";
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusClass}`}>
        {statusText}
      </span>
    );
  };

  return (
    <div className="bg-white bg-opacity-80 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaTasks className="text-blue-600 text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {projects?.length || 0} {projects?.length === 1 ? 'project' : 'projects'}
        </span>
      </div>
      
      {(error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {String((error as Error)?.message || "Failed to load projects")}
        </div>
      )) as React.ReactNode}
      {localError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {String(localError)}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Project Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                    Loading projects...
                  </div>
                </td>
              </tr>
            )}
            {projects && projects.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-gray-500">
                  <FaTasks className="text-4xl mx-auto mb-3 text-gray-300" />
                  <p className="text-lg">No projects found.</p>
                  <p className="text-sm mt-1">Create your first project using the form on the right.</p>
                </td>
              </tr>
            )}
            {projects && projects.map((proj: Project, idx: number) => (
              <tr
                key={proj.id || `project-${idx}`}
                className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                  editIdx === idx ? 'bg-blue-50' : ''
                }`}
              >
                <td className="py-4 px-4">
                  {editIdx === idx ? (
                    <input
                      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      placeholder="Project name"
                    />
                  ) : (
                    <span className="font-medium text-gray-800">{proj.name}</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  {editIdx === idx ? (
                    <input
                      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editDesc}
                      onChange={e => setEditDesc(e.target.value)}
                      placeholder="Description"
                    />
                  ) : (
                    <span className="text-gray-600 text-sm">{proj.description || <span className="text-gray-400 italic">No description</span>}</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  {editIdx === idx ? (
                    <select
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value)}
                    >
                      <option value="not_started">Not Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    getStatusBadge(proj.status)
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    {editIdx === idx ? (
                      <>
                        <button 
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                          onClick={() => handleSave(idx)}
                          disabled={editLoading}
                        >
                          {editLoading ? "Saving..." : "Save"}
                        </button>
                        <button 
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 transition-colors" 
                          onClick={handleCancel}
                          disabled={editLoading}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors" 
                          onClick={() => handleEdit(idx)}
                        >
                          Edit
                        </button>
                        <button 
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors" 
                          onClick={() => handleDelete(proj.id as string)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}