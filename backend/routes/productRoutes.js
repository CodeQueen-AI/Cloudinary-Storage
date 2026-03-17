const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");

// Create product
router.post("/", upload.single("image"), productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

module.exports = router;