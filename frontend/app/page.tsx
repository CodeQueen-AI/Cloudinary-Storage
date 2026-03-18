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

import { useState, useEffect } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  // 🔥 FETCH PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 SUBMIT FORM
  const handleSubmit = async (e) => {
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
      // ✅ show notification
      setShowMsg(true);

      setTimeout(() => {
        setShowMsg(false);
      }, 2000);

      // reset form
      setName("");
      setPrice("");
      setFile(null);

      fetchProducts();
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
      {/* FORM */}
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

        {/* NAME */}
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

        {/* PRICE */}
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

        {/* FILE */}
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginTop: "5px" }}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          style={{
            padding: "8px",
            background: "black",
            color: "white",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
      </form>

      {/* PRODUCTS */}
      <div style={{ textAlign: "center" }}>
        <h2>Products</h2>

        {products.map((p) => (
          <div key={p._id} style={{ marginBottom: "20px" }}>
            <img src={p.image} width={120} />
            <h4>{p.name}</h4>
            <p>{p.price}</p>
          </div>
        ))}
      </div>

      {/* ✅ SIMPLE NOTIFICATION */}
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