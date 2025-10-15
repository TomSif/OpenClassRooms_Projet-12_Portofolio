import React from "react";
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaDribbble,
  FaBehance,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const PersonalDetails = () => {
  return (
    <div className="personal-details">
      {/* Titre */}
      <h3 className="personal-details__title">Let's discuss your Project</h3>

      {/* 3 Cards cliquables */}
      <div className="personal-details__cards">
        {/* Card 1 : Address → Google Maps */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=Chancelade,+Nouvelle-Aquitaine,+France"
          target="_blank"
          rel="noopener noreferrer"
          className="detail-card"
          aria-label="Voir ma localisation sur Google Maps"
        >
          <div className="detail-card__icon">
            <FaMapMarkerAlt />
          </div>
          <div className="detail-card__content">
            <span className="detail-card__label">Address:</span>
            <p className="detail-card__value">Chancelade, Nouvelle-Aquitaine</p>
          </div>
        </a>

        {/* Card 2 : Email → Mailto */}
        <a
          href="mailto:thomas.sifferle@gmail.com?subject=Contact%20depuis%20votre%20portfolio&body=Bonjour%20Thomas,%0A%0AJe%20vous%20contacte%20concernant..."
          className="detail-card"
          aria-label="M'envoyer un email"
        >
          <div className="detail-card__icon">
            <MdEmail />
          </div>
          <div className="detail-card__content">
            <span className="detail-card__label">My Email:</span>
            <p className="detail-card__value">thomas.sifferle@gmail.com</p>
          </div>
        </a>

        {/* Card 3 : Phone → Tel */}
        <a
          href="tel:+33612345678"
          className="detail-card"
          aria-label="M'appeler"
        >
          <div className="detail-card__icon">
            <MdPhone />
          </div>
          <div className="detail-card__content">
            <span className="detail-card__label">Call Me Now:</span>
            <p className="detail-card__value">+33 6 12 34 56 78</p>
          </div>
        </a>
      </div>

      {/* Réseaux sociaux */}
      <div className="social-links">
        {/* Facebook (carré violet plein) */}
        <a
          href="https://facebook.com/thomas.sifferle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="social-links__item social-links__item--facebook"
        >
          <FaFacebookF />
        </a>

        {/* Dribbble */}
        <a
          href="https://dribbble.com/thomas-sifferle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dribbble"
          className="social-links__item"
        >
          <FaDribbble />
        </a>

        {/* Behance */}
        <a
          href="https://behance.net/thomas-sifferle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Behance"
          className="social-links__item"
        >
          <FaBehance />
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/thomas.sifferle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="social-links__item"
        >
          <FaInstagram />
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/thomas-sifferle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="social-links__item"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
};

export default PersonalDetails;
