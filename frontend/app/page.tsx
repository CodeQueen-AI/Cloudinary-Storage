"use client";

import { useState, useEffect } from "react";

export default function ProductPage() {
  // State
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        console.log("API data:", data);

        // Ensure products is always array
        if (Array.isArray(data)) setProducts(data);
        else if (data.products) setProducts(data.products);
        else setProducts([]);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => [...prev, data]); // Add new product to list
        setName("");
        setPrice("");
        setFile(null);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Upload</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Products List */}
      <h2>Products</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              style={{ border: "1px solid #ccc", padding: "10px" }}
            >
              <img src={p.image} alt={p.name} width={150} />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
            </div>
          ))
        ) : (
          <p>No products yet</p>
        )}
      </div>
    </div>
  );
}