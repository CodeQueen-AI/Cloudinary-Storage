const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "Image missing" });
  }

  try {
    const { name, price } = req.body;

    const product = new Product({
      name,
      price,
      image: req.file.path, // Cloudinary URL
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};