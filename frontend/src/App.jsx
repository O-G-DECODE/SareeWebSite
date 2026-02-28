import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import SareeCards from "./components/SareeCards";
import SareeDetails from "./components/SareeDetails";
import About from "./components/AboutUS";
import ContactUs from "./components/ContactUS";
import Login from "./components/admin/Login";
import AdminHome from "./components/admin/AdminHome";
import AdminAddSaree from "./components/admin/AdminAddSaree";
import AdminNavbar from "./components/admin/AdminNavbar";
import AddCategory from "./components/admin/AddCategory";
import EditCategory from "./components/admin/EditCategory";

function App() {
  const location = useLocation();

  // routes where navbar should be hidden
  const hideNavbarRoutes = ["/admin-home","/admin-home/AddCategory"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
    
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/sarees" element={<SareeCards />} />
        <Route path="/sarees/:id" element={<SareeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-home" element={<AdminNavbar />}>
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-home/AddSaree" element={<AdminAddSaree />} />
          <Route path="/admin-home/AddCategory" element={<AddCategory />} />
          <Route path="/admin-home/EditCategory" element={<EditCategory />} />

        </Route>
        
      </Routes>

    </>
  );
}

export default App;
