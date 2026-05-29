## Session 12 — 2026-04-08 — Accessibilité et robustesse (finalisation challenge)

### ✅ Étapes accomplies

- Ajout de `id="gallery-slideshow"`, `role="region"`, `aria-label="Gallery slideshow"` sur le wrapper du slideshow
- Ajout de `aria-hidden={isOpen || undefined}` sur le fond quand le dialog est ouvert
- Ajout de `aria-controls="gallery-slideshow"` sur les boutons START/STOP SLIDESHOW dans le header (conditionnel selon la route)
- Correction du `<strong>` → `<h2>` dans Cards.tsx pour la hiérarchie de headings
- Ajout d'un `<h1 className="sr-only">` sur la Home
- Ajout de `aria-label` descriptifs sur les boutons back/next du footer
- Suppression d'un `aria-label="Go to home page"` erroné sur le lien GO TO SOURCE
- Ajout d'un guard `if (!currentArticle) return <Navigate to="/404" />` dans Article
- Commentaire documentant le compromis sémantique des `<ul>` multiples pour la maquette
- Note finale : score Frontend Mentor 7.7 — pénalités sur React Router déprécié, choix ul multiples assumé, attribut inline CSS imposé par Tailwind

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `aria-controls` — usage correct vs incorrect | Nouvelle | Valide seulement quand la cible existe dans le DOM — conditionnel selon la route |
| `aria-hidden={isOpen \|\| undefined}` | Nouvelle | `undefined` omet l'attribut du DOM ; `false` le laisse présent et crée des problèmes AT |
| `role="region"` + `aria-label` | Nouvelle | Crée une région nommée navigable par les lecteurs d'écran |
| `showModal()` gère le focus automatiquement | Consolidée | Focus → premier élément focusable ; restauration au déclencheur à la fermeture — pas besoin de `.focus()` manuel |
| Early return avec `<Navigate>` vs `useEffect` | Nouvelle | JSX dans un effet est ignoré — le composant `<Navigate>` se retourne dans le JSX directement |
| `aria-label` redondant si texte visible identique | Consolidée | Si le texte du bouton/lien dit déjà ce qu'il faut, `aria-label` est inutile |
| `aria-controls=""` vs `undefined` | Nouvelle | Valeur vide laisse l'attribut présent ; `undefined` l'omet entièrement du DOM |
| `.findIndex()` retourne `-1` si pas trouvé | Nouvelle | N'était pas su — important pour les guards sur les données |

### ⚠️ Notions faussement acquises détectées

- **`aria-hidden={false}`** — croyait que `{false}` en JSX était ignoré car "falsy". Non : React rend `aria-hidden="false"` dans le DOM, ce qui est problématique pour certains AT. Il faut `undefined` pour omettre l'attribut.
- **`.findIndex()` retourne `-1`** — n'était pas acquis, découvert en session.

### 🔄 Étapes restantes

- Challenge terminé et soumis sur Frontend Mentor (score 7.7)
- Prochain challenge à définir

### 📈 Évaluation de session

