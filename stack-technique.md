# Stack Technique - Portfolio Thomas Sifferlé

## 🎯 Technologies Core

### Front-End Framework
- **React** `19.2.0` - Bibliothèque JavaScript pour interfaces utilisateur
- **React DOM** `19.2.0` - Package pour manipulation du DOM avec React

### Build Tool & Development
- **Vite** `7.1.8` - Build tool moderne et ultra-rapide
- **@vitejs/plugin-react** `5.0.4` - Plugin officiel Vite pour React

---

## 🧭 Routing & Navigation

- **React Router DOM** `7.9.3` - Gestion du routage côté client
  - Navigation entre homepage et pages projet
  - Gestion des routes dynamiques (`/project/:slug`)
  - Scroll restoration automatique

---

## 🎨 Styling & Design

### CSS Architecture
- **Sass** `1.93.2` - Préprocesseur CSS
  - Architecture **7-1 pattern** (abstracts, base, components, pages)
  - Variables design tokens (couleurs, typographie, espacements)
  - Mixins réutilisables pour responsive design
  - Convention de nommage **BEM**

### Fonts (Hébergement local)
- **Montserrat** - 6 weights (300, 400, 500, 600, 700, 900)
- **Poppins** - 3 weights (400, 600, 700)
- **Plus Jakarta Sans** - 2 weights (400, 700)
- **Manrope** - 3 weights (400, 600, 700)
- Format **woff2** pour performance optimale
- **Preload** des polices critiques (Plus Jakarta Sans Regular, Montserrat Bold)

---

## ✨ Animations & Interactions

### Animation Libraries
- **Framer Motion** `12.23.24` - Bibliothèque d'animations React
  - Animations scroll-triggered (`whileInView`)
  - Orchestration avec `staggerChildren`
  - Spring physics pour effets naturels
  - Transitions de pages fluides

- **@lottiefiles/dotlottie-react** `0.17.5` - Lecteur d'animations Lottie
  - Animation Hero avec contrôle manuel
  - Déclenchement via IntersectionObserver
  - Fallback statique pour performance

### Gesture Recognition
- **react-swipeable** `7.0.2` - Gestion des gestes tactiles
  - Navigation swipe dans lightbox (gauche/droite)
  - Support mobile et tablette
  - Configuration `preventScrollOnSwipe`

---

## 🧩 UI Components & Icons

- **react-icons** `5.5.0` - Bibliothèque d'icônes
  - Simple Icons (logos technologiques)
  - React Icons (icônes UI)
  - Tabler Icons (icônes interface)
  - Font Awesome (icônes génériques)

---

## 🔧 Utilities & Tools

### Type Checking
- **prop-types** `15.8.1` - Validation des props React

### Build Optimization
- **vite-plugin-html** `3.2.2` - Optimisation HTML
  - Minification automatique
  - Injection de variables
  - Performance améliorée

---

## 🌐 Services Externes

### Form Backend
- **Formspree** - Service de traitement des formulaires
  - Endpoint : `https://formspree.io/f/xdkoqjzk`
  - Validation côté client et serveur
  - Protection anti-spam intégrée

### Hébergement & Déploiement
- **Vercel** - Plateforme de déploiement
  - Déploiement automatique depuis GitHub
  - CDN global pour performance
  - Custom domain : `thomas-sifferle.com`
  - HTTPS automatique

---

## 📊 SEO & Performance

### Meta Tags & Schema
- **Open Graph Protocol** - Partage social optimisé
- **Twitter Cards** - Prévisualisation Twitter/X
- **JSON-LD Schema Markup** - Données structurées
  - Person Schema (profil professionnel)
  - WebSite Schema (métadonnées portfolio)
  - 0 erreurs sur Schema.org validator

### Optimisations
- **Lazy Loading** - Chargement différé des images
- **Sitemap.xml** - Indexation Google
- **robots.txt** - Directives crawlers
- **Font Preloading** - Polices critiques préchargées
- **CSS Code Splitting** - CSS bundlé (moins de requêtes HTTP)

---

## 📱 Browser Support

### Production
- `>0.2%` - Navigateurs avec plus de 0.2% de parts de marché
- `not dead` - Navigateurs maintenus
- `not op_mini all` - Exclusion Opera Mini

### Development
- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)

---

## 🎯 Lighthouse Scores (Production)

- **Performance** : 97/100
- **Accessibility** : 96/100
- **Best Practices** : 100/100
- **SEO** : 100/100

---

## 📦 Détails Techniques

### React Features
- **React 19** (version stable)
- **Hooks personnalisés** :
  - `useScrollDirection` (détection direction scroll)
- **Components fonctionnels** (100% hooks)
- **Context API** (pas de Redux nécessaire)

### Vite Configuration
- **Module preload polyfill** activé
- **CSS code split** désactivé (bundle unique)
- **HTML optimization plugin** configuré
- **React plugin** avec Fast Refresh

### Architecture Files
```
src/
├── components/      # Composants réutilisables
├── pages/          # Pages (Home, ProjectPage)
├── data/           # Données centralisées (projects.js)
├── styles/         # SCSS 7-1 architecture
│   ├── abstracts/  # Variables, mixins, functions
│   ├── base/       # Reset, typography, animations
│   ├── components/ # Styles composants
│   └── pages/      # Styles pages
└── assets/         # Ressources statiques

public/
├── images/         # Images optimisées (WebP)
├── fonts/          # Polices locales (woff2)
├── animations/     # Fichiers Lottie
├── sitemap.xml     # Plan du site
└── robots.txt      # Directives SEO
```

---

## 🔑 Points Clés pour Infographie

### Technologies Principales (à mettre en avant)
1. **React 19** - Framework UI moderne
2. **Vite** - Build tool ultra-rapide
3. **Sass** - Architecture CSS 7-1
4. **Framer Motion** - Animations professionnelles
5. **React Router** - Navigation fluide

### Librairies Spécialisées
- **@lottiefiles/dotlottie-react** - Animations vectorielles
- **react-swipeable** - Gestes tactiles
- **react-icons** - 5000+ icônes

### Services Externes
- **Formspree** - Backend formulaire
- **Vercel** - Hébergement & CDN

### Performance & SEO
- Lighthouse **97/96/100/100**
- JSON-LD Schema Markup
- Local Font Hosting
- Lazy Loading Images

---

## 📄 Versions & Compatibilité

| Technologie | Version | Release Date |
|-------------|---------|--------------|
| React | 19.2.0 | Janvier 2025 |
| Vite | 7.1.8 | Février 2025 |
| Framer Motion | 12.23.24 | Décembre 2024 |
| React Router | 7.9.3 | Janvier 2025 |
| Sass | 1.93.2 | Février 2025 |
| React Icons | 5.5.0 | Octobre 2024 |

---

**Total** : 13 dépendances (10 production + 3 dev)
**Taille du bundle** : ~250KB (gzipped)
**Performance** : 97/100 Lighthouse
