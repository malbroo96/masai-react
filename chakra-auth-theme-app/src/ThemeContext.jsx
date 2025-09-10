import React, { createContext, useState } from "react";

// Create context
export const ThemeContext = createContext();

// Provider to wrap the app
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // default light theme

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
