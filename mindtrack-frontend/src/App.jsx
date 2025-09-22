import { useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login onLogin={setUser} />;
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Home user={user} onLogout={() => setUser(null)} />
      <Dashboard user={user} />
    </div>
  );
}
