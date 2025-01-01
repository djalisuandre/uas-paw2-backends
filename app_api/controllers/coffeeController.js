// Mengimpor model Coffee untuk berinteraksi dengan koleksi coffee di MongoDB
const Coffee = require("../models/coffees");

// Mendapatkan semua data coffee
const getAllCoffee = async (req, res) => {
  try {
    // Mengambil semua coffee dari database
    const coffee = await Coffee.find();
    // Mengirimkan respons dengan status 200 dan data coffee
    res.status(200).json(coffee);
  } catch (err) {
    // Mengirimkan respons dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

// Mendapatkan satu coffee berdasarkan ID
const getCoffeeById = async (req, res) => {
  try {
    // Mencari coffee berdasarkan ID yang diberikan di parameter
    const coffee = await Coffee.findById(req.params.id);
    // Jika coffee tidak ditemukan, kirimkan respons 404
    if (!coffee) return res.status(404).json({ message: "Coffee not found" });
    // Mengirimkan respons dengan status 200 dan data coffee
    res.status(200).json(coffee);
  } catch (err) {
    // Mengirimkan respons dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

// Membuat coffee baru
const createCoffee = async (req, res) => {
  // Membuat instance coffee baru dari data yang diterima
  const coffee = new Coffee({
    name: req.body.name,
    origin: req.body.origin,
    flavor_profile: req.body.flavor_profile,
    roast_level: req.body.roast_level,
    description: req.body.description,
  });

  try {
    // Menyimpan coffee baru ke database
    const newCoffee = await coffee.save();
    // Mengirimkan respons dengan status 201 dan data coffee baru
    res.status(201).json(newCoffee);
  } catch (err) {
    // Mengirimkan respons dengan status 400 jika ada kesalahan saat menyimpan
    res.status(400).json({ message: err.message });
  }
};

// Memperbarui data coffee
const updateCoffee = async (req, res) => {
  try {
    // Mencari coffee berdasarkan ID yang diberikan di parameter
    const coffee = await Coffee.findById(req.params.id);
    // Jika coffee tidak ditemukan, kirimkan respons 404
    if (!coffee) return res.status(404).json({ message: "Coffee not found" });

    if (req.body.name != null) {
      coffee.name = req.body.name;
    }
    if (req.body.origin != null) {
      coffee.origin = req.body.origin;
    }
    if (req.body.flavor_profile != null) {
      coffee.flavor_profile = req.body.flavor_profile;
    }
    if (req.body.quantity != null) {
      coffee.roast_level = req.body.roast_level;
    }
    if (req.body.description != null) {
      coffee.description = req.body.description;
    }

    // Menyimpan perubahan ke database
    const updatedCoffee = await coffee.save();
    // Mengirimkan respons dengan status 200 dan data coffee yang diperbarui
    res.status(200).json(updatedCoffee);
  } catch (err) {
    // Mengirimkan respons dengan status 400 jika ada kesalahan saat memperbarui
    res.status(400).json({ message: err.message });
  }
};

// Menghapus coffee berdasarkan ID
const deleteCoffee = async (req, res) => {
  try {
    // Mencari coffee berdasarkan ID yang diberikan di parameter
    const coffee = await Coffee.findById(req.params.id);
    // Jika coffee tidak ditemukan, kirimkan respons 404
    if (!coffee) return res.status(404).json({ message: "Coffee not found" });

    // Menghapus coffee dari database
    await coffee.deleteOne();
    // Mengirimkan respons dengan status 200 dan pesan penghapusan
    res.status(200).json({ message: "Coffee deleted" });
  } catch (err) {
    // Mengirimkan respons dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

// Mengeksport fungsi-fungsi kontroler agar dapat digunakan di file lain
module.exports = {
  getAllCoffee,
  createCoffee,
  getCoffeeById,
  updateCoffee,
  deleteCoffee,
};
