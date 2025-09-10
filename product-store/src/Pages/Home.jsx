
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  // State variables
  const [products, setProducts] = useState([]); // All products fetched from API
  const [filteredProducts, setFilteredProducts] = useState([]); // Products after filtering/sorting
  const [categories, setCategories] = useState([]); // Unique product categories
  const [selectedCategory, setSelectedCategory] = useState("all"); // Selected category
  const [sortOrder, setSortOrder] = useState(""); // Price sort order: "asc" or "desc"

  useEffect(() => {
    // Fetch all products from API on component mount
    axios.get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);

        // Get unique categories for filtering dropdown
        const uniqueCategories = [...new Set(res.data.products.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    // Filter products by selected category
    const filtered = category === "all" 
      ? products 
      : products.filter(p => p.category === category);

    // Apply current sorting if any
    if (sortOrder) {
      filtered.sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  // Handle sorting by price
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    // Sort filtered products
    const sorted = [...filteredProducts].sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
    setFilteredProducts(sorted);
  };

  return (
    <div className="container">
      <h1>Product Store</h1>

      {/* Filter dropdown */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">All Categories</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      {/* Sort dropdown */}
      <select value={sortOrder} onChange={handleSortChange}>
        <option value="">Sort by Price</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>

      {/* Products list */}
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            {/* Product thumbnail */}
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>

            {/* Link to product details page */}
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
