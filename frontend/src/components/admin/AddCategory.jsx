import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // ✅ multiple images
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isActive", isActive);

    // ✅ append multiple images
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const res = await fetch(`${API_URL}/admin-home/AddCategory`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);

      // reset
      setName("");
      setDescription("");
      setImages([]);
      setIsActive(true);
    } catch (error) {
      console.error(error);
      alert("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add Category</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ✅ MULTIPLE IMAGE INPUT */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
          required
        />

        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value === "true")}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}

export default AddCategory;