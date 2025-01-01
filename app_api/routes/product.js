// Mengimpor modul express untuk membuat router
const express = require("express");
// Membuat instance router dari express
const router = express.Router();
// Mengimpor Controller product untuk menangani logika bisnis
const path = require("path");
const productController = require(path.resolve(
  __dirname,
  "../controllers/productController"
));

// import middleware auth and role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", productController.getAllProduct);
// Mengatur rute POST untuk membuat data product baru
router.post("/", authMiddleware, productController.createProduct);
// Mengatur rute GET untuk mendapatkan data product berdasarkan ID
router.get("/:id", authMiddleware, productController.getProductById);
// Mengatur rute PUT untuk memperbarui data product berdasarkan ID
router.put("/:id", authMiddleware, productController.updateProduct);
// Mengatur rute DELETE untuk menghapus data product berdasarkan ID
router.delete("/:id", authMiddleware, productController.deleteProduct);

// Mengeksport router agar dapat digunakan di file lain (misalnya, di app.js)
module.exports = router;
