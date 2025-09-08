import { useState } from "react";

function ToggleButton({ label }) {
  // state to track ON/OFF
  const [isOn, setIsOn] = useState(false);

  // toggle function
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={handleToggle}
        style={{
          color: isOn ? "green" : "red",
          fontSize: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {isOn ? "ON" : "OFF"}
      </button>
      {/* Bonus: show label if provided */}
      {label && <span style={{ marginLeft: "10px" }}>{label}</span>}
    </div>
  );
}

export default ToggleButton;
