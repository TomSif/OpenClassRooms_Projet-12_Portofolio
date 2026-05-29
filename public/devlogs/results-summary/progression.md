## Project Wrap-up — Results Summary Component ✅

**Note Frontend Mentor : 8.5 / 10 — Exceptional**

### Bilan avant/après

| Notion | Auto-éval initiale | Réalité observée |
|---|---|---|
| Responsive Tailwind | Confiant | Confirmé — écrit sans aide |
| `cn()` / clsx | Rouillé | Peu utilisé — pas vraiment testé |
| Lire JSON + dériver interfaces | Prudent | Bon raisonnement data-first, syntaxe TypeScript encore fragile |
| Composant avec props typées | Rouillé | Acquis en session — `interface XxxProps` réflexe en place |
| `Array.map()` en JSX | Incertain | Confirmé et consolidé |
| `useEffect` avec dépendances | Non évalué | Nouvelle notion — partiellement ancrée, logique async encore fragile |
| Commits atomiques | 3/5 | Progression réelle — 3 commits bien découpés en session finale |

### Ce qui a été ajouté au brief original

- Inputs éditables par catégorie + calcul du score moyen au submit
- Animation compteur `displayScore` avec `setInterval` + cleanup
- Fade-in sur le feedback texte via `isAnimationOver`
- `aria-hidden` toggle pendant l'animation
- `onFocus` → `e.target.select()` sur les inputs

### Points fragiles persistants

- Syntaxe TypeScript des types fonction — requiert encore de l'aide
- Logique effets asynchrones (`setInterval`, forme fonctionnelle setState) — pas encore ancrée
- Computed property names — zone de confusion réelle

---

## Session 2026-04-20 — Responsive, button states, animations, build fix

### ✅ Étapes accomplies

- Responsive layout : `md:flex-row` sur le conteneur principal, breakpoints sur `ResultCard`, `SummaryItem`, `App`
- Button hover/active states : pseudo-élément `::before` avec gradient overlay en CSS natif
- `onFocus` sur les inputs → `e.target.select()` pour sélection automatique au clic
- Animation compteur sur `displayScore` : `useEffect` + `setInterval` + cleanup + reset à `0`
- Fade-in sur le feedback texte : `isAnimationOver` state + `transition-opacity` Tailwind
- Fix `font-regular` → `font-normal` dans `ResultCard`
- Label `sr-only` sur les inputs `SummaryItem` pour l'accessibilité
- Fix build Vercel : `"types": ["vite/client"]` ajouté dans `tsconfig.app.json`
- 4 commits atomiques : `feat(responsive)`, `feat(css)`, `feat(A11y)`, `fix(config)`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|---|---|---|
| `useEffect` + `setInterval` + cleanup | Nouvelle | Structure complète : interval, clearInterval dans le callback, return cleanup |
| `setState(prev => ...)` forme fonctionnelle | Nouvelle | Obligatoire quand le nouvel état dépend de l'ancien — évite les closures stales |
| Reset de state dans `useEffect` | Nouvelle | `setDisplayScore(0)` au début de l'effet pour repartir de zéro à chaque déclenchement |
| `isAnimationOver` state booléen | Révisée | Déclencher un effet visuel (fade) à la fin d'une animation asynchrone |
| `e.target.select()` sur `onFocus` | Nouvelle | Sélection automatique du contenu d'un input au focus |
| CSS `::before` pseudo-élément | Révisée | Overlay gradient sur bouton — `position: relative/absolute`, `opacity` transition |
| `"types": ["vite/client"]` tsconfig | Nouvelle | Alternative à `vite-env.d.ts` pour déclarer les types Vite à TypeScript |
| `git restore --staged .` | Nouvelle | Déstaguer tout sans perdre les modifications du working tree |

### ⚠️ Notions faussement acquises détectées

- **Logique des effets asynchrones** — difficultés sur : où mettre `clearInterval`, `prev + 1` vs `+1`, nécessité du reset à `0`. Pas de l'algorithmie complexe, mais la logique des timers en React n'est pas encore ancrée.

### 🔄 Étapes restantes

