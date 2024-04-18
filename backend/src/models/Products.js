const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;