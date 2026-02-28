import { useState } from "react";

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form...");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("isActive", isActive);

    try {
      const res = await fetch(
        "http://localhost:3000/admin-home/AddCategory",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      alert(data.message);

    } catch (error) {
      console.error(error);
      alert("Error adding category");
    }
  };

  return (
    <div>
      <h2>Add Category</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default AddCategory;