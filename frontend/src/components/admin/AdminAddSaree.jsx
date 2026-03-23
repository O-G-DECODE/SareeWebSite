import { useState, useEffect } from "react";
import "./AdminAddSaree.css";

const API_URL = import.meta.env.VITE_API_URL;

function AdminAddSaree() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  // ✅ Changed to strings for text input
  const [colorsText, setColorsText] = useState(""); 
  const [materialsText, setMaterialsText] = useState("");
  const [sareeType, setSareeType] = useState("");
  const [category, setCategory] = useState("");
  const [videoId, setVideoId] = useState("");
  const [stock, setStock] = useState("");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (images.length === 0) {
      alert("Upload at least one image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("sareeType", sareeType);
    formData.append("category", category);
    formData.append("videoId", videoId);
    formData.append("stock", stock);

    Array.from(images).forEach((file) => {
      formData.append("images", file);
    });

    // ✅ CONVERT TEXT TO ARRAY: Split by comma, trim whitespace, remove empty strings
    const colorsArray = colorsText.split(",").map(c => c.trim()).filter(c => c !== "");
    const materialsArray = materialsText.split(",").map(m => m.trim()).filter(m => m !== "");

    colorsArray.forEach((c) => formData.append("colors", c));
    materialsArray.forEach((m) => formData.append("materials", m));

    try {
      const res = await fetch(`${API_URL}/admin-home/addSaree`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert(data.message);

      // Reset
      setName("");
      setPrice("");
      setImages([]);
      setColorsText("");
      setMaterialsText("");
      setSareeType("");
      setCategory("");
      setVideoId("");
      setStock("");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add saree");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add Saree</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Saree Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
        />

        {/* ✅ NEW TEXT INPUTS FOR COLORS & MATERIALS */}
        <input
          type="text"
          placeholder="Colors (e.g. Red, Blue, Gold)"
          value={colorsText}
          onChange={(e) => setColorsText(e.target.value)}
          required
        />
        <small>Separate colors with commas</small>

        <input
          type="text"
          placeholder="Materials (e.g. Silk, Cotton, Linen)"
          value={materialsText}
          onChange={(e) => setMaterialsText(e.target.value)}
          required
        />
        <small>Separate materials with commas</small>

        <select
          value={sareeType}
          onChange={(e) => setSareeType(e.target.value)}
          required
        >
          <option value="">Select Saree Type</option>
          <option value="Daily">Daily</option>
          <option value="Party">Party</option>
          <option value="Fancy">Fancy</option>
          <option value="Wedding">Wedding</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="YouTube Video ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Saree"}
        </button>
      </form>
    </div>
  );
}

export default AdminAddSaree;