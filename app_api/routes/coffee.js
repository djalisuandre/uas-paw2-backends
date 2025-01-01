// Mengimpor modul express untuk membuat router
const express = require("express");
// Membuat instance router dari express
const router = express.Router();
// Mengimpor Controller coffee untuk menangani logika bisnis
const coffeeController = require("../controllers/coffeeController");

// import middleware auth and role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", coffeeController.getAllCoffee);
// Mengatur rute POST untuk membuat data coffee baru
router.post("/", authMiddleware, coffeeController.createCoffee);
// Mengatur rute GET untuk mendapatkan data coffee berdasarkan ID
router.get("/:id", authMiddleware, coffeeController.getCoffeeById);
// Mengatur rute PUT untuk memperbarui data coffee berdasarkan ID
router.put("/:id", authMiddleware, coffeeController.updateCoffee);
// Mengatur rute DELETE untuk menghapus data coffee berdasarkan ID
router.delete("/:id", authMiddleware, coffeeController.deleteCoffee);

// Mengeksport router agar dapat digunakan di file lain (misalnya, di app.js)
module.exports = router;
