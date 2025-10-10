// ===================================
// 📊 FICHIER DE DONNÉES - PROJETS
// ===================================
// Fichier : src/data/projects.js

// ===================================
// 🎨 CONFIGURATION TECHNOS (pour react-icons)
// ===================================
// Noms exacts à utiliser dans le tableau technologies[]
// Ces noms doivent matcher avec le mapping dans TechStack.jsx

export const TECH_NAMES = {
  // Frontend
  JAVASCRIPT: "JavaScript",
  HTML5: "HTML5",
  CSS3: "CSS3",
  REACT: "React",
  SASS: "Sass",

  // Build tools
  VITE: "Vite",
  WEBPACK: "Webpack",

  // State management
  REDUX: "Redux",

  // Backend (si besoin plus tard)
  NODEJS: "Node.js",
  EXPRESS: "Express",
  MONGODB: "MongoDB",

  // Autres
  GIT: "Git",
  FIGMA: "Figma",
};

// ===================================
// 📦 DONNÉES DES PROJETS
// ===================================

export const allProjects = [
  // ==========================================
  // 🌟 PROJETS PRINCIPAUX (featured: true)
  // ==========================================
  // Ces projets ont des pages dédiées /project/:slug

  {
    id: 1,
    featured: true,
    slug: "sophie-bluel",
    title: "Sophie Bluel - Portfolio Architecte",
    category: "Scholar",
    thumbnail: "/images/projects/sophie-bluel-thumb.jpg",
    description:
      "Création d'un portfolio dynamique pour une architecte d'intérieur avec système d'administration. Gestion des projets via API REST et interface de connexion sécurisée.",

    // Technologies utilisées (noms exacts depuis TECH_NAMES)
    technologies: [TECH_NAMES.JAVASCRIPT, TECH_NAMES.HTML5, TECH_NAMES.CSS3],

    details: {
      // Galerie d'images (2-4 pour projets code)
      gallery: [
        "/images/projects/sophie-bluel-1.jpg",
        "/images/projects/sophie-bluel-2.jpg",
        "/images/projects/sophie-bluel-3.jpg",
      ],

      // Liens
      github: "https://github.com/TomSif/sophie-bluel",
      live: "https://sophie-bluel-demo.vercel.app",
    },
  },

  {
    id: 2,
    featured: true,
    slug: "argent-bank",
    title: "Argent Bank - Application Bancaire",
    category: "Scholar",
    thumbnail: "/images/projects/argent-bank-thumb.jpg",
    description:
      "Application bancaire responsive avec authentification JWT, gestion de profil utilisateur et Redux Toolkit pour la gestion d'état. Interface moderne et sécurisée.",

    technologies: [
      TECH_NAMES.REACT,
      TECH_NAMES.REDUX,
      TECH_NAMES.SASS,
      TECH_NAMES.JAVASCRIPT,
    ],

    details: {
      gallery: [
        "/images/projects/argent-bank-1.jpg",
        "/images/projects/argent-bank-2.jpg",
      ],
      github: "https://github.com/TomSif/argent-bank",
      live: "https://argent-bank-demo.vercel.app",
    },
  },

  // ==========================================
  // 📚 PROJETS SCHOLAR (OpenClassrooms)
  // ==========================================
  // Projets de formation - featured: false

  {
    id: 3,
    featured: false,
    title: "Kasa - Location d'appartements",
    category: "Scholar",
    thumbnail: "/images/works/kasa-thumb.jpg",
    description:
      "Application web de location d'appartements entre particuliers. Utilisation de React Router pour la navigation et composants réutilisables.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.SASS, TECH_NAMES.VITE],

    details: {
      gallery: ["/images/works/kasa-1.jpg", "/images/works/kasa-2.jpg"],
      github: "https://github.com/TomSif/kasa",
      live: "https://kasa-demo.vercel.app",
    },
  },

  {
    id: 4,
    featured: false,
    title: "Nina Carducci - Portfolio Photographe",
    category: "Scholar",
    thumbnail: "/images/works/nina-carducci-thumb.jpg",
    description:
      "Optimisation SEO et performance d'un portfolio de photographe. Amélioration du score Lighthouse et accessibilité.",

    technologies: [TECH_NAMES.JAVASCRIPT, TECH_NAMES.HTML5, TECH_NAMES.CSS3],

    details: {
      gallery: ["/images/works/nina-carducci-1.jpg"],
      github: "https://github.com/TomSif/nina-carducci",
      live: "https://nina-carducci-demo.vercel.app",
    },
  },
  {
    id: 5,
    featured: false,
    title: "Booki - Landing Page Agence de Voyage",
    category: "Scholar",
    thumbnail: "/images/works/booki-thumb.jpg",
    description:
      "Création d'une landing page pour une agence de voyage. Mise en avant des destinations et optimisation SEO.",

    technologies: [TECH_NAMES.JAVASCRIPT, TECH_NAMES.HTML5, TECH_NAMES.CSS3],

    details: {
      gallery: ["/images/works/booki-1.jpg"],
      github: "https://github.com/TomSif/booki",
      live: "https://booki-demo.vercel.app",
    },
  },

  // ⚠️ AJOUTE TES AUTRES PROJETS SCHOLAR ICI
  // Exemple template :
  // {
  //   id: 5,
  //   featured: false,
  //   title: "Nom du projet",
  //   category: "Scholar",
  //   thumbnail: "/images/works/project-thumb.jpg",
  //   description: "Description courte (100-150 caractères)",
  //   technologies: [TECH_NAMES.REACT, TECH_NAMES.SASS],
  //   details: {
  //     gallery: ["/images/works/project-1.jpg"],
  //     github: "https://github.com/...",
  //     live: "https://..."
  //   }
  // },

  // ==========================================
  // 💻 PROJETS PERSONNELS (Personal)
  // ==========================================
  // Projets réalisés en dehors de la formation

  {
    id: 10,
    featured: false,
    title: "Portfolio V1",
    category: "Personal",
    thumbnail: "/images/works/portfolio-v1-thumb.jpg",
    description:
      "Première version de mon portfolio personnel. Exploration des animations CSS et du responsive design.",

    technologies: [TECH_NAMES.HTML5, TECH_NAMES.CSS3, TECH_NAMES.JAVASCRIPT],

    details: {
      gallery: ["/images/works/portfolio-v1-1.jpg"],
      github: "https://github.com/TomSif/portfolio-v1",
      live: "https://portfolio-v1.vercel.app",
    },
  },

  // ⚠️ AJOUTE TES PROJETS PERSONNELS ICI
  // {
  //   id: 11,
  //   featured: false,
  //   title: "...",
  //   category: "Personal",
  //   ...
  // },

  // ==========================================
  // 📷 PROJETS PHOTOGRAPHY
  // ==========================================
  // Galeries de photos (PAS de technologies, github, live)

  {
    id: 20,
    featured: false,
    title: "Loire au coucher de soleil",
    category: "Photography",
    thumbnail: "/images/photography/loire-thumb.jpg",
    description:
      "Série de 8 photos capturées au bord de la Loire en juin 2024. Exploration des reflets et des couleurs chaudes du coucher de soleil.",

    // ⚠️ PAS de technologies pour Photography
    details: {
      // Galerie avec plusieurs images (5-15 pour photos)
      gallery: [
        "/images/photography/loire-1.jpg",
        "/images/photography/loire-2.jpg",
        "/images/photography/loire-3.jpg",
        "/images/photography/loire-4.jpg",
        "/images/photography/loire-5.jpg",
        "/images/photography/loire-6.jpg",
        "/images/photography/loire-7.jpg",
        "/images/photography/loire-8.jpg",
      ],
      // ⚠️ PAS de github ni live pour Photography
    },
  },

  {
    id: 21,
    featured: false,
    title: "Portraits urbains",
    category: "Photography",
    thumbnail: "/images/photography/portraits-thumb.jpg",
    description:
      "Collection de portraits pris dans les rues de Paris. Jeu sur les expressions et la lumière naturelle.",

    details: {
      gallery: [
        "/images/photography/portraits-1.jpg",
        "/images/photography/portraits-2.jpg",
        "/images/photography/portraits-3.jpg",
        "/images/photography/portraits-4.jpg",
        "/images/photography/portraits-5.jpg",
      ],
    },
  },

  // ⚠️ AJOUTE TES GALERIES PHOTO ICI
  // {
  //   id: 22,
  //   featured: false,
  //   title: "Titre de la série",
  //   category: "Photography",
  //   thumbnail: "/images/photography/serie-thumb.jpg",
  //   description: "Description de la série photo",
  //   details: {
  //     gallery: [
  //       "/images/photography/serie-1.jpg",
  //       "/images/photography/serie-2.jpg",
  //       // ... 5-15 images
  //     ]
  //   }
  // },

  // ==========================================
  // 🎨 PROJETS GRAPHIC DESIGN
  // ==========================================
  // Créations graphiques (logos, affiches, etc.)

  {
    id: 30,
    featured: false,
    title: "Identité visuelle - Café des Arts",
    category: "GraphicDesign",
    thumbnail: "/images/graphic/cafe-arts-thumb.jpg",
    description:
      "Création complète de l'identité visuelle d'un café culturel : logo, carte de visite, menu, signalétique.",

    // ⚠️ Tu PEUX ajouter des technos pour Graphic Design si pertinent
    // Par exemple : Photoshop, Illustrator, Figma
    // technologies: [TECH_NAMES.FIGMA],

    details: {
      gallery: [
        "/images/graphic/cafe-arts-logo.jpg",
        "/images/graphic/cafe-arts-carte.jpg",
        "/images/graphic/cafe-arts-menu.jpg",
        "/images/graphic/cafe-arts-signage.jpg",
      ],
      // ⚠️ PAS de github ni live (sauf si projet web design)
    },
  },

  {
    id: 31,
    featured: false,
    title: "Affiches événementielles",
    category: "GraphicDesign",
    thumbnail: "/images/graphic/affiches-thumb.jpg",
    description:
      "Série d'affiches pour un festival de musique. Exploration typographique et composition dynamique.",

    details: {
      gallery: [
        "/images/graphic/affiche-1.jpg",
        "/images/graphic/affiche-2.jpg",
        "/images/graphic/affiche-3.jpg",
      ],
    },
  },

  // ⚠️ AJOUTE TES PROJETS GRAPHIQUES ICI
  // {
  //   id: 32,
  //   featured: false,
  //   title: "...",
  //   category: "GraphicDesign",
  //   ...
  // },
];

