import SareeCards from "./SareeCards";

const Body = () => {
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

        <button className="explore-btn">
          Explore Collection
        </button>
      </div>
      <div>
        <h2> Major Categories</h2>
      </div>

      <div className="cards-section">
        <SareeCards />
      </div>
    </section>
  );
};

export default Body;
