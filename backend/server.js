require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

const Admin = require("./models/Admin");
const Category = require("./models/Category");
const Saree = require("./models/Sarees");

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
      "https://sareesbykalyani-kf0fryilm-o-g-decodes-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

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
    if (!admin) return res.status(401).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Password mismatch" });

    res.status(200).json({ success: true, message: "Login Successful", adminId: admin._id });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// ✅ GET ALL CATEGORIES (Public)
app.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// ✅ GET ALL CATEGORIES (Admin)
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// ✅ GET ALL SAREES (Public)
app.get("/sarees", async (req, res) => {
  try {
    const sarees = await Saree.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(sarees);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ GET SINGLE SAREE
app.get("/sarees/:id", async (req, res) => {
  try {
    const saree = await Saree.findById(req.params.id);
    if (!saree) return res.status(404).json({ message: "Not found" });
    res.json(saree);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ GET SAREES BY CATEGORY
app.get("/sarees/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const sarees = await Saree.find({ category: categoryId, isActive: true }).sort({ createdAt: -1 });
    res.json(sarees);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ FILTER SAREES
app.get("/sarees/filter", async (req, res) => {
  try {
    const { colors, materials, minPrice, maxPrice } = req.query;

    let query = { isActive: true };

    if (colors) query.colors = { $in: colors.split(",") };
    if (materials) query.materials = { $in: materials.split(",") };
    if (minPrice && maxPrice) query.price = { $gte: minPrice, $lte: maxPrice };

    const sarees = await Saree.find(query);
    res.json(sarees);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ ADD CATEGORY
app.post("/admin-home/AddCategory", upload.array("images", 3), async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: "Images required" });

    const existing = await Category.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") } });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const uploaded = await Promise.all(
      req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "categories" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
            stream.end(file.buffer);
          })
      )
    );

  const newCategory = new Category({
  name,
  description,
  images: uploaded.map((img) => ({
    url: img.secure_url,
    publicId: img.public_id,
  })),
  isActive: isActive === "true" || isActive === true,
});

await newCategory.save();
res.status(201).json({ message: "Category added successfully", data: newCategory });
  } catch (err) {
    console.error("ADD CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ UPDATE CATEGORY
app.put("/admin-home/updateCategory/:id", upload.array("images", 3), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    if (name) {
      const existing = await Category.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") }, _id: { $ne: id } });
      if (existing) return res.status(400).json({ message: "Category name already exists" });
      category.name = name.trim();
    }

    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive === "true" || isActive === true;

    if (req.files && req.files.length > 0) {
  // Delete old images from Cloudinary
  if (category.images?.length) {
    for (const img of category.images) {
      await cloudinary.uploader.destroy(img.publicId);
    }
  }

  // Upload new images
  const uploaded = await Promise.all(
    req.files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "categories" },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        })
    )
  );

  category.images = uploaded.map((img) => ({
    url: img.secure_url,
    publicId: img.public_id,
  }));
}

    await category.save();
    res.json({ message: "Category updated successfully", data: category });
  } catch (err) {
    console.error("UPDATE CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ DELETE CATEGORY
app.delete("/admin-home/deleteCategory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const sarees = await Saree.find({ category: id });
    if (sarees.length > 0) return res.status(400).json({ message: "Cannot delete category with existing sarees" });

  if (category.images?.length) {
  for (const img of category.images) {
    await cloudinary.uploader.destroy(img.publicId);
  }
}

    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("DELETE CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ===============================
// ✅ ADD SAREE
app.post("/admin-home/addSaree", upload.array("images", 5), async (req, res) => {
  try {
    const { name, price, sareeType, category, videoId, stock } = req.body;

    // 1. Robust Array Parsing Helper
    // This handles: "Red", ["Red", "Blue"], and both "colors" or "colors[]" keys
    const parseToArray = (field) => {
      const value = req.body[field] || req.body[`${field}[]`] || [];
      if (Array.isArray(value)) return value;
      return value ? [value] : []; // Wrap single string in array, or return empty
    };

    const colors = parseToArray("colors");
    const materials = parseToArray("materials");

    // 2. Validation
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    // 3. Check Duplicate
    const existing = await Saree.findOne({ 
      name: { $regex: new RegExp("^" + name.trim() + "$", "i") } 
    });
    if (existing) return res.status(400).json({ message: "Saree already exists" });

    // 4. Upload to Cloudinary
    const uploaded = await Promise.all(
      req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "sarees" }, 
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            );
            stream.end(file.buffer);
          })
      )
    );

    // 5. Create Database Entry
    const newSaree = new Saree({
      name: name.trim(),
      slug: slugify(name.trim(), { lower: true, strict: true }),
      price: Number(price), // Ensure it's a number
      images: uploaded.map((img) => ({
        url: img.secure_url,
        publicId: img.public_id,
      })),
      colors: colors,
      materials: materials,
      sareeType,
      category,
      videoId,
      stock: Number(stock) || 0,
      isActive: true,
    });

    await newSaree.save();
    res.status(201).json({ message: "Saree added successfully", data: newSaree });

  } catch (err) {
    console.error("ADD SAREE ERROR:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});
// ===============================
// ✅ UPDATE SAREE
app.put("/admin-home/updateSaree/:id", upload.array("images", 5), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, sareeType, category, videoId, stock, isActive } = req.body;

    // 1. Find the saree first
    const saree = await Saree.findById(id);
    if (!saree) return res.status(404).json({ message: "Saree not found" });

    // 2. Handle Name & Slug (Check for duplicates excluding current ID)
    if (name) {
      const trimmedName = name.trim();
      const existing = await Saree.findOne({ 
        name: { $regex: new RegExp("^" + trimmedName + "$", "i") }, 
        _id: { $ne: id } 
      });
      if (existing) return res.status(400).json({ message: "Saree name already exists" });

      saree.name = trimmedName;
      saree.slug = slugify(trimmedName, { lower: true, strict: true });
    }

    // 3. Robust Array Handling for Colors and Materials
    // We check both "field" and "field[]" to be safe
    const updateArrayField = (fieldName) => {
      const val = req.body[fieldName] || req.body[`${fieldName}[]`];
      if (val === undefined) return; // Don't update if field is missing from request
      saree[fieldName] = Array.isArray(val) ? val : (val ? [val] : []);
    };

    updateArrayField("colors");
    updateArrayField("materials");

    // 4. Update Simple Fields
    if (price !== undefined) saree.price = Number(price);
    if (stock !== undefined) saree.stock = Number(stock);
    if (sareeType !== undefined) saree.sareeType = sareeType;
    if (category !== undefined) saree.category = category;
    if (videoId !== undefined) saree.videoId = videoId;
    
    // Handle Boolean correctly (FormData sends strings)
    if (isActive !== undefined) {
      saree.isActive = isActive === "true" || isActive === true;
    }

    // 5. Image Management
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary before replacing
      if (saree.images && saree.images.length > 0) {
        await Promise.all(
          saree.images.map(img => cloudinary.uploader.destroy(img.publicId))
        );
      }

      // Upload new images
      const uploaded = await Promise.all(
        req.files.map((file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "sarees" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            );
            stream.end(file.buffer);
          })
        )
      );

      saree.images = uploaded.map((img) => ({
        url: img.secure_url,
        publicId: img.public_id,
      }));
    }

    // 6. Save changes
    await saree.save();
    res.json({ message: "Saree updated successfully", data: saree });

  } catch (err) {
    console.error("UPDATE SAREE ERROR:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ===============================
// ✅ DELETE SAREE
app.delete("/admin-home/deleteSaree/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. Find the saree first to get image IDs
    const saree = await Saree.findById(id);
    if (!saree) return res.status(404).json({ message: "Saree not found" });

    // 2. Delete all images from Cloudinary in PARALLEL
    if (saree.images && saree.images.length > 0) {
      try {
        const deletePromises = saree.images.map(img => 
          cloudinary.uploader.destroy(img.publicId)
        );
        await Promise.all(deletePromises);
      } catch (cloudErr) {
        // We log this but continue deleting the DB record 
        // to prevent "ghost" records if Cloudinary fails
        console.error("Cloudinary Cleanup Warning:", cloudErr);
      }
    }

    // 3. Delete from MongoDB
    await Saree.findByIdAndDelete(id);

    res.json({ message: "Saree and associated images deleted successfully" });
  } catch (err) {
    console.error("DELETE SAREE ERROR:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));