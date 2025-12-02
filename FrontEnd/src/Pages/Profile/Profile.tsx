import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
export default function Profile() {
  // Example static data
  const user = {
    name: "Dinish Chugtai",
    email: "dinesh@fusionauth.io",
    userId: "00000000-0000-0000-0000-000000000004",
    created: "10/5/2020 12:21 PM MDT",
    lastLogin: "11/6/2020 02:04 PM MST",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-white-700 to-blue-500">
      <Nav />
      <main className="flex-1 px-4 py-8 max-w-2xl mx-auto">
        <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500">
              {/* Placeholder for profile image */}
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black mb-1">{user.name}</h2>
              <div className="text-blue-600 font-semibold">{user.email}</div>
              <div className="text-xs text-gray-500">User Id: {user.userId}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="font-semibold text-gray-700">Created</div>
              <div className="text-sm">{user.created}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Last login</div>
              <div className="text-sm">{user.lastLogin}</div>
            </div>
          </div>
          {/* Registration Table */}
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Registrations</h3>
            <table className="w-full text-sm bg-white rounded shadow">
              <thead>
                <tr className="bg-blue-100 text-blue-700">
                  <th className="p-2">Application</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Roles</th>
                  <th className="p-2">Created</th>
                  <th className="p-2">Last updated</th>
                  <th className="p-2">Last login</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">FusionAuth</td>
                  <td className="p-2">user_manager</td>
                  <td className="p-2">-</td>
                  <td className="p-2">{user.created}</td>
                  <td className="p-2">{user.lastLogin}</td>
                  <td className="p-2">{user.lastLogin}</td>
                  <td className="p-2 flex gap-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                    <button className="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">+ Add registration</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}