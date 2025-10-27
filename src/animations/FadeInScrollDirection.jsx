// ===================================
// ✨ ANIMATION - FadeInScrollDirection.jsx
// ===================================
// Composant d'animation qui s'adapte à la direction du scroll

import { motion } from "framer-motion";

/**
 * Wrapper d'animation qui anime ses enfants selon la direction du scroll
 *
 * @param {React.ReactNode} children - Contenu à animer
 * @param {"down" | "up"} direction - Direction du scroll
 * @param {number} delay - Délai avant l'animation (secondes)
 * @param {number} duration - Durée de l'animation (secondes)
 * @param {number} amount - Pourcentage de visibilité pour trigger (0-1)
 */
const FadeInScrollDirection = ({
  children,
  direction = "down",
  delay = 0,
  duration = 0.6,
  amount = 0.3,
}) => {
  // Animation simple : toujours fade-in depuis le bas au scroll down
  // Au scroll up : apparition instantanée
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false,  // Rejoue à chaque passage
        amount: amount, // 30% visible pour trigger
        margin: "0px 0px -100px 0px", // Trigger plus tôt
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInScrollDirection;
