import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/Nav/Nav";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <main className="flex-1">
        <section className="bg-blue-700 flex items-center justify-center min-h-[calc(100vh-64px-64px)]">{/* Adjust 64px if nav/footer heights differ */}
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 w-full">
            <div className="flex-1 text-white flex flex-col justify-center">
              <h1 className="font-extrabold text-5xl md:text-6xl leading-tight mb-4 drop-shadow-lg">
                Project Pulse
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-200">
                Simple Project Management for Small Teams
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-8">
                Track progress, manage tasks, and collaborate easily—all in one clean dashboard. Built for teams and learners who want clarity, speed, and results.
              </p>
              <button className="bg-white text-blue-700 font-bold px-8 py-4 rounded shadow-lg hover:bg-blue-100 transition text-xl">
                Go to Dashboard
              </button>
            </div>
            <div className="flex-1 w-full md:pl-8 flex items-center justify-center">
              <div className="bg-white w-full h-64 md:h-96 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden border-4 border-blue-200">
                <img className="w-full h-full object-cover" src="/1218.jpg" alt="Team working" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
