// ===================================
// 📊 DATA - availability.js
// ===================================
// Gestion centralisée du statut de disponibilité
// Change juste la valeur de CURRENT_STATUS pour mettre à jour ton statut

export const AVAILABILITY_STATUS = {
  available: {
    color: "success", // Vert
    dotColor: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "#10b981",
    text: "Disponible",
    subtitle:
      "Ouvert pour missions freelance\nEn recherche d'alternance master",
  },
  soon: {
    color: "warning", // Orange
    dotColor: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.15)",
    borderColor: "#f59e0b",
    text: "Bientôt disponible",
    subtitle:
      "Disponible à partir de février 2025\nOuvert aux CDI • Alternance",
  },
  unavailable: {
    color: "error", // Rouge
    dotColor: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.15)",
    borderColor: "#ef4444",
    text: "Actuellement en mission",
    subtitle: "Prochaine disponibilité : septembre 2025",
  },
};

// 🔧 CHANGE ICI TON STATUT ACTUEL
export const CURRENT_STATUS = AVAILABILITY_STATUS.soon;
