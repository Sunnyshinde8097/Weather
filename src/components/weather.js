import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import cloudAnim from "../Assets/Animatation/Weather-thunder.json";
import sunAnim from "../Assets/Animatation/Weather-thunder.json";
import rainAnim from "../Assets/Animatation/rainy icon.json";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "09ece4d847df5187af4e6d653b63dfc8";

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      console.error(err);
      alert("City not found!");
    }
  };

  // Pick animation based on condition
  const getAnimation = (condition) => {
    if (!condition) return null;
    const main = condition.toLowerCase();
    if (main.includes("cloud")) return cloudAnim;
    if (main.includes("rain")) return rainAnim;
    return sunAnim; // default sunny
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>🌤️ Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          width: "400px",
          padding: "15px",
          fontSize: "20px",
          borderRadius: "8px",
          marginRight: "10px",
        }}
      />
      <button
        onClick={getWeather}
        style={{
          padding: "15px 25px",
          fontSize: "20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {weather && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "32px" }}>{weather.name}</h2>
          <p style={{ fontSize: "22px" }}>Temperature: {weather.main.temp} °C</p>
          <p style={{ fontSize: "22px" }}>
            Condition: {weather.weather[0].description}
          </p>
          <p style={{ fontSize: "22px" }}>Humidity: {weather.main.humidity}%</p>
          <p style={{ fontSize: "22px" }}>
            Wind Speed: {weather.wind.speed} m/s
          </p>

          {/* Animated Weather Icon */}
          <div style={{ width: "200px", margin: "auto", marginTop: "20px" }}>
            <Lottie
              animationData={getAnimation(weather.weather[0].main)}
              loop={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
