import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/Nav/Nav";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <main className="flex-1">
        <section className="bg-blue-600 py-16">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-white">
              <h1 className="font-extrabold text-4xl md:text-6xl leading-tight mb-6 drop-shadow-lg">
                Welcome to <span className="text-blue-200">Project Pulse</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-4">
                Build, track, and ship your projects in one simple dashboard designed for engineering teams and learners. Plan what to work on, see what’s in progress, and celebrate what you’ve completed—without getting lost in complex tools.
              </p>
              <p className="text-lg md:text-xl mb-8">
                Create new projects in seconds, update their status as you work, and always know what needs your attention next. Whether you are practicing for internships or collaborating with a small team, Project Pulse keeps your progress clear and your focus sharp.
              </p>
              <div className="flex gap-4 mt-6">
                <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-blue-100 transition">Get Started</button>
                <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-700 transition">Go to Dashboard</button>
              </div>
            </div>
            <div className="flex-1 w-full md:pl-8">
              <div className="bg-white w-full h-64 md:h-96 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden border-4 border-blue-200">
                <img className="w-full h-full object-cover" src="/1218.jpg" alt="Black student" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-6 border-t-4 border-blue-500">
              <h3 className="text-blue-700 font-bold text-xl mb-2">Submit Projects</h3>
              <p className="text-gray-700">Showcase your engineering projects, track progress, and get feedback from peers and mentors.</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-6 border-t-4 border-blue-500">
              <h3 className="text-blue-700 font-bold text-xl mb-2">Track Progress</h3>
              <p className="text-gray-700">Monitor updates and see your project status at a glance with a clear, visual dashboard.</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-6 border-t-4 border-blue-500">
              <h3 className="text-blue-700 font-bold text-xl mb-2">Collaborate Easily</h3>
              <p className="text-gray-700">Work with teammates, assign tasks, and keep everyone in sync with real-time updates.</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-6 border-t-4 border-blue-500">
              <h3 className="text-blue-700 font-bold text-xl mb-2">Celebrate Success</h3>
              <p className="text-gray-700">Mark milestones, share achievements, and motivate your team as you complete projects.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
