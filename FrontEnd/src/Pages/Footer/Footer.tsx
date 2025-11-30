export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-blue-500 to-gray-400 text-black w-full p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="w-full text-center mb-4">
          <p className="text-black font-semibold text-sm md:text-base">
            We believe in the power of books to inspire, educate, and transform. Whether you're discovering a new world or diving into a timeless classic, we're here to bring you stories that stay with you long after the last page.
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between gap-3 md:gap-0 text-black items-center">
          <a href="https://github.com/Mr-Ndi" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
            Github
          </a>
          <a href="https://www.linkedin.com/in/ndi" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://me-five-iota.vercel.app/" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
            Portfolio Website
          </a>
        </div>
      </div>
    </footer>
  );
}