// ===================================
// 🔧 HELPERS (fonctions utilitaires)
// ===================================

// Récupérer les projets principaux (avec pages dédiées)
export const featuredProjects = allProjects.filter((p) => p.featured);

// Récupérer les projets de la section Works (sans pages dédiées)
export const workProjects = allProjects.filter((p) => !p.featured);

// Filtrer par catégorie
export const getProjectsByCategory = (category) => {
  if (category === "All") return workProjects;
  return workProjects.filter((p) => p.category === category);
};

// Récupérer un projet par son slug (pour les featured)
export const getProjectBySlug = (slug) => {
  return featuredProjects.find((p) => p.slug === slug);
};

// Récupérer un projet par son ID (pour la modale)
export const getProjectById = (id) => {
  return allProjects.find((p) => p.id === id);
};

// Statistiques (optionnel, pour debug)
export const getProjectStats = () => {
  return {
    total: allProjects.length,
    featured: featuredProjects.length,
    works: workProjects.length,
    scholar: workProjects.filter((p) => p.category === "Scholar").length,
    personal: workProjects.filter((p) => p.category === "Personal").length,
    photography: workProjects.filter((p) => p.category === "Photography")
      .length,
    graphic: workProjects.filter((p) => p.category === "GraphicDesign").length,
  };
};

