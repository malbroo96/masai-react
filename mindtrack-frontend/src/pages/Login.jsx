export default function Login({ onLogin }) {
  const handleLogin = () => {
    const fakeUser = { id: 1, name: "Student" };
    onLogin(fakeUser);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white shadow-lg p-6 rounded-lg text-center">
        <h1 className="text-xl font-bold mb-4">MindTrack</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
