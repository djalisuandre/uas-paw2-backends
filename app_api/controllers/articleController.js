const Article = require("../models/articles");

const getAllArticle = async (req, res) => {
  try {
    // mengambil semua Article dari database
    const article = await Article.find();
    // mengirim respon dengan status 200
    res.status(200).json(article);
  } catch (err) {
    // mengirim respon dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    // mencari Article berdasarkan id yang diberikan di parameter
    const article = await Article.findById(req.params.id);
    // jika Article tidak ditemukan, kirimkan respon 404
    if (!article) return res.status(404).json({ message: "Article not found" });
    // mengirim respon dengan status 200 dan data Article
    res.status(200).json(article);
  } catch (err) {
    // mengirim respon dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

const createArticle = async (req, res) => {
  // membuat instance Article baru dari data yang diterima
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    featured_image: req.body.featured_image,
    coffess_id: req.body.coffess_id,
  });

  try {
    // menyimpan Article baru ke database
    const newArticle = await article.save();
    // mengirim respon dengan status 201 dan data Article baru
    res.status(201).json(newArticle);
  } catch (err) {
    // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
    res.status(400).json({ message: err.message });
  }
};

//

const updateArticle = async (req, res) => {
  try {
    // mencari Article berdasarkan id yang diberikan di parameter
    const article = await Article.findById(req.params.id);
    // jika Article tidak ditemukan, kirimkan respon 404
    if (!article) return res.status(404).json({ message: "Article not found" });

    // memperbarui nama Article jika ada di request body
    if (req.body.title != null) {
      article.title = req.body.title;
    }

    // memperbarui singkatan Article jika ada di rquest body
    if (req.body.content != null) {
      article.content = req.body.content;
    }
    if (req.body.category != null) {
      article.category = req.body.category;
    }
    if (req.body.featured_image != null) {
      article.featured_image = req.body.featured_image;
    }
    if (req.body.coffess_id != null) {
      article.coffess_id = req.body.coffess_id;
    }

    // menyimpan perubahan ke database
    const updateArticle = await article.save();
    // mengirimkan respons dengan status 200 dan data Article yang di perbarui
    res.status(200).json(updateArticle);
  } catch (err) {
    // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
    res.status(400).json({ message: err.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    // jika Article tidak ditemukan, kirimkan respon 404
    if (!article) return res.status(404).json({ message: "Article not found" });

    // menghapus Article dari database
    await article.deleteOne();
    // mengirimkan respon dengan status 200 dan pesan penghapusan
    res.status(200).json({ message: "Article deleted" });
  } catch (err) {
    // mengirimkan respon dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllArticle,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
};
