import React from "react";
import ContactForm from "./ContactForm";
import PersonalDetails from "./PersonalDetails";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        {/* En-tête */}
        <div className="contact__header">
          <h2 className="contact__title">Get in touch</h2>
          <p className="contact__subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
          </p>
        </div>

        {/* Container flex : PersonalDetails (gauche) + ContactForm (droite) */}
        <div className="contact__content">
          <PersonalDetails />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
