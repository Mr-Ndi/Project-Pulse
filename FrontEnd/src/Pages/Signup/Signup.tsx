export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [register, registerState] = useRegisterUser();

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
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
    try {
      await register({ name, email, password });
      setSuccess("Account created! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-white-700 to-blue-500">
      <Nav />
      <main className="flex-1 flex items-center justify-center">
        <form
          className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 max-w-md w-full mx-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-2 text-center">Sign Up</h2>
          <p className="text-gray-700 text-center mb-6">Create an account to start tracking your projects.</p>
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          {success && <div className="text-green-500 text-center mb-2">{success}</div>}
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
          <button
            className="bg-blue-500 text-white w-full py-2 rounded font-bold shadow hover:bg-blue-600"
            type="submit"
            disabled={registerState?.loading}
          >
            {registerState?.loading ? "Signing up..." : "Sign Up"}
          </button>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
