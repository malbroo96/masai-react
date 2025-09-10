import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Home page component
import ProductDetails from "./pages/ProductDetails"; // Product detail page

export default function App() {
  return (
    // Define all routes for the app
    <Routes>
      {/* "/" route shows the Home page with all products */}
      <Route path="/" element={<Home />} />

      {/* "/product/:id" route shows details of a single product */}
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}
