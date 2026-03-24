import ContactUS from "./ContactUS";
import SareeCards from "./SareeCards";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  return (
    <main className="main-layout" id="home">
      {/* 1. Hero Section: The Grand Entrance */}
      <div id="Alignment">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-subtitle">Handpicked Elegance</span>
          <h1 className="welcome-text">
            Welcome to Sarees By <span>Kalyani</span> 
          </h1>
          <button className="explore-btn" onClick={() => navigate("/explore")}>
            Explore Collection
          </button>
        </div>
      </section>
      </div>

      {/* 2. Categories Section: The Discovery Row */}
      <section className="category-showcase container-padding">
        <div className="section-header">
          <h2 className="section-title">Bestsellers & New Arrivals</h2>
          <div className="title-underline"></div>
        </div>
        <SareeCards />
      </section>

      {/* 3. The Grand Finale: Contact & Store Hub */}
      <ContactUS />
      
    </main>
  );
};

export default Body;