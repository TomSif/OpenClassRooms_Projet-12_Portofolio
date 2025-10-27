// ===================================
// 📄 PROJECTPAGE.JSX - PAGE PROJET DÉDIÉE
// ===================================
// Fichier : src/pages/ProjectPage.jsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
} from "react-icons/fa";
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiSass,
  SiRedux,
  SiVite,
  SiWebpack,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiFigma,
  SiGit,
  SiTailwindcss,
} from "react-icons/si";
import { allProjects } from "../data/project";

// Configuration catégories avec couleurs et icônes
const CATEGORY_CONFIG = {
  Scholar: {
    color: "#fd853a",
    icon: "🎓",
    label: "Scholar Project",
  },
  Personal: {
    color: "#0088ff",
    icon: "💻",
    label: "Personal Project",
  },
  Photography: {
    color: "#583fbc",
    icon: "📷",
    label: "Photography",
  },
  GraphicDesign: {
    color: "#7de0ea",
    icon: "🎨",
    label: "Graphic Design",
  },
};

// Mapping des technos vers react-icons
const TECH_ICONS = {
  JavaScript: SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  React: SiReact,
  Sass: SiSass,
  Redux: SiRedux,
  Vite: SiVite,
  Webpack: SiWebpack,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  Express: SiExpress,
  Figma: SiFigma,
  Git: SiGit,
  "Tailwind CSS": SiTailwindcss,
};

