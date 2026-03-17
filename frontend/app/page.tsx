"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<any>(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    console.log("Fetched products:", data); // debug
    setProducts(Array.isArray(data) ? data : []); // ⚡ .map() fix
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Upload image to Cloudinary
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_uploads"); // your unsigned preset

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djnbxkwu3/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // Handle form submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, image: imageUrl }),
    });

    setName("");
    setPrice("");
    setFile(null);

    fetchProducts(); // refresh product list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cloudinary Upload App</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e: any) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>

      <hr />

      {/* Show products */}
      {Array.isArray(products) && products.length > 0 ? (
        products.map((p) => (
          <div key={p._id} style={{ marginBottom: "20px" }}>
            <h3>{p.name}</h3>
            <p>Price: {p.price}</p>
            <img src={p.image} width={200} />
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}