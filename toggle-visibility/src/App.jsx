import React, { useReducer } from "react";

// Reducer function
function visibilityReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { isVisible: !state.isVisible };
    default:
      return state;
  }
}

// Initial state
const initialState = { isVisible: false };

function App() {
  const [state, dispatch] = useReducer(visibilityReducer, initialState);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f0f0",
      }}
    >
      <button
        onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle Message
      </button>

      {state.isVisible && (
        <h2 style={{ marginTop: "20px", color: "#333" }}>Hello, World!</h2>
      )}
    </div>
  );
}

export default App;
