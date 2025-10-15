import React from "react";
import { FaGithub } from "react-icons/fa";
import { CURRENT_STATUS } from "../data/availability";

const Footer = () => {
  // Smooth scroll vers une section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll vers le top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Haut du footer */}
        <div className="footer__top">
          {/* Colonne 1 : Branding */}
          <div className="footer__brand">
            <div className="footer__logo">TS</div>
            <h3 className="footer__brand-name">Thomas Sifferle</h3>
            <p className="footer__brand-tagline">Développeur Front-End React</p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="footer__nav">
            <h4 className="footer__nav-title">Navigation</h4>
            <ul className="footer__nav-list">
              <li>
                <button onClick={scrollToTop} className="footer__nav-link">
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="footer__nav-link"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="footer__nav-link"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("works")}
                  className="footer__nav-link"
                >
                  Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="footer__nav-link"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Availability + GitHub */}
          <div className="footer__info">
            <h4 className="footer__info-title">Availability</h4>

            {/* Badge de disponibilité */}
            <div
              className="availability-badge"
              style={{
                backgroundColor: CURRENT_STATUS.bgColor,
                borderColor: CURRENT_STATUS.borderColor,
              }}
            >
              <span
                className="availability-badge__dot"
                style={{ backgroundColor: CURRENT_STATUS.dotColor }}
              ></span>
              <span
                className="availability-badge__text"
                style={{ color: CURRENT_STATUS.dotColor }}
              >
                {CURRENT_STATUS.text}
              </span>
            </div>

            <p className="availability-badge__subtitle">
              {CURRENT_STATUS.subtitle.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < CURRENT_STATUS.subtitle.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>

            {/* Lien GitHub */}
            <a
              href="https://github.com/TomSif"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__github"
              aria-label="Voir mon code sur GitHub"
            >
              <FaGithub className="footer__github-icon" />
              <span className="footer__github-text">View my code</span>
            </a>
          </div>
        </div>

        {/* Bas du footer : Copyright */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2025 Thomas Sifferle. All rights reserved.
          </p>
          <p className="footer__credits">Développé avec React & Sass</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
