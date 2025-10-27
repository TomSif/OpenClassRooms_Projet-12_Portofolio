// ===================================
// 🪝 HOOK - useScrollDirection.js
// ===================================
// Détecte la direction du scroll (up/down) avec throttle et hysteresis

import { useState, useEffect, useRef } from "react";

/**
 * Hook personnalisé pour détecter la direction du scroll
 * @param {number} threshold - Nombre de pixels avant de changer de direction (hysteresis)
 * @param {number} throttleMs - Délai en ms pour throttle (optimisation perfs)
 * @returns {"down" | "up" | null} Direction du scroll
 */
export const useScrollDirection = (threshold = 10, throttleMs = 100) => {
  const [scrollDirection, setScrollDirection] = useState("down"); // Par défaut "down"
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    // Position initiale
    lastScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const difference = scrollY - lastScrollY.current;

      // Hysteresis : on ne change de direction que si le scroll dépasse le seuil
      if (Math.abs(difference) < threshold) {
        ticking.current = false;
        return;
      }

      // Déterminer la direction
      const newDirection = difference > 0 ? "down" : "up";

      // Ne mettre à jour que si la direction a changé
      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection);
      }

      lastScrollY.current = scrollY > 0 ? scrollY : 0;
      ticking.current = false;
    };

    const onScroll = () => {
      // Throttle : éviter trop de calculs
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateScrollDirection();
        });
        ticking.current = true;
      }
    };

    // Écouter le scroll
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollDirection, threshold, throttleMs]);

  return scrollDirection;
};

export default useScrollDirection;
