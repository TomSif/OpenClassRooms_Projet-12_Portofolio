## 📌 Objectifs pédagogiques — référence permanente (ne pas déplacer)

| ID | Axe | Règle clé | Cible |
|----|-----|-----------|-------|
| O1 | 1.4 Lisibilité | Avant chaque `git add` : zéro double espace dans classNames, zéro `className=""` vide, zéro `return` sur void | 4/5 |
| O2 | 1.2 Nommage | Toute prop callback → `on+verb`. Jamais un setter brut (`setXxx`) comme prop. | 4.5/5 |
| O3 | 1.3 Commits | Type exact (`chore` ≠ `fix`), scope minuscules, espace après `:`, une seule intention par commit | 4.5/5 |
| O4 | 2.4 DRY | Dès qu'un className est conditionnel → `cn()` obligatoire. Objet notation : `cn("base", { "error": isError })` | 3.5/5 |
| O5 | 2.2 TypeScript | Ne pas re-annoter ce que TS infère. Props callback = `() => void`, jamais `Dispatch`. | 4.5/5 |
| O6 | A11y | `aria-describedby` sur chaque champ avec message d'erreur. `aria-live` sur les résultats. `:focus-visible` pour les outlines. | solide |
| O7 | Décomposition | Avant d'écrire toute nouvelle fonction : écrire en français (1) ce qui rentre, (2) ce qu'on en fait, (3) ce qui sort. Aucune ligne de code avant que les trois soient clairs. | priorité active |

> **Note O7 — signal fort (2026-04-29) :** Premier "trou noir" observé en 12 projets. Face à `useMortgageCalculator`, incapacité totale à décomposer le flux de données — ce qui rentre, ce qui se passe, ce qui sort — rendant l'écriture impossible. Ce n'est pas un manque de TS ou React : c'est une compétence de décomposition algorithmique qui n'est pas encore automatique. **Protocole à appliquer systématiquement :** pseudo-code en français d'abord, zéro exception. Si le français n'est pas clair, on ne passe pas au code.

---
<!-- Blocs de session — plus récent en premier -->

## Session 2026-05-01 — Accessibilité clavier, Clear All, UX formulaire, edges cases

### ✅ Étapes accomplies

- `checked={isSelected}` ajouté sur `<input type="radio">` — input radio rendu contrôlé
- `peer-focus-visible:border-lime` sur le div cercle radio — focus visible au clavier
- `has-focus-visible:bg-lime/15` sur le `<label>` radio — Tailwind v4 natif, sans crochets
- `group` / `group-focus-within:bg-lime` sur `InputNumber` — pattern parent→enfant découvert
- `focus-within:border-lime` vs `in-focus-within:` — distinction ancêtre vs descendant comprise
- `hover:not-focus-within:border-slate-900` — hover scopé à l'état non-focusé
- Clear All complet : `onClearAll` dans `App` réinitialise `inputs`, `errors`, et `result` (via `reset` du hook)
- `reset` ajouté dans `useMortgageCalculator` — retourne `null` sans recalculer
- Ordre de déclaration corrigé : hook destructuré avant `onClearAll` qui l'utilise
- `maxLength` extrait en prop — logique métier retirée du composant générique
- `max?: number` ajouté sur `InputNumber` — bloque la saisie au-delà du max à la frappe
- `isFocus` state dans `InputNumber` — hint visible uniquement au focus, masqué si erreur active
- Clear error au `onChange` dans `App` — erreur effacée champ par champ à la saisie
- Convention `on+verb` clarifiée : s'applique aux props seulement, pas aux retours de hook
- Discussion React Hook Form — choix de construire manuellement validé pédagogiquement

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| `checked` prop sur radio — input contrôlé | Révisée | Manquait depuis le début, identifié par symptôme clavier |
| `peer-focus-visible:` | Nouvelle | Appliqué correctement après explication |
| `:has()` CSS et `has-focus-visible:` Tailwind v4 | Nouvelle | Assimilé rapidement — logique "parent qui contient" claire |
| `group` / `group-focus-within:` | Nouvelle | Analogie avec `peer-*` bien reçue, appliqué seul |
| `focus-within:` vs `in-focus-within:` | Nouvelle | Distinction critique — `in-*` regarde les ancêtres, pas les descendants |
| `hover:not-focus-within:` | Nouvelle | Combinaison de variants — jamais vu, assimilé sur exemple |
| Prop `max?: number` optionnelle + blocage à la saisie | Nouvelle | Architecture propre — logique métier dans FormSection, pas dans InputNumber |
| Clear error au `onChange` avec spread partiel | Nouvelle | Réflexe `clearError` complet corrigé — effacer un seul champ |
| `on+verb` = props seulement, pas retours de hook | Révisée | Nuance utile, clarifiée en contexte |

