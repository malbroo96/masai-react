import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // Product data
  const [error, setError] = useState(null); // Error message

  useEffect(() => {
    // Fetch single product by ID
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to fetch product");
      });
  }, [id]);

  // Show error if API fails
  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;

  // Show loading while fetching
  if (!product) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container">
      <h2>{product.title}</h2>

      {/* Product image */}
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }} 
      />

      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>
    </div>
  );
}
