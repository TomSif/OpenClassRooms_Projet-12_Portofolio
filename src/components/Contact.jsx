import React from "react";
import ContactForm from "./ContactForm";
import PersonalDetails from "./PersonalDetails";
import useScrollDirection from "../hooks/useScrollDirection";
import FadeInScrollDirection from "../animations/FadeInScrollDirection";

const Contact = () => {
  const scrollDirection = useScrollDirection();
  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        {/* En-tête */}
        <div className="contact__header">
          <FadeInScrollDirection direction={scrollDirection}>
            <h2 className="contact__title">Contactez-moi</h2>
          </FadeInScrollDirection>

          <FadeInScrollDirection direction={scrollDirection} delay={0.2}>
            <p className="contact__subtitle">
              Une question, un projet ou simplement envie d'échanger ? N'hésitez pas à me contacter, je vous répondrai rapidement.
            </p>
          </FadeInScrollDirection>
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
