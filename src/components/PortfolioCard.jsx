// ===================================
// 🧩 COMPONENT - PortfolioCard.jsx
// ===================================
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaJs,
  FaReact,
  FaNodeJs,
  FaFigma,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiRedux,
  SiMongodb,
  SiAdobephotoshop,
  SiAdobeillustrator,
} from "react-icons/si";

// Fonction pour obtenir l'icône correspondante à une technologie
function getTechIcon(tech) {
  const techIcons = {
    HTML5: <FaHtml5 />,
    CSS3: <FaCss3Alt />,
    Sass: <FaSass />,
    JavaScript: <FaJs />,
    React: <FaReact />,
    Redux: <SiRedux />,
    "Node.js": <FaNodeJs />,
    MongoDB: <SiMongodb />,
    "Tailwind CSS": <SiTailwindcss />,
    Figma: <FaFigma />,
    Photoshop: <SiAdobephotoshop />,
    Illustrator: <SiAdobeillustrator />,
  };
  return techIcons[tech] || null;
}

// Fonction pour tronquer la description à une longueur raisonnable
function truncateDescription(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;

  // Trouver le dernier espace avant la limite pour éviter de couper un mot
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + ".."
    : truncated + "..";
}

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
  const rawDescription = project.description || "Pas de description disponible";
  const description = truncateDescription(rawDescription, 90); // Limite à 90 caractères
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
        {/* Titre */}
        <h3 className="portfolio-card__title">{title}</h3>

        {/* Description */}
        <p className="portfolio-card__description">{description}</p>

        {/* Technologies sous forme d'icônes avec labels - Cohérence avec lightbox */}
        {technologies.length > 0 && (
          <div
            className="portfolio-card__tech-icons"
            aria-label="Technologies utilisées"
          >
            {technologies.slice(0, 3).map((tech, index) => {
              const icon = getTechIcon(tech);
              return icon ? (
                <span
                  key={index}
                  className="portfolio-card__tech-icon"
                  title={tech}
                  aria-label={tech}
                >
                  {icon}
                  <span>{tech}</span>
                </span>
              ) : (
                <span
                  key={index}
                  className="portfolio-card__tech-icon"
                  title={tech}
                  aria-label={tech}
                >
                  <span>{tech}</span>
                </span>
              );
            })}
            {technologies.length > 3 && (
              <span
                className="portfolio-card__tech-more"
                aria-label={`${technologies.length - 3} autres technologies`}
                title={`+${technologies.length - 3} technologies`}
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

          {/* Liens externes (GitHub + Live Démo) */}
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
                <FaExternalLinkAlt aria-hidden="true" /> Démo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default PortfolioCard;
