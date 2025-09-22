import React from "react";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { user, isAuthenticated, logoutUser } = useAuth();

  if (!isAuthenticated) return <p>Please login or signup.</p>;

  return (
    <div>
      <h2>Welcome, {user.username || user.email}</h2>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default Dashboard;
