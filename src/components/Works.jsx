import { useState } from "react";
import { getProjectsByCategory } from "../data/project";
import ImageLightbox from "./ImageLightbox";
import useScrollDirection from "../hooks/useScrollDirection";
import FadeInScrollDirection from "../animations/FadeInScrollDirection";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaCamera,
  FaPalette,
  FaArrowRight,
} from "react-icons/fa";

// Configuration des catégories avec couleurs
const CATEGORIES = [
  {
    id: "Scholar",
    label: "Formation",
    color: "#fd853a",
    icon: <FaGraduationCap />,
  },
  {
    id: "Personal",
    label: "Personnel",
    color: "#0088ff",
    icon: <FaLaptopCode />,
  },
  {
    id: "Photography",
    label: "Photographie",
    color: "#583fbc",
    icon: <FaCamera />,
  },
  {
    id: "GraphicDesign",
    label: "Design Graphique",
    color: "#7de0ea",
    icon: <FaPalette />,
  },
];

function Works() {
  const [activeFilter, setActiveFilter] = useState("Scholar");
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollDirection = useScrollDirection();

  // Utiliser la fonction utilitaire du fichier projects.js
  // getProjectsByCategory retourne déjà les workProjects filtrés
  const filteredProjects = getProjectsByCategory(activeFilter).slice(0, 6);

  return (
    <section className="works">
      <div className="works__container">
        {/* En-tête de section */}
        <header className="works__header">
          <FadeInScrollDirection direction={scrollDirection}>
            <h2 className="works__title">Mes Travaux</h2>
          </FadeInScrollDirection>

          <FadeInScrollDirection direction={scrollDirection} delay={0.2}>
            <p className="works__description">
              Découvrez mes projets en développement web, photographie et design graphique.
              Chaque travail représente un défi unique et une solution créative.
            </p>
          </FadeInScrollDirection>
        </header>

        {/* Menu de filtrage */}
        <nav
          className="works__filters"
          aria-label="Filtrer les projets par catégorie"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`works__filter ${
                activeFilter === category.id ? "works__filter--active" : ""
              }`}
              onClick={() => setActiveFilter(category.id)}
              style={{
                "--filter-color": category.color,
              }}
              aria-pressed={activeFilter === category.id}
            >
              <span className="works__filter-icon" aria-hidden="true">
                {category.icon}
              </span>
              <span className="works__filter-label">{category.label}</span>
            </button>
          ))}
        </nav>

        {/* Grille de projets */}
        <div className="works__grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <article
                key={project.id}
                className="works__card"
                onClick={() => setSelectedProject(project)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                aria-label={`Voir les détails du projet ${project.title}`}
                style={{ cursor: "pointer" }}
              >
                <div className="works__card-image">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>
                <h3 className="works__card-title">{project.title}</h3>
                <p className="works__card-description">{project.description}</p>
                <div className="works__card-indicator">
                  <span>Voir le projet</span>
                  <FaArrowRight />
                </div>
              </article>
            ))
          ) : (
            <p className="works__empty">Aucun projet dans cette catégorie pour le moment.</p>
          )}
        </div>
      </div>
      {/* AJOUTER la modale */}
      {selectedProject && (
        <ImageLightbox
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

export default Works;
