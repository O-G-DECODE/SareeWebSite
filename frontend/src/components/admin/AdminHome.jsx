import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./AdminHome.css";

function AdminHome() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <div className="admin-container">
      {/* Top bar */}
      <div className="admin-topbar">
        <button className="menu-btn" onClick={() => setDrawerOpen(!drawerOpen)}>
          ☰
        </button>
        <h2>Admin Panel</h2>
      </div>

      {/* Drawer */}
      <div className={`admin-drawer ${drawerOpen ? "open" : ""}`}>
        <button onClick={() => goTo("/admin-home")}>Dashboard</button>
        <button onClick={() => goTo("/admin-home/AddCategory")}>
          Manage Categories
        </button>
        <button onClick={() => goTo("/admin-home/EditCategory")}>
          Manage Categories
        </button>
        <button onClick={() => goTo("/admin-home/AddSaree")}>
          Add Saree
        </button>
      </div>

      {drawerOpen && (
        <div className="overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Content */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHome;
