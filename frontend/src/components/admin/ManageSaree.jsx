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

  // fetch categories
  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  // fetch sarees
  useEffect(() => {
    if (!selectedCategory) return;

fetch(`${API_URL}/sarees/category/${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setSarees(data))
      .catch(console.error);
  }, [selectedCategory]);

  // select saree
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

  // ✅ FIXED
  setPreview(s.images?.map((img) => img.url) || []);
  setImages([]);
};

  // multi select toggle
  const toggleValue = (value, list, key) => {
    const updated = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];

    setFormData({ ...formData, [key]: updated });
  };

  const filteredSarees = sarees.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // UPDATE
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

    // arrays
    formData.colors.forEach((c) => data.append("colors[]", c));
    formData.materials.forEach((m) => data.append("materials[]", m));

    // images
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const res = await fetch(
        `${API_URL}/admin-home/updateSaree/${selectedSareeId}`,
        {
          method: "PUT",
          body: data,
        }
      );

      const result = await res.json();
      alert(result.message);

    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    if (!selectedSareeId) return;

    if (!window.confirm("Delete this saree?")) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/admin-home/deleteSaree/${selectedSareeId}`,
        {
          method: "DELETE",
        }
      );

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

      {/* CATEGORY */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* SEARCH */}
      {selectedCategory && (
        <>
          <input
            type="text"
            placeholder="Search saree..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedSareeId}
            onChange={(e) => handleSelectSaree(e.target.value)}
          >
            <option value="">Select Saree</option>
            {filteredSarees.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </>
      )}

      {/* FORM */}
      {selectedSareeId && (
        <form onSubmit={handleEdit} className="admin-form">

          <input
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />

          {/* IMAGE PREVIEW */}
          <div>
            {preview.map((img, i) => (
              <img key={i} src={img} width="80" />
            ))}
          </div>

          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />

          {/* COLORS */}
          <div>
            <p>Colors:</p>
            {["Red", "Blue", "Green", "Black", "Gold"].map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={formData.colors.includes(c)}
                  onChange={() =>
                    toggleValue(c, formData.colors, "colors")
                  }
                />
                {c}
              </label>
            ))}
          </div>

          {/* MATERIALS */}
          <div>
            <p>Materials:</p>
            {["Silk", "Cotton", "Linen"].map((m) => (
              <label key={m}>
                <input
                  type="checkbox"
                  checked={formData.materials.includes(m)}
                  onChange={() =>
                    toggleValue(m, formData.materials, "materials")
                  }
                />
                {m}
              </label>
            ))}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>

          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </form>
      )}
    </div>
  );
}

export default ManageSaree;