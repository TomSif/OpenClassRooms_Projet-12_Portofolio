# Devlog — Portfolio Thomas Sifferle

> Journal de bord des modifications apportées au portfolio. Format inspiré des fichiers `progression.md` des projets FEM — chaque session documente ce qui a été fait, pourquoi, et ce qui reste à améliorer.

---

## Session 2026-05-29 — Mise à jour majeure : projets FEM 2026 + section Démarche

### ✅ Étapes accomplies

#### Données & contenu projets

- `techConfig.js` — ajout de `TYPESCRIPT: "TypeScript"` (clé manquante, bloquait le tag sur les nouveaux projets)
- `project.js` — ajout de 11 projets Front-End Mentor 2026 (ids 26–29, 50–56) dans la catégorie `Personal`
- `project.js` — ajout d'un champ `date` sur tous les projets `Personal` (exact sur les nouveaux, approximatif sur les anciens de 2024)
- `project.js` — ajout des champs `devlog` et `audit` pointant vers les fichiers markdown dans `public/devlogs/`

#### Images

- Création du sous-dossier `public/images/travaux/2026/`
- Conversion de **34 screenshots PNG → WebP** via FFmpeg (quality 85, gallery 1280px wide — quality 80, thumbnail 420×205px cropé)
- 11 projets couverts : Memory Game, REST Countries, Mortgage Calculator, Product List, Results Summary, Password Generator, Quiz App, BMI Calculator, Tic Tac Toe, Galleria, Pomodoro

#### Works.jsx

- Suppression du `.slice(0, 6)` qui bridait l'affichage à 6 projets par catégorie — tous les projets `Personal` (17) sont désormais visibles
- Tri par `date` décroissant — les projets les plus récents apparaissent en premier
- Filtre par défaut changé de `"Scholar"` → `"Personal"` (les projets TypeScript 2026 sont la vitrine principale)

#### About.jsx

- Texte entièrement réécrit — suppression de toutes les références d'âge (`"46 ans"`, `"25 ans de passion internet"`, `"Ces années"`)
- Mise en avant des projets TypeScript récents (Memory Game, REST Countries, Galleria, Pomodoro) à la place d'Argent Bank et Sophie Bluel
- OpenClassrooms conservé mais réduit à une mention du diplôme
- Ajout des icônes `SiTypescript`, `SiTailwindcss`, `TbAtom2` (Zustand — pas d'icône officielle dans react-icons)
- Texte du §2 mis à jour : `"React, TypeScript, JavaScript ES6, Tailwind CSS"` + `"gestion d'état (Redux, Zustand)"`
- Sidebar : suppression de l'entrée **Cash-Express / 2015** (trop révélatrice de l'ancienneté)

#### Navbar

- `"Travaux Sélectionnés"` → **`"Projets Sélectionnés"`** (desktop + dropdown mobile)
- `"Travaux"` → **`"Projets"`** (desktop + dropdown mobile)

#### Section Methodology (nouveau composant)

- Création de `Methodology.jsx` — 3 piliers : **DEVLOG**, **AUDIT** (3.9/5), **AGENTS.md**
- Chaque pilier avec badge pill, icône, titre, description et CTA optionnel
- Design aligné sur le footer : même fond `#242a41`, titres blancs uppercase, texte `rgba(255,255,255,0.7)`, séparateurs `rgba(255,255,255,0.1)`, CTA orange au hover
- Animations Framer Motion (stagger children au scroll)
- Insertion dans `Home.jsx` entre `#about` et `#portfolio`
- Création de `_methodology.scss` avec les variables SCSS du projet

#### MarkdownModal (nouveau composant)

- Création de `MarkdownModal.jsx` — fetch d'un fichier `.md` depuis `public/`, rendu via `react-markdown` + `remark-gfm`
- Fermeture via ✕, clic overlay ou Échap
- Styles markdown complets : titres hiérarchisés, tables GFM, code inline/bloc, blockquotes, checkboxes, `hr`
- Installation de `react-markdown` et `remark-gfm` (contournement SSL proxy via `npm config set strict-ssl false`)
- Copie de tous les fichiers `progression.md` et `rapport.md` dans `public/devlogs/[slug]/`

| Projet | DEVLOG | AUDIT |
|--------|--------|-------|
| memory-game | ✅ | ✅ (7 reviews) |
| rest-countries | ✅ | ✅ (6 reviews) |
| mortgage-calculator | ✅ | ✅ (5 reviews) |
| product-list | ✅ | ✅ (4 reviews) |
| results-summary | ✅ | ✅ (3 reviews) |
| pomodoro | ✅ | ✅ (1 review) |
| galleria | ✅ | — |
| tic-tac-toe | ✅ | — |
| bmi-calculator | ✅ | — |
| quiz-app | ✅ | — |
| password-generator | ✅ | — |

#### Badges DEVLOG / AUDIT dans la lightbox

- Badges déplacés des cartes Works → **intérieur de la lightbox projet** (section détails, sous les boutons Site Web / GitHub)
- Séparateur `border-top` discret au-dessus des badges
- Styles pill (border-radius full) cohérents avec le footer (`availability-badge`)
- Fix crash React : `return()` avec deux éléments racine → enveloppés dans `<>...</>`

