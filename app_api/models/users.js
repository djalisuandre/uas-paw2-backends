const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

usersSchema.pre("save", async function (next) {
  // Jika password tidak diubah, lanjutkan tanpa enkripsi
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // enkripsi password
  next();
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
