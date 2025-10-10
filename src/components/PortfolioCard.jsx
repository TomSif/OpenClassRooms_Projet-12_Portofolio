// ===================================
// 🃏 PORTFOLIOCARD.JSX - COMPOSANT CARD
// ===================================
// Fichier : src/components/PortfolioCard.jsx

import { Link } from "react-router-dom";

const PortfolioCard = ({ project }) => {
  return (
    <Link to={`/project/${project.slug}`} className="portfolio-card">
      {/* Overlay gradient */}
      <div className="portfolio-card__overlay"></div>

      {/* Contenu */}
      <div className="portfolio-card__content">
        {/* Tags technologies */}
        <div className="portfolio-card__tags">
          {project.technologies.map((tech, index) => (
            <span key={index} className="portfolio-card__tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Titre */}
        <h3 className="portfolio-card__title">{project.title}</h3>

        {/* Description courte */}
        <p className="portfolio-card__description">{project.description}</p>

        {/* Lien "Voir le projet" */}
        <div className="portfolio-card__cta">
          <span className="portfolio-card__cta-text">Voir le projet</span>
          <svg
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
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
