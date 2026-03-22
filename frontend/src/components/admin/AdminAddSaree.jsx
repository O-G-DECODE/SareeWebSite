import { useState, useEffect } from "react";
import "./AdminAddSaree.css";

const API_URL = import.meta.env.VITE_API_URL;

function AdminAddSaree() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]); // ✅ multiple images
  const [colors, setColors] = useState([]); // ✅ multiple colors
  const [materials, setMaterials] = useState([]); // ✅ multiple materials
  const [sareeType, setSareeType] = useState("");
  const [category, setCategory] = useState("");
  const [videoId, setVideoId] = useState("");
  const [stock, setStock] = useState("");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch categories
  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ handle multi select (checkbox style)
  const handleMultiChange = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

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

    // ✅ append multiple images
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // ✅ append arrays
    colors.forEach((c) => formData.append("colors[]", c));
    materials.forEach((m) => formData.append("materials[]", m));

    try {
      const res = await fetch(`${API_URL}/admin-home/addSaree`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);

      // reset
      setName("");
      setPrice("");
      setImages([]);
      setColors([]);
      setMaterials([]);
      setSareeType("");
      setCategory("");
      setVideoId("");
      setStock("");

    } catch (err) {
      console.error(err);
      alert("Failed to add saree");
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

        {/* ✅ MULTIPLE IMAGES */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
        />

        {/* ✅ COLORS */}
        <div>
          <p>Select Colors:</p>
          {["Red", "Blue", "Green", "Black", "White", "Gold"].map((c) => (
            <label key={c}>
              <input
                type="checkbox"
                checked={colors.includes(c)}
                onChange={() => handleMultiChange(c, colors, setColors)}
              />
              {c}
            </label>
          ))}
        </div>

        {/* ✅ MATERIALS */}
        <div>
          <p>Select Materials:</p>
          {["Silk", "Cotton", "Linen", "Chiffon"].map((m) => (
            <label key={m}>
              <input
                type="checkbox"
                checked={materials.includes(m)}
                onChange={() => handleMultiChange(m, materials, setMaterials)}
              />
              {m}
            </label>
          ))}
        </div>

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