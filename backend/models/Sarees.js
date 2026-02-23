const mongoose = require("mongoose");

const sareeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    // 🖼️ Photo (image URL or path)
    image: {
      type: String,
      required: true
    },

    // 🎨 Color
    color: {
      type: String,
      required: true
    },

    // 🧵 Material (Silk, Cotton, Linen, etc.)
    material: {
      type: String,
      required: true
    },

    // 👗 Type of saree (Daily, Party, Fancy, Wedding)
    sareeType: {
      type: String,
      enum: ["Daily", "Party", "Fancy", "Wedding"],
      required: true
    },

    // 📂 Category reference
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    // 🎥 Optional YouTube video
    videoId: {
      type: String
    },

    stock: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Saree", sareeSchema);
