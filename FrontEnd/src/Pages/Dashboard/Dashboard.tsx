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
