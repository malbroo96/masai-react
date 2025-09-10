import { createContext, useState } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

// Provider to wrap app and provide theme state
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is "light"

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
