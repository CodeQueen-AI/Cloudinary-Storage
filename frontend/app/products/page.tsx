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
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-center mb-8">Products</h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center cursor-pointer">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-gray-300 overflow-hidden w-56 h-72">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-56 object-cover"/>
            <div className="flex justify-between items-center p-3">
              <h4 className="font-medium font-serif">{p.name}</h4>
              <p className="font-semibold font-serif">${p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}