// ===================================
// 📝 NOTES D'UTILISATION
// ===================================

/*
STRUCTURE D'UN PROJET CODE (Scholar/Personal) :
{
  id: number (unique),
  featured: boolean,
  slug: "url-slug" (uniquement si featured),
  title: "Titre du projet",
  category: "Scholar" | "Personal",
  thumbnail: "path/to/thumbnail.jpg",
  description: "Description courte (100-200 caractères)",
  technologies: [TECH_NAMES.REACT, TECH_NAMES.SASS, ...],
  details: {
    gallery: ["path/to/image1.jpg", ...], // 2-4 images
    github: "https://github.com/...",
    live: "https://demo-url.com"
  }
}

STRUCTURE D'UN PROJET VISUEL (Photography/GraphicDesign) :
{
  id: number (unique),
  featured: false,
  title: "Titre de la galerie",
  category: "Photography" | "GraphicDesign",
  thumbnail: "path/to/thumbnail.jpg",
  description: "Description courte",
  // PAS de technologies (sauf exception pour GraphicDesign)
  details: {
    gallery: ["path/to/image1.jpg", ...] // 5-15 images
    // PAS de github ni live
  }
}

CHECKLIST AVANT DE COMPLÉTER :
- [ ] Toutes les images sont dans /public/images/ avec les bons chemins
- [ ] Chaque projet a un ID unique
- [ ] Les noms de technologies matchent TECH_NAMES
- [ ] Les projets Photography/GraphicDesign n'ont PAS de technologies/github/live
- [ ] Les descriptions font entre 100-200 caractères
- [ ] Les galeries ont 2-4 images (code) ou 5-15 images (visuel)
*/
