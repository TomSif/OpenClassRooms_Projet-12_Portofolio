// ===================================
// 🧩 COMPONENT - PortfolioCard.jsx
// ===================================
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function PortfolioCard({ project }) {
  // Vérifications de sécurité
  if (!project) {
    console.error("PortfolioCard: project prop is undefined");
    return null;
  }

  // Générer un slug si il n'existe pas
  const projectSlug =
    project.slug ||
    (project.title || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Supprimer les caractères spéciaux
      .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
      .trim();

  // Valeurs par défaut pour éviter les erreurs
  const title = project.title || "Projet sans titre";
  const category = project.category || "Non catégorisé";
  const description = project.description || "Pas de description disponible";
  const thumbnail = project.thumbnail || "/images/placeholder.jpg";
  const technologies = project.technologies || [];
  const details = project.details || {};

  return (
    <article className="portfolio-card">
      {/* IMAGE CLIQUABLE AVEC INDICATION AU HOVER */}
      <Link
        to={`/project/${projectSlug}`}
        className="portfolio-card__image-wrapper"
        aria-label={`Voir les détails du projet ${title}`}
      >
        <img
          src={thumbnail}
          alt={`Aperçu du projet ${title}`}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
            console.warn(`Image non trouvée: ${thumbnail}`);
          }}
        />
      </Link>

      {/* CONTENU DE LA CARD */}
      <div className="portfolio-card__content">
        {/* Badge catégorie */}
        <span
          className="portfolio-card__category"
          aria-label="Catégorie du projet"
        >
          {category}
        </span>

        {/* Titre */}
        <h3 className="portfolio-card__title">{title}</h3>

        {/* Description */}
        <p className="portfolio-card__description">{description}</p>

        {/* Technologies (3 premières + compteur) */}
        {technologies.length > 0 && (
          <div
            className="portfolio-card__tech"
            aria-label="Technologies utilisées"
          >
            {technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="tech-badge">
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span
                className="tech-badge more"
                aria-label={`${technologies.length - 3} autres technologies`}
              >
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer avec tous les CTA groupés */}
        <div className="portfolio-card__footer">
          <Link
            to={`/project/${projectSlug}`}
            className="portfolio-card__project-btn"
            aria-label={`Voir les détails du projet ${title}`}
          >
            Voir le projet <FaArrowRight aria-hidden="true" />
          </Link>

          {/* Liens externes (GitHub + Live Demo) */}
          <div className="portfolio-card__external-links">
            {details.github && (
              <a
                href={details.github}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card__github"
                aria-label={`Voir le code source sur GitHub pour ${title}`}
              >
                <FaGithub aria-hidden="true" /> Code
              </a>
            )}
            {details.live && (
              <a
                href={details.live}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card__github"
                aria-label={`Voir la démo en ligne pour ${title}`}
              >
                <FaExternalLinkAlt aria-hidden="true" /> Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default PortfolioCard;
