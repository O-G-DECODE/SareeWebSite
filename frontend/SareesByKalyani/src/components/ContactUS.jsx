const ContactUs = () => {
  return (
    <section id="contact" className="page">
      <h1>Contact Us</h1>

      <p>We’d love to hear from you. Reach out to us directly:</p>

      <div className="contact-links">
        <div>
            <a
          href="https://wa.me/9744356414"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn whatsapp"
        >
          💬 Chat on WhatsApp
        </a>

        </div>
        <div>
            <a
          href="https://www.instagram.com/sarees_by_kalyanii?igsh=MXpodXl0OTN5bzY3"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn instagram"
        >
          📸 Visit Instagram
        </a>

        </div>
        
      </div>
    </section>
  );
};

export default ContactUs;
