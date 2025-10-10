// ===================================
// 💼 PORToOLIO.JSX - SECTION PORTFOLIO
// ===================================
// Fichier : src/components/Portofolio.jsx

import PortfolioCard from "./PortfolioCard";

const Portfolio = () => {
  // Données des projets
  const projects = [
    {
      id: 1,
      slug: "sophie-bluel",
      title: "Sophie Bluel - Portfolio Architecte",
      description:
        "Création d'un portfolio dynamique pour une architecte d'intérieur avec système d'administration.",
      technologies: ["JavaScript", "HTML5", "CSS3", "API REST"],
      image: "/images/projects/sophie-bluel.jpg", // À ajouter plus tard
    },
    {
      id: 2,
      slug: "argent-bank",
      title: "Argent Bank - Application Bancaire",
      description:
        "Application bancaire avec authentification JWT et gestion de comptes utilisateurs.",
      technologies: ["React", "Redux", "Node.js", "MongoDB"],
      image: "/images/projects/argent-bank.jpg", // À ajouter plus tard
    },
  ];

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
          {projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
