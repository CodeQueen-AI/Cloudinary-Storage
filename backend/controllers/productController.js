const Product = require("../models/Product");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image missing" });
    }

    const { name, price } = req.body;

    const product = new Product({
      name,
      price,
      image: req.file.path, // ✅ Cloudinary URL
    });

    await product.save();

    console.log("Saved product:", product); // 🔥 CHECK

    res.status(201).json(product);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    console.log("All products:", products); // 🔥 CHECK

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
};