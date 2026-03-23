import About from "./AboutUS";
import ContactUs from "./ContactUS";
import SareeCards from "./SareeCards";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const navigate = useNavigate();
  return (
    <section id="home">
      {/* Hero section */}
      <div className="body-container">
        <h1 className="welcome-text">
          Welcome to Sarees By Kalyani
        </h1>

        <p className="quote-text">
          Timeless elegance woven into every saree
        </p>

        <button className="explore-btn" onClick={()=>navigate("/explore") }>  Explore Collection </button>
      </div>
      <div>
        <h2> Major Categories</h2>
      </div>

      <div className="cards-section">
        <SareeCards />
      </div>
      <div className="Cards-section">
        <About />
      </div>
        <ContactUs />
      <div>
      </div>
    </section>
  );
};

export default Body;
