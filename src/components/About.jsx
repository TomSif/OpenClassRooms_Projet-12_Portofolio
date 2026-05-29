// ===================================
// 👤 ABOUT.JSX - COMPOSANT ABOUT
// ===================================
// Fichier : src/components/About.jsx

import {
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaSass,
  FaNodeJs,
} from "react-icons/fa";
import { SiRedux, SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbAtom2 } from "react-icons/tb";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about__container">
        {/* Titre */}
        <motion.h2
          className="about__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          À Propos
        </motion.h2>

        {/* Layout responsive */}
        <motion.div
          className="about__layout"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1, margin: "-30px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          {/* Contenu principal (gauche) */}
          <div className="about__main-content">
            {/* Introduction */}
            <p className="about__intro">
              Bonjour, je suis Thomas Sifferle,{" "}
              <strong>Développeur Front-End Junior</strong> spécialisé en{" "}
              <strong>React</strong> et <strong>TypeScript</strong>, passionné
              par la création d'
              <strong>interfaces web modernes</strong>, performantes et{" "}
              <strong>accessibles</strong>.
            </p>

            <div className="about__content">
              <p className="about__text">
                Formé via <strong>OpenClassrooms</strong> (Bac+2
                Intégrateur-Frontend) et en pratique continue sur{" "}
                <strong>Frontend Mentor</strong>, je maîtrise{" "}
                <strong>React 19, TypeScript, Tailwind CSS v4</strong> et{" "}
                <strong>Redux Toolkit</strong>, avec une expertise en{" "}
                <strong>gestion d'état</strong> (Zustand, Redux),{" "}
                <strong>React Router</strong> et{" "}
                <strong>intégration d'API REST</strong>. Je travaille en{" "}
                <strong>méthode agile</strong> et privilégie un code
                maintenable, typé et bien structuré.
              </p>
              <p className="about__text">
                Mes projets récents illustrent cette progression :{" "}
                <strong>Memory Game</strong>, un jeu complet en TypeScript avec
                gestion d'état global (Zustand), routing multi-pages et logique
                complexe. <strong>REST Countries API</strong>, consommation
                d'API externe avec dark mode et filtres dynamiques.{" "}
                <strong>Galleria Slideshow</strong> et{" "}
                <strong>Pomodoro App</strong>, des interfaces soignées avec
                animations Framer Motion. Tous disponibles en{" "}
                <strong>live sur Vercel</strong> et en open source sur GitHub.
              </p>
              <p className="about__text">
                Mon parcours en création multimédia — photographe
                professionnel, graphiste (Photoshop, Illustrator) et producteur
                MAO — m'a forgé une <strong>sensibilité UX/UI</strong>{" "}
                concrète : soin du détail visuel, lecture instinctive des
                maquettes Figma et compréhension naturelle des besoins
                utilisateurs.
              </p>
              <p className="about__highlight">
                <strong>Autonome et rigoureux</strong>, j'apporte une
                sensibilité créative à chaque projet tout en respectant les
                bonnes pratiques (accessibilité WCAG, performance, SEO).
              </p>
              <p className="about__text">
                Je recherche un poste de{" "}
                <strong>Développeur Front-End Junior</strong> en{" "}
                <strong>CDI</strong>, en <strong>remote</strong> ou sur{" "}
                <strong>Strasbourg</strong>, dans une équipe produit
                collaborative où je pourrai continuer à progresser
                techniquement.
              </p>
              <p className="about__objective">
                Mon objectif : contribuer à des{" "}
                <strong>projets web à impact</strong> en apportant mon expertise{" "}
                <strong>React/TypeScript</strong> et ma sensibilité UX/UI.
              </p>
            </div>
          </div>

          {/* Sidebar (droite) - Expériences, CTA, Icônes */}
          <div className="about__sidebar">
            {/* Parcours */}
            <div className="about__experiences">
              <h3 className="about__experiences-title">Parcours</h3>

              <div className="about__experience-item">
                <span className="about__experience-year">25</span>
                <div className="about__experience-content">
                  <h4 className="about__experience-role">OpenClassrooms</h4>
                  <p className="about__experience-subtitle">
                    Intégrateur front-end
                  </p>
                </div>
              </div>

              <div className="about__experience-item">
                <span className="about__experience-year">24</span>
                <div className="about__experience-content">
                  <h4 className="about__experience-role">Maxi-Zoo</h4>
                  <p className="about__experience-subtitle">Vendeur</p>
                </div>
              </div>

              <div className="about__experience-item">
                <span className="about__experience-year">23</span>
                <div className="about__experience-content">
                  <h4 className="about__experience-role">Super-U</h4>
                  <p className="about__experience-subtitle">
                    Chef de rayon Informatique
                  </p>
                </div>
              </div>

              <div className="about__experience-item">
                <span className="about__experience-year">21</span>
                <div className="about__experience-content">
                  <h4 className="about__experience-role">Photographe</h4>
                  <p className="about__experience-subtitle">
                    Auto-entrepreneur
                  </p>
                </div>
              </div>

            </div>

            {/* Boutons CTA */}
            <div className="about__cta">
              <a
                href="#contact"
                className="about__cta-btn about__cta-btn--primary"
              >
                Me recruter
              </a>
              <a
                href="/Thomas_Sifferle_CV.pdf"
                download="Thomas_Sifferle_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="about__cta-btn about__cta-btn--secondary"
                aria-label="Télécharger mon CV (fichier PDF)"
              >
                Télécharger CV
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 3V13M10 13L6 9M10 13L14 9M3 17H17"
                    stroke="#0088ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* Icônes technologies */}
            <div className="about__tech-icons">
              <div className="about__tech-icon">
                <FaJs className="about__tech-icon--js" />
              </div>
              <div className="about__tech-icon">
                <FaHtml5 className="about__tech-icon--html" />
              </div>
              <div className="about__tech-icon">
                <FaCss3Alt className="about__tech-icon--css" />
              </div>
              <div className="about__tech-icon">
                <FaReact className="about__tech-icon--react" />
              </div>
              <div className="about__tech-icon">
                <FaSass className="about__tech-icon--sass" />
              </div>
              <div className="about__tech-icon">
                <SiRedux className="about__tech-icon--redux" />
              </div>
              <div className="about__tech-icon">
                <SiTypescript className="about__tech-icon--typescript" />
              </div>
              <div className="about__tech-icon">
                <SiTailwindcss className="about__tech-icon--tailwind" />
              </div>
              <div className="about__tech-icon">
                <TbAtom2 className="about__tech-icon--zustand" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
