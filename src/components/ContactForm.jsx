import React, { useState } from "react";

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
      <h3 className="contact-form__title">Send me a message</h3>

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
      <div className="form-group">
        <label htmlFor="message" className="form-group__label">
          Votre message *
        </label>
        <textarea
          id="message"
          name="message"
          className="form-group__textarea"
          placeholder="Décrivez votre projet ou posez votre question..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status.submitting}
        />
      </div>

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
