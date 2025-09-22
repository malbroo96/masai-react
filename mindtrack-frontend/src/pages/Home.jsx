export default function Home({ user, onLogout }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow rounded mb-4">
      <h1 className="text-xl font-semibold">Welcome, {user.name} 👋</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