- Post Frontend Mentor — en cours
- Correctifs éventuels après retour FM
- Passe finale : `grep console.log`, relecture classNames

### 📈 Évaluation de session

- **Points solides :** responsive écrit sans aide ; `onFocus` + `e.target.select()` trouvé seul ; `isAnimationOver` et son placement identifiés correctement ; réflexe de tester le build localement avant de pousser
- **Points fragiles :** logique `setInterval` dans `useEffect` — plusieurs points de blocage (clearInterval, forme fonctionnelle setState, reset) ; découpage des commits par intent demande encore un effort conscient
- **Priorité pour la prochaine session :** correctifs FM si retours, sinon clôture du challenge et bilan wrap-up

### 💬 Notes de contexte

- Challenge fonctionnellement terminé — responsive, a11y, animations, hover states, build Vercel OK
- `noUncheckedSideEffectImports: true` dans ce projet (absent du Pomodoro) — nécessite `"types": ["vite/client"]`
- Post FM en attente de retours communauté

---

## Session 2026-04-19 — useState, onScoreChange, calcul score moyen, ResultCard

### ✅ Étapes accomplies

- `useState(scoresByCategories)` — scores initialisés depuis `data.json` via `reduce`
- `onScoreChange` câblé : `SummaryItem` remonte `(category, value)`, `App` fait le spread `{ ...scores, [category]: value }`
- `scoreResult` stocké en state, initialisé avec la moyenne des scores par défaut (lazy init)
- Calcul de la moyenne dans `onSubmit` → `setScoreResult`
- `ResultCard` construit sans aide : gradient, cercle, `getFeedback`, `Math.floor`
- `scoresByCategories` sorti de la fonction `App` (constante statique)
- Balises sémantiques `dl/dt/dd` dans `SummaryItem`
- Section syntaxes ajoutée dans `progression.md` pour référence future

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|---|---|---|
| `Array.reduce()` | Nouvelle | Transformer un tableau en objet — accumulateur + valeur initiale `{}` |
| Computed property names `[key]` | Nouvelle | `{ ...obj, [category]: value }` — clé dynamique dans un objet |
| Type fonction TypeScript | Nouvelle | `(param: Type) => void` dans une interface — syntaxe pas encore ancrée |
| `useState` avec valeur complexe | Révisée | Accepte un objet, un calcul, ou une fonction (lazy init) |
| Lazy init `useState(() => ...)` | Nouvelle | Fonction passée à useState — exécutée une seule fois au montage |
| `Object.values()` | Révisée | Extraire les valeurs d'un objet pour les traiter comme tableau |
| Constante hors composant | Révisée | Sortir une constante statique de la fonction pour éviter recalcul à chaque render |
| `defaultValue` → `value` contrôlé | Révisée | Input contrôlé = `value` + `onChange` obligatoires |

### ⚠️ Notions faussement acquises détectées

- **Syntaxe des types fonction** — écriture systématiquement incorrecte (`onScoreChange<string, number>: () => void`, parenthèses manquantes, `:` manquant). Pattern `(param: Type) => void` pas encore ancré.
- **Objet vs tableau** — confusion persistante sur l'accès aux valeurs : tentative de `[0].category` sur un objet, `scoresByCategories.score` sur un objet sans clé `score`. Les computed property names `[key]` sont une zone fragile.

### 🔄 Étapes restantes

1. **Responsive** — layout côte à côte desktop (`md:flex-row`), empilé mobile
2. **A11y** — vérifier sémantique, labels sur les inputs, contraste
3. **Anims** — optionnel, à voir selon le temps
4. **Hover states** — bouton Continue + éventuellement les items
5. **Passe finale** — `grep console.log`, relecture classNames

### 📈 Évaluation de session

