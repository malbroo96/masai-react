import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/Header";
import Content from "./components/Content";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access global theme

  return (
    <div style={{ 
      backgroundColor: theme === "light" ? "#f5f5f5" : "#333", 
      color: theme === "light" ? "#000" : "#fff",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1>Basic Context API Example</h1>
      
      {/* Button to toggle theme */}
      <button 
        onClick={toggleTheme} 
        style={{ padding: "10px 20px", marginBottom: "20px", cursor: "pointer" }}
      >
        Toggle Theme
      </button>

      {/* Nested components */}
      <Header />
      <Content />
    </div>
  );
}
