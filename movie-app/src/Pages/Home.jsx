import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "413ad97e"; // your OMDb API key

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found.");
      }
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ marginBottom: "10px" }}>
            <Link to={`/movie/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