- **Points solides :** raisonnement sur la responsabilité des composants (`SummaryItem` remonte category+value, pas l'objet entier) — bon instinct ; `ResultCard` écrit sans aide ; réflexe de sortir `scoresByCategories` du composant
- **Points fragiles :** syntaxe TypeScript des types fonction — requiert aide systématique ; manipulation d'objets JS (accès, computed keys) — zone de confusion réelle, pas juste de l'étourderie
- **Priorité pour la prochaine session :** responsive layout — plus simple, permettra de finir le challenge

### 💬 Notes de contexte

- L'app est fonctionnelle : scores éditables, calcul au submit, feedback dynamique, affichage `ResultCard`
- `scoresByCategories` est maintenant une constante module-level
- Prochaine session : polish (responsive, a11y, anims optionnelles) puis post sur Frontend Mentor

---

## Référence syntaxes — à revoir régulièrement

Ces syntaxes ont été vues en session mais ne sont pas encore ancrées. Revenir dessus à chaque fois qu'elles apparaissent.

### `Array.reduce()` — transformer un tableau en objet

```ts
const obj = array.reduce<Record<string, number>>((acc, item) => {
  return { ...acc, [item.key]: item.value }
}, {})
// acc = accumulateur (objet en cours de construction)
// {} = valeur initiale de acc
// [item.key] = clé dynamique (computed property)
```

### Computed property names — clé dynamique dans un objet

```ts
const key = "Reaction"
const obj = { [key]: 76 }  // → { Reaction: 76 }

// Mettre à jour une clé dans un objet existant :
const updated = { ...scores, [category]: newValue }
```

### Type d'une fonction en TypeScript

```ts
// Dans une interface :
onScoreChange: (category: string, value: number) => void

// Lecture : fonction qui reçoit (string, number) et ne retourne rien
```

### Type générique sur `reduce`

```ts
array.reduce<Record<string, number>>((acc, item) => { ... }, {})
// Le <Record<string, number>> dit à TypeScript quel type est acc
```

---

## Session 2026-04-18 — Types, utils, SummaryItem, map

### ✅ Étapes accomplies

- Interface `Result` corrigée (typo `ResulsProps` → `Result`, singulier, pas de Props)
- Union type `ResultLevel` : `"Bad" | "Poor" | "Fair" | "Great"`
- Interface `Feedback` : `min`, `max`, `level`, `message`
- Interface `FeedbackResult` : `level`, `message` (retour de la fonction, sans min/max)
- `src/utils/getFeedback.ts` créé : `FEEDBACK_DATA` (4 entrées) + `getFeedback(score)` avec `throw new Error` si hors plage
- `data.json` déplacé de `public/data/` vers `src/data/` pour import statique direct
- `SummaryItem` créé : constante `COLORS` (Record catégorie → `{bg, text}`), props `icon`, `category`, `score`, input number avec `defaultValue`
- Map dans `App.tsx` : `data.map()` → `<SummaryItem />` dans un `<form>` avec bouton Continue

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|---|---|---|
| Union type TypeScript | Révisée | `ResultLevel` — valeurs littérales pour contraindre les strings connues |
| `Record<K, V>` | Nouvelle | Objet avec clés et valeurs typées — utilisé pour `COLORS` |
| Tailwind classes dynamiques | Nouvelle | Impossible de construire `text-${var}` — Tailwind scanne statiquement, classes complètes obligatoires |
| `throw new Error` comme fallback | Nouvelle | Plus honnête qu'un return arbitraire pour un cas impossible |
| Import JSON statique (Vite) | Nouvelle | `import data from './data/data.json'` — données connues à compile time |
| `Array.map()` en JSX | Révisée | Première application consciente — `data.map(item => <SummaryItem .../>)` |
| Destructuration des props | Révisée | `({ icon, category, score })` dans la signature du composant |
| `defaultValue` vs `value` sur input | Nouvelle | `defaultValue` = non contrôlé (pas de state), suffisant pour l'instant |

### ⚠️ Notions faussement acquises détectées

- **Syntaxe d'annotation de constante** — écrit `const COLORS:{ red: "light-red" }` (déclaration de type inline sans `=`). Correct : `const COLORS: Record<...> = { ... }`.
- **Tailwind classes dynamiques** — tentative de `text-${color}` avec template literal. Non fonctionnel : Tailwind ne peut pas inférer les classes construites à runtime.

### 🔄 Étapes restantes (prochaine session)

1. **`App.tsx`** — ajouter `useState` pour stocker les scores saisis, passer `onScoreChange` en prop à `SummaryItem`
2. **`SummaryItem`** — remplacer `defaultValue` par `value` + `onChange` contrôlé
3. **Calcul du score moyen** — dans `App`, sur submit du form
4. **`ResultCard`** — panel gauche : score moyen affiché dans un cercle, niveau + message via `getFeedback`
5. **Layout global** — panel gauche (résultat) + panel droit (liste) côte à côte en desktop, empilés en mobile
6. **Responsive** — breakpoint `md:` pour passer de colonne à rangée
7. **Hover states** — bouton Continue + éventuellement les items

### 📈 Évaluation de session

- **Points solides :** raisonnement sur `FeedbackResult` vs `Feedback` — bon instinct de séparation ; map JSX écrite sans aide ; déplacement de `data.json` décidé de façon autonome
- **Points fragiles :** syntaxe annotation TypeScript (`const X: Type` vs `const X: Type = value`) — confusion encore présente ; Tailwind statique pas encore réflexe
- **Priorité pour la prochaine session :** inputs contrôlés (`useState` + `onChange`) — c'est le cœur éducatif du projet

### 💬 Notes de contexte

- `data.json` maintenant dans `src/data/` — import statique, pas de fetch
- `SummaryItem` a des inputs avec `defaultValue` — à passer en contrôlé dès le début de la prochaine session
- `ResultCard.tsx` créé mais vide — à construire après avoir câblé le state dans `App`
- Le bouton "Continue" est dans le `<form>` de `App` — `onSubmit` existe mais ne fait que `e.preventDefault()` pour l'instant

---

## Variante étendue — Décisions d'architecture (2026-04-18)

Le challenge original est un afficheur pur (données statiques, pas d'interaction). On l'a étendu pour le rendre éducativement plus riche, sans trahir le brief : `data.json` reste la source de structure et de valeurs par défaut, mais l'utilisateur peut saisir ses propres scores.

### Features ajoutées

- **Inputs par catégorie** — l'utilisateur saisit un score (0–100) pour chacune des 4 catégories
- **Bouton "Continue"** — agit comme submit : déclenche le calcul et bascule vers l'affichage résultat
- **Score moyen calculé** — moyenne des 4 scores saisis, affiché dans le panel gauche
- **Feedback dynamique** — message + niveau change selon le score moyen

### FEEDBACK_DATA — 5 niveaux

| Level | Min | Max | Déclencheur |
|-------|-----|-----|-------------|
| unknown | – | – | État initial (aucun score saisi) |
| Bad | 0 | 25 | Score moyen ≤ 25 |
| Poor | 26 | 50 | Score moyen ≤ 50 |
| Fair | 51 | 75 | Score moyen ≤ 75 |
| Great | 76 | 100 | Score moyen ≤ 100 |

### Fichiers concernés

- `src/types/types.ts` — interface `Result` (existante) + nouvelle interface `Feedback`
- `src/utils/getFeedback.ts` — tableau `FEEDBACK_DATA` + fonction `getFeedback(score: number)`
- `App.tsx` — état global, calcul du score moyen, logique de bascule saisie → résultat
- Composants : `ResultCard` (panel gauche) + `SummaryItem` (panel droit, une ligne par catégorie)

---

## Session 2026-04-18 — Setup, git workflow, data-first typing

### ✅ Étapes accomplies

- Pré-plan éducatif défini : 3 objectifs (commits 4/5, lisibilité 4/5, nommage 4/5)
- Approche data-first choisie (contraste avec type-first du Pomodoro)
- Protocole commit socratique mis en place
- Politique d'usage IA définie : chore/setup délégué, décisions architecturales restent humaines
- `git init` + repo GitHub + remote configurés
- Setup standalone validé : tokens, fonts, `cn()` — propre, sans résidus Vite
- 4 commits atomiques créés via `git add` sélectif :
  - `chore(setup): init Vite React TypeScript Tailwind clsx tailwind-merge`
  - `chore(setup): add design tokens and self-hosted fonts`
  - `chore(setup): project assets`
  - `doc(readme): add readme`
- `data.json` analysé — 4 objets, 3 propriétés : `category`, `score`, `icon`
- Interface `Result` discutée et localisée dans `src/types/types.ts`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|---|---|---|
| `git add` sélectif (fichiers nommés) | Nouvelle | Jamais fait avant — alternative à `git add .` pour commits atomiques |
| `git add -p` | Nouvelle (théorique) | Pour splitter les changements dans un même fichier — non utilisé ici car fichiers séparés |
| Atomicité des commits | Révisée | `&` dans un message = signal de split. Appliqué 2 fois en session |
| Sémantique Conventional Commits | Révisée | `init` vs `install`, `docs` vs `doc`, casse des noms de packages |
| Data-first TypeScript | Nouvelle | Dériver les interfaces de la forme du JSON, pas de l'architecture imaginée |
| `string` vs union type pour données externes | Nouvelle | Union type = contrainte sur données qu'on contrôle. JSON externe → `string` |

### ⚠️ Notions faussement acquises détectées

- **`doc` au lieu de `docs`** — type Conventional Commits écrit `doc` dans le commit readme. Type correct : `docs`. Déjà poussé, non corrigé.
- **Réflexe de regrouper** — tendance à bundler plusieurs intentions dans un commit. Corrigé 2 fois en session (assets + `&`). Pas encore automatique.

### 🔄 Étapes restantes

- Écrire l'interface `Result` dans `src/types/types.ts`
- Commit : `feat(types): add Result interface`
- Planifier les composants (2 max : `ResultCard` + `SummaryItem`)
- Construire l'UI — panel gauche (résultat + cercle) puis panel droit (liste)
- Responsive mobile → desktop

### 📈 Évaluation de session

- **Points solides :** raisonnement sur l'atomicité compris rapidement ; question sur union type vs string — bonne intuition, bon raisonnement
- **Points fragiles :** réflexe de regrouper les commits encore présent ; `docs` vs `doc` — étourderie
- **Priorité pour la prochaine session :** écrire `Result`, puis planifier les composants avant d'écrire le JSX

### 💬 Notes de contexte

- Premier projet avec protocole commit socratique actif — 2 corrections en session, réflexe pas encore automatique
- `data.json` est dans `public/data/` (déplacé par le standalone) — vérifier le chemin d'import au moment du fetch
- Politique IA établie et mémorisée : setup délégué, code applicatif humain

---

## Project Kickoff — Results Summary Component

### Auto-évaluation initiale

| Notion | Auto-évaluation | Commentaire |
|---|---|---|
| Responsive Tailwind (flex/grid, breakpoints) | Confiant | À l'aise avec le CSS en général |
| Gradients Tailwind v4 / CSS custom | Rouillé | Pas encore utilisé, syntaxe à apprendre — pas inquiétant |
| Hover/focus states Tailwind | Confiant | CSS à l'aise |
| `cn()` / clsx | Rouillé | Principe compris, automatisme pas encore là |
| Lire un JSON et dériver des interfaces TypeScript | Prudent | Comprend le principe, confiance balbutiante sur l'exécution |
| Composant avec props typées (`XxxProps`) | Rouillé | Notion présente, automatisme à confirmer |
| `Array.map()` en JSX | Incertain | Principe map connu (JS), application en JSX pas encore vue consciemment |
| Scaffold Vite propre | Confiant | Checklist intégrée depuis Pomodoro |

### Axes prioritaires identifiés pour ce projet

1. **Commits** — protocole socratique actif : alerte sur quand commiter, question sur le message, correction si nécessaire
2. **Finition** — passe `grep console.log` + relecture className avant chaque push
3. **Nommage** — `onXxx` pour callbacks, `XxxProps` pour interfaces, systématiquement

### Approche choisie

- **Data-first** : lire `data.json`, dériver les interfaces TypeScript, puis construire l'UI
- Contraste avec Pomodoro (type-first) — objectif : voir la différence de workflow

### Score cible audit

| Axe | Pomodoro | Cible |
|---|---|---|
| 1.1 Structure | 4/5 | 4/5 |
| 1.2 Nommage | 3.5/5 | 4/5 |
| 1.3 Commits | 3/5 | 4/5 |
| 1.4 Lisibilité | 3/5 | 4/5 |
| **Moyenne** | **3.4/5** | **4/5** |