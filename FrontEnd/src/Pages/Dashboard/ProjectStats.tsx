import { FaFolderOpen } from "react-icons/fa";

export default function ProjectStats() {
  return (
    <div className="flex gap-6 mb-6">
      <div className="flex items-center bg-white bg-opacity-80 text-blue-600 rounded-full px-6 py-4 shadow-lg border border-blue-200">
        <FaFolderOpen className="text-2xl mr-3" />
        <span className="text-lg font-semibold">Total projects:</span>
        <span className="ml-2 text-3xl font-extrabold">3</span>
      </div>
    </div>
  );
}