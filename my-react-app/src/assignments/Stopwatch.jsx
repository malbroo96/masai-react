import { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [seconds, setSeconds] = useState(0); // elapsed time
  const [running, setRunning] = useState(false); // stopwatch running state
  const [target, setTarget] = useState(10); // default target time
  const intervalRef = useRef(null); // store interval ID

  // Sound trigger (can use any MP3 URL)
  const soundUrl = "https://www.soundjay.com/button/beep-07.mp3";
  const audioRef = useRef(new Audio(soundUrl));

  // Start the stopwatch
  const start = () => {
    if (!running) {
      setRunning(true);
    }
  };

  // Stop the stopwatch
  const stop = () => {
    setRunning(false);
  };

  // Reset the stopwatch
  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  // useEffect for counting seconds
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // cleanup
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // useEffect to check for target
  useEffect(() => {
    if (seconds === Number(target)) {
      // Play sound
      audioRef.current.play().catch(() => {
        console.log("Beep! Target reached."); // fallback if audio fails
      });
    }
  }, [seconds, target]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Stopwatch</h1>
      <h2>{seconds} seconds</h2>

      {/* Target input */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Target Time (seconds):{" "}
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            style={{ padding: "5px", width: "60px" }}
          />
        </label>
      </div>

      {/* Buttons */}
      <div>
        <button
          onClick={start}
          style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer" }}
        >
          Start
        </button>
        <button
          onClick={stop}
          style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer" }}
        >
          Stop
        </button>
        <button
          onClick={reset}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
