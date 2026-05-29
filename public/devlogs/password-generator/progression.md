## Session 2026-02-28 — generatePassword, Clipboard API, gestion d'erreurs, finition CSS

### ✅ Étapes accomplies
- `utils/generatePassword.js` — fonction pure : pool de caractères, boucle `for`, `Math.floor(Math.random() * pool.length)`, retourne `""` si pool vide
- `ButtonGenerate` — handler `handleGenerate` avec guard clause (`hasError` → `setShowError` + early return), hover/active CSS
- `PasswordContainer` — `useState(false)` pour `copied`, `handleCopy` async/await, `setTimeout` pour reset, placeholder conditionnel `password === ""`
- Clipboard API — `navigator.clipboard.writeText()` avec `async/await`
- `App` — `hasError` valeur dérivée (length === 0 OU aucune option cochée), `showError` state, propagation via props
- `OptionsContainer` — messages d'erreur contextuels différenciés selon le type d'erreur
- `StrengthContainer` — seuils ajustés (`> 0 / > 20 / > 30 / > 50`), couleurs tokens custom (`green-200`, `yellow-300`)
- Projet fonctionnellement complet et conforme à la maquette

### 🧠 Notions de code vues
| Notion | Statut | Commentaire |
|--------|--------|-------------|
| Fonction pure dans `utils/` — séparation des responsabilités | Consolidée | Placé spontanément dans `utils/`, logique complète écrite sans aide |
| `Math.floor(Math.random() * pool.length)` | Nouvelle | Logique expliquée, implémentée correctement |
| `onClick={fn()}` vs `onClick={() => fn()}` | Faussement acquise | Erreur répétée (3e occurrence) — corrigée seul cette fois après debug |
| `async/await` sur une Promise | Nouvelle | Expliqué avec exemple neutre, adapté sans aide |
| `navigator.clipboard.writeText()` | Nouvelle | `await` sans stockage du résultat compris |
| `useState` pour feedback UI temporaire (`copied`, `showError`) | Nouvelle | Pattern `setTimeout` + reset appliqué deux fois de suite |
| Valeur dérivée pour validation (`hasError`) | Nouvelle | Calculée dans `App` sans `useState` — bonne décision architecturale |
| Guard clause avec early `return` | Nouvelle | Appliqué spontanément dans `handleGenerate` |
| Messages d'erreur contextuels (ternaire sur l'état) | Nouvelle | Différenciation `length === 0` vs aucune option cochée |

### ⚠️ Notions faussement acquises détectées
- **`onClick={fn()}` vs `onClick={() => fn()}`** : 3e occurrence en 3 sessions. Corrigée en autonomie cette fois — signe que le diagnostic est acquis, mais le réflexe préventif ne l'est pas encore.

