// ===================================
// 🧭 NAVBAR.JSX - VERSION MOBILE SIMPLE
// ===================================
// Fichier : src/components/Navbar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle du menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo/Nom */}
        <button
          onClick={() => handleNavigation("/")}
          className="navbar__logo"
          aria-label="Thomas Portfolio - Accueil"
        >
          <span className="navbar__logo-text">Thomas Portfolio</span>
        </button>

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
          <a href="/#about" className="navbar__nav-link">
            About
          </a>
          <a href="/selected-works" className="navbar__nav-link">
            Works
          </a>
          <a href="/#portfolio" className="navbar__nav-link">
            Portfolio
          </a>
        </div>

        {/* Contact Button */}
        <a
          href="/#contact"
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
              <button
                onClick={() => handleNavigation("/about")}
                className="navbar__dropdown-link"
              >
                About me
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/selected-works")}
                className="navbar__dropdown-link"
              >
                Selected Works
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/portfolio")}
                className="navbar__dropdown-link"
              >
                Portfolio
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
