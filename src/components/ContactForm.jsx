import "./contactForm.css";
import useTypingEffect from "../hooks/typingEffect";
import React from "react";

const ContactForm = () => {
  const typedText = useTypingEffect("Let's Connect!");

  return (
    <div className="contact-container" data-testid="contact-container">
      <h1 className="contact-title">{typedText}</h1>
      <div className="contact-links">
        <a href="mailto:clinthiles1992@gmail.com" className="contact-link">
          <i className="bi bi-envelope-fill"></i>
          <span>Email</span>
        </a>
        <a
          href="https://github.com/ClintasaurusRex"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-github"></i>
          <span>GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/clint-arneson-hiles-042bb0321"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-linkedin"></i>
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
};

export default ContactForm;
