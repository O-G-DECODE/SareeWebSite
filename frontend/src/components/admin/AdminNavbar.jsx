import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./AdminHome.css";

function AdminNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  // Logout function
  const handleLogout = () => {
    // Optionally clear any auth tokens here, e.g.,
    // localStorage.removeItem("token");
    window.location.href = "https://sareesbykalyani.vercel.app/";
  };

  return (
    <div className="admin-container">
      {/* Top Bar */}
      <div className="admin-topbar">
        <button
          className="menu-btn"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          ☰
        </button>
        <h2>Admin Panel</h2>
      </div>

      {/* Drawer */}
      <div className={`admin-drawer ${drawerOpen ? "open" : ""}`}>
        <button onClick={() => goTo("/admin-home")}>
          Dashboard
        </button>

        <button onClick={() => goTo("/admin-home/AddCategory")}>
          Add Categories
        </button>

        <button onClick={() => goTo("/admin-home/EditCategory")}>
          Edit Categories
        </button>

        <button onClick={() => goTo("/admin-home/updateSaree")}>
          Update Saree
        </button>

        {/* New Buttons */}
        <button onClick={() => goTo("/admin-home/DeleteCategory")}>
          Delete Category
        </button>

        <button onClick={() => goTo("/admin-home/DeleteSaree")}>
          Delete Saree
        </button>

        {/* Logout */}
        <button onClick={handleLogout} style={{ color: "red" }}>
          Logout
        </button>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="overlay"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Page Content */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminNavbar;