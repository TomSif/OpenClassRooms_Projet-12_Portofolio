// ===================================
// 💼 PORTFOLIO.JSX - SECTION PORTFOLIO
// ===================================
// Fichier : src/components/Portfolio.jsx

import PortfolioCard from "./PortfolioCard";
import { allProjects } from "../data/project";

const Portfolio = () => {
  // Filtrer uniquement les projets featured
  const featuredProjects = allProjects.filter(
    (project) => project.featured === true
  );

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__container">
        {/* Titre */}
        <h2 className="portfolio__title">
          Lets have a look at my{" "}
          <span className="portfolio__title-highlight">Portfolio</span>
        </h2>

        {/* Grille de cards */}
        <div className="portfolio__grid">
          {featuredProjects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
