import { useState, useEffect } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaExternalLinkAlt,
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

function ImageLightbox({ project, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!project) return null;

  const {
    category,
    title,
    description,
    technologies = [],
    details = {},
  } = project;
  const { gallery = [], github, live } = details;

  const categoryConfig = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Scholar;
  const isCodeProject = category === "Scholar" || category === "Personal";

  // Navigation images
  const goToPrevImage = () => {
    const newIndex =
      currentImageIndex === 0 ? gallery.length - 1 : currentImageIndex - 1;
    handleImageChange(newIndex);
  };

  const goToNextImage = () => {
    const newIndex =
      currentImageIndex === gallery.length - 1 ? 0 : currentImageIndex + 1;
    handleImageChange(newIndex);
  };

  const goToImage = (index) => {
    handleImageChange(index);
  };

  // Gestion du zoom au double-clic
  const handleImageDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Double-click détecté! Zoom actuel:", isZoomed);
    setIsZoomed(!isZoomed);
  };

  // Debug - tester les événements
  const handleImageClick = (e) => {
    console.log("Click détecté sur l'image");
  };

  const handleImageMouseDown = (e) => {
    console.log("MouseDown détecté sur l'image");
  };

  // Réinitialiser le zoom lors du changement d'image
  const handleImageChange = (newIndex) => {
    setCurrentImageIndex(newIndex);
    setIsZoomed(false);
  };

  // Gestion clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevImage();
      if (e.key === "ArrowRight") goToNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentImageIndex, gallery.length]);

  // ✅ ICI : Gestion du scroll
  useEffect(() => {
    // Sauvegarde la position actuelle
    const scrollY = window.scrollY;

    // Bloque le scroll du body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // Fonction de nettoyage (quand la modale se ferme)
    return () => {
      // Restaure les styles
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restaure la position de scroll
      window.scrollTo(0, scrollY);
    };
  }, []); // ← Tableau vide = s'exécute à l'ouverture/fermetur

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <header className="lightbox-header">
          <div className="lightbox-header__category">
            <div
              className="lightbox-header__icon"
              style={{ backgroundColor: categoryConfig.color }}
            >
              <span role="img" aria-label={categoryConfig.label}>
                {categoryConfig.icon}
              </span>
            </div>
            <h2 id="modal-title" className="lightbox-header__title">
              {title}
            </h2>
          </div>

          <button
            className="lightbox-header__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </header>

        {/* CONTENT - Layout Code Projects (Scholar/Personal) */}
        {isCodeProject && (
          <div className="lightbox-content lightbox-content--code">
            {/* GALERIE */}
            <div className="lightbox-gallery">
              <div className="lightbox-gallery__main">
                <img
                  src={gallery[currentImageIndex]}
                  alt={`${title} screenshot ${currentImageIndex + 1}`}
                  className="lightbox-gallery__image"
                  loading="lazy"
                />

                {/* Flèches navigation */}
                {gallery.length > 1 && (
                  <>
                    <button
                      className="lightbox-gallery__arrow lightbox-gallery__arrow--prev"
                      onClick={goToPrevImage}
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="lightbox-gallery__arrow lightbox-gallery__arrow--next"
                      onClick={goToNextImage}
                      aria-label="Next image"
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
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={index === currentImageIndex}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DÉTAILS PROJET */}
            <div className="lightbox-details">
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

              {/* Titre (masqué visuellement, déjà dans le header) */}
              <h3 className="lightbox-details__title">About this project</h3>

              {/* Description */}
              <p className="lightbox-details__description">{description}</p>

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
          <div className="lightbox-content lightbox-content--visual">
            <div className="lightbox-gallery lightbox-gallery--fullscreen">
              <div className="lightbox-gallery__main">
                <img
                  src={gallery[currentImageIndex]}
                  alt={`${title} ${currentImageIndex + 1}`}
                  className={`lightbox-gallery__image ${
                    isZoomed ? "lightbox-gallery__image--zoomed" : ""
                  }`}
                  onClick={handleImageClick}
                  onDoubleClick={handleImageDoubleClick}
                  onMouseDown={handleImageMouseDown}
                  loading="lazy"
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      className="lightbox-gallery__arrow lightbox-gallery__arrow--prev"
                      onClick={goToPrevImage}
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="lightbox-gallery__arrow lightbox-gallery__arrow--next"
                      onClick={goToNextImage}
                      aria-label="Next image"
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
                        aria-label={`Go to image ${index + 1}`}
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

            {/* Caption minimaliste */}
            {description && (
              <div className="lightbox-caption">
                <p>{description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageLightbox;
