const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");

// CREATE PRODUCT
router.post("/", upload.single("image"), productController.createProduct);

// GET PRODUCTS
router.get("/", productController.getAllProducts);

module.exports = router;