### ⚠️ Notions faussement acquises détectées

- **`focus-visible:` sur un élément non-focusable** : a écrit `focus-visible:border-lime` sur un `<div>` — ne s'applique que sur l'élément qui reçoit le focus lui-même, pas sur un sibling ou enfant. Réflexe `peer-focus-visible:` pas encore automatique.
- **`in-focus-within:` vs `focus-within:`** : utilisé `in-focus-within:` pensant cibler les descendants — c'est l'inverse, ça cible les ancêtres. Gap sur la direction de ces variants Tailwind v4.

### 🔄 Étapes restantes

- ~~README de soumission~~ ✅
- ~~Deploy sur Vercel~~ ✅
- ~~Soumission Frontend Mentor~~ ✅

### 📈 Évaluation de session

- **Points solides :** Clear All implémenté de zéro sans aide (architecture + propagation + typage), identification autonome du bug `checked` manquant, `group-focus-within:` appliqué seul après l'analogie, commits séparés correctement par intention (O3 ✅), questions architecturales pertinentes (React Hook Form, `type="number"`), série de corrections a11y et guards mathématiques menée sans aide significative
- **Points fragiles :** direction des variants Tailwind v4 (`in-*` vs pas `in-*`) — pas encore intuitif ; réflexe de vérifier le type attendu avant d'assigner (a passé une string à un état boolean)
- **Priorité pour la prochaine session :** nouveau challenge — appliquer O7 dès le kickoff

### 💬 Notes de contexte

- `has-focus-visible:` sans crochets est la syntaxe native Tailwind v4 pour les pseudo-classes courantes — confirmé par l'IDE
- Convention `on+verb` s'applique uniquement aux props callback, pas aux fonctions retournées par les hooks (`reset`, `calculate`, `toggle`... tous valides)
- React Hook Form aurait géré nativement validation, clear on change, touched states — construction manuelle choisie délibérément pour ancrer les mécanismes sous-jacents
- Profil : autonomie en progression notable — plusieurs sous-tâches résolues sans hints cette session

## Session 2026-04-30 — ResultSection + A11y (aria-describedby, aria-live) + filtrage input

### ✅ Étapes accomplies

- `ResultSection` écrit de zéro : deux états (fallback / résultats), prop `result: Result | null`, `Intl.NumberFormat` pour le formatage monétaire
- Bug de double imbrication corrigé : `result: { result: Result | null }` → `result: Result | null`
- `useId()` introduit dans `InputNumber` — id unique par instance, `aria-describedby` et `aria-invalid` branchés
- `role="alert"` retiré — conflit de double annonce avec `aria-describedby` expliqué et compris
- Filtrage input dans `onChange` : regex `/[^0-9.]/g` + gestion des points multiples + `maxLength={9}`
- `aria-live="polite"` posé sur la `<section>` de `ResultSection`
- Responsive + ajustements CSS

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| Union type au bon niveau (`Result | null` vs champs nullables) | Révisée | Confusion initiale résolue après explication "sac / contenu du sac" |
| `useId()` hook React | Nouvelle | Assimilé rapidement, appliqué correctement |
| `aria-describedby` avec id dynamique | Nouvelle | Logique comprise, implémentation autonome |
| `aria-live="polite"` | Nouvelle | Valeur et placement corrects du premier coup |
| `role="alert"` vs `aria-describedby` — conflit de double annonce | Nouvelle | Gap identifié et corrigé |
| Filtrage dans `onChange` (sans `useEffect`) | Nouvelle | Réflexe `useEffect` corrigé — transformation synchrone, pas un effet de bord |
| `maxLength` natif HTML | Nouvelle | Trouvé après sur-ingénierie du regex — bonne leçon de simplicité |

