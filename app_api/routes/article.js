// Mengimpor modul express untuk membuat router
const express = require("express");
// Membuat instance router dari express
const router = express.Router();
// Mengimpor Controller coffee untuk menangani logika bisnis
const articleController = require("../controllers/articleController");

// import middleware auth and role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", articleController.getAllArticle);
// Mengatur rute POST untuk membuat data coffee baru
router.post("/", authMiddleware, articleController.createArticle);
// Mengatur rute GET untuk mendapatkan data coffee berdasarkan ID
router.get("/:id", authMiddleware, articleController.getArticleById);
// Mengatur rute PUT untuk memperbarui data coffee berdasarkan ID
router.put("/:id", authMiddleware, articleController.updateArticle);
// Mengatur rute DELETE untuk menghapus data coffee berdasarkan ID
router.delete("/:id", authMiddleware, articleController.deleteArticle);

// Mengeksport router agar dapat digunakan di file lain (misalnya, di app.js)
module.exports = router;
