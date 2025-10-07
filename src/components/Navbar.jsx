// ===================================
// 🧭 NAVBAR.JSX - VERSION HYBRIDE
// ===================================
// Fichier : src/components/Navbar.jsx

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  // Détecte si on est sur la page d'accueil ou sur une page projet
  const isHomePage = location.pathname === "/";

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Détection de la section active (seulement sur la home)
      if (isHomePage) {
        const sections = ["home", "about", "portfolio", "works", "contact"];

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Navigation hybride
  const handleNavigation = (sectionId) => {
    if (isHomePage) {
      // Sur la home : smooth scroll
      scrollToSection(sectionId);
    } else {
      // Sur une page projet : retour à la home + scroll
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 100);
    }
    setIsMenuOpen(false);
  };

  // Smooth scroll vers une section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About me", id: "about" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Selected Works", id: "works" },
  ];

  return (
    <motion.nav
      className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="navbar__container">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("home")}
          className="navbar__logo"
          aria-label="Thomas Portfolio - Home"
        >
          <span className="navbar__logo-text font-montserrat">
            Thomas Portfolio
          </span>
        </button>

        {/* Desktop Navigation */}
        <ul className="navbar__menu">
          {navItems.map((item) => (
            <li key={item.id} className="navbar__menu-item">
              <button
                onClick={() => handleNavigation(item.id)}
                className={`navbar__link ${
                  isHomePage && activeSection === item.id
                    ? "navbar__link--active"
                    : ""
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => handleNavigation("contact")}
          className="navbar__cta"
        >
          <span className="btn btn-primary">
            Contact
            <svg
              className="navbar__cta-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* Mobile Toggle */}
        <button
          className={`navbar__toggle ${
            isMenuOpen ? "navbar__toggle--open" : ""
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="navbar__mobile-list">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  className="navbar__mobile-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`navbar__mobile-link ${
                      isHomePage && activeSection === item.id
                        ? "navbar__mobile-link--active"
                        : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </motion.li>
              ))}
              <motion.li
                className="navbar__mobile-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <button
                  onClick={() => handleNavigation("contact")}
                  className="navbar__mobile-cta"
                >
                  <span className="btn btn-primary btn-block">
                    Contact
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