---

### 🧠 Décisions techniques notables

| Décision | Raison |
|----------|--------|
| `TbAtom2` pour Zustand | Pas d'icône officielle dans `react-icons@5.5` — `TbAtom2` (Tabler) représente le concept d'état atomique |
| `date: "2024-06"` approximatif sur anciens projets | Aucune source fiable (mtimes tous identiques — portfolio créé en une seule session). Champs corrigeables |
| Badges dans la lightbox et non sur la carte | La carte doit rester épurée. Le recruteur curieux clique, il trouve les logs à l'intérieur |
| `rapport.md` cumulatif | Chaque fichier contient l'historique complet jusqu'à ce projet. Cliquer sur AUDIT Memory Game → 7 reviews visibles. Progression narrative en une lecture |
| `.slice(0, 6)` supprimé sans pagination | 17 projets Personal reste lisible en grille. À réévaluer si le nombre dépasse 24 |

---

### ⚠️ Points fragiles / décisions provisoires

- Les dates des anciens projets `Personal` (ids 20–24) sont approximatives — à corriger si l'ordre exact a de l'importance
- Le `rapport.md` du projet `product-list` était dans un sous-dossier `product-list/product-list/` — à surveiller si la structure des futurs projets change
- `npm config set strict-ssl false` utilisé pour contourner un proxy SSL — remettre à `true` après chaque session sur ce réseau (déjà fait en fin de session)
- Le footer contient encore `"Travaux Sélectionnés"` et `"Travaux"` dans ses liens de navigation — non synchronisé avec le renommage navbar

---

## 🔮 Améliorations futures

### Priorité haute — impact recruteur direct

- [ ] **Mettre à jour la section "Projets Sélectionnés"** — remplacer ou compléter Argent Bank / Sophie Bluel par Memory Game (ou le projet perso my-shelf quand prêt). C'est ce qu'un recruteur voit en premier.
- [ ] **Intégrer my-shelf** quand le projet est présentable — application de gestion de parfums, projet 100% original, stack React/TypeScript. Premier projet sans brief FEM = signal fort d'autonomie créative.
- [ ] **Intégrer le site imprimeur** quand livrable — projet client réel avec CMS. Apporte la preuve d'une commande concrète et d'un workflow de livraison.
- [ ] **Synchroniser les liens du footer** — `"Travaux Sélectionnés"` → `"Projets Sélectionnés"` et `"Travaux"` → `"Projets"` (oublié lors du renommage navbar).
- [ ] **Ajouter "Démarche" dans la navbar** — la section Methodology existe mais n'est pas accessible depuis la navbar ni le footer. Un recruteur qui scroll vite peut la manquer.

### Priorité moyenne — qualité et profondeur

- [ ] **Ajouter des tests sur un projet FEM simple** (résultats-summary ou mortgage-calculator) — Vitest + React Testing Library. Actuellement absent de tous les projets, bloquant pour ~70% des offres junior.
- [ ] **Highlight syntaxique dans MarkdownModal** — installer `react-syntax-highlighter` pour que les blocs `code` des audits soient lisibles avec couleurs. Les extraits TypeScript/JSX sont actuellement en monochrome.
- [ ] **Spinner de chargement dans MarkdownModal** — remplacer le `"Chargement…"` texte par une animation (les fichiers `rapport.md` font jusqu'à 1700 lignes).
- [ ] **Page dédiée "Audits"** — tableau récapitulatif de tous les scores sur 12 axes, projet par projet. Actuellement accessible uniquement via les badges en lightbox.
- [ ] **Évaluer le retrait de "Junior"** — si my-shelf et le site client atteignent un niveau suffisant, le titre `"Développeur Front-End Junior"` peut devenir `"Développeur Front-End"`. À décider projet par projet.

### Priorité basse — polish technique

- [ ] **SEO et meta tags** — `<title>` et `<meta description>` dynamiques par route, Open Graph pour le partage LinkedIn.
- [ ] **Lazy loading images** — les 34+ images WebP en `public/images/travaux/2026/` sont chargées à la demande dans la lightbox, mais pas en intersection observer sur la grille Works.
- [ ] **Mise à jour des dates approximatives** des anciens projets Personal (ids 20–24) — vérifier les dates réelles via les historiques git des repos GitHub.
- [ ] **`aria-live` sur le filtre Works** — annoncer le nombre de projets affichés après changement de catégorie pour les lecteurs d'écran.
- [ ] **Pagination ou "Voir plus"** dans Works — à implémenter si le nombre de projets `Personal` dépasse 20-24.

---

## 📊 État du portfolio après cette session

| Section | Avant | Après |
|---------|-------|-------|
| Projets Personal | 6 (JS vanilla) | 17 (dont 10 TypeScript) |
| Stack affichée About | JS, HTML, CSS, React, Sass, Redux | + TypeScript, Tailwind CSS, Zustand |
| Références d'âge | 3 occurrences | 0 |
| Section Démarche | Absente | Présente (DEVLOG + AUDIT + IA Socratique) |
| Logs accessibles | Non | 11 DEVLOG + 6 AUDIT en lightbox |
| Filtre par défaut Works | Scholar | Personal |
| Tri projets | Ordre insertion | Chronologique décroissant |
