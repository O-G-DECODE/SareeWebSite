import { useEffect, useState } from "react";

function EditCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isActive, setIsActive] = useState(true);

  // 🔥 Fetch all categories for dropdown
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 When selecting a category
  const handleSelect = (id) => {
    const category = categories.find((cat) => cat._id === id);

    if (category) {
      setSelectedId(category._id);
      setName(category.name);
      setDescription(category.description || "");
      setPreview(category.image);
      setIsActive(category.isActive);
      setImage(null); // reset new image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedId) {
      alert("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isActive", isActive);

    // Only append image if new one selected
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(
        `http://localhost:3000/admin-home/updateCategory/${selectedId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();
      alert(data.message);

    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>Edit Category</h2>

      {/* Dropdown */}
      <select onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {selectedId && (
        <form onSubmit={handleSubmit}>
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

          {/* Show existing image */}
          {preview && (
            <div>
              <p>Current Image:</p>
              <img src={preview} alt="Preview" width="150" />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button type="submit">Update Category</button>
        </form>
      )}
    </div>
  );
}

export default EditCategory;