"use client";

import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h2>Products</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px",
              width: "150px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img src={p.image} width={120} />
            <h4>{p.name}</h4>
            <p>{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}