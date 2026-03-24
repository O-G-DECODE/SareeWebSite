import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function ManageSaree() {
  const [categories, setCategories] = useState([]);
  const [sarees, setSarees] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSareeId, setSelectedSareeId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    colors: [],
    materials: [],
    sareeType: "",
    category: "",
    videoId: "",
    stock: "",
    isActive: true,
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  // Fetch sarees by category
  useEffect(() => {
    if (!selectedCategory) return;
    fetch(`${API_URL}/sarees/category/${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setSarees(data))
      .catch(console.error);
  }, [selectedCategory]);

  // Handle saree selection
  const handleSelectSaree = (id) => {
    const s = sarees.find((s) => String(s._id) === String(id));
    if (!s) return;

    setSelectedSareeId(id);
    setFormData({
      name: s.name || "",
      price: s.price || "",
      colors: s.colors || [],
      materials: s.materials || [],
      sareeType: s.sareeType || "",
      category: s.category || "",
      videoId: s.videoId || "",
      stock: s.stock || "",
      isActive: s.isActive ?? true,
    });

    setPreview(s.images?.map((img) => img.url) || []);
    setImages([]);
  };

  // Helper function to handle comma-separated typing
  const handleTypingChange = (field, value) => {
    // Split by comma, trim whitespace, and filter out empty strings
    const arrayValue = value.split(",").map(item => item.trim()).filter(item => item !== "");
    setFormData({ ...formData, [field]: arrayValue });
  };

  const filteredSarees = sarees.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // UPDATE Logic
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedSareeId) return;

    setLoading(true);
    const data = new FormData();

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("sareeType", formData.sareeType);
    data.append("category", formData.category);
    data.append("videoId", formData.videoId);
    data.append("stock", formData.stock);
    data.append("isActive", formData.isActive);

    // Append arrays for backend compatibility
    formData.colors.forEach((c) => data.append("colors[]", c));
    formData.materials.forEach((m) => data.append("materials[]", m));

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const res = await fetch(`${API_URL}/admin-home/updateSaree/${selectedSareeId}`, {
        method: "PUT",
        body: data,
      });
      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE Logic
  const handleDelete = async () => {
    if (!selectedSareeId || !window.confirm("Delete this saree?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin-home/deleteSaree/${selectedSareeId}`, {
        method: "DELETE",
      });
      const result = await res.json();
      alert(result.message);
      setSarees(sarees.filter((s) => s._id !== selectedSareeId));
      setSelectedSareeId("");
      setPreview([]);
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Manage Saree</h2>

      {/* CATEGORY SELECTION */}
      <form className="admin-form">

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select> </form>

      {/* SAREE SELECTION */}
      {selectedCategory && (
        <>
          <form className="admin-form">

            <input
              type="text"
              placeholder="Search saree name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={selectedSareeId} onChange={(e) => handleSelectSaree(e.target.value)}>
              <option value="">Select Saree to Edit</option>
              {filteredSarees.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </form>
        </>
      )}

      {/* EDIT FORM */}
      {selectedSareeId && (
        <form onSubmit={handleEdit} className="admin-form">
          <label>Saree Name:</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label>Price:</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />

          <label>Colors (Comma separated):</label>
          <input
            type="text"
            placeholder="e.g. Red, Black, Gold"
            value={formData.colors.join(", ")}
            onChange={(e) => handleTypingChange("colors", e.target.value)}
          />

          <label>Materials (Comma separated):</label>
          <input
            type="text"
            placeholder="e.g. Silk, Cotton, Linen"
            value={formData.materials.join(", ")}
            onChange={(e) => handleTypingChange("materials", e.target.value)}
          />

          <label>Saree Type / Description:</label>
          <input
            value={formData.sareeType}
            onChange={(e) => setFormData({ ...formData, sareeType: e.target.value })}
          />

          {/* IMAGE SECTION */}
          <div className="image-preview-section">
            <p>Current Images:</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {preview.map((img, i) => (
                <img key={i} src={img} width="80" style={{ borderRadius: '4px', border: '1px solid #ddd' }} alt="preview" />
              ))}
            </div>
          </div>

          <label>Upload New Images (Optional):</label>
          <input type="file" multiple onChange={(e) => setImages(e.target.files)} />

          <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1 }}>
              {loading ? "Updating..." : "Update Saree"}
            </button>
            <button type="button" onClick={handleDelete} className="delete-btn" style={{ flex: 1, backgroundColor: '#c0392b', color: 'white' }}>
              Delete Saree
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ManageSaree;