import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import SareeCards from "./components/SareeCards";
import SareeDetails from "./components/SareeDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/sarees" element={<SareeCards />} />
        <Route path="/sarees/:id" element={<SareeDetails />} /> 
      </Routes>
    </>
  );
}

export default App;