### 🔄 Étapes restantes
- `README.md` mis à jour (description, stack, captures d'écran)
- Déploiement Vercel + soumission Frontend Mentor
- Point à vérifier : `absolute bottom-2` dans `OptionsContainer` sans `relative` sur la `<section>` parente — positionnement à confirmer

### 📈 Évaluation de session
- **Points solides :** fonction pure écrite seule, async/await adapté du premier coup, pattern `showError` + guard clause + messages contextuels — gestion d'erreur robuste faite en autonomie
- **Points fragiles :** `onClick={fn()}` vs `onClick={() => fn()}` — réflexe préventif pas encore automatique
- **Priorité pour la prochaine session :** déploiement Vercel + soumission ; ou prochain challenge si fait en autonomie

### 💬 Notes de contexte
- `hasError` est une valeur dérivée dans `App` (pas un state) — bonne décision : évite une désynchronisation
- Seuils force : `> 0 / > 20 / > 30 / > 50` — max longueur 20 × 4 types = 80
- `password` initialisé à `""` (pas `null`) — placeholder conditionnel sur `=== ""`
- `OptionsContainer` passe `setShowError` à `CharacterLengthContainer` et `CheckBoxOptionsContainer` en plus de `ButtonGenerate`

---

## Session 2026-02-27 — State objet, CheckBoxOptionsContainer, StrengthContainer

### ✅ Étapes accomplies
- Refactor state : `length` → objet `options` centralisé dans `App` (`length` + 4 booléens `include*`)
- `CharacterLengthContainer` adapté : `options.length` à la place de `length`, spread conservé
- `CheckBoxOptionsContainer` : 4 checkboxes contrôlées, `fieldset` + `label` wrapping, props drilling correct
- `StrengthContainer` : fonction `getStrength` avec formule multiplicative (`length × somme des types`), tableau `barColors` indexé, `.map()` sur `[1,2,3,4]` pour les barres
- Props `options` passé à `StrengthContainer` via `OptionsContainer`

### 🧠 Notions de code vues
| Notion | Statut | Commentaire |
|--------|--------|-------------|
| `useState` objet — spread pour update partiel | Consolidée | Adapté sans aide sur 3 occurrences dans `CharacterLengthContainer` |
| Props drilling avec objet unique | Consolidée | Un seul prop `options` au lieu de 5 — logique comprise et appliquée |
| `Number(booléen)` → 0 ou 1 | Nouvelle | Utilisé pour additionner des booléens dans le scoring |
| `.map()` sur tableau littéral `[1,2,3,4]` | Nouvelle | Pour générer les 4 barres de force sans répétition |
| `fieldset` pour grouper des inputs | Nouvelle | Choix intuitif, sémantiquement correct (meilleur que `div` pour l'accessibilité) |
| `gray` (Tailwind default) vs `grey` (token custom) | Faussement acquise | Erreur répétée — 3e occurrence en 3 sessions |
| Valeur dérivée calculée dans le composant | Consolidée | `strength` et `label` calculés dans `StrengthContainer` sans `useState` |

### ⚠️ Notions faussement acquises détectées
- **`gray` vs `grey`** : erreur répétée pour la 3e fois (`text-gray-200` au lieu de `text-grey-200`). La règle est connue verbalement mais pas ancrée en pratique.

### 🔄 Étapes restantes
- `ButtonGenerate` — bouton de génération + logique de génération de mot de passe (fonction pure)
- `PasswordContainer` — affichage du mot de passe généré (state à remonter ou passer via prop)
- Clipboard API (`navigator.clipboard`)
- Responsive layout + états hover/focus
- CSS custom : checkbox styling, couleurs maquette exactes

### 📈 Évaluation de session
- **Points solides :** spread sur objet state sans aide, props drilling avec objet unique compris et appliqué, `Number(bool)` utilisé spontanément, `.map()` sur tableau littéral
- **Points fragiles :** `gray` vs `grey` — erreur répétée en pratique malgré connaissance verbale
- **Priorité pour la prochaine session :** `ButtonGenerate` + logique de génération de mot de passe — première fonction pure JS à écrire

### 💬 Notes de contexte
- Formule scoring : `length × (nb de types cochés)` — seuils 10/20/30 pour 4 niveaux (max théorique 40)
- `StrengthContainer` ne reçoit que `options` en lecture — pas de `setOptions`
- Le commentaire inline dans `StrengthContainer` (ligne 39) est à nettoyer avant la fin du projet

---

## Session 2026-02-26 — CharacterLengthContainer + Props drilling + Slider CSS

### ✅ Étapes accomplies
- `CharacterLengthContainer` structuré : label, valeur affichée, `<input type="range">` contrôlé
- `useState(length)` initialement local puis **lifté vers `App`** (lift state up)
- Props drilling implémenté : `App` → `OptionsContainer` → `CharacterLengthContainer`
- Slider CSS custom cross-browser : `appearance: none`, thumb stylisé, track gradient dynamique
- Gradient de progression via CSS custom property `--fill` passée par `style` prop React
- `fillPercent` calculé comme valeur dérivée (`const`, pas `useState`)
- `MIN`/`MAX` extraits en constantes pour éviter la duplication

### 🧠 Notions de code vues
| Notion | Statut | Commentaire |
|--------|--------|-------------|
| Lift state up — parent commun | Faussement acquise | A d'abord désigné `CheckBoxOptionsContainer` (frère) puis `OptionsContainer` (pas assez haut) avant d'identifier `App` |
| Props destructuring `{ prop1, prop2 }` | Faussement acquise | A écrit `function Comp(prop1, prop2)` et `function Comp()` — syntaxe objet pas encore réflexe |
| Appel de fonction via prop : `onChange(val)` | Faussement acquise | Syntaxe `{onChange}(val)` utilisée — confusion expression/appel |
| Variable JS hors composant | Faussement acquise | `fillPercent` déclarée en dehors du composant (assignation hors render) |
| `const` pour valeur dérivée (pas `useState`) | Révisée | Compris une fois la distinction posée |
| CSS custom property via `style` prop React | Nouvelle | `style={{ "--fill": \`${fillPercent}%\` }}` — technique retenue |
| `linear-gradient` hard stop (même position) | Nouvelle | Syntaxe écrite seule une fois le principe expliqué |
| `appearance: none` sur l'input range | Nouvelle | Nécessaire pour activer les pseudo-éléments custom |

### ⚠️ Notions faussement acquises détectées
- **Props destructuring** : réflexe non ancré — 3 variantes incorrectes avant la bonne syntaxe
- **Lift state up** : logique comprise conceptuellement mais identification du bon niveau nécessite guidage
- **Scope des variables JS dans un composant** : variable déclarée hors du corps de la fonction

### 🔄 Étapes restantes
- `MAX = 10` confirmé par la maquette — valeur correcte
- `CheckBoxOptionsContainer` — 4 checkboxes avec état dans `App`
- `StrengthContainer` — indicateur de force (barres)
- `ButtonGenerate` — bouton de génération
- Logique de génération de mot de passe (fonction pure)
- Clipboard API (`navigator.clipboard`)
- Responsive layout + états hover/focus

### 📈 Évaluation de session
- **Points solides :** gradient hard stop écrit seul après explication du principe, `fillPercent` calcul correct, structure slider HTML complète
- **Points fragiles :** props destructuring (erreur répétée sur 3 variantes), identification du parent commun pour le state, scope des variables JS en contexte composant
- **Priorité pour la prochaine session :** `CheckBoxOptionsContainer` — consolider props drilling sur un nouveau composant + introduire état objet pour les options

### 💬 Notes de contexte
- `MAX = 10` confirmé par la maquette (pas 20 comme supposé initialement)
- Le slider Firefox utilise encore `#ddd` pour la track — pas encore unifié avec les tokens du projet

---

## Session 2026-02-25 (après-midi) — Scaffold composants + PasswordContainer

### ✅ Étapes accomplies
- Identification des blocs UI depuis la maquette et nommage en PascalCase
- Création des 6 fichiers composants : `PasswordContainer`, `OptionsContainers`, `CharacterLengthContainer`, `CheckBoxOptionsContainer`, `StrengthContainer`, `ButtonGenerate`
- Arborescence assemblée dans `App.jsx` (`PasswordContainer` + `OptionsContainer`)
- Correction : `return` manquant dans 4 composants sur 5
- Correction : `<main>` dupliqué dans `OptionsContainers` → remplacé par `<section>`
- Correction : typo `StrenghtContainer` → `StrengthContainer` (fichier + imports)
- Ajout des `@utility text-preset-1/2/3/4` dans `index.css` (typographie Figma)
- `PasswordContainer` structuré : `<header>` avec `<h1>` + div password display + bouton copier SVG
- `aria-label` ajouté sur le bouton copier (icône seule)

### 🧠 Notions de code vues
| Notion | Statut | Commentaire |
|--------|--------|-------------|
| Architecture de composants — découpage UI | Révisée | Découpage correct et autonome depuis la maquette |
| `return` obligatoire dans un composant React | Faussement acquise | 4 composants créés sans `return` — corrigés sur signalement |
| Sémantique HTML : unicité de `<main>` | Faussement acquise | `<main>` utilisé dans `OptionsContainers` malgré sa présence dans `App.jsx` |
| `<header>` vs `<section>` — sémantique | Révisée | Raisonnement juste une fois la question posée |
| Prettier — parenthèses JSX multilignes | Nouvelle | Compris en une explication, logique assimilée |
| `@utility` Tailwind v4 — custom utilities | Nouvelle | Syntaxe correcte, défini sans aide après explication |
| `aria-label` sur bouton icône | Révisée | Nécessite rappel systématique — pas encore réflexe |
| Tokens custom Tailwind vs palette default | Révisée | `text-gray-700` (default) au lieu de `text-grey-700` (custom) — corrigé sur signalement |

### ⚠️ Notions faussement acquises détectées
- **`return` dans les composants React** : 4 fichiers sur 5 créés sans `return`. La connaissance est là conceptuellement, mais pas encore un réflexe en pratique lors du scaffolding rapide.
- **Unicité de `<main>`** : `<main>` utilisé deux fois dans l'arborescence sans que ça soit détecté spontanément — règle HTML connue mais pas appliquée en contexte composant.

### 🔄 Étapes restantes
- `CharacterLengthContainer` — structure HTML + slider
- `CheckBoxOptionsContainer` — 4 checkboxes
- `StrengthContainer` — indicateur de force (barres)
- Logique de génération de mot de passe (`useState`, logique pure)
- Clipboard API (`navigator.clipboard`)
- Responsive layout + états hover/focus

### 📈 Évaluation de session
- **Points solides :** découpage composants autonome et pertinent, `@utility` Tailwind v4 correct du premier coup, structure `PasswordContainer` logique
- **Points fragiles :** réflexes de base en contexte rapide (return, sémantique HTML), tokens custom vs palette Tailwind par défaut (erreur répétée)
- **Priorité pour la prochaine session :** `CharacterLengthContainer` — structure HTML + slider ; introduire `useState` pour la valeur de longueur

### 💬 Notes de contexte
- `text-grey-700` dans `PasswordContainer` assumé comme couleur placeholder — changera dynamiquement avec l'état
- `@utility` est la syntaxe Tailwind v4 pour les custom utilities (différent de v3 `@layer utilities`)

---

## Session 2026-02-25 — Setup environnement

### ✅ Étapes accomplies
- Scaffolding Vite + React (JavaScript) dans `Password-generator/`
- Installation et configuration Tailwind v4 (`@tailwindcss/vite` + `@import "tailwindcss"`)
- Vérification Tailwind fonctionnel (classes couleur + font testées)
- Git init + 2 commits (`init:` et `chore:`)
- Copie assets depuis `starter-code/` : fonts woff2 → `public/fonts/`, SVG/favicon → `public/images/`
- Déclaration `@font-face` JetBrains Mono Bold 800
- Design tokens Figma → `@theme` Tailwind v4 (13 couleurs + `--font-mono`)
- Styles de base `body` via `var(--color-*)` et `var(--font-mono)`
- `App.jsx` nettoyé avec `<main>` sémantique
- ESLint configuré : ajout règle `no-console: warn`

### 🧠 Notions de code vues
| Notion | Statut | Commentaire |
|--------|--------|-------------|
| Tailwind v4 : plugin Vite + `@import "tailwindcss"` | Révisée | Différent de v3, assimilé correctement |
| Tailwind v4 : `@theme` pour design tokens | Nouvelle | Spontanément anticipé, bonne intuition |
| Convention `--color-*` dans `@theme` (singulier) | Nouvelle | Gap détecté — voir section faussement acquises |
| `@font-face` avec woff2 | Révisée | Structure correcte, extension `.woff2` oubliée dans src |
| Fragment React vs élément sémantique | Révisée | Compris rapidement, raisonnement juste |
| Conventional Commits (`feat/fix/chore`) | Nouvelle | Assimilé en une explication |
| ESLint flat config | Révisée | Lu et modifié sans difficulté |

### ⚠️ Notions faussement acquises détectées
- **Convention `--color-*` Tailwind v4** : après explication explicite du préfixe singulier, l'utilisateur a retapé `--colors-*` (pluriel, copie du Figma). La règle n'était pas encore intégrée au moment d'écrire — corrigée sur deuxième indication.

### 🔄 Étapes restantes
- Structurer les composants React (`App.jsx`, composants enfants)
- Implémenter la logique de génération de mot de passe
- Implémenter le slider (longueur) et les checkboxes (options)
- Copier dans le presse-papiers (`navigator.clipboard`)
- Indicateur de force du mot de passe
- Responsive layout + états hover/focus

### 📈 Évaluation de session
- **Points solides :** vite.config.js modifié correctement sans aide, @font-face structure juste du premier coup, @theme anticipé spontanément, raisonnement fragment/sémantique rapide
- **Points fragiles :** nommage des variables CSS dans @theme (convention Tailwind vs convention Figma), attention aux détails dans les URL (extension manquante)
- **Priorité pour la prochaine session :** commencer la structure des composants — identifier les composants de l'UI à partir de la maquette avant d'écrire du code

### 💬 Notes de contexte
- Stack finale : React 19 + Vite + Tailwind v4 + ESLint (sans TypeScript — décision délibérée pour ancrer les bases)
- Projet Vite dans `Password-generator/` (sous-dossier de `password-generator-app/`)
- Font : JetBrains Mono Bold 800 woff2 uniquement (seul poids utilisé dans le design)
- `body` fond : `--color-grey-950` (#08070b)

---

## Project Kickoff — 2026-02-25 — Password Generator App

### Challenge
Frontend Mentor — Password Generator App (premium)
Stack : React 19 + Vite + Tailwind CSS v4 + ESLint (pas de TypeScript — ancrage React/Tailwind prioritaire)

### User stories (source : README.md)
- Générer un mot de passe selon les options cochées (uppercase, lowercase, numbers, symbols)
- Copier le mot de passe dans le presse-papiers
- Afficher un indicateur de force du mot de passe
- Layout responsive (mobile / desktop)
- États hover et focus sur tous les éléments interactifs

### Concepts clés identifiés pour ce projet

| Concept | Auto-évaluation initiale |
|---------|--------------------------|
| Architecture de composants React (composition, props) | — |
| `useState` — gestion d'état multiple (checkboxes, slider) | — |
| Génération de mot de passe (logique pure TS) | — |
| Clipboard API (`navigator.clipboard`) | — |
| Tailwind v4 — classes utilitaires, responsive | — |
| Stylisation custom d'un `<input type="range">` | — |
| Stylisation custom de checkboxes | — |
| Classes conditionnelles avec `cn()` / `clsx` | — |
| Accessibilité — sémantique HTML, états focus | — |

> Auto-évaluation à compléter en session : **confident / rusty / don't remember**

### Décision de session 1
Mise en place de l'environnement : outillage, dépendances, git, CSS custom, ressources.
Aucune logique métier prévue pour cette session.