const ProjectPage = () => {
  const { slug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Trouver le projet correspondant au slug
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
        <h1>Projet non trouvé</h1>
        <Link to="/">← Retour à l'accueil</Link>
      </div>
    );
  }

  const {
    category,
    title,
    description,
    technologies = [],
    details = {},
  } = project;
  const { gallery = [], github, live, sections = {} } = details;

  const categoryConfig = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Scholar;
  const isCodeProject = category === "Scholar" || category === "Personal";

  // Navigation images
  const goToPrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Scroll to top au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Gestion clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") window.history.back();
      if (e.key === "ArrowLeft") goToPrevImage();
      if (e.key === "ArrowRight") goToNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentImageIndex, gallery.length]);

  return (
    <div className="project-page">
      <div className="project-page__container">
        {/* HEADER - Bouton retour */}
        <header className="project-page__header">
          <div className="project-page__header-content">
            <div className="project-page__header-category">
              <div
                className="project-page__header-icon"
                style={{ backgroundColor: categoryConfig.color }}
              >
                <span role="img" aria-label={categoryConfig.label}>
                  {categoryConfig.icon}
                </span>
              </div>
              <h1 className="project-page__title">{title}</h1>
            </div>

            <Link
              to="/"
              className="project-page__back-button"
              aria-label="Retour à l'accueil"
            >
              <FaArrowLeft />
            </Link>
          </div>
        </header>

        {/* GALERIE PLEINE LARGEUR */}
        {gallery && gallery.length > 0 && (
          <div className="project-page__gallery">
            <div className="lightbox-gallery">
              <div className="lightbox-gallery__main">
                {gallery[currentImageIndex] ? (
                  <img
                    src={gallery[currentImageIndex]}
                    alt={`${title} screenshot ${currentImageIndex + 1}`}
                    className="lightbox-gallery__image"
                    loading="lazy"
                    onError={(e) => {
                      console.error(
                        "Image failed to load:",
                        gallery[currentImageIndex]
                      );
                      e.target.style.display = "none";
                    }}
                    onLoad={() => {
                      console.log(
                        "Image loaded successfully:",
                        gallery[currentImageIndex]
                      );
                    }}
                  />
                ) : (
                  <div className="lightbox-gallery__empty">
                    <p>Aucune image disponible</p>
                  </div>
                )}

                {/* Flèches navigation */}
                {gallery.length > 1 && (
                  <>
                    <button
                      className="lightbox-gallery__arrow lightbox-gallery__arrow--prev"
                      onClick={goToPrevImage}
                      aria-label="Image précédente"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="lightbox-gallery__arrow lightbox-gallery__arrow--next"
                      onClick={goToNextImage}
                      aria-label="Image suivante"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="lightbox-gallery__thumbnails">
                  {gallery.map((img, index) => (
                    <button
                      key={index}
                      className={`lightbox-gallery__thumbnail ${
                        index === currentImageIndex
                          ? "lightbox-gallery__thumbnail--active"
                          : ""
                      }`}
                      onClick={() => goToImage(index)}
                      aria-label={`Aller à l'image ${index + 1}`}
                      aria-current={index === currentImageIndex}
                    >
                      <img src={img} alt={`Miniature ${index + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* DÉTAILS PROJET - En dessous de la galerie */}
        {isCodeProject && (
          <div className="project-page__details">
            <div className="lightbox-details">
              {/* Séparateur */}
              <div className="project-page__separator"></div>

              {/* Stack technique */}
              {technologies.length > 0 && (
                <div className="lightbox-tech">
                  {technologies.map((tech, index) => {
                    const IconComponent = TECH_ICONS[tech];
                    return (
                      <div
                        key={index}
                        className="lightbox-tech__badge"
                        title={tech}
                      >
                        {IconComponent && (
                          <IconComponent className="lightbox-tech__icon" />
                        )}
                        <span className="lightbox-tech__label">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Titre */}
              <h3 className="lightbox-details__title">À propos de ce projet</h3>

              {/* Description */}
              <p className="lightbox-details__description">{description}</p>

              {/* ===== 6 SECTIONS DÉTAILLÉES ===== */}

              {/* 1. CONTEXTE */}
              {sections.contexte && (
                <div className="project-section">
                  <h4 className="project-section__title">
                    {sections.contexte.title}
                  </h4>
                  <p className="project-section__content">
                    {sections.contexte.content}
                  </p>
                  {sections.contexte.highlights && (
                    <ul className="project-section__list">
                      {sections.contexte.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* 2. OBJECTIFS */}
              {sections.objectifs && (
                <div className="project-section">
                  <h4 className="project-section__title">
                    {sections.objectifs.title}
                  </h4>
                  <p className="project-section__content">
                    {sections.objectifs.content}
                  </p>
                  {sections.objectifs.list && (
                    <ul className="project-section__list">
                      {sections.objectifs.list.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* 3. STACK TECHNIQUE */}
              {sections.stack && (
                <div className="project-section">
                  <h4 className="project-section__title">
                    {sections.stack.title}
                  </h4>
                  <p className="project-section__content">
                    {sections.stack.content}
                  </p>
                  {sections.stack.categories && (
                    <div className="stack-categories">
                      {Object.entries(sections.stack.categories).map(
                        ([key, category]) => (
                          <div key={key} className="stack-category">
                            <h5 className="stack-category__title">
                              {category.title}
                            </h5>
                            <ul className="stack-category__items">
                              {category.items.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 4. COMPÉTENCES */}
              {sections.competences && (
                <div className="project-section">
                  <h4 className="project-section__title">
                    {sections.competences.title}
                  </h4>
                  <p className="project-section__content">
                    {sections.competences.content}
                  </p>
                  {sections.competences.skills && (
                    <div className="skills-list">
                      {sections.competences.skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <h6 className="skill-item__name">{skill.name}</h6>
                          <p className="skill-item__description">
                            {skill.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 5. RÉSULTATS */}
              {sections.resultats && (
                <div className="project-section">
                  <h4 className="project-section__title">
                    {sections.resultats.title}
                  </h4>
                  <p className="project-section__content">
                    {sections.resultats.content}
                  </p>
                  {sections.resultats.metrics && (
                    <ul className="project-section__list metrics-list">
                      {sections.resultats.metrics.map((metric, index) => (
                        <li key={index}>{metric}</li>
                      ))}
                    </ul>
                  )}
                  {sections.resultats.achievements && (
                    <ul className="project-section__list">
                      {sections.resultats.achievements.map(
                        (achievement, index) => (
                          <li key={index}>{achievement}</li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              )}

              {/* 6. PERSPECTIVES */}
              {sections.perspectives && (
                <div className="project-section">
                  <h4 className="project-section__title">
                    {sections.perspectives.title}
                  </h4>
                  <p className="project-section__content">
                    {sections.perspectives.content}
                  </p>
                  {sections.perspectives.improvements && (
                    <div className="improvements-list">
                      {sections.perspectives.improvements.map(
                        (improvement, index) => (
                          <div key={index} className="improvement-item">
                            <h6 className="improvement-item__feature">
                              {improvement.feature}
                            </h6>
                            <p className="improvement-item__reason">
                              {improvement.reason}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Boutons CTA */}
              <div className="lightbox-details__actions">
                {live && (
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lightbox-cta lightbox-cta--primary"
                  >
                    <span>Site Web</span>
                    <FaExternalLinkAlt />
                  </a>
                )}

                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lightbox-cta lightbox-cta--secondary"
                  >
                    <span>GitHub</span>
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CONTENT - Layout Visual Projects (Photography/GraphicDesign) */}
        {!isCodeProject && (
          <div className="project-page__gallery project-page__gallery--visual">
            <div className="lightbox-gallery lightbox-gallery--fullscreen">
              <div className="lightbox-gallery__main">
                <img
                  src={gallery[currentImageIndex]}
                  alt={`${title} ${currentImageIndex + 1}`}
                  className="lightbox-gallery__image"
                  loading="lazy"
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      className="lightbox-gallery__arrow lightbox-gallery__arrow--prev"
                      onClick={goToPrevImage}
                      aria-label="Image précédente"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="lightbox-gallery__arrow lightbox-gallery__arrow--next"
                      onClick={goToNextImage}
                      aria-label="Image suivante"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
                {/* Dots indicator */}
                {gallery.length > 1 && (
                  <div className="lightbox-gallery__dots">
                    {gallery.map((_, index) => (
                      <button
                        key={index}
                        className={`lightbox-gallery__dot ${
                          index === currentImageIndex
                            ? "lightbox-gallery__dot--active"
                            : ""
                        }`}
                        onClick={() => goToImage(index)}
                        aria-label={`Aller à l'image ${index + 1}`}
                        aria-current={index === currentImageIndex}
                        style={{
                          backgroundColor:
                            index === currentImageIndex
                              ? categoryConfig.color
                              : undefined,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DESCRIPTION pour projets visuels - Fond blanc */}
        {!isCodeProject && description && (
          <div className="project-page__details project-page__details--visual">
            <div className="lightbox-details">
              <div className="lightbox-caption">
                <p>{description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