### ⚠️ Notions faussement acquises détectées

- **Typage des props TypeScript** : a écrit `result: { result: Result | null }` — croyait que `| null` était une clé dans l'objet. La distinction "typer le sac entier" vs "typer une clé dans le sac" n'est pas encore automatique.
- **`useEffect` pour transformer une valeur** : réflexe initial d'utiliser `useEffect` pour filtrer l'input. `useEffect` = effets de bord après render, pas transformations synchrones dans un handler.
- **Sur-ingénierie** : 15 lignes de regex pour un problème que `maxLength` + 3 lignes règlent. Signal récurrent — tendance à complexifier avant de chercher la solution native.

### 🔄 Étapes restantes

- Hover states + `:focus-visible` sur les éléments interactifs
- Review finale avant publication

### 📈 Évaluation de session

- **Points solides :** O7 appliqué spontanément en début de session, `useId()` assimilé rapidement, placement `aria-live` correct, réflexe de simplification présent (a reconnu que `maxLength` était plus simple)
- **Points fragiles :** typage TypeScript des props — la distinction "objet entier" vs "clé dans l'objet" nécessite encore de la pratique ; réflexe `useEffect` pour des problèmes synchrones
- **Priorité pour la prochaine session :** hover + `:focus-visible` — vérifier que O6 est complet avant publication

### 💬 Notes de contexte

- `Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })` — utilisé autonomement pour le formatage monétaire
- `data` element HTML utilisé avec `value` pour les montants — choix sémantique pertinent
- Session productive malgré les gaps — rythme et autonomie en progression

## Session 2026-04-29 — Refactor FormSection + handleSubmit + useMortgageCalculator

### ✅ Étapes accomplies

- Typo `repayement` corrigée dans `FormSection`
- `FormSection` refactorisé : state remonté dans `App`, interface `FormSectionProps` construite (`inputs`, `errors`, `onChange`, `onSubmit`)
- `onChange: (field: keyof Inputs, value: string) => void` — pattern clé/valeur compris et appliqué
- Bouton déplacé dans le `<form>` avec `type="submit"` et `onSubmit` sur le form
- `e.preventDefault()` dans un handler inline sur `<form onSubmit>` — sans remonter l'event
- `handleSubmit` dans `App` : validation par objet + `setErrors` + early return avec `Object.values().some()`
- `type="number"` remplacé par `type="text"` dans `InputNumber` — décision argumentée
- `useMortgageCalculator` complet : interface `Result`, `useState<Result | null>`, `calculate(inputs: Inputs)`, deux formules avec `totalRepayment` corrigé pour Interest Only
- Hook branché dans `App` — `calculate(inputs)` appelé dans `handleSubmit`
- `ResultSection` décomposée en français : reçoit `result`, affiche fallback si `null`, affiche résultats sinon

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| Lift state vers App — composants "dumb" | Nouvelle | Raisonnement autonome et correct sur la séparation des responsabilités |
| Props callback `onXxx` vs setter brut | Révisée | O2 appliqué spontanément après rappel |
| Handler inline avec accolades `(e) => { e.fn(); call(); }` | Nouvelle | Cherchait des types complexes — gap syntaxique, pas de typage |
| `e.preventDefault()` — appel vs référence | Nouvelle | Erreur sans `()` — ancrée après correction |
| Validation par objet + `Object.values().some()` | Nouvelle | `some()` découverte en session, appliquée correctement |
| Custom hook — structure complète | Nouvelle | Comprise après décomposition guidée — `Result` interface, state interne, `calculate` |
| `totalRepayment` Interest Only = `monthlyPayment * n + loanAmount` | Nouvelle | Bug identifié et corrigé de façon autonome |
| Destructuration du retour d'un hook | Nouvelle | Confusion initiale avec "props" — distinction clarifiée |

