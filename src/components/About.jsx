// ===================================
// 👤 ABOUT.JSX - COMPOSANT ABOUT
// ===================================
// Fichier : src/components/About.jsx

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about__container">
        {/* Titre */}
        <h2 className="about__title">About Me</h2>

        {/* Introduction */}
        <p className="about__intro">
          Bonjour, je suis Thomas Sifferle, développeur Front-End de 46 ans
          spécialisé dans les <strong>interfaces créatives</strong> et les{" "}
          <strong>expériences immersives</strong>.
        </p>

        {/* Paragraphes de contenu */}
        <div className="about__content">
          <p className="about__text">
            Mon parcours atypique mêle commerce tech (chef de rayon
            informatique, Acheteur) et création multimédia : photographe
            professionnel (expositions, publicités), graphiste (Photoshop,
            Illustrator, After Effects) et producteur MAO. Ces années m'ont
            appris à peaufiner chaque détail et à transformer une vision
            créative en réalité technique.
          </p>

          <p className="about__text">
            Ma reconversion via OpenClassrooms concrétise 25 ans de passion
            internet. Je maîtrise React, JavaScript ES6, Sass et Redux Toolkit,
            avec une obsession pour les animations fluides et les
            micro-interactions. Je me forme actuellement à Framer Motion et
            Three.js, avec l'ambition de me spécialiser en réalité augmentée où
            tout reste à inventer.
          </p>

          <p className="about__text">
            J'ai développé une application bancaire avec authentification JWT et
            API Node avancée (Argent Bank), et un portfolio dynamique en Vanilla
            JS avec architecture MVC personnalisée (Sophie Bluel). Les deux
            incluent déploiement CI/CD et sont pensés pour l'expérience
            utilisateur.
          </p>

          <p className="about__highlight">
            Autodidacte rigoureux, je privilégie la créativité et l'attention au
            détail dans chaque projet.
          </p>

          <p className="about__text">
            Je recherche des collaborations avec des agences web, artistes ou
            entreprises voulant des sites originaux et mémorables.
          </p>

          <p className="about__objective">
            Mon objectif : devenir freelance et transformer mon imagination en
            expériences web uniques.
          </p>
        </div>

        {/* Expériences */}
        <div className="about__experiences">
          <h3 className="about__experiences-title">Experiences</h3>

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
              <p className="about__experience-subtitle">Seller</p>
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
              <h4 className="about__experience-role">Photographer</h4>
              <p className="about__experience-subtitle">Auto-entrepreneur</p>
            </div>
          </div>

          <div className="about__experience-item">
            <span className="about__experience-year">15</span>
            <div className="about__experience-content">
              <h4 className="about__experience-role">Cash-Express</h4>
              <p className="about__experience-subtitle">Acheteur</p>
            </div>
          </div>
        </div>

        {/* Boutons CTA */}
        <div className="about__cta">
          <a href="#contact" className="about__cta-btn about__cta-btn--primary">
            Hire me
          </a>
          <a
            href="/cv.pdf"
            download
            className="about__cta-btn about__cta-btn--secondary"
          >
            Download CV
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 3V13M10 13L6 9M10 13L14 9M3 17H17"
                stroke="currentColor"
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
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="8" fill="#F7DF1E" />
              <text
                x="24"
                y="32"
                fontSize="24"
                fontWeight="bold"
                fill="#000"
                textAnchor="middle"
              >
                JS
              </text>
            </svg>
          </div>
          <div className="about__tech-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="8" fill="#E34F26" />
              <text
                x="24"
                y="32"
                fontSize="20"
                fontWeight="bold"
                fill="#FFF"
                textAnchor="middle"
              >
                5
              </text>
            </svg>
          </div>
          <div className="about__tech-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="8" fill="#1572B6" />
              <text
                x="24"
                y="32"
                fontSize="20"
                fontWeight="bold"
                fill="#FFF"
                textAnchor="middle"
              >
                3
              </text>
            </svg>
          </div>
          <div className="about__tech-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="8" fill="#61DAFB" />
              <circle
                cx="24"
                cy="24"
                r="8"
                stroke="#000"
                strokeWidth="2"
                fill="none"
              />
              <ellipse
                cx="24"
                cy="24"
                rx="16"
                ry="6"
                stroke="#000"
                strokeWidth="2"
                fill="none"
              />
              <ellipse
                cx="24"
                cy="24"
                rx="6"
                ry="16"
                stroke="#000"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
