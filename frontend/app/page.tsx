"use client";
import { useEffect, useState } from "react";
import UploadForm from "./components/uploadform"
import ProductList from "./components/Productlist"

export default function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cloudinary Image Upload</h1>

      <UploadForm fetchProducts={fetchProducts} />

      <ProductList products={products} />
    </div>
  );
}