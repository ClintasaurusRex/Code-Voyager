import "../styles/Contact.css"; // We'll create this CSS file next

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-links">
        <a href="mailto:clinthiles1992@gmail.com" className="contact-link">
          <i className="bi bi-envelope-fill emblem"></i>
          <span>Email</span>
        </a>

        <a
          href="https://github.com/ClintasaurusRex"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-github emblem"></i>
          <span>GitHub</span>
        </a>

        <a
          href="https://www.linkedin.com/in/clint-arneson-hiles-"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-linkedin emblem"></i>
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

export default Contact;
