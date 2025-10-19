// ===================================
// 🧭 NAVBAR.JSX - VERSION MOBILE SIMPLE
// ===================================
// Fichier : src/components/Navbar.jsx

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef(null);

  // Toggle du menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Fermer le menu lors du redimensionnement (passage en tablet)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation et fermeture du menu
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Navigation vers la section contact
  const handleContact = () => {
    navigate("/#contact");
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar__container">
        {/* Logo/Nom */}
        <a
          href="#"
          className="navbar__logo"
          aria-label="Thomas Portfolio - Accueil"
        >
          <span className="navbar__logo-text">Thomas Portfolio</span>
        </a>

        {/* Burger Menu Button */}
        <button
          className={`navbar__burger ${
            isMenuOpen ? "navbar__burger--open" : ""
          }`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar__burger-line"></span>
          <span className="navbar__burger-line"></span>
          <span className="navbar__burger-line"></span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="navbar__nav">
          <a href="#" className="navbar__nav-link">
            Home
          </a>
          <a href="#about" className="navbar__nav-link">
            About
          </a>
          <a href="#portfolio" className="navbar__nav-link">
            Selected Works
          </a>
          <a href="#works" className="navbar__nav-link">
            Works
          </a>
        </div>

        {/* Contact Button */}
        <a
          href="#contact"
          className="navbar__contact-btn"
          aria-label="Me contacter"
        >
          Contact
        </a>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="navbar__dropdown">
          <ul className="navbar__dropdown-list">
            <li>
              <a
                href="#"
                className="navbar__dropdown-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="navbar__dropdown-link"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="navbar__dropdown-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Selected Works
              </a>
            </li>
            <li>
              <a
                href="#works"
                className="navbar__dropdown-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Works
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
