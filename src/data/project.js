// ===================================
// 📊 EXEMPLE DE STRUCTURE projects.js
// ===================================
// Avec la nouvelle organisation des images (structure plate + suffixe -thumb)

import { TECH_NAMES } from "./techConfig"; // (si séparé)

export const allProjects = [
  // ===================================
  // 🌟 PROJETS PRINCIPAUX ENRICHIS (featured: true)
  // ===================================
  // Pour ProjectPage.jsx - Avec les 6 sections complètes

  {
    id: 1,
    featured: true,
    slug: "sophie-bluel",
    title: "Sophie Bluel - Portfolio Architecte",
    category: "Scholar",
    thumbnail: "/images/travaux/SelectedWorks-sophie bluel-8-thumb.webp",
    description:
      "Développement d'un portfolio dynamique en JavaScript vanilla avec API REST et authentification JWT. Manipulation du DOM, gestion d'événements et intégration fidèle des maquettes Figma. Système d'administration complet pour la gestion de projets.",
    technologies: [TECH_NAMES.JAVASCRIPT, TECH_NAMES.HTML5, TECH_NAMES.CSS3],

    details: {
      // Galerie d'images HD pour la page projet
      gallery: [
        "/images/travaux/works-sophie bluel-1.webp",
        "/images/travaux/works-sophie bluel-2.webp",
        "/images/travaux/works-sophie bluel-3.webp",
        "/images/travaux/works-sophie bluel-4.webp",
        "/images/travaux/works-sophie bluel-5.webp",
        "/images/travaux/works-sophie bluel-6.webp",
        "/images/travaux/works-sophie bluel-7.webp",
      ],

      // Liens externes
      github:
        "https://github.com/TomSif/TomSif-OpenClassRooms_Projet-6_Sophie-Bluel",
      live: "https://tom-sif-open-class-rooms-projet-6-sophie-bluel.vercel.app/index.html",

      // 📝 6 SECTIONS DÉTAILLÉES
      sections: {
        contexte: {
          title: "Contexte",
          content:
            "Sophie Bluel, architecte d'intérieur, avait besoin d'un portfolio en ligne pour présenter ses réalisations à ses clients potentiels. Le site existant était statique et ne permettait pas de mettre à jour facilement les projets. L'agence ArchiWebos m'a confié la mission de développer une nouvelle version dynamique avec un système d'administration complet.",
          highlights: [
            "Client réel : Architecte d'intérieur établie",
            "Problématique : Site statique difficile à maintenir",
            "Solution : Portfolio dynamique avec back-office",
          ],
        },

        objectifs: {
          title: "Objectifs",
          content:
            "Transformer un site statique en une application web dynamique permettant à l'architecte de gérer son contenu de manière autonome.",
          list: [
            "Développer la partie front-end dynamique en JavaScript Vanilla",
            "Créer une interface d'administration sécurisée",
            "Implémenter un système de filtrage par catégorie",
            "Gérer l'authentification et les autorisations",
            "Permettre l'ajout, modification et suppression de projets",
            "Optimiser l'expérience utilisateur sur tous les devices",
          ],
        },

        stack: {
          title: "Stack Technique",
          content:
            "Une architecture JavaScript moderne sans framework, démontrant une maîtrise des fondamentaux.",
          categories: {
            frontend: {
              title: "Frontend",
              items: [
                "JavaScript ES6+",
                "HTML5 sémantique",
                "CSS3 avec animations",
                "Fetch API",
              ],
            },
            backend: {
              title: "Backend",
              items: ["API REST", "JWT Authentication", "Node.js", "Express"],
            },
            tools: {
              title: "Outils & Méthodologies",
              items: [
                "Git & GitHub",
                "Swagger",
                "Postman",
                "Architecture MVC",
                "Responsive Design",
              ],
            },
          },
        },

        competences: {
          title: "Compétences Développées",
          content:
            "Ce projet m'a permis de consolider mes compétences en JavaScript pur et de comprendre en profondeur les mécanismes du web moderne.",
          skills: [
            {
              name: "Architecture MVC personnalisée",
              description:
                "Création d'une architecture Model-View-Controller from scratch pour organiser le code",
            },
            {
              name: "Gestion d'état custom",
              description:
                "Développement d'un gestionnaire d'état sans framework pour synchroniser l'UI",
            },
            {
              name: "Authentification JWT",
              description:
                "Implémentation complète du flow d'authentification avec tokens et refresh",
            },
            {
              name: "Manipulation du DOM avancée",
              description:
                "Création, modification et suppression dynamique d'éléments sans framework",
            },
            {
              name: "API REST",
              description:
                "Consommation et gestion des erreurs d'une API avec Fetch",
            },
            {
              name: "Système de notifications",
              description:
                "Toasts personnalisés pour feedback utilisateur (initiative personnelle)",
            },
          ],
        },

        resultats: {
          title: "Résultats & Impact",
          content:
            "Un portfolio professionnel et fonctionnel qui dépasse les attentes initiales du client.",
          metrics: [
            "✅ 100% des fonctionnalités livrées et validées",
            "✅ Score Lighthouse : Performance 95+, Accessibilité 100",
            "✅ Compatible tous navigateurs modernes",
            "✅ Responsive design mobile-first",
            "✅ Déploiement production réussi (Frontend Vercel + Backend Render)",
            '✅ Code review : "Excellent travail, code propre et bien structuré"',
          ],
          achievements: [
            "Interface d'administration intuitive et sécurisée",
            "Système de filtrage instantané par catégorie",
            "Modal gallery avec navigation fluide",
            "Gestion des erreurs et états de chargement",
            "Documentation technique complète",
          ],
        },

        perspectives: {
          title: "Perspectives d'Amélioration",
          content:
            "Bien que le projet soit complet et fonctionnel, plusieurs évolutions sont envisageables pour enrichir l'expérience.",
          improvements: [
            {
              feature: "Migration TypeScript",
              reason:
                "Ajouter la sécurité des types pour faciliter la maintenance",
            },
            {
              feature: "Tests automatisés",
              reason: "Jest et Cypress pour garantir la stabilité",
            },
            {
              feature: "Optimisation images",
              reason: "Lazy loading et formats modernes (WebP, AVIF)",
            },
            {
              feature: "Mode hors ligne",
              reason: "Service Worker pour consultation sans connexion",
            },
            {
              feature: "Animations avancées",
              reason: "Transitions et micro-interactions pour enrichir l'UX",
            },
            {
              feature: "Dashboard analytics",
              reason: "Statistiques de visite pour l'architecte",
            },
          ],
        },
      },

      // 📊 STATISTIQUES DU PROJET
      stats: {
        duration: "3 semaines",
        commits: 127,
        lines_of_code: "3,500+",
        complexity: "Intermédiaire",
        completion: "120%", // Dépassement des attentes
        grade: "Validé avec félicitations",
      },
    },
  },

  {
    id: 2,
    featured: true,
    slug: "argent-bank",
    title: "Argent Bank - Application Bancaire",
    category: "Scholar",
    thumbnail: "/images/travaux/SelectedWorks-ArgentBank-9-thumb.webp",
    description:
      "Application bancaire React avec authentification JWT complète et gestion d'état avancée via Redux Toolkit. Architecture modulaire, intégration API REST et interfaces performantes. Code maintenable selon les best practices du développement front-end moderne.",
    technologies: [
      TECH_NAMES.REACT,
      TECH_NAMES.REDUX,
      TECH_NAMES.SASS,
      TECH_NAMES.JAVASCRIPT,
    ],

    details: {
      // Galerie d'images HD
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

      // Liens externes
      github: "https://github.com/TomSif/OpenClassRooms_Projet-10_Argent-Bank",
      live: null,

      // 📝 6 SECTIONS DÉTAILLÉES
      sections: {
        contexte: {
          title: "Contexte",
          content:
            "Argent Bank, une nouvelle banque en ligne, souhaitait créer une application web moderne permettant aux utilisateurs de se connecter et de gérer leur profil et leurs comptes. Le projet s'inscrit dans une refonte complète de leur système, avec une phase 1 focalisée sur l'authentification et la gestion du profil utilisateur, et une phase 2 prévue pour les transactions.",
          highlights: [
            "Startup fintech en pleine croissance",
            "Besoin d'une application scalable et sécurisée",
            "Architecture prête pour évolutions futures",
          ],
        },

        objectifs: {
          title: "Objectifs",
          content:
            "Développer une application bancaire robuste avec une gestion d'état globale et une authentification sécurisée.",
          list: [
            "Créer l'application web responsive avec React",
            "Implémenter Redux pour la gestion d'état global",
            "Développer le système d'authentification JWT complet",
            "Gérer la persistance de session",
            "Permettre la modification du profil utilisateur",
            "Documenter les endpoints API pour la phase 2 (transactions)",
            "Respecter les maquettes et l'expérience utilisateur",
            "Optimiser les performances et la sécurité",
          ],
        },

        stack: {
          title: "Stack Technique",
          content:
            "Une stack moderne orientée production avec les dernières versions des technologies React.",
          categories: {
            frontend: {
              title: "Frontend",
              items: [
                "React 19",
                "Redux Toolkit",
                "React Router v6",
                "Sass (modules)",
                "Vite",
              ],
            },
            stateManagement: {
              title: "Gestion d'État",
              items: ["Redux Toolkit", "Redux Persist", "Redux DevTools"],
            },
            backend: {
              title: "Backend & API",
              items: [
                "API REST",
                "JWT Tokens",
                "Swagger Documentation",
                "MongoDB",
                "Node.js/Express",
              ],
            },
            tools: {
              title: "Outils & Méthodologies",
              items: [
                "Git Flow",
                "ESLint & Prettier",
                "Postman",
                "Component-based architecture",
                "Atomic Design",
              ],
            },
          },
        },

        competences: {
          title: "Compétences Développées",
          content:
            "Ce projet m'a permis de maîtriser Redux et l'architecture d'applications React complexes.",
          skills: [
            {
              name: "Redux Toolkit avancé",
              description:
                "Maîtrise de createSlice, createAsyncThunk, et des best practices Redux modernes",
            },
            {
              name: "Authentification JWT complète",
              description:
                "Flow complet avec login, logout, refresh token et persistance sécurisée",
            },
            {
              name: "Architecture modulaire",
              description:
                "Organisation en features avec slices Redux dédiés et composants réutilisables",
            },
            {
              name: "Gestion des erreurs",
              description:
                "Error boundaries, try-catch et gestion d'états d'erreur dans Redux",
            },
            {
              name: "Documentation API Swagger",
              description:
                "Rédaction complète des spécifications pour la phase 2 (initiative personnelle)",
            },
            {
              name: "Optimisation React",
              description:
                "Mémoisation, lazy loading, et optimisation des re-renders",
            },
          ],
        },

        resultats: {
          title: "Résultats & Impact",
          content:
            "Une application bancaire professionnelle dépassant les standards de l'industrie.",
          metrics: [
            '✅ 4/4 compétences validées "Dépasse les attentes"',
            "✅ Score Lighthouse : Performance 98, Accessibilité 100",
            "✅ Temps de chargement initial < 2s",
            "✅ Bundle size optimisé (< 200kb gzipped)",
            "✅ 100% de couverture des user stories",
            "✅ Documentation Swagger Phase 2 complète (bonus)",
          ],
          achievements: [
            "Interface utilisateur fluide et professionnelle",
            "Système d'authentification robuste et sécurisé",
            "Gestion d'état Redux exemplaire",
            "Persistance de session sans faille",
            "Code modulaire et maintenable",
            "Préparation complète pour la phase 2",
          ],
        },

        perspectives: {
          title: "Perspectives d'Amélioration",
          content:
            "L'application est prête pour la phase 2 avec de nombreuses possibilités d'évolution.",
          improvements: [
            {
              feature: "Implémentation des transactions",
              reason:
                "Phase 2 du projet avec gestion complète des opérations bancaires",
            },
            {
              feature: "Tests end-to-end",
              reason:
                "Cypress pour garantir les parcours utilisateurs critiques",
            },
            {
              feature: "Authentification biométrique",
              reason: "Face ID / Touch ID pour mobile",
            },
            {
              feature: "Mode sombre",
              reason: "Theme switching avec CSS variables et contexte React",
            },
            {
              feature: "Notifications temps réel",
              reason: "WebSocket pour alertes transactions et messages",
            },
            {
              feature: "PWA",
              reason: "Application installable avec fonctionnalités offline",
            },
            {
              feature: "Internationalisation",
              reason: "Support multi-langues avec react-i18next",
            },
          ],
        },
      },

      // 📊 STATISTIQUES DU PROJET
      stats: {
        duration: "4 semaines",
        commits: 23,
        lines_of_code: "5,200+",
        complexity: "Avancé",
        completion: "100%",
        grade: "Validé ",
      },
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
    date: "2024-06",
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
    date: "2024-07",
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
    date: "2024-09",
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
    date: "2024-10",
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
    date: "2024-11",
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
    date: "2026-03",
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

    // ajouter des technos pour GraphicDesign si pertinent
    technologies: [TECH_NAMES.PHOTOSHOP, TECH_NAMES.ILLUSTRATOR],

    details: {
      gallery: [
        "/images/travaux/graphic-1.webp",
        "/images/travaux/graphic-2.webp",
        "/images/travaux/graphic-3.webp",
        "/images/travaux/graphic-4.webp",
      ],
    },
  },

  // ==========================================
  // 💻 PROJETS FRONTEND MENTOR 2026 (TypeScript)
  // ==========================================

  {
    id: 26,
    featured: false,
    date: "2026-05-28",
    title: "Memory Game",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-memory-game-1-thumb.webp",

    description:
      "Jeu de mémoire React/TypeScript avec sélection de thème, grille configurable et gestion d'état global via Zustand.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-memory-game-1.webp",
        "/images/travaux/2026/personal-memory-game-2.webp",
        "/images/travaux/2026/personal-memory-game-3.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Memory-Game",
      live: "https://front-end-mentor-memory-game.vercel.app/",
      devlog: "/devlogs/memory-game/progression.md",
      audit: "/devlogs/memory-game/rapport.md",
    },
  },

  {
    id: 27,
    featured: false,
    date: "2026-05-11",
    title: "REST Countries API",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-rest-countries-1-thumb.webp",

    description:
      "Application de recherche de pays avec dark mode, filtres par région et page de détail via l'API REST Countries.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-rest-countries-1.webp",
        "/images/travaux/2026/personal-rest-countries-2.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Rest_Countries_API",
      live: "https://front-end-mentor-rest-countries-api-omega.vercel.app/",
      devlog: "/devlogs/rest-countries/progression.md",
      audit: "/devlogs/rest-countries/rapport.md",
    },
  },

  {
    id: 28,
    featured: false,
    date: "2026-05-02",
    title: "Mortgage Repayment Calculator",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-mortgage-calculator-1-thumb.webp",

    description:
      "Calculatrice de remboursement hypothécaire avec validation de formulaire, calcul dynamique des mensualités et design responsive.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-mortgage-calculator-1.webp",
        "/images/travaux/2026/personal-mortgage-calculator-2.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Mortgage_Repayement_Calculator",
      live: "https://front-end-mentor-mortgage-repayemen.vercel.app/",
      devlog: "/devlogs/mortgage-calculator/progression.md",
      audit: "/devlogs/mortgage-calculator/rapport.md",
    },
  },

  {
    id: 29,
    featured: false,
    date: "2026-04-21",
    title: "Product List with Cart",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-product-list-1-thumb.webp",

    description:
      "Boutique de desserts avec gestion de panier, modale de confirmation de commande et layout adaptatif mobile/desktop.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-product-list-1.webp",
        "/images/travaux/2026/personal-product-list-2.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Product-List/tree/main",
      live: "https://front-end-mentor-product-list.vercel.app/",
      devlog: "/devlogs/product-list/progression.md",
      audit: "/devlogs/product-list/rapport.md",
    },
  },

  {
    id: 50,
    featured: false,
    date: "2026-04-20",
    title: "Results Summary Component",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-results-summary-1-thumb.webp",

    description:
      "Composant de résumé de score avec catégories colorées, scores détaillés et design adaptatif mobile/desktop.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-results-summary-1.webp",
        "/images/travaux/2026/personal-results-summary-2.webp",
      ],
      github: "https://github.com/TomSif/Front-End_Mentor_Results-Summary-App/tree/main",
      live: "https://front-end-mentor-results-summary-guq1w8dcc-tom-sifs-projects.vercel.app/",
      devlog: "/devlogs/results-summary/progression.md",
      audit: "/devlogs/results-summary/rapport.md",
    },
  },

  {
    id: 51,
    featured: false,
    date: "2026-03-01",
    title: "Password Generator App",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-password-generator-1-thumb.webp",

    description:
      "Générateur de mots de passe avec contrôle de longueur, sélection de caractères et indicateur de force.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-password-generator-1.webp",
      ],
      github: "https://github.com/TomSif/Front-End_Mentor_Password-Generator_App",
      live: "https://front-end-mentor-password-generator-ec4kzpda9-tom-sifs-projects.vercel.app/",
      devlog: "/devlogs/password-generator/progression.md",
    },
  },

  {
    id: 52,
    featured: false,
    date: "2026-03-08",
    title: "Frontend Quiz App",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-quiz-app-1-thumb.webp",

    description:
      "Application de quiz interactif sur les technologies front-end avec sélection de thème et scoring.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-quiz-app-1.webp",
        "/images/travaux/2026/personal-quiz-app-2.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Quiz-App",
      live: "https://quiz-app-omega-topaz.vercel.app/",
      devlog: "/devlogs/quiz-app/progression.md",
    },
  },

  {
    id: 53,
    featured: false,
    date: "2026-03-17",
    title: "BMI Calculator",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-bmi-calculator-1-thumb.webp",

    description:
      "Calculatrice d'indice de masse corporelle avec interprétation des résultats et conseils de santé.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-bmi-calculator-1.webp",
        "/images/travaux/2026/personal-bmi-calculator-2.webp",
        "/images/travaux/2026/personal-bmi-calculator-3.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_BMI-Calculator",
      live: "https://front-endmentorbmi-calculator.vercel.app/",
      devlog: "/devlogs/bmi-calculator/progression.md",
    },
  },

  {
    id: 54,
    featured: false,
    date: "2026-03-22",
    title: "Tic Tac Toe",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-tic-tac-toe-1-thumb.webp",

    description:
      "Jeu de morpion contre l'IA ou en multijoueur local, avec sélection de symbole et suivi des scores.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-tic-tac-toe-1.webp",
        "/images/travaux/2026/personal-tic-tac-toe-2.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Tic-Tac-Toe",
      live: "https://front-end-mentor-tic-tac-toe.vercel.app/",
      devlog: "/devlogs/tic-tac-toe/progression.md",
    },
  },

  {
    id: 55,
    featured: false,
    date: "2026-04-08",
    title: "Galleria Slideshow",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-galleria-1-thumb.webp",

    description:
      "Galerie d'art avec navigation slideshow, pages de détail et transitions fluides via Framer Motion.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-galleria-1.webp",
        "/images/travaux/2026/personal-galleria-2.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Galleria_Slide-show",
      live: "https://front-end-mentor-galleria-slide-sho.vercel.app/",
      devlog: "/devlogs/galleria/progression.md",
    },
  },

  {
    id: 56,
    featured: false,
    date: "2026-04-17",
    title: "Pomodoro App",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-pomodoro-1-thumb.webp",

    description:
      "Timer Pomodoro avec cycles travail/pause configurables, sons d'alerte et interface minimaliste.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-pomodoro-1.webp",
        "/images/travaux/2026/personal-pomodoro-2.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Pomodoro-App",
      live: "https://front-end-mentor-pomodoro-app.vercel.app/",
      devlog: "/devlogs/pomodoro/progression.md",
      audit: "/devlogs/pomodoro/rapport.md",
    },
  },

  {
    id: 57,
    featured: false,
    date: "2026-06-16",
    title: "Tip Calculator App",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-tip-calculator-1-thumb.webp",

    description:
      "Calculatrice de pourboire React/TypeScript avec validation de formulaire, gestion d'input décimal et suite de tests Vitest + RTL complète.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-tip-calculator-1.webp",
        "/images/travaux/2026/personal-tip-calculator-2.webp",
        "/images/travaux/2026/personal-tip-calculator-3.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Tip_Calculator_with_Tests",
      live: "https://front-end-mentor-tip-calculator-wit.vercel.app/",
      devlog: "/devlogs/tip-calculator/progression.md",
      audit: "/devlogs/tip-calculator/rapport.md",
    },
  },

  {
    id: 58,
    featured: false,
    date: "2026-07-11",
    title: "Interactive Comments Section",
    category: "Personal",

    thumbnail: "/images/travaux/2026/personal-interactive-comments-1-thumb.webp",

    description:
      "Fil de commentaires full-stack avec réponses imbriquées, votes, édition et suppression — API REST Express/SQLite déployée sur Render, front React sur Vercel.",

    technologies: [TECH_NAMES.REACT, TECH_NAMES.TYPESCRIPT, TECH_NAMES.TAILWIND],

    details: {
      gallery: [
        "/images/travaux/2026/personal-interactive-comments-1.webp",
        "/images/travaux/2026/personal-interactive-comments-2.webp",
        "/images/travaux/2026/personal-interactive-comments-3.webp",
      ],
      github: "https://github.com/TomSif/Front-end_Mentor_Interactive_Comments_Full-Stack",
      live: "https://front-end-mentor-interactive-commen-psi.vercel.app/",
      devlog: "/devlogs/interactive-comments/progression.md",
      audit: "/devlogs/interactive-comments/rapport.md",
    },
  },

  // ... AJOUTER LES AUTRES PROJETS ICI
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
✅ Les projets visuels ont 4-15 images dans gallery
✅ Chaque projet a un ID unique
✅ Les descriptions font 100-200 caractères
*/
