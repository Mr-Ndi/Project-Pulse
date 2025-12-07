import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
export default function Feature() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <main className="flex-1">
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-bold text-4xl md:text-5xl mb-10 text-blue-700 text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
                <span className="mb-3 text-blue-600">
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <h3 className="text-blue-700 font-bold text-xl mb-2">Track Progress</h3>
                <p className="text-gray-700 text-center">Monitor updates and see your project status at a glance with a clear, visual dashboard.</p>
              </div>
              <div className="flex flex-col items-center bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
                <span className="mb-3 text-blue-600">
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <h3 className="text-blue-700 font-bold text-xl mb-2">Manage Tasks</h3>
                <p className="text-gray-700 text-center">Add, update, and organize your projects and tasks with ease.</p>
              </div>
              <div className="flex flex-col items-center bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
                <span className="mb-3 text-blue-600">
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <h3 className="text-blue-700 font-bold text-xl mb-2">Collaborate Easily</h3>
                <p className="text-gray-700 text-center">Work with teammates, assign tasks, and keep everyone in sync with real-time updates.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
