import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function EditSaree() {
  const [categories, setCategories] = useState([]);
  const [sarees, setSarees] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSareeId, setSelectedSareeId] = useState("");
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    color: "",
    material: "",
    sareeType: "",
    category: "",
    videoId: "",
    stock: "",
    isActive: true
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false); // new loading state

  // Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Fetch sarees when category selected
  useEffect(() => {
    if (!selectedCategory) return;

    fetch(`${API_URL}/admin-home/sarees/${selectedCategory}`)
      .then(res => res.json())
      .then(data => setSarees(data));
  }, [selectedCategory]);

  // Handle saree selection
  const handleSelectSaree = (id) => {
    const saree = sarees.find(s => s._id === id);
    if (!saree) return;

    setSelectedSareeId(id);
    setFormData({
      name: saree.name,
      price: saree.price,
      color: saree.color,
      material: saree.material,
      sareeType: saree.sareeType,
      category: saree.category,
      videoId: saree.videoId || "",
      stock: saree.stock,
      isActive: saree.isActive
    });
    setPreview(saree.image);
    setImage(null);
  };

  // Update handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent multiple clicks
    if (!selectedSareeId) return alert("Select a saree to update");

    setLoading(true); // start spinner

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(
        `${API_URL}/admin-home/updateSaree/${selectedSareeId}`,
        { method: "PUT", body: data }
      );

      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false); // stop spinner
    }
  };

  // Search filter
  const filteredSarees = sarees.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-form-container">
      <h2>Edit Saree</h2>

      {/* Category Select */}
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>

      {/* Search */}
      {selectedCategory && (
        <>
          <input 
            type="text"
            placeholder="Search saree..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => handleSelectSaree(e.target.value)} value={selectedSareeId}>
            <option value="">Select Saree</option>
            {filteredSarees.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </>
      )}

      {selectedSareeId && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />

          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />

          {preview && <img src={preview} alt="" width="120" />}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <input
            value={formData.color}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
          />

          <input
            value={formData.material}
            onChange={(e) => setFormData({...formData, material: e.target.value})}
          />

          <select
            value={formData.sareeType}
            onChange={(e) => setFormData({...formData, sareeType: e.target.value})}
          >
            <option value="Daily">Daily</option>
            <option value="Party">Party</option>
            <option value="Fancy">Fancy</option>
            <option value="Wedding">Wedding</option>
          </select>

          <input
            value={formData.videoId}
            onChange={(e) => setFormData({...formData, videoId: e.target.value})}
          />

          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
          />

          <select
            value={formData.isActive}
            onChange={(e) => setFormData({...formData, isActive: e.target.value === "true"})}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Saree"}
          </button>
        </form>
      )}
    </div>
  );
}

export default EditSaree;