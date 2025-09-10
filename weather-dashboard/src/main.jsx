import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Enables routing in React
import App from "./App";
// import "./index.css"; // Global CSS
import "./index.css"; // Make sure this matches your file name


// Create the root React element and render the app inside it
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter wraps the app to allow route navigation */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
