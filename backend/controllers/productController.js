const Product = require("../models/Product");

// 🔥 CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    // ❌ agar image nahi aayi
    if (!req.file) {
      return res.status(400).json({ error: "Image missing" });
    }

    const { name, price } = req.body;

    // ❌ validation
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price required" });
    }

    // ✅ product create
    const product = new Product({
      name: name,
      price: Number(price), // 🔥 string → number
      image: req.file.path, // 🔥 Cloudinary URL
    });

    // ✅ save in DB
    const savedProduct = await product.save();

    console.log("✅ Saved product:", savedProduct);

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("❌ SAVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    console.log("📦 All products:", products);

    res.status(200).json(products);
  } catch (err) {
    console.error("❌ FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};