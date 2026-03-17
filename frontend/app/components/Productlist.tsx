"use client";

export default function ProductList({ products }: any) {
  return (
    <div>
      {products.map((p: any) => (
        <div key={p._id} style={{ marginBottom: "20px" }}>
          <h3>{p.name}</h3>
          <p>Price: {p.price}</p>
          <img src={p.image} alt="product" width={200} />
        </div>
      ))}
    </div>
  );
}