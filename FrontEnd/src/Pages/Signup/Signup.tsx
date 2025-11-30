import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    // Simulate success
    setSuccess("Account created! Redirecting...");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-white-700 to-blue-500">
      <form
        className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 max-w-md w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-500 mb-2 text-center">Sign Up</h2>
        <p className="text-gray-700 text-center mb-6">Create an account to start tracking your projects.</p>
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Optional"
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
          <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500 text-xs mb-4">{error}</div>}
        {success && <div className="text-green-500 text-xs mb-4">{success}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded font-bold shadow hover:bg-blue-600 mb-2"
        >
          Create account
        </button>
        <div className="text-xs text-center mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
}
