import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import ProjectStats from "./ProjectStats";
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-white-700 to-blue-500">
      <Nav />
      <main className="flex-1 px-4 py-8">
        <header className="mb-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-base text-gray-700">Track all your projects in one place.</p>
        </header>
        <ProjectStats />
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
                strokeDashoffset={2 * Math.PI * 32 * (1 - 0.3)}
                strokeLinecap="round"
              />
            </svg>
            <span className="mt-2 font-semibold text-yellow-600">Not Started</span>
            <span className="text-lg font-bold">3</span>
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
                strokeDashoffset={2 * Math.PI * 32 * (1 - 0.5)}
                strokeLinecap="round"
              />
            </svg>
            <span className="mt-2 font-semibold text-blue-600">In Progress</span>
            <span className="text-lg font-bold">5</span>
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
                strokeDashoffset={2 * Math.PI * 32 * (1 - 0.7)}
                strokeLinecap="round"
              />
            </svg>
            <span className="mt-2 font-semibold text-green-600">Completed</span>
            <span className="text-lg font-bold">7</span>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-7/12">
            <ProjectList />
          </div>
          <div className="w-full md:w-5/12">
            <ProjectForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
