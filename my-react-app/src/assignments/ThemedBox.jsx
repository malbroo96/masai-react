import { useState, useEffect } from "react";
import ThemedBox from "./ThemedBox";

function ThemeApp() {
  // Load theme from localStorage or default to "light"
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: theme === "dark" ? "#222" : "#eee",
        color: theme === "dark" ? "#f5f5f5" : "#222",
        fontFamily: "Arial, sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Theme Toggle App</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            backgroundColor: theme === "dark" ? "#f5f5f5" : "#333",
            color: theme === "dark" ? "#333" : "#f5f5f5",
            transition: "all 0.3s ease",
          }}
        >
          Toggle Theme
        </button>
      </div>

      {/* Render ThemedBoxes */}
      <ThemedBox theme={theme} text="This is Box 1" />
      <ThemedBox theme={theme} text="This is Box 2" />
      <ThemedBox theme={theme} text="This is Box 3" />
    </div>
  );
}

export default ThemeApp;