- **Points solides :** compréhension des compromis ARIA vs HTML sémantique ; raisonnement autonome sur `showModal()` et focus natif ; logique du early return comprise rapidement
- **Points fragiles :** `undefined` vs `false` en JSX pour les attributs booléens ; usage précis de `aria-controls` (quand la cible existe vs n'existe pas)
- **Priorité pour la prochaine session :** kickoff du prochain challenge Frontend Mentor

### 💬 Notes de contexte

- L'utilisateur a correctement identifié que `showModal()` gère le focus nativement — bonne réflexion critique sur une recommandation reçue
- Le compromis `solveMasonry` (3 `<ul>` au lieu d'1) a été documenté et assumé délibérément
- Le bug `solveMasonry` reporté par le linter a été analysé et conclu comme faux positif — la logique push/pop est symétrique

---

## Session 11 — 2026-04-08 — Résolution du bug d'animation directionnel

### ✅ Étapes accomplies

- Résolution du glitch d'animation sur inversion de direction dans le slider
- Refactorisation de `Article.tsx` : extraction de `SlideWrapper`, deux états de direction indépendants

### 🐛 Résolution du bug — diagnostic final et solution

**Rappel du symptôme :** en naviguant goBack → goNext (ou l'inverse), l'animation produit un bref glitch visuel : les deux instances du slide utilisent des directions contradictoires.

**Pourquoi `directionRef` seul ne suffisait pas :**

`directionRef` est un ref mutable partagé entre toutes les instances. Avec `AnimatePresence mode="wait"`, l'instance sortante et l'instance entrante coexistent brièvement. Quand `goNext` met à jour `directionRef.current = true` puis navigue, l'instance encore en cours de sortie peut relire le ref à n'importe quel moment et voir la nouvelle valeur `true` alors qu'elle devrait sortir dans la direction `false`. Le ref n'a pas de "mémoire par instance".

**Pourquoi `useState(directionRef.current)` dans `Article` ne suffisait pas non plus :**

`Article` ne se remonte pas entre les slugs (React Router re-rend le composant, il ne le démonte pas). L'initialiseur de `useState` ne s'exécute qu'au montage d'`Article`, c'est-à-dire une seule fois pour tout le cycle de vie. La valeur reste figée à la direction de la toute première navigation.

**Pourquoi l'approche `SlideWrapper + frozenDir` seule était fausse :**

Première tentative avec `SlideWrapper` : geler `direction` au montage via `useState(direction)` où `direction` est une prop passée depuis `Article`. Problème : cette valeur gèle la direction d'ENTRÉE du slide, mais le même `frozenDir` était utilisé aussi pour l'animation de SORTIE. Or la direction de sortie est celle de la navigation SUIVANTE (qui n'a pas encore eu lieu au moment du montage). Résultat : si tu entres dans un slide en allant "next" (`frozenDir=true`) puis que tu fais "back", le slide sort dans la mauvaise direction.

**La clé de la solution — séparer les deux responsabilités :**

La direction d'entrée et la direction de sortie sont deux informations indépendantes :

| | Source | Disponible quand ? |
|---|---|---|
| Direction d'entrée (`enterDir`) | Navigation qui a amené sur CE slug | Au montage du `SlideWrapper` |
| Direction de sortie (`exitDir`) | Navigation qui QUITTE ce slug | Au moment du prochain `goBack`/`goNext` |

Chacune doit être gérée séparément.

**Solution retenue :**

```tsx
// Dans SlideWrapper — gèle la direction d'entrée au montage de CETTE instance
function SlideWrapper({ exitDir, className, children }) {
  const location = useLocation();
  const [enterDir] = useState<boolean>(
    () => location.state?.isDirectionRight ?? true
  );
  return (
    <motion.main
      initial={{ x: enterDir ? "-100%" : "100%" }}  // direction d'entrée gelée
      animate={{ x: 0, opacity: 1, ... }}
      exit={{ x: exitDir ? "100%" : "-100%", ... }} // direction de sortie dynamique
    />
  );
}

// Dans Article
const [exitDir, setExitDir] = useState<boolean>(true);

function goNext() {
  setExitDir(true);
  navigate(`/article/${nextSlug}`, { state: { isDirectionRight: true } });
}
function goBack() {
  setExitDir(false);
  navigate(`/article/${prevSlug}`, { state: { isDirectionRight: false } });
}

// Dans le JSX
<AnimatePresence mode="wait">
  <SlideWrapper key={slug} exitDir={exitDir}>
    ...
  </SlideWrapper>
</AnimatePresence>
```

**Pourquoi `location.state.isDirectionRight` fonctionne pour `enterDir` :**

`location.state` est propre à chaque entrée dans l'historique de navigation. Il est écrit par `navigate()` et ne change jamais pour une URL donnée. Quand `SlideWrapper` monte (avec son nouveau `key={slug}`), `useLocation().state` retourne l'état de CETTE navigation spécifique. Geler cette valeur via `useState(() => location.state?.isDirectionRight)` est donc stable par construction — une navigation ultérieure ne peut pas corrompre cet état.

**Pourquoi `exitDir` en `useState` (et non `useRef`) :**

Le React Compiler interdit l'accès à `.current` pendant le render (`react-hooks/refs`). `exitDir` doit être lu dans le JSX pour construire l'objet `exit={{...}}`, donc c'est bien une valeur de render. `useState` est le bon outil. De plus, `setExitDir` et `navigate` étant appelés dans le même handler, React les batche dans un seul render — la valeur est donc cohérente au moment où `AnimatePresence` capture le `SlideWrapper` sortant.

**Pourquoi `SlideWrapper` comme composant séparé :**

`motion.main` est un élément, pas un composant React. Il ne peut pas avoir son propre `useState`. En l'enveloppant dans `SlideWrapper` (un vrai composant), chaque instance avec un `key` différent se monte/démonte indépendamment et peut geler ses propres valeurs au montage. C'est ce qui rend `enterDir` véritablement isolé par instance.

**Limitation résiduelle :**

En navigation très rapide (deux clics avant la fin de l'animation de sortie), `exitDir` peut être mis à jour une deuxième fois avant que Framer Motion ait fini d'utiliser la valeur précédente. Ce cas est marginal et inhérent à `mode="wait"` avec un état partagé dans le composant parent. La vraie solution pour un ruban sans aucun glitch reste `mode="sync"` + positionnement absolu.

**Correction du slideshow :**

L'autoplay (`setInterval` dans `useEffect`) appelait `navigate` directement sans `setExitDir(true)`. Si l'utilisateur avait reculé juste avant le démarrage de l'autoplay, `exitDir` restait `false` et les slides défilaient dans la mauvaise direction. Fix : ajouter `setExitDir(true)` avant le `navigate` dans l'intervalle.

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `location.state` stable par navigation | Nouvelle | Chaque entrée d'historique a son propre state, figé au moment du `navigate()` |
| Séparer direction d'entrée / direction de sortie | Nouvelle | Deux responsabilités distinctes, deux sources d'information distinctes |
| Composant wrapper pour isoler `useState` par instance | Nouvelle | `key` sur un vrai composant React = montage/démontage = `useState` frais |
| `react-hooks/refs` — pas de `.current` pendant le render | Nouvelle | Utiliser `useState` pour les valeurs lues dans le JSX, `useRef` pour les valeurs d'effets |
| Batching React 18 — `setState` + `navigate` dans le même handler | Consolidée | Un seul render — cohérence garantie entre `exitDir` et le changement de slug |

---

## Session 10 — 2026-04-07 — Finitions + investigation bug animation direction

### ✅ Étapes accomplies

- Hover states et transitions ajoutés sur tous les éléments interactifs (cards, boutons, lien source)
- Centrage du layout Article : `max-w-*` responsive par breakpoint pour coller aux valeurs de la maquette, marges qui absorbent l'espace restant
- README mis à jour : stack, live demo, "What I learned" détaillé, transparence IA documentée
- Investigation approfondie du glitch d'animation directionnel (voir ci-dessous)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `max-w-*` responsive par breakpoint pour centrage | Consolidée | Pattern container standard — layout fixe, marges qui absorbent l'espace |
| Hover + `transition-*` Tailwind | Consolidée | Appliqué de manière autonome sur tous les éléments interactifs |
| `useRef` pour capturer une valeur au montage | Nouvelle | Distingué de `useState` : stocke sans déclencher de re-render, initialisé une fois |
| `useRef` comme valeur mutable manuelle | Nouvelle | `.current` peut être mis à jour manuellement (dans goBack/goNext) — pas seulement à l'init |
| Portée du remontage composant vs remontage élément | Nouvelle | `Article` ne remonte pas au changement de slug — seul `motion.main` (avec `key`) remonte |
| `AnimatePresence mode="sync"` vs `mode="wait"` | Vue | "wait" = exit puis enter séquentiel ; "sync" = simultané mais nécessite positionnement absolu |

### ⚠️ Notions faussement acquises détectées

- **Remontage de composant avec React Router** — croyait qu'`Article` se démontait/remontait à chaque changement de slug. Non : React Router re-rend le composant, seul `motion.main` avec `key={slug}` est recréé. Conséquence directe : un `useRef` dans `Article` initialisé au montage ne se réinitialise jamais entre les navigations.

### 🐛 Bug d'animation — diagnostic et tentatives

**Symptôme :** sur navigation rapide goBack → goNext (ou alternance normale), l'image part dans un sens puis revient de l'autre au lieu d'un effet ruban cohérent.

**Cause racine :** `location.state?.isDirectionRight` est un hook live — il se met à jour pour tous les composants dès qu'une navigation est déclenchée, y compris pour `motion.main` encore en train de sortir. L'exit animation lit une valeur qui a déjà changé.

**Tentative 1 — `useRef` initialisé au montage d'`Article`**
```tsx
const directionRef = useRef<boolean>(location.state?.isDirectionRight ?? true)
```
Échec : `Article` ne remonte pas entre les slugs → `directionRef.current` reste figé à la valeur du premier chargement. L'animation ne va plus que dans un sens.

**Tentative 2 — `useRef` mis à jour manuellement dans `goBack`/`goNext`**
```tsx
directionRef.current = false // dans goBack, avant navigate()
directionRef.current = true  // dans goNext, avant navigate()
```
Amélioration partielle : les directions fonctionnent dans les deux sens. Le glitch persiste sur navigation très rapide (la valeur du ref change pendant l'exit en cours) mais n'est pas handicapant en usage normal. **Solution retenue.**

**Tentative 3 — `mode="sync"` pour animation simultanée**
Échec immédiat : les deux `motion.main` rendent en même temps dans le flux normal — sans positionnement absolu, le layout explose.

**État final :** glitch mineur accepté. `directionRef` mis à jour dans `goBack`/`goNext` reste en place.

### 🔄 Piste pour un vrai effet ruban (non implémenté)

Pour un ruban simultané propre avec React Router + Framer Motion, il faudrait :
1. Positionner `motion.main` en `absolute` dans un conteneur `relative overflow-hidden` de hauteur fixe
2. Passer en `mode="sync"` sur `AnimatePresence`
3. Aligner les directions : exit et initial doivent aller dans le **même sens** (ex: goNext → old exit `x: "-100%"`, new initial `x: "100%"` → les deux glissent à gauche simultanément)
4. Utiliser le prop `custom` de Framer Motion pour verrouiller la direction par animation

C'est un refactoring de layout non trivial — à envisager sur un prochain projet dès le départ.

### 🔄 Étapes restantes

- Post de la solution sur Frontend Mentor (demain)
- Corrections éventuelles suite au feedback communautaire
- **Wrap-up du challenge**

### 📈 Évaluation de session

- **Points solides :** Bonne ténacité sur le diagnostic du bug, compréhension construite progressivement sur `useRef` (snapshot vs abonnement live), décision pragmatique d'accepter le glitch plutôt que de tout refactoriser
- **Points fragiles :** Confusion persistante sur quand React remonte un composant vs quand il le re-rend — notion à consolider
- **Priorité pour la prochaine session :** Post Frontend Mentor + wrap-up du challenge

### 💬 Notes de contexte

- Session de 8h (8h → 16h) — inhabituellement longue
- Challenge fonctionnellement complet — toutes les user stories couvertes
- README contient une documentation transparente des contributions IA

---

## Session 9 — 2026-04-07 — Framer Motion + autoplay slideshow

### ✅ Étapes accomplies

- Slide horizontal entre articles : `AnimatePresence mode="wait"` + `motion.main` + `key={slug}` dans `Article.tsx`
- Direction de l'animation via `location.state.isDirectionRight` (passé dans `goBack`/`goNext`)
- Stagger animation sur les cards dans `Home.tsx` : `motion.ul` + `motion.li` + variants `staggerChildren`
- Fix stale closure sur le `useEffect` keyboard : `currentArticleIndex` ajouté aux dépendances
- Conflit React Compiler / ESLint (`useCallback`) résolu en inlinant le code dans le `useEffect`
- `useOutletContext` pour partager `isPlaying` de `Layout` vers `Article`
- Autoplay : `setInterval` + `goNext` inline dans `useEffect` avec cleanup
- Header : bouton START/STOP conditionné par `isPlaying && location.pathname.startsWith("/article")`
- Typage `Dispatch<SetStateAction<T>>` pour les setters passés en props + `import type`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `AnimatePresence` + `motion.X` + `key` | Nouvelle | Localisé dans le composant, wrapping seulement `<main>` — plus chirurgical que le projet précédent |
| `initial` / `animate` / `exit` + `transition` | Nouvelle | `transition` doit être sur chaque prop séparément — pas seulement dans `animate` |
| `variants` + `staggerChildren` | Nouvelle | Parent propage les noms d'état aux enfants automatiquement |
| `useOutletContext<T>()` | Nouvelle | Passe des données de Layout vers ses enfants via `<Outlet context={...} />` |
| `setInterval` + cleanup dans `useEffect` | Nouvelle | `return () => clearInterval(interval)` — même pattern que removeEventListener |
| Stale closure dans `useEffect` | Consolidée | 2ème occurrence — dépendances manquantes = handler figé sur l'ancien state |
| Conflit React Compiler / `useCallback` | Vue | Solution : inliner le code dans l'effet plutôt que dépendre d'une fonction externe |
| `Dispatch<SetStateAction<T>>` | Nouvelle | Type exact d'un setter useState — couvre les valeurs directes ET les fonctions updater |
| `import type` | Nouvelle | Requis par `verbatimModuleSyntax` — import purement compilé, absent du bundle |

### ⚠️ Notions faussement acquises détectées

- **`useOutletContext` vs props** — a créé une `interface ArticleProps` et destructuré en paramètre de fonction, alors que `isPlaying` venait de `useOutletContext`. Les deux mécanismes ont été mélangés.
- **Side effect dans le corps du composant** — a placé `setIsPlaying(false)` directement dans le corps de `Header` (pas dans un `useEffect`, pas dans un handler). Reproduit deux fois avant de comprendre pourquoi c'est un anti-pattern.

### 🔄 Étapes restantes

- Hover states sur les éléments interactifs (cards, boutons)
- Vérification globale responsive + accessibilité
- Wrap-up du challenge

### 📈 Évaluation de session

- **Points solides :** Raisonnement architectural sur où placer `AnimatePresence` (dans Article, pas App), bonne intuition sur `useOutletContext`, compréhension de la stale closure au 2ème passage
- **Points fragiles :** Confusion persistante entre props et context (`useOutletContext`), anti-pattern side effect dans le render reproduit deux fois
- **Priorité pour la prochaine session :** Hover states + responsive check — puis wrap-up du projet si tout est propre

### 💬 Notes de contexte

- React Compiler (React 19) + ESLint `exhaustive-deps` se contredisent sur `useCallback` — solution systématique : inliner le code dans l'effet
- `import type` requis dans ce projet pour tous les imports purement TypeScript (`verbatimModuleSyntax` activé dans tsconfig)
- Framer Motion : `transition` dans `animate` ne s'applique pas à `exit` — chaque prop animation a sa propre `transition`

---

## Project Kickoff — 2026-04-01 — Galleria Slideshow Site

### Config de départ

- **Stack :** React 19 + Vite + TypeScript + Tailwind CSS v4
- **Plugin Tailwind :** `@tailwindcss/vite` (approche v4 native, sans PostCSS ni `tailwind.config`)
- **Entry CSS :** `@import "tailwindcss"` en tête de `index.css`
- **Dossier projet :** `galerie/` (Vite app)

### Ce qui a été configuré en session 1

- Projet Vite + React + TypeScript initialisé
- `tailwindcss` + `@tailwindcss/vite` installés dans `galerie/`
- `vite.config.ts` configuré avec le plugin `tailwindcss()`
- `@import "tailwindcss"` ajouté en haut de `index.css`
- Tailwind vérifié fonctionnel (classes appliquées après redémarrage du serveur)

### Difficulté rencontrée

- `@tailwindcss/vite` installé dans le mauvais dossier (racine au lieu de `galerie/`) — corrigé après diagnostic

---

### Concepts clés du challenge (auto-évaluation à faire)

Le challenge demande :

- Une grille masonry (layout multi-colonnes non uniforme) pour la homepage
- Navigation en slideshow entre les peintures
- Lightbox pour voir chaque peinture en grand
- Consommation d'un fichier `data.json` local
- Responsive (mobile / desktop)
- Hover states sur les éléments interactifs

**Pour chaque notion ci-dessous, indique : confiant / rouillé / ne me souviens plus**

| Notion                                                     | Auto-évaluation                                 |
| ---------------------------------------------------------- | ----------------------------------------------- |
| CSS Grid — layout multi-colonnes irrégulier                | confiant                                        |
| TypeScript — interfaces pour typer le JSON                 | Besoin de consolider                            |
| React — props + callbacks                                  | confiant des notions mais pas des syntaxes      |
| React Router — navigation entre pages/vues                 | vu au dernier projet, mais besoin de consolider |
| État local — `useState` pour gérer l'index du slideshow    | confiant                                        |
| Lightbox — gestion du focus + accessibilité modal          | confiant                                        |
| Consommation JSON dans Vite                                | confiant                                        |
| Tailwind v4 — responsive breakpoints                       | confiant                                        |
| Tailwind v4 — `cn()` / `clsx` pour classes conditionnelles | jamais vu encore                                |

### Observations mentor sur l'auto-évaluation

- **CSS Grid masonry** — le layout homepage n'est pas un grid standard. Blocs de hauteurs variées sur plusieurs colonnes = technique spécifique (multi-column CSS ou grid avec spanning manuel). À ne pas sous-estimer malgré la confiance en grid.
- **Lightbox / focus** — focus trap complet (tab enfermé dans le modal, Escape ferme, focus retourne au trigger) rarement trivial en pratique. À vérifier concrètement lors de l'implémentation.
- **React Router** — vu au projet précédent mais noté non ancré. À repratiquer ici sans s'appuyer sur le projet précédent.

### Priorités identifiées pour ce projet

1. `cn()` / `clsx` — jamais vu, à introduire dès les premières classes conditionnelles
2. TypeScript interfaces — à consolider tôt sur le typage du JSON
3. React Router — revu mais pas ancré, à repratiquer

---

## Session 8 — 2026-04-06 — Article.tsx : footer slideshow + lightbox + navigation

### ✅ Étapes accomplies

- Footer slideshow : barre de progression (style inline + `progressionWidth`), nom + artiste, boutons prev/next
- `goBack()` / `goNext()` : navigation circulaire via modulo, `useNavigate()`
- Lightbox : `dialog` natif + `useRef` + `useEffect` pour `showModal()`/`close()`
- Fix Tailwind preflight : `dialog:not([open]) { display: none }` dans `index.css`
- Navigation clavier dans la lightbox : `useEffect` + `keydown` listener sur `ArrowLeft`/`ArrowRight`
- Persistance de `isOpen` entre navigations : `useLocation` + `navigate(..., { state: { lightboxOpen: true } })`
- "START SLIDESHOW" dans le header : `Link` vers `dataTyped[0]` via `getCorrectPath`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `dialog` natif HTML | Nouvelle | `.showModal()` / `.close()` — focus trap + Escape natifs. Preflight Tailwind casse le `display:none` par défaut |
| `useRef<HTMLDialogElement>` | Nouvelle | Accès direct au nœud DOM pour appeler des méthodes natives inaccessibles via React |
| Style inline pour valeur dynamique | Consolidée | Tailwind génère le CSS statiquement — interpolation dans une classe = classe ignorée |
| `??` nullish coalescing | Révisée | Connu en cours, pas réutilisé depuis longtemps |
| `useLocation()` + `navigate()` state | Nouvelle | Canal de communication entre routes — passer `{ state: { lightboxOpen: true } }` pour survivre au remontage |
| `keydown` listener dans `useEffect` | Consolidée | Même pattern que resize — addEventListener + cleanup |
| `e.key` pour identifier une touche | Nouvelle | `"ArrowRight"` / `"ArrowLeft"` |

### ⚠️ Notions faussement acquises détectées

- **`useRef` vs `useState`** — croyait que `useRef` déclenchait un rerender. Non : `useRef` est silencieux pour React, c'est précisément pour ça qu'on l'utilise pour accéder au DOM sans provoquer de render.

### 🔄 Étapes restantes

- Animations de slide entre articles (Framer Motion) — prévu session suivante
- Hover states sur les éléments interactifs (cards, boutons)
- Vérification globale responsive + accessibilité

### 📈 Évaluation de session

- **Points solides :** Raisonnement sur `dialog` natif vs div, diagnostic du problème de remontage et compréhension de la solution `useLocation`, questions précises sur ce qui n'était pas clair
- **Points fragiles :** `useRef` — le comportement vis-à-vis du rerender n'était pas ancré
- **Priorité pour la prochaine session :** Framer Motion — animations de slide entre articles

### 💬 Notes de contexte

- `dialog` natif + Tailwind : toujours ajouter `dialog:not([open]) { display: none }` dans `index.css`
- `useLocation` state : solution légère pour partager un état ponctuel entre routes, sans Redux ni Context

---

## Session 7 — 2026-04-05 — Article.tsx : refonte layout responsive

### ✅ Étapes accomplies

- Diagnostic de l'ancienne version : `transform translate`, `absolute` imbriqués, valeurs magiques hardcodées — layout fragile et difficile à maintenir
- Refonte complète du layout mobile en premier : conteneurs nommés (`Image_Container`, `Painting_Container`, `Images_Description`, `Description_Content`, `Thumbnails_Container`, `Detail_Container`, `Additionnal_Info_Container`)
- Suppression de tous les `transform`/`translate` — remplacés par des marges négatives (`-mt-8`, `-ml-58`)
- Extension responsive fluide jusqu'au desktop : `md:flex md:flex-row` sur `Image_Container`, marges négatives pour l'overlap du bloc titre sur l'image
- Correction : `md:flex flex-row` → `md:flex md:flex-row` pour cohérence (les deux propriétés au même breakpoint)
- Layout conforme à la maquette aux 3 breakpoints sans une seule classe `translate`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Marge négative pour overlap (`-ml-58`) | Consolidée | Remplace `absolute + translate` — reste dans le flux, plus prévisible |
| Mobile-first sans flex par défaut | Consolidée | Ne pas mettre `flex` si l'élément n'en a pas besoin sur mobile |
| `md:flex md:flex-row` — cohérence breakpoint | Révisée | Les deux propriétés liées déclarées au même breakpoint |
| Nommage sémantique des conteneurs | Consolidée | Lecture immédiate de la structure sans inspecter les classes utilitaires |

### ⚠️ Notions faussement acquises détectées

- Aucune détectée cette session

### 🔄 Étapes restantes — Article.tsx

- Footer slideshow : prev / next + barre de progression (numéro de peinture / total)
- Lightbox (VIEW IMAGE)

### 📈 Évaluation de session

- **Points solides :** Initiative de tout reprendre à zéro plutôt que de patcher — bon jugement. Résultat conforme sans translate ni absolute complexes.
- **Points fragiles :** Quelques valeurs arbitraires inévitables (`-ml-58`, `xl:pt-49`) — inhérentes au design éditorial, pas un problème de méthode.
- **Priorité pour la prochaine session :** Footer slideshow (prev / next + progression)

### 💬 Notes de contexte

- Approche retenue : marges négatives pour overlaps plutôt qu'absolute/translate — plus maintenable sur ce type de layout éditorial
- Session courte, focus sur la qualité du code plutôt que l'avancement fonctionnel — choix délibéré et pertinent

---

## Session 6 — 2026-04-04 — Article.tsx : layout grid + subgrid

### ✅ Étapes accomplies

- Diagnostic du layout Article : titre en `absolute` dans une `section` flex = débordement sur la section description sur desktop
- Restructuration du layout : `main` devient un grid 3 colonnes (`grid-cols-[35%_auto_35%]`)
- Exploration CSS Subgrid (`grid-cols-subgrid`) pour faire hériter les tracks du parent à un enfant grid
- Compréhension ancrée : `col-start` ne fonctionne que sur les enfants directs du grid container
- Solution fonctionnelle trouvée : grid imbriqué avec subgrid sur la première section

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| CSS Grid — placement explicite (`col-start`, `row-start`) | Consolidée | A compris que le placement est relatif au parent direct |
| CSS Subgrid (`grid-cols-subgrid`) | Nouvelle | Hérite les tracks du parent — résout le problème de l'enfant imbriqué |
| Grid imbriqué vs Subgrid | Nouvelle | Grid imbriqué crée ses propres tracks ; subgrid hérite ceux du parent |
| Layout éditorial multi-breakpoint | Vue | Overlap intentionnel du designer = complexité responsive inévitable |

### ⚠️ Notions faussement acquises détectées

- **Portée du grid placement** — croyait qu'un `col-start` sur un petit-enfant pouvait référencer le grid du grand-parent. Non : chaque élément ne participe qu'au grid de son parent direct.

### 🔄 Étapes restantes — Article.tsx

- Nettoyer le layout desktop : trop de positions hardcodées, responsive difficile à maintenir
- Envisager une refonte plus propre du layout (grid-cols, translate minimal)
- Footer slideshow : prev / next + barre de progression
- Lightbox (VIEW IMAGE)

### 📈 Évaluation de session

- **Points solides :** Diagnostic du problème de débordement autonome, bon raisonnement sur la portée du grid placement une fois expliqué, découverte et application de subgrid
- **Points fragiles :** Accumulation de classes responsive sur les mêmes éléments → perte de lisibilité et de maintenabilité. À surveiller comme pattern récurrent.
- **Priorité pour la prochaine session :** Reprendre le layout Article à tête reposée — simplifier les classes, réduire les positions hardcodées

### 💬 Notes de contexte

- CSS Subgrid : support OK pour ce projet (Chrome 117+, Safari 16+, Firefox 71+)
- Le layout éditorial avec overlaps intentionnels est objectivement complexe — la difficulté rencontrée est normale, pas un signe de lacune

---

## Session 5 — 2026-04-04 — Article.tsx : routing slug + useEffect responsive

### ✅ Étapes accomplies

- Diagnostic du bug 404 : `to={path}` dans `Cards.tsx` générait `/starry-night` au lieu de `/article/starry-night` — corrigé avec `/article/${path}`
- Correction supplémentaire : chemin relatif → absolu (slash de tête), pour robustesse si `Cards` utilisé ailleurs
- `Article.tsx` : `useParams()` pour récupérer le slug, `dataTyped.find()` pour retrouver la peinture correspondante
- `useEffect` responsive pour choisir `hero.small` ou `hero.large` — d'abord sans listener resize (bug), puis corrigé avec `addEventListener("resize", update)` + cleanup
- `isHeroSmall` corrigé de `string` en `boolean` — bug logique où une string non-vide est toujours truthy
- `heroImage` calculé en dehors du JSX avec ternaire sur le booléen
- Discussion architecture : hook global d'état breakpoint vs local — décision de rester local (aucun autre composant n'en a besoin)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `useParams()` React Router | Révisée | Récupère le segment dynamique `:slug` de l'URL |
| `array.find()` avec slug | Nouvelle | Retrouver un item en comparant `getCorrectPath(name) === slug` |
| `useEffect` + resize listener + cleanup | Consolidée | A écrit lui-même, pattern calqué sur `useColumns` |
| String truthy vs booléen | Faussement acquise | `"small"` est toujours truthy — `isHeroSmall` devait être un `boolean` dès le départ |
| Convention `is` = booléen | Révisée | Le préfixe `is` implique un booléen — à respecter systématiquement |
| Extraction de hook vs état local | Nouvelle | Raisonnement correct : si un seul composant en a besoin, pas d'extraction |

### ⚠️ Notions faussement acquises détectées

- **Typage `useState` avec string booléenne** — `useState("small")` vs `useState<boolean>(true)` : n'a pas spontanément pensé au booléen. Le nom `isHeroSmall` aurait dû orienter directement vers `boolean`.

### 🔄 Étapes restantes — Article.tsx

- Layout du contenu : description, année, lien Wikipedia
- Footer de l'article (numéro de peinture / total, prev / next)
- Slideshow navigation globale (état partagé ou React Router)
- Lightbox

### 📈 Évaluation de session

- **Points solides :** Raisonnement architectural sur l'état local vs global — autonome et justifié. Lecture du bug de routing immédiate une fois la chaîne expliquée.
- **Points fragiles :** Typage `useState` — réflexe string au lieu de booléen sur un état binaire
- **Priorité pour la prochaine session :** Layout `Article.tsx` — description, année, Wikipedia, puis footer slideshow

### 💬 Notes de contexte

- `Cards.tsx` : `to={`/article/${path}`}` — slash de tête pour chemin absolu, convention à garder
- Le `useEffect` dans `Article` reste local intentionnellement — décision architecturale raisonnée

---

## Session 4 — 2026-04-03 — Résolution complète du masonry layout

### 🧭 Parcours de la session

Longue session d'investigation sur le problème masonry, avec beaucoup d'allers-retours entre différentes hypothèses. Le chemin compte autant que le résultat.

**Phase 1 — Confrontation du round-robin avec la maquette**

- Comparaison détaillée entre la distribution round-robin (`i % 4`) et la maquette de référence
- Constat : les 8 premiers items matchent (2 rangées de 4), puis ça diverge
- Hypothèse shortest-column-first explorée → ne matche pas non plus exactement
- Recherche des solutions de la communauté Frontend Mentor : personne n'a de solution algorithmique propre — certains utilisent des libs (Macy.js, react-masonry-css), d'autres hardcodent le grid, un dev a même écrit 120+ lignes avec `ResizeObserver` + `memo` + positionnement absolu via `translate()` pour finir par… 6 swaps hardcodés (`// hard code partitioning`)

**Phase 2 — L'observation clé (initiative Thomas)**

- Après avoir envisagé le shortest-column-first, les ratios d'image, et même placer les images à la main, **observation décisive : les 4 colonnes de la maquette ont exactement la même hauteur totale (1390px)**.
- Cette observation vient de l'analyse visuelle du design — l'intuition que le designer avait calibré les thumbnails exprès.
- Claude proposait de lâcher l'affaire et de partir sur "assez proche" avec shortest-column-first. Thomas a insisté.

**Phase 3 — Vérification et résolution**

- Mesure des 15 thumbnails via `console.log` navigateur → toutes à 327px de large, hauteurs variables
- `thumbnailHeight` ajouté dans `data.json`
- Vérification mathématique : (5120px images + 440px gaps) / 4 = 1390px exact par colonne ✓
- Brute-force en Python : 1008 partitions à hauteurs égales trouvées, 16 respectent l'ordre de première rangée
- La maquette est bien l'une des 2 solutions les plus proches du round-robin

**Phase 4 — Implémentation**

- Algorithme final : **backtracking avec priorité round-robin**
- Pour chaque item, essaie d'abord sa colonne round-robin (`index % cols`), puis les autres
- Élagage : coupe immédiatement les branches qui dépasseraient la cible de 1390px
- Backtrack : si bloqué plus loin, revient en arrière et essaie une autre colonne
- Fallback round-robin si aucune partition parfaite n'existe (sécurité pour données dynamiques futures)
- Vérifié : produit **exactement** la distribution de la maquette aux 3 breakpoints (1, 2 et 4 colonnes)

### ✅ Fichiers créés/modifiés

| Fichier                     | Rôle                                                          |
| --------------------------- | ------------------------------------------------------------- |
| `data.json`                 | Ajout `images.thumbnailHeight` pour les 15 peintures          |
| `src/utils/solveMasonry.ts` | Algo backtracking — distribution en colonnes de hauteur égale |
| `src/hooks/useColumns.ts`   | Hook responsive — retourne 1, 2 ou 4 selon la largeur d'écran |
| `Home.tsx`                  | `useMemo` sur `solveMasonry` recalculé quand `cols` change    |

### 🧠 Notions de code vues

| Notion                                                       | Statut                   | Commentaire                                                                        |
| ------------------------------------------------------------ | ------------------------ | ---------------------------------------------------------------------------------- |
| Modulo `%` pour distribution round-robin                     | Acquise                  | Compris et déroulé à la main sur les 15 items                                      |
| `Array.from({ length }, () => [])` vs `new Array().fill([])` | Acquise                  | Piège de la référence partagée avec `fill` compris                                 |
| `Painting[][]` — tableau 2D typé                             | Acquise                  | Chaque colonne est un `Painting[]`, le tout est un tableau de colonnes             |
| Backtracking (récursion + élagage + retour arrière)          | Vue, pas encore autonome | Comprend la mécanique dans les grandes lignes, pas encore capable de l'écrire seul |
| `useMemo` avec dépendance                                    | Consolidée               | Recalcul de la distribution seulement quand `cols` change                          |
| Hook custom `useColumns`                                     | Nouvelle                 | `useState` + `useEffect` + `resize` listener + cleanup                             |
| Analyse de solutions communautaires                          | Nouvelle                 | Lecture critique du code d'autres devs, identification des forces/faiblesses       |

### 🤖 Transparence IA

- **Écrit par Claude :** `solveMasonry.ts` (algorithme backtracking complet), `useColumns.ts`, simulation Python pour la vérification, recherche des solutions communautaires
- **Initiative Thomas :** L'observation que toutes les colonnes font la même hauteur — c'est cette intuition qui a débloqué la solution. Claude proposait de se contenter d'une approximation.
- **Travail commun :** Analyse comparative maquette vs algo, exploration des différentes pistes (round-robin, shortest-column, CSS columns, libs), compréhension du modulo, lecture du code de l'autre dev avec les swaps hardcodés
- **Thomas seul :** Mesure des thumbnails dans le navigateur, intégration dans le projet, tests visuels à chaque étape

### 📈 Évaluation de session

- **Points solides :** Capacité d'analyse visuelle du design (repérer les hauteurs égales), ténacité sur le problème (a refusé la solution "assez proche"), capacité à lire et critiquer du code tiers
- **Points fragiles :** Backtracking pas encore autonome — pattern compris mais pas encore intériorisé au point de le reproduire
- **Victoire technique :** Solution algorithmique au masonry layout que la communauté Frontend Mentor n'avait pas trouvée (basée sur le fait que le designer a calibré les thumbnails pour des colonnes de hauteur égale)

### 💬 Notes de contexte

- Le pattern backtracking (cas de base → pour chaque choix → faire → récurser → défaire) se retrouve partout : Sudoku, N-Queens, pathfinding. À reconnaître plutôt qu'à mémoriser pour l'instant.
- Le `ResizeObserver` vs calcul pré-render : calculer la distribution AVANT le rendu (notre approche) évite les scintillements que causent les libs qui mesurent APRÈS le rendu.
- Breakpoints retenus : `< 640px` → 1 col, `≥ 640px` → 2 cols, `≥ 1100px` → 4 cols

---

## Session 3 — 2026-04-02 — Cards.tsx + Home.tsx (grille masonry)

### ✅ Étapes accomplies

- `Cards.tsx` créé : interface typée (`name`, `thumbnail`, `artistName`, `path`), `Link` React Router comme wrapper direct (pas de div inutile), `object-cover` discuté
- `Home.tsx` : map sur `dataTyped`, `getCorrectPath` appelé dans Home (pas dans Card), passage des props
- Distribution round-robin en 4 colonnes (`i % COLS`) pour reproduire l'ordre gauche→droite du design
- Compréhension ancrée : l'interface de composant ≠ l'interface du JSON brut — deux contrats distincts

### 🧠 Notions de code vues

| Notion                                            | Statut     | Commentaire                                                    |
| ------------------------------------------------- | ---------- | -------------------------------------------------------------- |
| Interface TypeScript de composant vs type du JSON | Consolidée | A su articuler pourquoi les deux coexistent                    |
| `Link` React Router comme bloc cliquable          | Nouvelle   | A compris qu'on peut mettre `className` directement sur `Link` |
| Distribution round-robin (`i % COLS`)             | Nouvelle   | A écrit la logique lui-même                                    |
| `Array.from` + accumulation dans colonnes         | Nouvelle   | Approche correcte, syntaxe guidée                              |
| CSS `columns` vs Flex colonnes manuelles          | Révisée    | A compris la différence de flux (top→bottom vs left→right)     |

### ⚠️ Notions faussement acquises détectées

- Aucune détectée cette session

### 🔄 Étapes restantes — grille masonry

**Piste prioritaire à explorer :**
Shortest-column-first avec les ratios des images. Les données sont statiques → ajouter un champ `ratio` dans `data.json` pour chaque peinture. Distribuer les items en calculant quelle colonne est la plus courte avant chaque insertion (somme des ratios par colonne). Devrait produire des colonnes équilibrées en hauteur.

**Fallback si ça ne marche pas :**
Forcer l'ordre via CSS — accepter un fond non-plat ou fixer les hauteurs manuellement.

### 📈 Évaluation de session

- **Points solides :** Raisonnement architectural sur qui fait quoi (Home vs Card, slug calculé dans Home) — solide et autonome
- **Points fragiles :** Syntaxe `Array.from` + typage du tableau de colonnes — a eu besoin d'aide sur la forme exacte
- **Priorité pour la prochaine session :** Implémenter shortest-column-first avec ratios dans `data.json`

### 💬 Notes de contexte

- Le fond plat du design est éditorial (hauteurs d'images choisies pour s'équilibrer) — aucune solution CSS automatique parfaite trouvée par la communauté Frontend Mentor non plus
- Round-robin résout l'ordre mais pas l'équilibre des hauteurs

---

## Session 2 — 2026-04-01 (matin)

### Ce qui a été fait

- `getCorrectPath(name: string): string` — utilitaire slug dans `utils/generatePath.ts` (syntaxe corrigée : mélange `function` + `=>` évité)
- TypeScript interfaces dans `types/data.ts` : `Artist`, `Hero`, `Images`, `GalerieData`
  - Leçon clé : l'interface décrit **un seul objet** — le tableau-ness (`GalerieData[]`) se déclare à l'usage
- `data/index.ts` — import JSON + export typé en `GalerieData[]`
- React Router configuré dans `App.tsx` : `BrowserRouter > Routes > Route` avec Layout parent
- `Layout.tsx` : Header + `<Outlet />` (footer absent du Layout car propre à Article)
- `Error404.tsx` — page fallback sur route `*`
- `index.css` — polices `Libre Baskerville`, variables couleurs `@theme`, presets typographie via `@utility` (text-preset-1 à text-preset-7 + variantes mobile)
- `Header.tsx` : logo SVG + "START SLIDESHOW", sticky, bordure basse
  - Fix SVG : viewBox corrigé de `0 0 100 100` → `0 0 170 48`, `h-5 w-auto` pour respecter le ratio
  - `fillRule` au lieu de `fill-rule` (JSX)

### Concepts consolidés cette session

- TypeScript : interface = moule d'un exemplaire, `[]` = tableau d'exemplaires
- SVG dans React : viewBox doit correspondre aux dimensions réelles du path ; fixer `h-X w-auto` plutôt que `w-X h-auto` quand le ratio est horizontal
- Tailwind v4 : `@utility` pour des classes composées réutilisables, responsive avec breakpoint sur les presets (`md:text-preset-6`)

### Prochaine session

- Démarrer `Home.tsx` — grille masonry des peintures
