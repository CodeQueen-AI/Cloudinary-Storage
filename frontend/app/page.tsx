"use client";

import { useState, useEffect } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Frontend data:", data); // 🔥 CHECK
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔥 SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Select image");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", file);

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    });

    // 🔥 REFETCH PRODUCTS (IMPORTANT)
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">Upload</button>
      </form>

      <h2>Products</h2>

      {Array.isArray(products) ? (
        products.map((p) => (
          <div key={p._id}>
            <img src={p.image} width={150} />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
          </div>
        ))
      ) : (
        <p>No products</p>
      )}
    </div>
  );
}