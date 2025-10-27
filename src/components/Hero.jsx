// ===================================
// 🎯 HERO.JSX - COMPOSANT HERO
// ===================================
// Fichier : src/components/Hero.jsx
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import SlideInLeft from "../animations/SlideInLeft";

const Hero = () => {
  // Variants pour le container parent (stagger)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // Décalage de 0.3s entre chaque enfant
        delayChildren: 0.5,   // Délai initial de 0.5s avant le premier
      },
    },
  };

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__layout">
          {/* Texte principal */}
          <div className="hero__content">
            <motion.div
              className="hero__title-wrapper"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SlideInLeft>
                <h1 className="hero__title hero__title-line">Hello !</h1>
              </SlideInLeft>

              <SlideInLeft>
                <h1 className="hero__title hero__title-line">
                  Moi c'est Thomas,
                </h1>
              </SlideInLeft>

              <SlideInLeft>
                <h1 className="hero__title hero__title-line">
                  <span className="hero__title-highlight">
                    Développeur Front-End
                  </span>
                </h1>
              </SlideInLeft>
            </motion.div>

            <p className="hero__description">
              Sites internet de qualité professionnelle avec la touche
              personnelle d'un développeur passionné.
            </p>

            {/* Boutons sociaux */}
            <div className="hero__social">
              <a
                href="https://linkedin.com/in/thomas-sifferle"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-btn"
                aria-label="LinkedIn"
              >
                {/* Icône LinkedIn - à remplacer */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://github.com/TomSif"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-btn"
                aria-label="GitHub"
              >
                {/* Icône GitHub - à remplacer */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://instagram.com/neotrinos"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-btn"
                aria-label="Instagram"
              >
                {/* Icône Instagram - à remplacer */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Container pour dotLottie animation */}
          <div className="hero__animation">
            <div className="hero__animation-placeholder">
              <DotLottieReact
                src="/animations/Hero-animation-test.lottie"
                loop
                autoplay
                style={{
                  width: "100%",
                  maxWidth: "800px", // ✅ Augmenté de 400px → 600px
                  height: "auto",
                }}
                className="hero__lottie-animation"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
