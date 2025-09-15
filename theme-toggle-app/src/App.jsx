import React, { useReducer } from "react";

// Reducer function
function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
}

// Initial state
const initialState = {
  theme: "light",
};

function App() {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const isLight = state.theme === "light";

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: isLight ? "#ffffff" : "#121212",
        color: isLight ? "#121212" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h1>Current Theme: {state.theme.toUpperCase()}</h1>
      <button
        onClick={toggleTheme}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: isLight ? "#121212" : "#ffffff",
          color: isLight ? "#ffffff" : "#121212",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
