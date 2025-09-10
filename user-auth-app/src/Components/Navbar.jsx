import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", background: "#eee", display: "flex", justifyContent: "space-between" }}>
      <h2>User Auth App</h2>

      {/* Login/Logout button */}
      <button 
        onClick={toggleAuth} 
        style={{ padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </nav>
  );
}
