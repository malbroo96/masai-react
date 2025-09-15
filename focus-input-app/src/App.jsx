import React, { useRef, useState } from "react";

function App() {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = "#e0f7fa";
      setFocused(true);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Focus Input Example</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          outline: "none",
          marginRight: "10px",
        }}
      />
      <button
        onClick={handleFocus}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Focus Input
      </button>

      {focused && (
        <p style={{ marginTop: "15px", color: "green", fontWeight: "bold" }}>
          Focused!
        </p>
      )}
    </div>
  );
}

export default App;
