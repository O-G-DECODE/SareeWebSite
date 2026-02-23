require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const hash = bcrypt.hashSync("qwerty", 10);
console.log(hash)
const Admin = require('./models/Admin');
const Category = require("./models/Category");
const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Mongo is connected'))
.catch((err)=> console.log(err))

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
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
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Add Category Saree, 
app.post('/admin-home/AddCategory', async (req, res) => {
  try {
    console.log(req.body);

    const { name, description, image, isActive } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = new Category({
      name,
      description,
      image,
      isActive
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: newCategory
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});
app.post('/admin-home/AddSaree', (req,res)=> {
  try{
    const {name,price,image ,color,material,sareeType,category,videoId,stock,isActive}
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
