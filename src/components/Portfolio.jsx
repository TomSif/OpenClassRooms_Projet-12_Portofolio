// ===================================
// 🧩 COMPONENT - Portfolio.jsx
// ===================================
import { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { allProjects } from "../data/project";

function Portfolio() {
  // DEBUG : Voir ce qui arrive
  console.log("📦 All projects:", allProjects);
  console.log("📦 Projects count:", allProjects?.length || 0);

  // State pour les filtres (optionnel)
  const [activeFilter, setActiveFilter] = useState("all");

  // SÉCURITÉ : Vérifier que allProjects existe et est un tableau
  if (!allProjects || !Array.isArray(allProjects)) {
    console.error("❌ allProjects is not defined or not an array");
    return (
      <section
        className="portfolio"
        style={{ padding: "4rem 2rem", textAlign: "center" }}
      >
        <h2>Erreur</h2>
        <p>Le fichier projects.js n'est pas correctement configuré.</p>
      </section>
    );
  }

  // Projets filtrés
  const featuredProjects = allProjects.filter(
    (project) => project?.featured === true
  );

  console.log("⭐ Featured projects:", featuredProjects);
  console.log("⭐ Featured count:", featuredProjects.length);

  const filteredProjects =
    activeFilter === "all"
      ? featuredProjects
      : featuredProjects.filter((project) => project.category === activeFilter);

  return (
    <section id="portfolio" className="portfolio">
      {/* HEADER */}
      <div className="portfolio__header">
        <h2>Mes Projets</h2>
        <p>
          Découvrez une sélection de mes réalisations, alliant design moderne et
          développement front-end performant.
        </p>
      </div>

      {/* DEBUG INFO (à retirer après) */}
      {filteredProjects.length === 0 && (
        <div
          style={{
            padding: "2rem",
            background: "#fff3cd",
            color: "#856404",
            borderRadius: "8px",
            margin: "0 auto 2rem",
            maxWidth: "800px",
          }}
        >
          <p>
            <strong>⚠️ Aucun projet trouvé</strong>
          </p>
          <p>Total projets : {allProjects.length}</p>
          <p>Projets featured : {featuredProjects.length}</p>
          <p>
            Vérifiez que vos projets ont bien <code>featured: true</code>
          </p>
        </div>
      )}

      {/* GRILLE DE PROJETS */}
      <div className="portfolio__grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            // SÉCURITÉ : Ne rendre que si project existe
            if (!project) {
              console.warn("⚠️ Undefined project in array");
              return null;
            }
            return <PortfolioCard key={project.id} project={project} />;
          })
        ) : (
          <p
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
              padding: "2rem",
            }}
          >
            Aucun projet à afficher pour le moment.
          </p>
        )}
      </div>
    </section>
  );
}

export default Portfolio;
