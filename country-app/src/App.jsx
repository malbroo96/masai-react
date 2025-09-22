import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/region/europe")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);



  return (
    <div
      style={{
        background: theme === "light" ? "grey" : "white",
        color: theme === "light" ? "black" : "darkblue",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <h1>European Countries</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {countries.map((c) => (
            <li key={c.cca3}>{c.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

