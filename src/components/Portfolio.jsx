// ===================================
// 🧩 COMPONENT - Portfolio.jsx
// ===================================
// import { useState } from "react"; // ← Commenté : Sera nécessaire pour filtres futurs
import PortfolioCard from "./PortfolioCard";
import { allProjects } from "../data/project";
import useScrollDirection from "../hooks/useScrollDirection";
import FadeInScrollDirection from "../animations/FadeInScrollDirection";

function Portfolio() {
  // ===================================
  // 🔮 FUTURE FEATURE : Système de filtrage dynamique
  // ===================================
  // Évolutions possibles :
  // 1. Rotation automatique des projets featured (ex: 2 derniers + 2 suivants par semaine)
  // 2. Filtrage par catégorie (Scholar, Personal)
  // 3. Tri par date, popularité, ou technologie
  //
  // Pour activer les filtres, décommenter les lignes ci-dessous :
  // const [activeFilter, setActiveFilter] = useState("all");
  //
  // Ajouter des boutons de filtrage dans le JSX :
  // <div className="portfolio__filters">
  //   <button onClick={() => setActiveFilter("all")}>Tous</button>
  //   <button onClick={() => setActiveFilter("Scholar")}>Formation</button>
  //   <button onClick={() => setActiveFilter("Personal")}>Personnel</button>
  // </div>
  //
  // Utiliser filteredProjects au lieu de featuredProjects dans le .map()
  // ===================================

  // Hook de détection de la direction du scroll
  const scrollDirection = useScrollDirection();

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

  // Récupération des projets featured (affichés dans cette section)
  const featuredProjects = allProjects.filter(
    (project) => project?.featured === true
  );

  // ===================================
  // 🔮 FUTURE : Logique de filtrage (actuellement non utilisée)
  // ===================================
  // const filteredProjects =
  //   activeFilter === "all"
  //     ? featuredProjects
  //     : featuredProjects.filter((project) => project.category === activeFilter);
  // ===================================

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio__container">
        {/* HEADER */}
        <div className="portfolio__header">
          <FadeInScrollDirection direction={scrollDirection}>
            <h2>Mes Projets</h2>
          </FadeInScrollDirection>

          <FadeInScrollDirection direction={scrollDirection} delay={0.2}>
            <p>
              Découvrez une sélection de mes réalisations, alliant design moderne
              et développement front-end performant.
            </p>
          </FadeInScrollDirection>
        </div>

        {/* GRILLE DE PROJETS */}
        <div className="portfolio__grid">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project) => {
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
              Aucun projet featured à afficher pour le moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
