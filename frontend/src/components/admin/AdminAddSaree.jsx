import { useState } from "react";
import "./AdminAddSaree.css"
function AdminAddSaree() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [sareeType, setSareeType] = useState("");
  const [category, setCategory] = useState("");
  const [videoId, setVideoId] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("color", color);
    formData.append("material", material);
    formData.append("sareeType", sareeType);
    formData.append("category", category);
    formData.append("videoId", videoId);
    formData.append("stock", stock);

    console.log("Saree Data:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    alert("Saree submitted (check console)");
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
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <input
        type="text"
        placeholder="Color (e.g. Red)"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Material (e.g. Silk)"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        required
      />

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

      <input
        type="text"
        placeholder="Category ID"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="YouTube Video ID (optional)"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button type="submit">Add Saree</button>
    </form>
  </div>
);

}

export default AdminAddSaree;
