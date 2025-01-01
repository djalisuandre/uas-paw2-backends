const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

// fungsi register
exports.register = async (req, res) => {
  // Ambil data dari body
  const { name, email, password, role } = req.body;
  try {
    // Cek apakah email sudah terdaftar
    let user = await User.findOne({ email });
    if (user) {
      // Jika email sudah terdaftar, kirim respon error
      return res.status(400).json({
        message: "User already exists",
      });
    }
    // Jika email belum terdaftar
    user = new User({
      name,
      email,
      password,
      role,
    });
    await user.save(); // simpan di mongodb

    // proses token
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // token kadaluarsa dalam 1 jam
    });
    res.json({ token }); // kirim token ke client sebagai respon
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// fungsi login
exports.login = async (req, res) => {
  // Ambil data dari body
  const { email, password } = req.body;
  try {
    // Cek apakah email belum terdaftar
    let user = await User.findOne({ email });
    if (!user) {
      // Jika email belum terdaftar, kirim respon error
      return res.status(400).json({
        message: "Email or password does not exist",
      });
    }
    // Jika email terdaftar
    // Cek apakah password cocok
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Jika password tidak cocok, kirim respon error
      return res.status(400).json({
        message: "Email or password does not exist",
      });
    }
    // Jika email dan password cocok
    // proses buat token jwt
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // token kadaluarsa dalam 1 jam
    });
    res.json({ token }); // kirim token ke client sebagai respon
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// fungsi update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    await User.findByIdAndUpdate(id, { name, email, password, role });
    res.json({
      message: "User updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// fungsi delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
