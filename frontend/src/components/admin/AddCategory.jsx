import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false); // new state for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent multiple clicks

    setLoading(true); // start spinner

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("isActive", isActive);

    try {
      const res = await fetch(`${API_URL}/admin-home/AddCategory`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);

      // Optionally reset the form after successful submission
      setName("");
      setDescription("");
      setImage(null);
      setIsActive(true);
    } catch (error) {
      console.error(error);
      alert("Error adding category");
    } finally {
      setLoading(false); // stop spinner
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add Category</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <select
          name="isActive"
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
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