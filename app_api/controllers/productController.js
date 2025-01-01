const Product = require("../models/products");

const getAllProduct = async (req, res) => {
  try {
    // mengambil semua Product dari database
    const product = await Product.find();
    // mengirim respon dengan status 200
    res.status(200).json(product);
  } catch (err) {
    // mengirim respon dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    // mencari Product berdasarkan id yang diberikan di parameter
    const product = await Product.findById(req.params.id);
    // jika Product tidak ditemukan, kirimkan respon 404
    if (!product) return res.status(404).json({ message: "Product not found" });
    // mengirim respon dengan status 200 dan data Product
    res.status(200).json(product);
  } catch (err) {
    // mengirim respon dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  // membuat instance Product baru dari data yang diterima
  const product = new Product({
    name: req.body.name,
    coffess_id: req.body.coffess_id,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
  });

  try {
    // menyimpan Product baru ke database
    const newProduct = await product.save();
    // mengirim respon dengan status 201 dan data Product baru
    res.status(201).json(newProduct);
  } catch (err) {
    // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
    res.status(400).json({ message: err.message });
  }
};

//

const updateProduct = async (req, res) => {
  try {
    // mencari Product berdasarkan id yang diberikan di parameter
    const product = await Product.findById(req.params.id);
    // jika Product tidak ditemukan, kirimkan respon 404
    if (!Product) return res.status(404).json({ message: "Product not found" });

    // memperbarui nama Product jika ada di request body
    if (req.body.name != null) {
      product.name = req.body.name;
    }

    // memperbarui singkatan Product jika ada di rquest body
    if (req.body.coffess_id != null) {
      product.coffess_id = req.body.coffess_id;
    }
    if (req.body.price != null) {
      product.price = req.body.price;
    }
    if (req.body.quantity != null) {
      product.quantity = req.body.quantity;
    }
    if (req.body.description != null) {
      product.description = req.body.description;
    }

    // menyimpan perubahan ke database
    const updateProduct = await product.save();
    // mengirimkan respons dengan status 200 dan data Product yang di perbarui
    res.status(200).json(updateProduct);
  } catch (err) {
    // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // jika Product tidak ditemukan, kirimkan respon 404
    if (!Product) return res.status(404).json({ message: "Product not found" });

    // menghapus Product dari database
    await product.deleteOne();
    // mengirimkan respon dengan status 200 dan pesan penghapusan
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    // mengirimkan respon dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
