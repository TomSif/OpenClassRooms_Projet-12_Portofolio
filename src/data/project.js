// ===================================
// 📊 DATA DES PROJETS
// ===================================
// Fichier : src/data/projects.js

export const projects = [
  {
    id: 1,
    title: "Sophie Bluel - Portfolio Architecte",
    slug: "sophie-bluel",
    category: "Formation",
    thumbnail: "/images/projects/sophie-bluel-thumb.jpg",
    description:
      "Création d'un portfolio dynamique pour une architecte d'intérieur avec système d'administration.",
    technologies: ["JavaScript", "HTML5", "CSS3", "API REST"],
    year: 2025,

    // Détails complets (pour la page dédiée)
    fullDescription:
      "Développement d'un portfolio dynamique pour Sophie Bluel...",
    context: "Projet de formation OpenClassrooms...",
    objectives: [
      "Créer une interface responsive",
      "Intégrer une API REST",
      "...",
    ],
    challenges: ["Gestion d'état des modales", "..."],
    results: "Projet validé avec mention...",
    images: [
      "/images/projects/sophie-bluel-1.jpg",
      "/images/projects/sophie-bluel-2.jpg",
      "/images/projects/sophie-bluel-3.jpg",
    ],
    demoUrl: "https://demo-sophie-bluel.vercel.app",
    githubUrl: "https://github.com/TomSif/sophie-bluel",
  },
  {
    id: 2,
    title: "Kasa - Location d'appartements",
    slug: "kasa",
    category: "Formation",
    thumbnail: "/images/projects/kasa-thumb.jpg",
    description:
      "Application web de location d'appartements entre particuliers avec React.",
    technologies: ["React", "Sass", "React Router"],
    year: 2025,

    fullDescription: "...",
    context: "...",
    // ... etc
  },
  // Ajoute tous tes projets ici
];
