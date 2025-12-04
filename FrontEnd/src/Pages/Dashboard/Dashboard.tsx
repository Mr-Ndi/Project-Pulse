import { useEffect, useState, useMemo } from "react";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";
import { useAuth } from "../../App";
import { useGetAllProjects } from "../../api/useProjectPulseApi";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token") || "";
  const [getAllProjects, { data: projects, loading, error }] = useGetAllProjects();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (isAuthenticated && token) {
      getAllProjects(token);
    }
  }, [isAuthenticated, token, getAllProjects, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const stats = useMemo(() => {
    if (!projects) return { total: 0, notStarted: 0, inProgress: 0, completed: 0 };
    return {
      total: projects.length,
      notStarted: projects.filter((p: any) => p.status === "not_started" || p.status === "Not Started").length,
      inProgress: projects.filter((p: any) => p.status === "in_progress" || p.status === "In Progress").length,
      completed: projects.filter((p: any) => p.status === "completed" || p.status === "Completed").length,
    };
  }, [projects]);

  const getStrokeDashoffset = (count: number, total: number) => {
    const radius = 20;
    if (total === 0) return 2 * Math.PI * radius;
    const percentage = count / total;
    return 2 * Math.PI * radius * (1 - percentage);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-white-700 to-blue-500">
      <Nav />
      <main className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-base text-gray-700">Track all your projects in one place.</p>
        </header>
        
        {/* Project status cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Not Started */}
          <div className="bg-white bg-opacity-80 rounded-xl shadow-md p-6 border-l-4 border-yellow-400">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Not Started</h3>
              <div className="w-12 h-12 relative">
                <svg width="48" height="48" className="transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#f59e0b"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 20}
                    strokeDashoffset={getStrokeDashoffset(stats.notStarted, stats.total)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-600">{stats.notStarted}</span>
                </div>
              </div>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.notStarted}</p>
            <p className="text-xs text-gray-500 mt-1">of {stats.total} projects</p>
          </div>
          
          {/* In Progress */}
          <div className="bg-white bg-opacity-80 rounded-xl shadow-md p-6 border-l-4 border-blue-400">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">In Progress</h3>
              <div className="w-12 h-12 relative">
                <svg width="48" height="48" className="transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#3b82f6"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 20}
                    strokeDashoffset={getStrokeDashoffset(stats.inProgress, stats.total)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">{stats.inProgress}</span>
                </div>
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
            <p className="text-xs text-gray-500 mt-1">of {stats.total} projects</p>
          </div>
          
          {/* Completed */}
          <div className="bg-white bg-opacity-80 rounded-xl shadow-md p-6 border-l-4 border-green-400">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Completed</h3>
              <div className="w-12 h-12 relative">
                <svg width="48" height="48" className="transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#10b981"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 20}
                    strokeDashoffset={getStrokeDashoffset(stats.completed, stats.total)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-green-600">{stats.completed}</span>
                </div>
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-xs text-gray-500 mt-1">of {stats.total} projects</p>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProjectList projects={projects || []} loading={loading} error={error} onRefresh={handleRefresh} />
          </div>
          <div className="lg:col-span-1">
            <ProjectForm onRefresh={handleRefresh} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
