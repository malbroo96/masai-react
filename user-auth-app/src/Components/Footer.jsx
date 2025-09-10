import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Footer() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <footer style={{ padding: "10px", background: "#eee", textAlign: "center" }}>
      {isLoggedIn ? "Welcome, User!" : "Please log in."}
    </footer>
  );
}
