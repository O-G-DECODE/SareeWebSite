const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"]
    },

    image: {
      type: String,
      required: false
    },

    // 🔥 Important for deleting/replacing image in Cloudinary
    imagePublicId: {
      type: String,
      required: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { 
    timestamps: true 
  }
);

// Optional: Make name case-insensitive unique
categorySchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);