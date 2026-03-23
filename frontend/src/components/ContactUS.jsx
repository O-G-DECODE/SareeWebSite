const ContactUS = () => {
  return (
    <section id="contact" className="contact-full-screen">
      {/* Left Panel: The Store Identity */}
      <div className="panel store-panel">
        <div className="panel-content">
          <span className="subtitle">Visit Our Boutique</span>
          <h2 className="brand-title">Sarees By <span>Kalyani</span></h2>
          <div className="address-box">
            <p>Poribazar, Kodungallur</p>
            <p>Thrissur, Kerala – 680671</p>
            <p>India</p>
          </div>
        
        </div>
      </div>

      {/* Right Panel: Digital Connectivity */}
      <div className="panel connect-panel">
        <div className="panel-content">
          <h2 className="section-title">Let's Connect</h2>
          <div className="contact-methods">
            <div className="method-item">
              <small>Call or Email</small>
              <p>+91 9744356414</p>
              <p>sareesbykalyani@gmail.com</p>
            </div>
            
            <div className="social-actions">
              <a href="https://wa.me/919744356414" target="_blank" rel="noopener noreferrer" className="btn-classic whatsapp">
                Message on WhatsApp
              </a>
              <a href="https://www.instagram.com/sarees_by_kalyanii" target="_blank" rel="noopener noreferrer" className="btn-classic instagram">
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactUS;