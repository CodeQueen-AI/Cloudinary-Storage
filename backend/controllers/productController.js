const Product = require("../models/Product");

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

    console.log("Saved product:", product); // 🔥 IMPORTANT

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};