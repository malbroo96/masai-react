import React from "react";
import { useToggleItems } from "./hooks/useToggleItems";

function App() {
  const [state, toggleState] = useToggleItems(["A", "B", "C"], 1);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Current Item: {state}</h1>
      <button
        onClick={toggleState}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Toggle Item
      </button>
    </div>
  );
}

export default App;
