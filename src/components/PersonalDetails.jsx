import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaBehance,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const PersonalDetails = () => {
  const [hoveredCard, setHoveredCard] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(isAnimating);
  const animationTimeoutRef = useRef(null);
  const restartTimeoutRef = useRef(null);

  // Maintient la valeur actuelle d'animation dans une ref pour les callbacks
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  // Démarre l'animation automatique après un léger délai
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      isAnimatingRef.current = true;
      setIsAnimating(true);
    }, 1000);

    return () => clearTimeout(initialTimer);
  }, []);

  // Animation séquentielle automatique
  useEffect(() => {
    if (!isAnimating) {
      clearTimeout(animationTimeoutRef.current);
      return;
    }

    const sequence = [
      { index: 0, delay: 900 },
      { index: 1, delay: 900 },
      { index: 2, delay: 900 },
      { index: -1, delay: 20000 },
    ];
    let currentIndex = 0;

    const runStep = () => {
      if (!isAnimatingRef.current) return;

      const { index, delay } = sequence[currentIndex];
      setHoveredCard(index);

      currentIndex = (currentIndex + 1) % sequence.length;
      animationTimeoutRef.current = setTimeout(runStep, delay);
    };

    runStep();

    return () => {
      clearTimeout(animationTimeoutRef.current);
    };
  }, [isAnimating]);

  // Nettoyage global des timers
  useEffect(() => {
    return () => {
      clearTimeout(animationTimeoutRef.current);
      clearTimeout(restartTimeoutRef.current);
    };
  }, []);

  // Survol utilisateur : stoppe l'animation auto
  const handleCardHover = (index) => {
    clearTimeout(animationTimeoutRef.current);
    clearTimeout(restartTimeoutRef.current);
    isAnimatingRef.current = false;
    setIsAnimating(false);
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(-1);
    clearTimeout(restartTimeoutRef.current);
    restartTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = true;
      setIsAnimating(true);
    }, 3000);
  };

  return (
    <motion.div
      className="personal-details"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Titre */}
      <motion.h3
        className="personal-details__title"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Discutons de votre projet
      </motion.h3>

      {/* 3 Cards cliquables */}
      <div className="personal-details__cards">
        {/* Card 1 : Address → Google Maps */}
        <motion.a
          href="https://www.google.com/maps/place/67310+Traenheim/"
          target="_blank"
          rel="noopener noreferrer"
          className={`detail-card${hoveredCard === 0 ? " is-active" : ""}`}
          aria-label="Voir ma localisation sur Google Maps"
          onMouseEnter={() => handleCardHover(0)}
          onMouseLeave={handleCardLeave}
          animate={{
            y: hoveredCard === 0 ? -4 : 0,
            boxShadow:
              hoveredCard === 0
                ? "1px 4px 10px rgba(0, 0, 0, 0.12), 2px 4px 8px rgba(0, 0, 0, 0.18)"
                : "0px 0px 4px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="detail-card__icon">
            <FaMapMarkerAlt />
          </div>
          <div className="detail-card__content">
            <span className="detail-card__label">Adresse :</span>
            <p className="detail-card__value">Traenheim, Bas-Rhin</p>
          </div>
        </motion.a>

        {/* Card 2 : Email → Mailto */}
        <motion.a
          href="mailto:thomas.sifferle@gmail.com?subject=Contact%20depuis%20votre%20portfolio&body=Bonjour%20Thomas,%0A%0AJe%20vous%20contacte%20concernant..."
          className={`detail-card${hoveredCard === 1 ? " is-active" : ""}`}
          aria-label="M'envoyer un email"
          onMouseEnter={() => handleCardHover(1)}
          onMouseLeave={handleCardLeave}
          animate={{
            y: hoveredCard === 1 ? -4 : 0,
            boxShadow:
              hoveredCard === 1
                ? "1px 4px 10px rgba(0, 0, 0, 0.12), 2px 4px 8px rgba(0, 0, 0, 0.18)"
                : "0px 0px 4px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="detail-card__icon">
            <MdEmail />
          </div>
          <div className="detail-card__content">
            <span className="detail-card__label">Mon Email :</span>
            <p className="detail-card__value">thomas.sifferle@gmail.com</p>
          </div>
        </motion.a>

        {/* Card 3 : Phone → Tel */}
        <motion.a
          href="tel:+33777068716"
          className={`detail-card${hoveredCard === 2 ? " is-active" : ""}`}
          aria-label="M'appeler"
          onMouseEnter={() => handleCardHover(2)}
          onMouseLeave={handleCardLeave}
          animate={{
            y: hoveredCard === 2 ? -4 : 0,
            boxShadow:
              hoveredCard === 2
                ? "1px 4px 10px rgba(0, 0, 0, 0.12), 2px 4px 8px rgba(0, 0, 0, 0.18)"
                : "0px 0px 4px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="detail-card__icon">
            <MdPhone />
          </div>
          <div className="detail-card__content">
            <span className="detail-card__label">Appelez-moi :</span>
            <p className="detail-card__value">+33 7 77 06 87 16</p>
          </div>
        </motion.a>
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
    </motion.div>
  );
};

export default PersonalDetails;
