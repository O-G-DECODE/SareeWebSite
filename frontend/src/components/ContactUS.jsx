const ContactUs = () => {
  return (
    <section id="contact" className="page">
      <h2>Contact Us</h2>

      <p>We’d love to hear from you. Reach out to us directly:</p>

      <div className="contact-links">
  <a
    href="https://wa.me/919744356414"
    target="_blank"
    rel="noopener noreferrer"
    className="contact-btn"
  >
    <img src="images/logo/whatsapp.png" alt="WhatsApp" />
    <span>Chat on WhatsApp</span>
  </a>

  <a
    href="https://www.instagram.com/sarees_by_kalyanii?igsh=MXpodXl0OTN5bzY3"
    target="_blank"
    rel="noopener noreferrer"
    className="contact-btn"
  >
    <img src="images/logo/instagram.png" alt="Instagram" />
    <span>Visit Instagram</span>
  </a>

  <div className="contact-info">
    <p>
      Phone: +91 9744356414 <br />
      Email: sareesbykalyani@gmail.com
    </p>
  </div>
</div>

    </section>
  );
};

export default ContactUs;
