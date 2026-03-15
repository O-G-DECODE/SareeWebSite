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

  // Logout
  const handleLogout = () => {
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

        <button onClick={() => goTo("/admin-home/add-category")}>
          Add Category
        </button>

        <button onClick={() => goTo("/admin-home/manage-category")}>
          Manage Category
        </button>

        <button onClick={() => goTo("/admin-home/add-saree")}>
          Add Saree
        </button>

        <button onClick={() => goTo("/admin-home/manage-saree")}>
          Manage Saree
        </button>

        <button
          onClick={handleLogout}
          style={{ color: "red", marginTop: "20px" }}
        >
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