require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const Admin = require("./models/Admin");
const Category = require("./models/Category");
const Saree = require("./models/Sarees")

const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// ✅ Cloudinary Config
// ===============================
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ===============================
// ✅ Multer Memory Storage
// ===============================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ===============================
// ✅ Middleware
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://sareesbykalyani.vercel.app",
      "https://sareesbykalyani-kf0fryilm-o-g-decodes-projects.vercel.app" 
      ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);app.use(express.json());

// ===============================
// ✅ MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));


// ===============================
// ✅ LOGIN ROUTE
// ===============================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password mismatch",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      adminId: admin._id,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// ===============================
// ✅ GET ALL CATEGORIES
// ===============================
app.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// ✅ GET SAREES BY CATEGORY (Public)
// ===============================
app.get("/sarees/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const sarees = await Saree.find({
      category: categoryId,
      isActive: true
    }).sort({ createdAt: -1 });

    res.json(sarees);

  } catch (error) {
    console.error("GET SAREES ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ ADD CATEGORY (Cloudinary)
// ===============================
app.post("/admin-home/AddCategory", upload.single("image"), async (req, res) => {
  try {
    console.log("🔥 Route Hit");

    const { name, description, isActive } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Case-insensitive duplicate check (better)
    const existing = await Category.findOne({ 
      name: { $regex: new RegExp("^" + name + "$", "i") }
    });

    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const uploadImage = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "saree_categories" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

    const result = await uploadImage();

    const newCategory = new Category({
      name,
      description,
      image: result.secure_url,
      imagePublicId: result.public_id, // ✅ VERY IMPORTANT
      isActive: isActive === "true" || isActive === true,
    });

    await newCategory.save();

    res.status(201).json({
      message: "Category added successfully",
      data: newCategory,
    });

  } catch (error) {
    console.error("ADD CATEGORY ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
// ===============================

// ===============================
// ✅ UPDATE CATEGORY (Replace Image Supported)
// ===============================
app.put("/admin-home/updateCategory/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 🔹 Check duplicate name (case-insensitive, excluding current category)
    if (name) {
      const existing = await Category.findOne({
        name: { $regex: new RegExp("^" + name + "$", "i") },
        _id: { $ne: id }
      });

      if (existing) {
        return res.status(400).json({ message: "Category name already exists" });
      }

      category.name = name.trim();
    }

    // 🔹 Update description
    if (description !== undefined) {
      category.description = description;
    }

    // 🔹 Update status
    if (isActive !== undefined) {
      category.isActive = isActive === "true" || isActive === true;
    }

    // 🔹 If new image uploaded → delete old + upload new
    if (req.file) {

      // Delete old image from Cloudinary
      if (category.imagePublicId) {
        await cloudinary.uploader.destroy(category.imagePublicId);
      }

      const uploadImage = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "saree_categories" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });

      const result = await uploadImage();

      category.image = result.secure_url;
      category.imagePublicId = result.public_id;
    }

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });

  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ ADD SAREE
// ===============================
app.post("/admin-home/addSaree", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      price,
      color,
      material,
      sareeType,
      category,
      videoId,
      stock
    } = req.body;

    // 🔹 Check duplicate name
    const existing = await Saree.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") }
    });

    if (existing) {
      return res.status(400).json({ message: "Saree already exists" });
    }

    // 🔹 Upload image to Cloudinary
    const uploadImage = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "sarees" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

    const result = await uploadImage();

    const newSaree = new Saree({
      name: name.trim(),
      price,
      image: result.secure_url,
      imagePublicId: result.public_id, // 🔥 important
      color,
      material,
      sareeType,
      category,
      videoId,
      stock,
      isActive: true
    });

    await newSaree.save();

    res.status(201).json({
      message: "Saree added successfully",
      data: newSaree
    });

  } catch (error) {
    console.error("ADD SAREE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ GET SAREES BY CATEGORY
// ===============================
app.get("/admin-home/sarees/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const sarees = await Saree.find({
      category: categoryId
    }).sort({ createdAt: -1 });

    res.json(sarees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ UPDATE SAREE
// ===============================
app.put("/admin-home/updateSaree/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      color,
      material,
      sareeType,
      category,
      videoId,
      stock,
      isActive
    } = req.body;

    const saree = await Saree.findById(id);
    if (!saree) {
      return res.status(404).json({ message: "Saree not found" });
    }

    // 🔹 Duplicate check (excluding current)
    if (name) {
      const existing = await Saree.findOne({
        name: { $regex: new RegExp("^" + name + "$", "i") },
        _id: { $ne: id }
      });

      if (existing) {
        return res.status(400).json({ message: "Saree name already exists" });
      }

      saree.name = name.trim();
    }

    saree.price = price ?? saree.price;
    saree.color = color ?? saree.color;
    saree.material = material ?? saree.material;
    saree.sareeType = sareeType ?? saree.sareeType;
    saree.category = category ?? saree.category;
    saree.videoId = videoId ?? saree.videoId;
    saree.stock = stock ?? saree.stock;

    if (isActive !== undefined) {
      saree.isActive = isActive === "true" || isActive === true;
    }

    // 🔥 Replace Image
    // 🔥 Replace Image (delete old + upload new)
if (req.file) {

  // 🔴 Delete old image from Cloudinary
  if (saree.imagePublicId) {
    await cloudinary.uploader.destroy(saree.imagePublicId);
  }

  // 🔵 Upload new image
  const uploadImage = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "sarees" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

  const result = await uploadImage();

  saree.image = result.secure_url;
  saree.imagePublicId = result.public_id; // 🔥 store new public id
}
    await saree.save();

    res.json({ message: "Saree updated successfully", data: saree });

  } catch (error) {
    console.error("UPDATE SAREE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);});