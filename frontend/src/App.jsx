import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import SareeCards from "./components/SareeCards";
import Login from "./components/admin/Login";
import AdminNavbar from "./components/admin/AdminNavbar";

import AdminAddSaree from "./components/admin/AdminAddSaree";
import AddCategory from "./components/admin/AddCategory";
import ManageCategory from "./components/admin/ManageCategory";
import ManageSaree from "./components/admin/ManageSaree";

import CategorySarees from "./components/CategorySarees";

function App() {
  const location = useLocation();

  // hide navbar on all admin pages
  const shouldHideNavbar = location.pathname.startsWith("/admin-home");

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/sarees" element={<SareeCards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saree/:id" element={<CategorySarees />} />

        {/* Admin routes */}
        <Route path="/admin-home" element={<AdminNavbar />}>
          <Route index element={<AdminAddSaree />} />
          <Route path="add-saree" element={<AdminAddSaree />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="manage-category" element={<ManageCategory />} />
          <Route path="manage-saree" element={<ManageSaree />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;