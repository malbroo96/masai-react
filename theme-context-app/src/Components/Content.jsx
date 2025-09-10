import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Content() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ 
      backgroundColor: theme === "light" ? "#e0e0e0" : "#444",
      padding: "10px",
      borderRadius: "6px"
    }}>
      <h3>Content Component</h3>
      <p>This component also reacts to the current theme.</p>
    </div>
  );
}
