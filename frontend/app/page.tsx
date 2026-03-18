// "use client";

// import { useState, useEffect } from "react";

// export default function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [file, setFile] = useState(null);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");

//   // 🔥 FETCH PRODUCTS
//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Frontend data:", data); // 🔥 CHECK
//         setProducts(data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // 🔥 SUBMIT FORM
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) return alert("Select image");

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("image", file);

//     await fetch("http://localhost:5000/api/products", {
//       method: "POST",
//       body: formData,
//     });

//     // 🔥 REFETCH PRODUCTS (IMPORTANT)
//     const res = await fetch("http://localhost:5000/api/products");
//     const data = await res.json();
//     setProducts(data);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Upload Product</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <button type="submit">Upload</button>
//       </form>

//       <h2>Products</h2>

//       {Array.isArray(products) ? (
//         products.map((p) => (
//           <div key={p._id}>
//             <img src={p.image} width={150} />
//             <h3>{p.name}</h3>
//             <p>{p.price}</p>
//           </div>
//         ))
//       ) : (
//         <p>No products</p>
//       )}
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Select image");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 2000);

      setName("");
      setPrice("");
      setFile(null);

      router.push("/products");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-80 flex flex-col gap-6"
      >
        {/* Heading */}
        <h2 className="text-center text-gray-500 font-light text-2xl">
          Upload Product
        </h2>

        {/* Product Name */}
        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b-2 border-gray-300 outline-none p-1 text-base"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border-b-2 border-gray-300 outline-none p-1 text-base"
          />
        </div>

        {/* Choose File */}
        <div>
          <label className="block mb-1">Upload Image</label>
          <label className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-200 transition">
            {file ? file.name : "Choose File"}
            <input
              type="file"
              onChange={(e) => setFile(e.target.files![0])}
              className="hidden"
            />
          </label>
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition"
        >
          Upload <span className="rotate-[-45deg]">➔</span>
        </button>
      </form>

      {/* Notification */}
      {showMsg && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition">
          ✅ Upload Successful
        </div>
      )}
    </div>
  );
}