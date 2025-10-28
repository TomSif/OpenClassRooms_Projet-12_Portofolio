import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Composant d'animation typewriter
const TypewriterPlaceholder = ({ text, isVisible }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText("");
      setCurrentIndex(0);
      setIsDeleting(false);
      return;
    }

    let timeout;

    if (isDeleting) {
      // Phase d'effacement
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }, 30); // Vitesse d'effacement plus rapide
      } else {
        // Recommencer l'écriture après une pause
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, 1000); // Pause avant de recommencer
      }
    } else {
      // Phase d'écriture
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 80); // Vitesse de frappe
      } else {
        // Commencer l'effacement après une pause
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause avant d'effacer
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, text, isVisible, isDeleting]);

  return (
    <motion.span
      className="typewriter-placeholder"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      {isVisible && currentIndex <= text.length && (
        <motion.span
          className="typewriter-cursor"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          aria-hidden="true"
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    succeeded: false,
    error: null,
  });
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // 🔑 Endpoint Formspree configuré
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvgwdzjp";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation basique
    if (!formData.email || !formData.message) {
      setStatus({
        submitting: false,
        succeeded: false,
        error: "Tous les champs sont requis",
      });
      return;
    }

    if (formData.message.length < 10) {
      setStatus({
        submitting: false,
        succeeded: false,
        error: "Le message doit contenir au moins 10 caractères",
      });
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        submitting: false,
        succeeded: false,
        error: "Email invalide",
      });
      return;
    }

    setStatus({ submitting: true, succeeded: false, error: null });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ submitting: false, succeeded: true, error: null });
        setFormData({ email: "", message: "" }); // Réinitialiser
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error) {
      setStatus({
        submitting: false,
        succeeded: false,
        error: "Une erreur est survenue. Réessayez plus tard.",
      });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Titre */}
      <h3 className="contact-form__title">Envoyez-moi un message</h3>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email" className="form-group__label">
          Votre email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-group__input"
          placeholder="votre.email@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status.submitting}
        />
      </div>

      {/* Message */}
      <motion.div
        className="form-group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        onViewportEnter={() => !isFocused && setShowTypewriter(true)}
      >
        <label htmlFor="message" className="form-group__label">
          Votre message *
        </label>
        <div className="textarea-container">
          <textarea
            id="message"
            name="message"
            className="form-group__textarea"
            placeholder={
              isFocused || formData.message
                ? "Décrivez votre projet ou posez votre question..."
                : ""
            }
            rows="5"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => {
              setIsFocused(true);
              setShowTypewriter(false);
            }}
            onBlur={() => {
              if (!formData.message) {
                setIsFocused(false);
                setTimeout(() => setShowTypewriter(true), 500);
              }
            }}
            required
            disabled={status.submitting}
          />
          {!isFocused && !formData.message && (
            <div className="textarea-placeholder-overlay">
              <TypewriterPlaceholder
                text="Décrivez votre projet ou posez votre question..."
                isVisible={showTypewriter}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Bouton submit */}
      <button
        type="submit"
        className="btn btn--primary"
        disabled={status.submitting}
      >
        {status.submitting ? "Envoi en cours..." : "Envoyer"}
      </button>

      {/* Messages de feedback */}
      {status.succeeded && (
        <div className="form-message form-message--success" role="alert">
          ✅ Message envoyé avec succès ! Je vous répondrai rapidement.
        </div>
      )}

      {status.error && (
        <div className="form-message form-message--error" role="alert">
          ❌ {status.error}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
