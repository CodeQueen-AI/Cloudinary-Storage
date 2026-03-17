"use client";

import { useState } from "react";

export default function UploadForm({ fetchProducts }: any) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", file);

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    });

    setName("");
    setPrice("");
    setFile(null);

    fetchProducts(); // refresh list
  };

  return (
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
  );
}