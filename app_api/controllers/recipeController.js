const Recipe = require("../models/recipes");

const getAllRecipe = async (req, res) => {
  try {
    // mengambil semua Recipe dari database
    const recipe = await Recipe.find();
    // mengirim respon dengan status 200
    res.status(200).json(recipe);
  } catch (err) {
    // mengirim respon dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    // mencari Recipe berdasarkan id yang diberikan di parameter
    const recipe = await Recipe.findById(req.params.id);
    // jika Recipe tidak ditemukan, kirimkan respon 404
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    // mengirim respon dengan status 200 dan data Recipe
    res.status(200).json(Recipe);
  } catch (err) {
    // mengirim respon dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

const createRecipe = async (req, res) => {
  // membuat instance Recipe baru dari data yang diterima
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    coffess_id: req.body.coffess_id,
    Image: req.body.image,
  });

  try {
    // menyimpan Recipe baru ke database
    const newRecipe = await recipe.save();
    // mengirim respon dengan status 201 dan data Recipe baru
    res.status(201).json(newRecipe);
  } catch (err) {
    // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
    res.status(400).json({ message: err.message });
  }
};

//

const updateRecipe = async (req, res) => {
  try {
    // mencari Recipe berdasarkan id yang diberikan di parameter
    const recipe = await Recipe.findById(req.params.id);
    // jika Recipe tidak ditemukan, kirimkan respon 404
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // memperbarui nama Recipe jika ada di request body
    if (req.body.name != null) {
      recipe.name = req.body.name;
    }

    // memperbarui singkatan Recipe jika ada di rquest body
    if (req.body.description != null) {
      recipe.description = req.body.description;
    }
    if (req.body.ingredients != null) {
      recipe.ingredients = req.body.ingredients;
    }
    if (req.body.instructions != null) {
      recipe.instructions = req.body.instructions;
    }
    if (req.body.coffess_id != null) {
      recipe.coffess_id = req.body.coffess_id;
    }
    if (req.body.image != null) {
      recipe.image = req.body.image;
    }

    // menyimpan perubahan ke database
    const updateRecipe = await recipe.save();
    // mengirimkan respons dengan status 200 dan data Recipe yang di perbarui
    res.status(200).json(updateRecipe);
  } catch (err) {
    // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
    res.status(400).json({ message: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    // jika Recipe tidak ditemukan, kirimkan respon 404
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // menghapus Recipe dari database
    await recipe.deleteOne();
    // mengirimkan respon dengan status 200 dan pesan penghapusan
    res.status(200).json({ message: "Recipe deleted" });
  } catch (err) {
    // mengirimkan respon dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRecipe,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
