import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Simulate login failure
    setError("Invalid email or password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-white-700 to-blue-500">
      <form
        className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 max-w-md w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-500 mb-2 text-center">Login</h2>
        <p className="text-gray-700 text-center mb-6">Sign in to access your projects.</p>
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-xs text-blue-500"
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 text-xs mb-4">{error}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded font-bold shadow hover:bg-blue-600 mb-2"
        >
          Login
        </button>
        <div className="flex justify-between text-xs mt-2">
          <Link to="#" className="text-blue-500 hover:underline">Forgot password?</Link>
          <span>
            Don’t have an account?{' '}
            <Link to="#" className="text-blue-500 hover:underline">Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
