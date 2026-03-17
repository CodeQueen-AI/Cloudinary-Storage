const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// SAVE product (URL frontend se ayega)
router.post("/", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const product = new Product({ name, price, image });
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // array send ho raha
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;