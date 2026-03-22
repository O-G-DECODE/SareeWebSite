import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([]); // ✅ new

  // Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Populate form
  const handleSelect = (id) => {
    const cat = categories.find((c) => c._id === id);
    if (!cat) return;

    setSelectedCategoryId(id);
    setName(cat.name);
    setDescription(cat.description || "");
    setIsActive(cat.isActive);
    setImages([]); // reset new upload
  };

  // ✅ EDIT WITH FORM DATA
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedCategoryId) return alert("Select a category");

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isActive", isActive);

    // append images if selected
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const res = await fetch(
        `${API_URL}/admin-home/updateCategory/${selectedCategoryId}`,
        {
          method: "PUT",
          body: formData, // ✅ no headers
        }
      );

      const data = await res.json();
      alert(data.message);

      // refresh list
      const updated = categories.map((c) =>
        c._id === selectedCategoryId
          ? { ...c, name, description, isActive }
          : c
      );

      setCategories(updated);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE (no change)
  const handleDelete = async () => {
    if (!selectedCategoryId) return alert("Select a category");

    if (!window.confirm("Delete this category?")) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/admin-home/deleteCategory/${selectedCategoryId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      alert(data.message);

      setCategories(categories.filter((c) => c._id !== selectedCategoryId));

      setSelectedCategoryId("");
      setName("");
      setDescription("");
      setIsActive(true);
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
      <h2>Manage Category</h2>

      {/* SELECT */}
      <select
        value={selectedCategoryId}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
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

          {/* ✅ MULTIPLE IMAGE UPDATE */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
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

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            style={{ marginLeft: "10px", color: "red" }}
          >
            {loading ? "Deleting..." : "Delete Category"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ManageCategory;