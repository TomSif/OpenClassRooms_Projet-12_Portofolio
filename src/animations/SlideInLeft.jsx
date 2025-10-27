// ===================================
// ✨ ANIMATION - SlideInLeft.jsx
// ===================================
// Composant d'animation slide depuis la gauche avec rebond

import { motion } from "framer-motion";

/**
 * Wrapper d'animation qui fait glisser son contenu depuis la gauche avec un rebond
 * Compatible avec staggerChildren du parent
 *
 * @param {React.ReactNode} children - Contenu à animer
 * @param {number} duration - Durée de l'animation (secondes)
 * @param {number} distance - Distance de départ en pixels (négatif = gauche)
 * @param {number} stiffness - Rigidité du ressort (rebond) - Plus bas = plus de rebond
 * @param {number} damping - Amortissement - Plus bas = rebond plus long
 */
const SlideInLeft = ({
  children,
  duration = 0.8,
  distance = -60,
  stiffness = 70,
  damping = 15,
}) => {
  // Variants pour l'enfant (contrôlé par le parent stagger)
  const childVariants = {
    hidden: {
      opacity: 0,  // Complètement invisible au départ
      x: distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        // Fade et mouvement synchronisés
        opacity: {
          duration: duration,  // Même durée que le mouvement
          ease: "easeOut",
        },
        // Spring bounce sur l'axe X
        x: {
          type: "spring",
          stiffness: stiffness,
          damping: damping,
        },
      },
    },
  };

  return (
    <motion.div variants={childVariants}>
      {children}
    </motion.div>
  );
};

export default SlideInLeft;