### ⚠️ Notions faussement acquises détectées

- **Arrow function multi-instructions** : cherchait des types React complexes pour un problème purement syntaxique — les accolades dans une arrow function inline n'étaient pas automatiques.
- **Décomposition algorithmique (O7)** : premier "trou noir" en 12 projets — incapacité à séquentialiser les trois étapes d'une fonction face à une complexité cumulée. Signal fort, protocole pseudo-code en français instauré.

### 🔄 Étapes restantes

- `ResultSection` — deux états : fallback (result === null) / résultats (monthlyPayment + totalRepayment)
- Accessibilité : `aria-describedby` sur les inputs, `aria-live` sur les résultats
- Style global + responsive

### 📈 Évaluation de session

- **Points solides :** architecture autonome, O2 appliqué, bug `totalRepayment` détecté et corrigé seul, décomposition en français fluide une fois le protocole posé
- **Points fragiles :** décomposition séquentielle sous complexité cumulée — O7 à travailler activement
- **Priorité pour la prochaine session :** `ResultSection` — appliquer O7 dès le départ

### 💬 Notes de contexte

- Profil cognitif identifié : pensée en système/arborescence, force sur le flux global et le UX, difficulté à séquentialiser étape par étape sous pression
- `type="number"` retiré délibérément — `e.target.value` retourne toujours une string, flèches absentes du design
- Intérêt genuine pour la méthode propre plutôt que le raccourci — bonne posture constante

---

## Session 2026-04-28 — Composants InputNumber, InputRadio, FormSection

### ✅ Étapes accomplies

- Arborescence des composants définie : `InputNumber`, `InputRadio`, `FormSection`
- Interface TypeScript `InputNumberProps` construite de zéro avec raisonnement guidé
- Interfaces `Inputs` et `Errors` dans `types/index.ts`
- `Errors` typée avec mapped type — notion `Record<keyof Inputs, boolean>` découverte en session
- `InputNumber` complet : controlled input, `cn()` objet notation, `flex-row-reverse` pour orientation, `isError && <p>`
- `InputRadio` complet : union type précis, cast `as`, prop `isSelected` branchée sur `bg-lime/15`
- `FormSection` : deux `useState` typés, trois `InputNumber` + deux `InputRadio` branchés, `<fieldset>` + `<legend>`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| Props callback typées `(value: string) => void` | Révisée | Pas automatique au départ — a nécessité un exemple parallèle |
| `cn()` objet notation | Nouvelle | Comprise et appliquée après explication |
| `Record<K, V>` et mapped types | Nouvelle | Intuition juste, syntaxe découverte en session |
| `as` type casting | Nouvelle | Assimilée rapidement après exemple |
| `useState` typé avec objet initial complet | Révisée | Réflexe de `useState()` sans valeur initiale — corrigé |
| `flex-row-reverse` pour inversion d'ordre visuel | Révisée | Trouvé après test visuel, bonne démarche |
| Separate state pattern (values vs errors) | Nouvelle | Logique comprise sans difficulté une fois posée |

### ⚠️ Notions faussement acquises détectées

- **TypeScript — déclaré confiant, gap observé** : ne savait pas typer une prop callback `(value: string) => void`, ni utiliser `as` pour un cast. Interface `error: () => void` au lieu de `isError: boolean` montre que la distinction donnée/comportement n'était pas automatique.
- **`return` sur void (O1)** : a écrit `return onChange(e.target.value)` — réflexe pas encore ancré.
- **Optional chaining inutile** : a écrit `errors?.loanAmount` sur un état toujours initialisé.

### 🔄 Étapes restantes

