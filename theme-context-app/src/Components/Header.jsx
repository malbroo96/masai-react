import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ 
      backgroundColor: theme === "light" ? "#fff" : "#555",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "6px"
    }}>
      <h2>Header Component</h2>
      <p>Current theme: {theme}</p>
    </div>
  );
}
