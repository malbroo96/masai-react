import { useState } from "react";

function AutoCorrectApp() {
  const [inputText, setInputText] = useState("");

  // predefined corrections
  const corrections = {
    teh: "the",
    recieve: "receive",
    adress: "address",
    wierd: "weird",
    thier: "their",
  };

  // split → check each word → replace if needed → rejoin
  const correctedWords = inputText.split(" ").map((word) => {
    return corrections[word.toLowerCase()] || word;
  });

  const correctedText = correctedWords.join(" ");

  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "Arial" }}>
      <h1>AutoCorrect App</h1>

      {/* input field */}
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type something..."
        style={{ padding: "10px", width: "60%", marginBottom: "20px" }}
      />

      {/* live preview */}
      <h3>Corrected Preview:</h3>
      <p style={{ color: "green", fontSize: "18px" }}>{correctedText}</p>
    </div>
  );
}

export default AutoCorrectApp;
