import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/Nav/Nav";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-7/12">
            <div className="bg-blue-700 rounded-t-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Contact Us</h2>
              <p className="text-blue-100 mb-6">Have questions or feedback about your projects? Reach out and we’ll get back to you.</p>
            </div>
            <form className="bg-white rounded-b-xl shadow-lg p-8" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">How can we help?</label>
                <textarea
                  className="w-full px-3 py-2 border rounded"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-700 text-white w-full py-2 rounded font-bold shadow hover:bg-blue-800"
              >
                Send message
              </button>
              {sent && <div className="text-green-500 text-xs mt-2">Message sent! We'll reply soon.</div>}
            </form>
          </div>
          <div className="w-full md:w-5/12 flex flex-col justify-center items-center md:items-start mt-8 md:mt-0">
            <div className="bg-blue-700 rounded-xl p-8 w-full text-white shadow">
              <div className="mb-2">
                <span className="font-semibold">Email:</span> support@projectpulse.dev
              </div>
              <div className="text-blue-100 text-sm">
                We usually reply within 1–2 business days.
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}