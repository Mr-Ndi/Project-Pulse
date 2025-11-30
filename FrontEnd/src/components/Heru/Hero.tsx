export default function Hero() {
  return (
    <section className="text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

        <div className="flex-1 text-black">
          <h1 className="font-bold text-3xl md:text-6xl leading-tight mb-6">
            Advance your <br />
            engineering skills <br />
            with us.
          </h1>

          <p className="text-base md:text-lg leading-relaxed">
            The Library of Alexandria was one of the most significant libraries of the ancient world.
            It was founded in the 3rd century BCE in Alexandria, Black Egypt, and was said to contain
            hundreds of thousands of scrolls and manuscripts from all over the world.
          </p>

          <p className="text-base md:text-lg mt-6">
            What Knowledge Did We Lose With the Library of Alexandria? <br />
            <span className="font-semibold">Actually none because we got you back.</span>
          </p>
        </div>

        <div className="flex-1 w-full md:pl-8">
          <div className="bg-gray-300 w-full h-60 md:h-96 rounded-lg shadow-lg flex items-center justify-center text-black overflow-hidden">
            <img className="w-full h-full object-cover" src="/1218.jpg" alt="Black student" />
          </div>
        </div>

      </div>
    </section>
  );
}
