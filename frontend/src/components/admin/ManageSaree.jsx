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
    color: "",
    material: "",
    sareeType: "",
    category: "",
    videoId: "",
    stock: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch sarees by category
  useEffect(() => {
    if (!selectedCategory) return;
    fetch(`${API_URL}/admin-home/sarees/${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setSarees(data))
      .catch((err) => console.error(err));
  }, [selectedCategory]);

  // Populate form when saree selected
  const handleSelectSaree = (id) => {
    const s = sarees.find((s) => s._id === id);
    if (!s) return;

    setSelectedSareeId(id);
    setFormData({
      name: s.name,
      price: s.price,
      color: s.color,
      material: s.material,
      sareeType: s.sareeType,
      category: s.category,
      videoId: s.videoId || "",
      stock: s.stock,
      isActive: s.isActive,
    });
    setPreview(s.image);
    setImage(null);
  };

  const filteredSarees = sarees.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Edit saree
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedSareeId) return alert("Select a saree to edit");
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("image", image);

      const res = await fetch(`${API_URL}/admin-home/updateSaree/${selectedSareeId}`, {
        method: "PUT",
        body: data,
      });
      const result = await res.json();
      alert(result.message);

      // Update local saree list
      const updatedSarees = sarees.map((s) =>
        s._id === selectedSareeId ? { ...s, ...formData, image: image ? URL.createObjectURL(image) : s.image } : s
      );
      setSarees(updatedSarees);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete saree
  const handleDelete = async () => {
    if (!selectedSareeId) return alert("Select a saree to delete");
    const confirmDelete = window.confirm("Are you sure you want to delete this saree?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin-home/deleteSaree/${selectedSareeId}`, {
        method: "DELETE",
      });
      const result = await res.json();
      alert(result.message);

      setSarees(sarees.filter((s) => s._id !== selectedSareeId));
      setSelectedSareeId("");
      setFormData({
        name: "",
        price: "",
        color: "",
        material: "",
        sareeType: "",
        category: "",
        videoId: "",
        stock: "",
        isActive: true,
      });
      setPreview("");
      setImage(null);
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

      {/* Category Filter */}
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      {/* Search & Saree Select */}
      {selectedCategory && (
        <>
          <input
            type="text"
            placeholder="Search saree..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={selectedSareeId} onChange={(e) => handleSelectSaree(e.target.value)}>
            <option value="">Select Saree</option>
            {filteredSarees.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </>
      )}

      {/* Edit Form */}
      {selectedSareeId && (
        <form onSubmit={handleEdit} className="admin-form">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          {preview && <img src={preview} alt="Saree" width="120" />}
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
          <input
            type="text"
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
          />
          <select
            value={formData.sareeType}
            onChange={(e) => setFormData({ ...formData, sareeType: e.target.value })}
          >
            <option value="Daily">Daily</option>
            <option value="Party">Party</option>
            <option value="Fancy">Fancy</option>
            <option value="Wedding">Wedding</option>
          </select>
          <input
            type="text"
            value={formData.videoId}
            onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
          />
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
          <select
            value={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {/* Buttons */}
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Saree"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            style={{ marginLeft: "10px", color: "red" }}
          >
            {loading ? "Deleting..." : "Delete Saree"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ManageSaree;