import React, { useEffect, useState, useMemo } from "react";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import ProjectStats from "./ProjectStats";
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
    if (total === 0) return 2 * Math.PI * 32;
    const percentage = count / total;
    return 2 * Math.PI * 32 * (1 - percentage);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-white-700 to-blue-500">
      <Nav />
      <main className="flex-1 px-4 py-8">
        <header className="mb-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-base text-gray-700">Track all your projects in one place.</p>
        </header>
        <ProjectStats total={stats.total} />
        {/* Project status circles */}
        <div className="flex justify-center gap-8 my-8">
          {/* Not Started */}
          <div className="flex flex-col items-center">
            <svg width="80" height="80">
              <circle cx="40" cy="40" r="32" stroke="#d1d5db" strokeWidth="8" fill="none" />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#f59e42"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 32}
                strokeDashoffset={getStrokeDashoffset(stats.notStarted, stats.total)}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <span className="mt-2 font-semibold text-yellow-600">Not Started</span>
            <span className="text-lg font-bold">{stats.notStarted}</span>
          </div>
          {/* In Progress */}
          <div className="flex flex-col items-center">
            <svg width="80" height="80">
              <circle cx="40" cy="40" r="32" stroke="#d1d5db" strokeWidth="8" fill="none" />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 32}
                strokeDashoffset={getStrokeDashoffset(stats.inProgress, stats.total)}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <span className="mt-2 font-semibold text-blue-600">In Progress</span>
            <span className="text-lg font-bold">{stats.inProgress}</span>
          </div>
          {/* Completed */}
          <div className="flex flex-col items-center">
            <svg width="80" height="80">
              <circle cx="40" cy="40" r="32" stroke="#d1d5db" strokeWidth="8" fill="none" />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#10b981"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 32}
                strokeDashoffset={getStrokeDashoffset(stats.completed, stats.total)}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <span className="mt-2 font-semibold text-green-600">Completed</span>
            <span className="text-lg font-bold">{stats.completed}</span>
          </div>
        </div>
        <div className="max-w-8xl mx-auto mt-8 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-8/12">
            <ProjectList projects={projects || []} loading={loading} error={error} onRefresh={handleRefresh} />
          </div>
          <div className="w-full md:w-4/12">
            <ProjectForm onRefresh={handleRefresh} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
