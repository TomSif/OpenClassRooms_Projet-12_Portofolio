// ===================================
// 🧭 NAVBAR.JSX - VERSION MOBILE SIMPLE
// ===================================
// Fichier : src/components/Navbar.jsx

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
            Accueil
          </a>
          <a href="#about" className="navbar__nav-link">
            À Propos
          </a>
          <a href="#portfolio" className="navbar__nav-link">
            Travaux Sélectionnés
          </a>
          <a href="#works" className="navbar__nav-link">
            Travaux
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

      {/* Mobile Dropdown Menu avec Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="navbar__dropdown"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ transformOrigin: "top" }}
            transition={{
              opacity: { duration: 0.15, ease: "easeOut" },
              scaleY: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <motion.ul
              className="navbar__dropdown-list"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.15,
                  },
                },
              }}
            >
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <a
                  href="#"
                  className="navbar__dropdown-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </a>
              </motion.li>
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <a
                  href="#about"
                  className="navbar__dropdown-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  À Propos
                </a>
              </motion.li>
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <a
                  href="#portfolio"
                  className="navbar__dropdown-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Travaux Sélectionnés
                </a>
              </motion.li>
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <a
                  href="#works"
                  className="navbar__dropdown-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Travaux
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
