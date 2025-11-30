import Nav from "../../Pages/Nav/Nav";
import Footer from "../Footer/Footer";
export default function Feature() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-white-700 to-blue-500">
      <Nav />
      <main className="flex-1">
        <section className="text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-bold text-3xl md:text-5xl mb-10 text-black-500">Core Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-300 rounded-lg shadow-lg p-6 text-black">
                <h3 className="font-semibold text-xl text-blue-500 mb-2">Project Creation & Organization</h3>
                <p>
                  Quickly create new projects with a name, description, and status. Capture what you’re working on and why it matters—all in one place.
                </p>
              </div>
              <div className="bg-gray-300 rounded-lg shadow-lg p-6 text-black">
                <h3 className="font-semibold text-xl text-blue-500 mb-2">Visual Project Status Tracking</h3>
                <p>
                  See every project’s status—Not Started, In Progress, or Completed—at a glance. Stay on top of progress and never lose track.
                </p>
              </div>
              <div className="bg-gray-300 rounded-lg shadow-lg p-6 text-black">
                <h3 className="font-semibold text-xl text-blue-500 mb-2">Inline Status Updates & Editing</h3>
                <p>
                  Update a project’s status or details directly from the dashboard. No complex forms or navigation—just simple, instant edits.
                </p>
              </div>
              <div className="bg-gray-300 rounded-lg shadow-lg p-6 text-black">
                <h3 className="font-semibold text-xl text-blue-500 mb-2">Simple, Responsive Dashboard UI</h3>
                <p>
                  Enjoy a clean, mobile-friendly dashboard. Everything—project list, overview, and actions—is easy to find and use for solo learners and small teams.
                </p>
              </div>
            </div>
          </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
