const mongoose = require("mongoose");

const sareeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    price: {
      type: Number,
      required: true,
    },

    // 🖼️ MULTIPLE IMAGES
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    // 🎨 MULTIPLE COLORS
    colors: [
      {
        type: String,
        trim: true,
      },
    ],

    // 🧵 MULTIPLE MATERIALS
    materials: [
      {
        type: String,
        trim: true,
      },
    ],

    // 👗 Flexible type
    sareeType: {
      type: String,
      trim: true,
    },

    // 📂 CATEGORY
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    // 🎥 Optional video
    videoId: {
      type: String,
    },

    // 📦 STOCK
    stock: {
      type: Number,
      default: 0,
    },

    // ⭐ FUTURE READY
    rating: {
      type: Number,
      default: 0,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    },

    // ✅ ACTIVE
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Saree", sareeSchema);