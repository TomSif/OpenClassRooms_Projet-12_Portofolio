// ===================================
// 📊 EXEMPLE DE STRUCTURE projects.js
// ===================================
// Avec la nouvelle organisation des images (structure plate + suffixe -thumb)

import { TECH_NAMES } from "./techConfig"; // (si séparé)

export const allProjects = [
  // ==========================================
  // 🌟 PROJETS PRINCIPAUX (featured: true)
  // ==========================================

  {
    id: 1,
    featured: true,
    slug: "sophie-bluel",
    title: "Sophie Bluel - Portfolio Architecte",
    category: "Scholar",

    // ✅ Thumbnail pour card homepage
    thumbnail: "/images/travaux/SelectedWorks-sophie bluel-2-thumb.webp",

    description:
      "Création d'un portfolio dynamique pour une architecte d'intérieur avec système d'administration.",

    technologies: [TECH_NAMES.JAVASCRIPT, TECH_NAMES.HTML5, TECH_NAMES.CSS3],

    details: {
      // ✅ Images HD pour modale (sans -thumb)
      // Les thumbnails de navigation seront générés automatiquement par getThumbnail()
      gallery: [
        "/images/travaux/works-sophie-bluel-1.webp",
        "/images/travaux/works-sophie-bluel-2.webp",
        "/images/travaux/works-sophie-bluel-3.webp",
        "/images/travaux/works-sophie-bluel-4.webp",
        "/images/travaux/works-sophie-bluel-5.webp",
        "/images/travaux/works-sophie-bluel-6.webp",
        "/images/travaux/works-sophie-bluel-7.webp",
      ],
      github:
        "https://github.com/TomSif/TomSif-OpenClassRooms_Projet-6_Sophie-Bluel",
      live: "https://tom-sif-open-class-rooms-projet-6-sophie-bluel.vercel.app/index.html",
    },
  },

  {
    id: 2,
    featured: true,
    slug: "argent-bank",
    title: "Argent Bank - Application Bancaire",
    category: "Scholar",

    thumbnail: "/images/travaux/SelectedWorks-ArgentBank-2-thumb.webp",

    description:
      "Application bancaire responsive avec authentification JWT et Redux Toolkit.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.REDUX, TECH_NAMES.SASS],

    details: {
      gallery: [
        "/images/travaux/SelectedWorks-ArgentBank-1.webp",
        "/images/travaux/SelectedWorks-ArgentBank-2.webp",
        "/images/travaux/SelectedWorks-ArgentBank-3.webp",
        "/images/travaux/SelectedWorks-ArgentBank-4.webp",
        "/images/travaux/SelectedWorks-ArgentBank-5.webp",
        "/images/travaux/SelectedWorks-ArgentBank-6.webp",
        "/images/travaux/SelectedWorks-ArgentBank-7.webp",
        "/images/travaux/SelectedWorks-ArgentBank-8.webp",
      ],
      github: "https://github.com/TomSif/OpenClassRooms_Projet-10_Argent-Bank",
      live: null, // Si pas de démo live - pas encore hébergé
    },
  },

  // ==========================================
  // 🎓 PROJETS SCHOLAR (Works)
  // ==========================================

  {
    id: 10,
    featured: false,
    title: "Kasa - Location immobilière",
    category: "Scholar",

    thumbnail: "/images/travaux/SelectedWorks-KASA-3-thumb.webp",

    description:
      "Application de location immobilière avec React Router et animations CSS.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.SASS],

    details: {
      gallery: [
        "/images/travaux/works-KASA-1.webp",
        "/images/travaux/works-KASA-2.webp",
        "/images/travaux/works-KASA-3.webp",
        "/images/travaux/works-KASA-4.webp",
      ],
      github:
        "https://github.com/TomSif/OpenClassRooms_Projet-7_Kasa/blob/main/my-react-app/README.md",
      live: "https://open-class-rooms-projet-7-kasa.vercel.app/",
    },
  },

  {
    id: 12,
    featured: false,
    title: "Nina Carducci - SEO",
    category: "Scholar",

    thumbnail: "/images/travaux/SelectedWorks-nina-3-thumb.webp",

    description:
      "Améliorer le référencement naturel (SEO) et l'accessibilité du site web de Nina Carducci",

    technologies: [TECH_NAMES.HTML5],

    details: {
      gallery: [
        "/images/travaux/works-nina-1.webp",
        "/images/travaux/works-nina-2.webp",
        "/images/travaux/works-nina-3.webp",
        "/images/travaux/works-nina-4.webp",
      ],
      github: "https://github.com/TomSif/OpenClassRooms_Projet-8_Nina_Carducci",
      live: "https://open-class-rooms-projet-8-nina-card.vercel.app/",
    },
  },
  {
    id: 13,
    featured: false,
    title: "Print-it",
    category: "Scholar",

    thumbnail: "/images/travaux/SelectedWorks-print-it-3-thumb.webp",

    description: "Initiation à JavaScript en créant un carrousel interactif.",

    technologies: [TECH_NAMES.HTML5, TECH_NAMES.CSS3, TECH_NAMES.JAVASCRIPT],

    details: {
      gallery: [
        "/images/travaux/works-print-it-1.webp",
        "/images/travaux/works-print-it-2.webp",
        "/images/travaux/works-print-it-3.webp",
        "/images/travaux/works-print-it-4.webp",
      ],
      github:
        "https://github.com/TomSif/OpenClassRooms_Projet-5_Print-it/tree/main",
      live: "https://tomsif.github.io/OpenClassRooms_Projet-5_Print-it/",
    },
  },
  {
    id: 14,
    featured: false,
    title: "OhMyFood-CSS Animations",
    category: "Scholar",

    thumbnail: "/images/travaux/SelectedWorks-ohmyfood-1-thumb.webp",

    description:
      "Améliorez l'interface d'un site mobile avec des animations CSS",

    technologies: [TECH_NAMES.HTML5, TECH_NAMES.SASS, TECH_NAMES.CSS3],

    details: {
      gallery: [
        "/images/travaux/works-ohmyfood-1.webp",
        "/images/travaux/works-ohmyfood-2.webp",
        "/images/travaux/works-ohmyfood-3.webp",
        "/images/travaux/works-ohmyfood-4.webp",
      ],
      github: "https://github.com/TomSif/OpenClassrooms_Projet-4_Ohmyfood",
      live: "https://tomsif.github.io/OpenClassrooms_Projet-4_Ohmyfood/",
    },
  },
  {
    id: 15,
    featured: false,
    title: "Booki - Page d'accueil",
    category: "Scholar",

    thumbnail: "/images/travaux/SelectedWorks-booki-1-thumb.webp",

    description:
      "Créez la page d'accueil d'une agence de voyage avec HTML & CSS",

    technologies: [TECH_NAMES.HTML5, TECH_NAMES.CSS3],
    details: {
      gallery: [
        "/images/travaux/works-booki-1.webp",
        "/images/travaux/works-booki-2.webp",
        "/images/travaux/works-booki-3.webp",
        "/images/travaux/works-booki-4.webp",
      ],
      github: "https://github.com/TomSif/OpenClassRooms_Projet-3_Site-Booki",
      live: "https://tomsif.github.io/OpenClassRooms_Projet-3_Site-Booki/",
    },
  },

  // ==========================================
  // 💻 PROJETS PERSONAL (Works)
  // ==========================================

  {
    id: 20,
    featured: false,
    title: "Calculatrice de pourboires",
    category: "Personal",

    thumbnail: "/images/travaux/Personal-tips calculator-1-thumb.webp",

    description: "Création d'une calculatrice fonctionnelle en JavaScript.",

    technologies: [TECH_NAMES.HTML5, TECH_NAMES.JAVASCRIPT, TECH_NAMES.CSS3],

    details: {
      gallery: [
        "/images/travaux/personal-tips-calculator-1.webp",
        "/images/travaux/personal-tips-calculator-2.webp",
        "/images/travaux/personal-tips-calculator-3.webp",
        "/images/travaux/personal-tips-calculator-4.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Tip_Calculator_App",
      live: "https://tomsif.github.io/Front-end_Mentor_Tip_Calculator_App/",
    },
  },
  {
    id: 21,
    featured: false,
    title: "E-commerce product page",
    category: "Personal",

    thumbnail: "/images/travaux/Personal-sneakers-1-thumb.webp",

    description: "Création d'une page produit e-commerce en JavaScript.",

    technologies: [TECH_NAMES.HTML5, TECH_NAMES.JAVASCRIPT, TECH_NAMES.CSS3],

    details: {
      gallery: [
        "/images/travaux/personal-sneakers-1.webp",
        "/images/travaux/personal-sneakers-2.webp",
        "/images/travaux/personal-sneakers-3.webp",
        "/images/travaux/personal-sneakers-4.webp",
      ],
      github:
        "https://github.com/TomSif/Frontend_Mentor_E-commerce_product_page",
      live: "https://tomsif.github.io/Frontend_Mentor_E-commerce_product_page/",
    },
  },
  {
    id: 22,
    featured: false,
    title: "News homepage",

    category: "Personal",

    thumbnail: "/images/travaux/Personal-News-4-thumb.webp",

    description: "Création d'une page d'accueil d'actualités en JavaScript.",

    technologies: [TECH_NAMES.CSS3, TECH_NAMES.JAVASCRIPT, TECH_NAMES.HTML5],

    details: {
      gallery: [
        "/images/travaux/personal-news-1.webp",
        "/images/travaux/personal-news-2.webp",
        "/images/travaux/personal-news-3.webp",
        "/images/travaux/personal-news-4.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_News_Homepage_main",
      live: "https://tomsif.github.io/Front-end_Mentor_News_Homepage_main/",
    },
  },
  {
    id: 23,
    featured: false,
    title: "Bookmark",

    category: "Personal",

    thumbnail: "/images/travaux/Personal-Bookmark-4-thumb.webp",

    description: "Création d'une landing page avec rubriques en JavaScript.",

    technologies: [TECH_NAMES.HTML5, TECH_NAMES.JAVASCRIPT, TECH_NAMES.CSS3],

    details: {
      gallery: [
        "/images/travaux/personal-bookmark-1.webp",
        "/images/travaux/personal-bookmark-2.webp",
        "/images/travaux/personal-bookmark-3.webp",
        "/images/travaux/personal-bookmark-4.webp",
      ],
      github:
        "https://github.com/TomSif/Front-end-Mentor__Bookmark-Landing-Page-Master",
      live: "https://tomsif.github.io/Front-end-Mentor__Bookmark-Landing-Page-Master/",
    },
  },
  {
    id: 24,
    featured: false,
    title: "Loopstudios",
    category: "Personal",

    thumbnail: "/images/travaux/Personal-loop-4-thumb.webp",

    description: "Création d'une landing page pour Loopstudios.",

    technologies: [TECH_NAMES.HTML5, TECH_NAMES.JAVASCRIPT, TECH_NAMES.SASS],

    details: {
      gallery: [
        "/images/travaux/personal-loop-1.webp",
        "/images/travaux/personal-loop-2.webp",
        "/images/travaux/personal-loop-3.webp",
        "/images/travaux/personal-loop-4.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Loop-Studio",
      live: "https://tomsif.github.io/Front-end_Mentor_Loop-Studio/",
    },
  },
  {
    id: 25,
    featured: false,
    title: "Space-tourism",
    category: "Personal",

    thumbnail: "/images/travaux/Personal-space-1-thumb.webp",

    description: "Création d'une page de destination pour un site spatial.",

    technologies: [
      TECH_NAMES.HTML5,
      TECH_NAMES.JAVASCRIPT,
      TECH_NAMES.TAILWIND,
    ],

    details: {
      gallery: [
        "/images/travaux/personal-space-1.webp",
        "/images/travaux/personal-space-2.webp",
        "/images/travaux/personal-space-3.webp",
        "/images/travaux/personal-space-4.webp",
      ],
      github: "https://github.com/TomSif/Front-end__Mentor__Space-tourism",
      live: null, // Si pas de démo live
    },
  },

  // ==========================================
  // 📷 PROJETS PHOTOGRAPHY (Works)
  // ==========================================

  {
    id: 30,
    featured: false,
    title: "Portraits Indonésie",
    category: "Photography",

    thumbnail: "/images/travaux/photography-Portrait-4-thumb.webp",

    description: "Série de photos de portraits en Indonésie.",

    // ⚠️ PAS de technologies pour Photography

    details: {
      // ✅ 5-15 images HD pour galerie
      gallery: [
        "/images/travaux/photography-Portrait-1.webp",
        "/images/travaux/photography-Portrait-2.webp",
        "/images/travaux/photography-Portrait-3.webp",
        "/images/travaux/photography-Portrait-4.webp",
      ],
      // ⚠️ PAS de github ni live
    },
  },

  {
    id: 31,
    featured: false,
    title: "Street Photography Vietnam",
    category: "Photography",

    thumbnail: "/images/travaux/photography-N&B-8-thumb.webp",

    description: "Collection de portraits dans les rues de Ho Chi Minh.",

    details: {
      gallery: [
        "/images/travaux/photography-N&B-1.webp",
        "/images/travaux/photography-N&B-2.webp",
        "/images/travaux/photography-N&B-3.webp",
        "/images/travaux/photography-N&B-4.webp",
      ],
    },
  },
  {
    id: 32,
    featured: false,
    title: "Brutalism Architecture",
    category: "Photography",

    thumbnail: "/images/travaux/photography-bosnie-4-thumb.webp",

    description: "Collection de photos d'architecture brutaliste.",

    details: {
      gallery: [
        "/images/travaux/photography-bosnie-1.webp",
        "/images/travaux/photography-bosnie-2.webp",
        "/images/travaux/photography-bosnie-3.webp",
        "/images/travaux/photography-bosnie-4.webp",
      ],
    },
  },
  {
    id: 33,
    featured: false,
    title: "Photography Birmanie",
    category: "Photography",

    thumbnail: "/images/travaux/photography-birmanie-13-thumb.webp",

    description: "Collection de photography en Birmanie.",

    details: {
      gallery: [
        "/images/travaux/photography-birmanie-13.webp",
        "/images/travaux/photography-birmanie-9.webp",
        "/images/travaux/photography-birmanie-8.webp",
        "/images/travaux/photography-birmanie-4.webp",
      ],
    },
  },
  {
    id: 34,
    featured: false,
    title: "Photography Thaïlande",
    category: "Photography",

    thumbnail: "/images/travaux/photography-ayutthaya-2-thumb.webp",

    description: "Collection de portraits à Ayutthaya.",

    details: {
      gallery: [
        "/images/travaux/photography-ayutthaya-1.webp",
        "/images/travaux/photography-ayutthaya-2.webp",
        "/images/travaux/photography-ayutthaya-3.webp",
        "/images/travaux/photography-ayutthaya-4.webp",
      ],
    },
  },
  {
    id: 35,
    featured: false,
    title: "Photography du Donon",
    category: "Photography",

    thumbnail: "/images/travaux/photography-alsace-1-thumb.webp",

    description: "Collection de photography du Donon.",

    details: {
      gallery: [
        "/images/travaux/photography-alsace-1.webp",
        "/images/travaux/photography-alsace-2.webp",
        "/images/travaux/photography-alsace-3.webp",
        "/images/travaux/photography-alsace-4.webp",
      ],
    },
  },

  // ==========================================
  // 🎨 PROJETS GRAPHIC DESIGN (Works)
  // ==========================================

  {
    id: 40,
    featured: false,
    title: "travaux infographie",
    category: "GraphicDesign",

    thumbnail: "/images/travaux/COUETTE-insta2-thumb.webp",

    description: "Création photomontage pour les réseaux sociaux.",

    // ⚠️ Tu PEUX ajouter des technos pour GraphicDesign si pertinent
    technologies: [TECH_NAMES.PHPHOTOSHOP, TECH_NAMES.ILLUSTRATOR],

    details: {
      gallery: [
        "/images/travaux/graphic-1.webp",
        "/images/travaux/graphic-2.webp",
        "/images/travaux/graphic-3.webp",
        "/images/travaux/graphic-4.webp",
      ],
    },
  },

  // ... AJOUTE TES AUTRES PROJETS ICI
];

// ===================================
// 🔧 FONCTIONS UTILITAIRES
// ===================================

export const featuredProjects = allProjects.filter((p) => p.featured);
export const workProjects = allProjects.filter((p) => !p.featured);

export const getProjectsByCategory = (category) => {
  if (category === "All") return workProjects;
  return workProjects.filter((p) => p.category === category);
};

export const getProjectById = (id) => {
  return allProjects.find((p) => p.id === id);
};

// ===================================
// 📝 CHECKLIST AVANT COMMIT
// ===================================

/*
✅ Tous les chemins thumbnail finissent par "-thumb.webp"
✅ Tous les chemins gallery sont en HD (sans -thumb)
✅ Les projets Photography/GraphicDesign n'ont PAS de github/live
✅ Les projets code ont 2-4 images dans gallery
✅ Les projets visuels ont 5-15 images dans gallery
✅ Chaque projet a un ID unique
✅ Les descriptions font 100-200 caractères
*/
