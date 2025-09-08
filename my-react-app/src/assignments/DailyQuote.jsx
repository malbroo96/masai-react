import { useState, useEffect } from "react";

function DailyQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch a new quote
  const fetchQuote = async () => {
    setLoading(true); // start loading
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote.");
      setAuthor("");
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Fetch quote on component mount and every 30 seconds
  useEffect(() => {
    fetchQuote(); // initial fetch
    const interval = setInterval(fetchQuote, 30000); // 30 seconds
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        width: "60%",
        margin: "50px auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Daily Quote</h1>

      {loading ? (
        <p style={{ color: "gray", fontStyle: "italic" }}>Loading...</p>
      ) : (
        <>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>"{quote}"</p>
          <p style={{ fontSize: "16px", color: "#555" }}>- {author}</p>
        </>
      )}

      <button
        onClick={fetchQuote}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#333",
          color: "#fff",
        }}
      >
        Get New Quote
      </button>
    </div>
  );
}

export default DailyQuote;
