import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Main() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      {isLoggedIn ? (
        <h3>You are logged in! 🎉</h3>
      ) : (
        <h3>Please log in to access your profile.</h3>
      )}
    </main>
  );
}
