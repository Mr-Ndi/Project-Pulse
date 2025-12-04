import { useState, useEffect } from "react";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import { useUpdateUserProfile } from "../../api/useProjectPulseApi";

// Helper function to decode JWT
function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) {
        setUser({
          name: decoded.full_name || "User",
          email: decoded.email || "",
          userId: decoded.user_id || "",
          role: decoded.roles || "user",
        });
      }
    }
  }, []);

  const [updateProfile, updateState] = useUpdateUserProfile();
  // TODO: Add state and handlers for profile update

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-white-700 to-blue-500">
      <Nav />
      <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
        <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 md:p-16 w-full max-w-lg md:max-w-3xl mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black mb-1">{user.name}</h2>
              <div className="text-blue-600 font-semibold">{user.email}</div>
              <div className="text-xs text-gray-500">User ID: {user.userId}</div>
              <div className="text-xs text-gray-500 mt-1">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Role: {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-blue-900">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold text-gray-700">Full Name</div>
                <div className="text-sm">{user.name}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Email</div>
                <div className="text-sm">{user.email}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">User ID</div>
                <div className="text-sm font-mono text-xs">{user.userId}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Role</div>
                <div className="text-sm capitalize">{user.role}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}