- Corriger faute de frappe `label={"repayement"}` dans `FormSection`
- Logique de validation à la soumission (`handleSubmit`)
- Custom hook `useMortgageCalculator` — formule de calcul
- Panneau résultats (deux états : vide / calculé)
- Accessibilité : `aria-describedby` sur les inputs, `aria-live` sur les résultats

### 📈 Évaluation de session

- **Points solides :** raisonnement sur les props (3 questions), séparation values/errors, union type précis sur `loanType`, commits propres (O3 ✅)
- **Points fragiles :** typage des callbacks pas encore automatique, `return` sur void (O1), optional chaining sur état garanti
- **Priorité pour la prochaine session :** `handleSubmit` + validation — c'est là que les notions 4 (validation) et 7 (custom hook) rentrent vraiment

### 💬 Notes de contexte

- Question pertinente sur le coût React vs HTML pur — réponse honnête donnée : le gain est réel à l'échelle du projet complet, pas sur 3 inputs isolés
- `loanType: ""` comme valeur initiale : choix délibéré pour détecter l'état "rien sélectionné" et déclencher l'erreur radio
- `isSelected && "bg-lime/15"` dans `cn()` : shorthand accepté ici car la notation objet donnerait une clé avec `/` — cas limite valide

---

## Session 2026-04-27 — Scaffold + Kickoff pédagogique

### ✅ Étapes accomplies

- Scaffold complet en 3 commits :
  - `chore(setup)` : init Vite + React + Tailwind v4, structure src/ (`components/`, `hooks/`, `utils/`, `lib/cn.ts`, `types/index.ts`)
  - `chore(styles)` : design tokens dans `index.css` — couleurs, fonte Jakarta, text-presets 1 à 5 via `@theme` + `@utility`
  - `perf(html)` : preload fonts Plus Jakarta Sans via CDN
- Kickoff pédagogique : self-assessment initiale enregistrée
- Objectifs O1–O6 intégrés dans progression.md (référence permanente)

### 🧠 Notions de code vues

Aucune — session de mise en place, pas de code applicatif écrit.

### ⚠️ Notions faussement acquises détectées

Aucune — pas de code produit.

### 🔄 Étapes restantes

- Définir l'arborescence des composants
- Implémenter le layout global + composants principaux
- Formulaire contrôlé avec TypeScript
- Logique de calcul + validation (`useMortgageCalculator`)
- Panneau résultats (deux états : vide / calculé)
- Accessibilité (aria, focus-visible)

### 📈 Évaluation de session

- **Points solides :** scaffold propre, commits sémantiquement corrects (O3 ✅)
- **Points fragiles :** aucun observable
- **Priorité pour la prochaine session :** discuter le découpage en composants, démarrer le layout global

### 💬 Notes de contexte

- Session volontairement courte — journée de 9h sur le projet précédent
- Design tokens Tailwind v4 : syntaxe `@theme` + `@utility` (différent de v3)

---

## Project Kickoff — 2026-04-27

### Self-assessment initiale

| # | Notion | Auto-évaluation |
|---|--------|-----------------|
| 1 | Inputs contrôlés React (`value` + `onChange` + `useState`) | Confiant |
| 2 | TypeScript — interfaces pour données de formulaire et erreurs | Confiant |
| 3 | Radio buttons contrôlés en React | Confiant |
| 4 | Validation par champ — état d'erreur à la soumission | Rouillé |
| 5 | `cn()` avec objet notation pour classes conditionnelles | Rouillé |
| 6 | Formule de calcul hypothécaire (logique métier) | À découvrir |
| 7 | Custom hook — extraction de logique dans `useXxx.ts` | Rouillé |
| 8 | Layout responsive Tailwind (breakpoints, grid/flex) | Confiant |
| 9 | Accessibilité formulaire (`aria-describedby`, `aria-live`, `:focus-visible`) | Rouillé |

### 🎯 Priorités pédagogiques identifiées

- **Zones de travail actives :** 4 (validation), 5 (`cn()`), 7 (custom hook), 9 (a11y)
- **Zones à surveiller :** 2 et 3 — déclarés confiants, risque anti-pattern `Dispatch` / setter brut comme prop