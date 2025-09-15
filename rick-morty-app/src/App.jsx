import React, { useState, useEffect, useRef } from "react";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageRef = useRef(1);

  useEffect(() => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ API Response:", data); // Debugging log
        setCharacters(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setError("Failed to fetch characters");
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    pageRef.current = newPage;
    setPage(newPage);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rick and Morty Characters</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
        }}
      >
        {characters.map((char) => (
          <div
            key={char.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={char.image}
              alt={char.name}
              style={{ width: "100px", borderRadius: "50%" }}
            />
            <h3>{char.name}</h3>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {[1, 2, 3, 4, 5].map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: page === p ? "lightblue" : "white",
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
