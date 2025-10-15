import React from "react";
import { MdEmail } from "react-icons/md";
import ContactForm from "./ContactForm";
import PersonalDetails from "./PersonalDetails";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        {/* En-tête */}
        <div className="contact__header">
          <h2 className="contact__title">Une question ? Un projet ?</h2>
          <p className="contact__subtitle">
            Je suis disponible pour échanger sur vos besoins en développement
            front-end React. N'hésitez pas à me contacter !
          </p>
        </div>

        {/* CTA Principal - Email direct */}
        <a
          href="mailto:thomas.sifferle@gmail.com?subject=Contact%20depuis%20votre%20portfolio&body=Bonjour%20Thomas,%0A%0AJe%20vous%20contacte%20concernant..."
          className="btn btn--primary btn--large contact__cta"
          aria-label="M'envoyer un email directement"
          rel="noopener"
        >
          <span className="btn__icon">
            <MdEmail />
          </span>
          <span className="btn__text">M'envoyer un email</span>
        </a>

        {/* Séparateur */}
        <div className="contact__divider">
          <span className="contact__divider-line"></span>
          <span className="contact__divider-text">
            ou laissez-moi un message rapide
          </span>
          <span className="contact__divider-line"></span>
        </div>

        {/* Formulaire */}
        <ContactForm />

        {/* Infos complémentaires */}
        <PersonalDetails />
      </div>
    </section>
  );
};

export default Contact;
