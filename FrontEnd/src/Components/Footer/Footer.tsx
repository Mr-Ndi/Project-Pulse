export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white w-full p-6 md:p-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="w-full text-center mb-4">
          <p className="font-semibold text-sm md:text-base">
            Project Pulse &copy; {new Date().getFullYear()} &mdash; Simple project management for small teams.
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row md:justify-center gap-3 md:gap-8 items-center">
          <a href="https://github.com/Mr-Ndi" className="hover:underline" target="_blank" rel="noopener noreferrer">
            Github
          </a>
          <a href="https://www.linkedin.com/in/ndi" className="hover:underline" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://me-five-iota.vercel.app/" className="hover:underline" target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}
