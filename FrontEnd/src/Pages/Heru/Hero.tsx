import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/Nav/Nav";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-white-700 to-blue-500">
      <Nav />
      <main className="flex-1">
        <section className="text-white py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-black">
              <h1 className="font-bold text-3xl md:text-6xl leading-tight mb-6">
                Advance your engineering skills with real projects.
              </h1>
              <p className="text-base md:text-lg leading-relaxed">
                Build, track, and ship your projects in one simple dashboard designed for engineering teams and learners. Plan what to work on, see what’s in progress, and celebrate what you’ve completed—without getting lost in complex tools.<br/>
              </p>
              <p className="text-base md:text-lg mt-6">
                <br/>Create new projects in seconds, update their status as you work, and always know what needs your attention next. Whether you are practicing for internships or collaborating with a small team, Project Pulse keeps your progress clear and your focus sharp.
                <span className="font-semibold">Actually none because we got you back.</span>
              </p>
            </div>
            <div className="flex-1 w-full md:pl-8">
              <div className="bg-gray-300 w-full h-60 md:h-96 rounded-lg shadow-lg flex items-center justify-center text-black overflow-hidden">
                <img className="w-full h-full object-cover" src="/1218.jpg" alt="Black student" />
              </div>
              <div className="py-10 flex justify-between items-center">
                <button className="bg-blue-500 px-4 py-2 rounded">Get Started</button>
                <button className="bg-blue-500 px-4 py-2 rounded">Go to Dashboard</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
