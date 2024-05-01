const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  file: {
    type: String,
  },
  login: {
    type: String,
    required: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;