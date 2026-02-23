import { useState } from "react";
import "./AdminAddSaree.css";

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const bodyData = {
    name,
    description,
    image: image ? image.name : "",
    isActive,
  };

  try {
    const res = await fetch("http://localhost:3000/admin-home/AddCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const data = await res.json();
    alert(data.message || "Category Added");

  } catch (error) {
    console.log(error);
    alert("Error adding category");
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

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default AddCategory;
