// Mengimpor modul express untuk membuat router
const express = require("express");
// Membuat instance router dari express
const router = express.Router();
// Mengimpor Controller coffee untuk menangani logika bisnis
const recipeController = require("../controllers/recipeController");

// import middleware auth and role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", recipeController.getAllRecipe);
// Mengatur rute POST untuk membuat data coffee baru
router.post("/", authMiddleware, recipeController.createRecipe);
// Mengatur rute GET untuk mendapatkan data coffee berdasarkan ID
router.get("/:id", authMiddleware, recipeController.getRecipeById);
// Mengatur rute PUT untuk memperbarui data coffee berdasarkan ID
router.put("/:id", authMiddleware, recipeController.updateRecipe);
// Mengatur rute DELETE untuk menghapus data coffee berdasarkan ID
router.delete("/:id", authMiddleware, recipeController.deleteRecipe);

// Mengeksport router agar dapat digunakan di file lain (misalnya, di app.js)
module.exports = router;
