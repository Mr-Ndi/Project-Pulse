export default function Profile() {
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    joined: "March 2024",
  };

  const stats = {
    total: 3,
    notStarted: 1,
    inProgress: 1,
    completed: 1,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-white-700 to-blue-500">
      <main className="flex-1 px-4 py-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-blue-500 mb-8 text-center">Profile</h1>
        <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Account Info</h2>
          <div className="mb-2"><span className="font-semibold">Name:</span> {user.name}</div>
          <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
          <div><span className="font-semibold">Joined:</span> {user.joined}</div>
        </div>
        <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-black mb-4">Project Stats</h2>
          <div className="mb-2"><span className="font-semibold">Total projects:</span> {stats.total}</div>
          <div className="mb-2"><span className="font-semibold">Not started:</span> {stats.notStarted}</div>
          <div className="mb-2"><span className="font-semibold">In progress:</span> {stats.inProgress}</div>
          <div><span className="font-semibold">Completed:</span> {stats.completed}</div>
        </div>
      </main>
    </div>
  );
}