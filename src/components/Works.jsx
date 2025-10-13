import { useState } from "react";
import { getProjectsByCategory } from "../data/project";

// Configuration des catégories avec couleurs
const CATEGORIES = [
  { id: "Scholar", label: "Scholar", color: "#fd853a", icon: "🎓" },
  { id: "Personal", label: "Personal", color: "#0088ff", icon: "💻" },
  { id: "Photography", label: "Photography", color: "#583fbc", icon: "📷" },
  {
    id: "GraphicDesign",
    label: "Graphic Design",
    color: "#7de0ea",
    icon: "🎨",
  },
];

function Works() {
  const [activeFilter, setActiveFilter] = useState("Scholar");

  // Utiliser la fonction utilitaire du fichier projects.js
  // getProjectsByCategory retourne déjà les workProjects filtrés
  const filteredProjects = getProjectsByCategory(activeFilter).slice(0, 6);

  return (
    <section className="works">
      <div className="works__container">
        {/* En-tête de section */}
        <header className="works__header">
          <h2 className="works__title">My Works</h2>
          <p className="works__description">
            Explore my projects across web development, photography, and graphic
            design. Each work represents a unique challenge and creative
            solution.
          </p>
        </header>

        {/* Menu de filtrage */}
        <nav
          className="works__filters"
          aria-label="Filter projects by category"
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
              <article key={project.id} className="works__card">
                <div className="works__card-image">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>
                <h3 className="works__card-title">{project.title}</h3>
                <button
                  className="works__card-cta"
                  aria-label={`View ${project.title} details`}
                >
                  View Project
                </button>
              </article>
            ))
          ) : (
            <p className="works__empty">No projects in this category yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Works;
