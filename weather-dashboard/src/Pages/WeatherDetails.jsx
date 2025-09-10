import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherDetails() {
  const { city } = useParams(); // Get city name from URL
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "7886a3fb1bdde58475f8528a6d2a148e"; // Your free API key

  useEffect(() => {
    // Fetch current weather data for the city
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((res) => setWeather(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch weather. Check the city name.");
      });
  }, [city]);

  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;
  if (!weather) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container">
      <h2>Weather in {weather.name}</h2>
      <div className="weather-card">
        <p>Temperature: {weather.main.temp} °C</p>
        <p>Humidity: {weather.main.humidity} %</p>
        <p>Condition: {weather.weather[0].description}</p>
      </div>

      {/* Google Maps */}
      <iframe
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${city}`}
      ></iframe>
    </div>
  );
}
