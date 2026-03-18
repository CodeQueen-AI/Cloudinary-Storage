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

      // redirect to products page
      router.push("/products");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Upload Product</h2>

        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "2px solid black",
              outline: "none",
              padding: "5px",
            }}
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "2px solid black",
              outline: "none",
              padding: "5px",
            }}
          />
        </div>

        <div>
          <label>Upload Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files![0])}
            style={{ marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            padding: "8px",
            background: "#3b82f6", // blue
            color: "white",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Upload
          <span style={{ transform: "rotate(-45deg)" }}>➔</span> {/* arrow icon */}
        </button>
      </form>

      {showMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          ✅ Upload Successful
        </div>
      )}
    </div>
  );
}