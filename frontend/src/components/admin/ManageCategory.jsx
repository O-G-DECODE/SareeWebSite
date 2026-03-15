import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Populate form when selecting a category
  const handleSelect = (id) => {
    const cat = categories.find((c) => c._id === id);
    if (!cat) return;

    setSelectedCategoryId(id);
    setName(cat.name);
    setDescription(cat.description || "");
    setIsActive(cat.isActive);
  };

  // Edit handler
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedCategoryId) return alert("Select a category to edit");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin-home/updateCategory/${selectedCategoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, isActive }),
      });
      const data = await res.json();
      alert(data.message);
      // Refresh categories
      const updatedCategories = categories.map((c) =>
        c._id === selectedCategoryId ? { ...c, name, description, isActive } : c
      );
      setCategories(updatedCategories);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!selectedCategoryId) return alert("Select a category to delete");
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin-home/deleteCategory/${selectedCategoryId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      setCategories(categories.filter((c) => c._id !== selectedCategoryId));
      setSelectedCategoryId("");
      setName("");
      setDescription("");
      setIsActive(true);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Manage Category</h2>

      <select value={selectedCategoryId} onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      {selectedCategoryId && (
        <form onSubmit={handleEdit} className="admin-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Category"}
          </button>
          <button type="button" onClick={handleDelete} disabled={loading} style={{ marginLeft: "10px", color: "red" }}>
            {loading ? "Deleting..." : "Delete Category"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ManageCategory;