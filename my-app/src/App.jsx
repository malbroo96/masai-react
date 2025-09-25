import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchData } from "./hooks/useFetchData";

function App() {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  
  useFetchData(searchCity); 

  const { data, loading, error } = useSelector((state) => state.api);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(city); 
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Temperature: {data.main.temp} °C</p>
          <p>Weather: {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
