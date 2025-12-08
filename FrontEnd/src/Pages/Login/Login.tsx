import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginUser } from "../../api/useProjectPulseApi";
import { useAuth } from "../../hooks/useAuth";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import Toast from "../../Components/Toast/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [loginApi, loginApiState] = useLoginUser();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    if (!email || !password) {
      setToast({ message: "Please enter both email and password", type: 'error' });
      return;
    }
    try {
      const res = await loginApi({ email, password });
      // Backend returns the token as a raw string
      if (typeof res === 'string' && res.length > 0) {
        login(res);

        // Decode token to check if user is admin
        try {
          const base64Url = res.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const decoded = JSON.parse(jsonPayload);

          // Redirect admins to users page, regular users to dashboard
          const role = decoded.roles || decoded.role;
          const normalizedRole = String(role).toLowerCase();

          if (normalizedRole === 'admin' || normalizedRole.includes('admin')) {
            navigate("/users", { state: { showSuccess: true, message: "Welcome back, Admin! 🎉" } });
          } else {
            navigate("/dashboard", { state: { showSuccess: true, message: "Login successful! Welcome back 🎉" } });
          }
        } catch {
          // If token decoding fails, default to dashboard
          navigate("/dashboard", { state: { showSuccess: true, message: "Login successful! Welcome back 🎉" } });
        }
      } else {
        setToast({ message: "Invalid email or password. Please try again.", type: 'error' });
      }
    } catch (err: unknown) {
      const error = err as Record<string, unknown>;
      const errorMessage = error?.message as string;

      // Handle specific error messages from backend
      if (errorMessage?.toLowerCase().includes("password")) {
        setToast({ message: "Incorrect password. Please try again.", type: 'error' });
      } else if (errorMessage?.toLowerCase().includes("email") || errorMessage?.toLowerCase().includes("user")) {
        setToast({ message: "Email not found. Please check your email or sign up.", type: 'error' });
      } else if (errorMessage?.toLowerCase().includes("credentials")) {
        setToast({ message: "Invalid credentials. Please check your email and password.", type: 'error' });
      } else {
        setToast({ message: errorMessage || "Login failed. Please try again.", type: 'error' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-blue-700 rounded-t-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Login</h2>
            <p className="text-blue-100 text-center mb-6">Sign in to access your projects.</p>
          </div>
          <form
            className="bg-white rounded-b-xl shadow-lg p-8"
            onSubmit={handleSubmit}
          >
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
            <button
              className="bg-blue-700 text-white w-full py-2 rounded font-bold shadow hover:bg-blue-800 mb-2"
              type="submit"
              disabled={loginApiState.loading}
            >
              {loginApiState.loading ? "Logging in..." : "Login"}
            </button>
            <div className="flex justify-between text-xs mt-2">
              <Link to="#" className="text-blue-700 hover:underline">Forgot password?</Link>
              <span>
                Don’t have an account?{' '}
                <Link to="/signup" className="text-blue-700 hover:underline">Sign up</Link>
              </span>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
