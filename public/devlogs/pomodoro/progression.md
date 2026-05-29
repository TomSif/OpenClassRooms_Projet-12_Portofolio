# Progression — Pomodoro App

## Session 2026-04-17 — Correction des erreurs de validation Frontend Mentor (8/10)

### ✅ Étapes accomplies

- `type="button"` ajouté sur `<ModeButton>` et le bouton START dans `Timer`
- `<form>` : `onSubmit` déplacé du bouton vers le `<form>`, `action=""` supprimé, bouton Apply passé en `type="submit"`
- `<fieldset>` fonts et colors : `<legend className="sr-only">` ajouté en premier enfant + `<h3 aria-hidden="true">` pour éviter double lecture
- `<nav aria-label="Timer mode">` ajouté autour du `<ul>` dans ModeSelector
- `<div>` timer remplacé par `<time dateTime={formatISO8601(state.timeLeft)}>` — fonction `formatISO8601` créée
- `<fieldset>` TIME : `<legend>` déjà présent et valide — confirmé
- `htmlFor` redondants retirés des labels radio (input imbriqué = association implicite)
- `Math.max(0, state.timeLeft - 1)` dans le reducer TICK pour éviter les valeurs négatives
- `useEffect` dédié détecté et confirmé pour gérer `timeLeft === 0` → dispatch `COMPLETE`
- `localStorage` guard `typeof window === "undefined"` ajouté dans `SettingsProvider`
- `key={index}` remplacé par `key={modeItem}` dans ModeSelector
- `addEventListener("close", onClose)` ajouté pour syncer l'état React avec la fermeture native du `<dialog>` (Escape)
- `box-shadow` multiples combinés en une seule déclaration avec virgules
- `padStart(2, "0")` ajouté dans `formatISO8601` pour valeurs ISO cohérentes
- `value` inversées corrigées sur font2 / font3 (Space Mono / Roboto Slab)
- `SettingsModal` déplacé hors du `<main>` — dialog au même niveau que header/main/footer
- Score final : **8/10** — seule erreur restante : inline styles (incontournable pour preview dynamique font/couleur)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| `type="button"` vs `type="submit"` | Consolidée | Sans `type`, un bouton dans un form est `submit` par défaut |
| `onSubmit` sur `<form>`, pas sur `<button>` | Nouvelle | `<button>` n'a pas d'événement `onSubmit` — confusion levée |
| `<legend>` comme premier enfant obligatoire de `<fieldset>` | Nouvelle | Contournement : `sr-only` + `aria-hidden="true"` sur l'équivalent visuel |
| `<time dateTime="">` et format ISO 8601 duration | Nouvelle | `PT${mm}M${ss}S` — différent de l'affichage humain `MM:SS` |
| `dialog` event `close` ≠ React `onClose` | Nouvelle | Escape ferme le dialog natif sans déclencher le state React — `addEventListener` nécessaire |
| `Math.max(0, n - 1)` pour plancher à zéro | Nouvelle | Pattern défensif dans les reducers |
| `box-shadow` multiple avec virgules | Révisée | Plusieurs déclarations séparées s'écrasent — virgule pour les combiner |
| `typeof window === "undefined"` guard | Nouvelle | Protection SSR pour localStorage — bonne pratique même en Vite |
| `htmlFor` redondant quand input est imbriqué | Nouvelle | Association implicite via imbrication — `htmlFor` inutile et signalé par le validateur |

### ⚠️ Notions faussement acquises détectées

- **`onSubmit` sur le bouton** — réflexe initial de mettre `onSubmit` sur `<button type="submit">` alors que cet événement n'existe que sur `<form>`. Corrigé après explication.

### 🔄 Étapes restantes

- Projet terminé et soumis sur Frontend Mentor ✅

### 📈 Évaluation de session

- **Points solides :** compréhension rapide de chaque erreur une fois expliquée ; autonomie sur les corrections simples (type, key, padStart) ; bon raisonnement sur le double-lecture lecteur d'écran (`sr-only` + `aria-hidden`)
- **Points fragiles :** `onSubmit` sur form vs bouton — confusion de placement ; mécanisme natif `<dialog>` + Escape non anticipé
- **Priorité pour la prochaine session :** démarrage prochain projet Frontend Mentor

### 💬 Notes de contexte

- Score 8/10 avec une seule erreur incompressible (inline styles pour preview dynamique) — résultat solide
- Dernière session sur le Pomodoro — projet complet, soumis, audité
- Session courte et efficace : uniquement de la correction de validation, pas de nouvelle feature

---

## Project Wrap-up — Pomodoro App

### Auto-évaluation initiale vs finale

| Notion | Kickoff | Observé en session |
|--------|---------|-------------------|
| Union types TypeScript | rouillé | Consolidé — discriminated unions appliqués sur TimerAction |
| Interfaces imbriquées | confiant | Confirmé — Settings, TimerState sans difficultés |
| useReducer | pas vu | Acquis — structure complète, actions typées, payload |
| Custom hooks | pas vu | Appliqué — useSettings encapsule useContext |
| useEffect + setInterval / clearInterval | rouillé | Consolidé — deux useEffect séparés, cleanup correct |
| useRef pour valeur mutable | rouillé | Appliqué — dialogRef sur l'élément dialog natif |
| SVG manipulé en React | pas vu | Acquis — stroke-dasharray, dashoffset, formule circumference |
| Context API | pas vu | Consolidé — Provider / useContext / hook custom compris |
| Typage des événements React | pas vu | Appliqué — React.ChangeEvent<HTMLInputElement> sur tous les inputs |
| cn() / clsx pour classes conditionnelles | pas vu | Consolidé — appliqué spontanément sur ModeButton |

### Points réellement consolidés sur ce projet

- `useReducer` avec discriminated union actions — compris et écrit de manière autonome en fin de projet
- Context API bout en bout — tuyauterie claire, pattern hook custom ancré
- `useEffect` à responsabilité unique — deux effets séparés, cleanup correct
- Pattern `draftSettings` pour état local modal vs état global
- SVG `stroke-dasharray` / `dashoffset` — formule mathématique comprise et appliquée

### Points fragiles persistants à surveiller sur le prochain projet

- Shallow copy du spread — automatisme pas encore solide sur objets imbriqués
- Reducers = fonctions pures, zéro side effect — réflexe à ancrer
- `onSubmit` sur `<form>` pas sur `<button>` — confusion rencontrée en toute fin de projet

---

## Session 2026-04-16 — localStorage + Web Notifications API + A11y radios custom

### ✅ Étapes accomplies

- Accessibilité clavier sur les boutons radio custom (font + couleur dans SettingsModal)
- Pattern `onKeyDown` sur le label pour simuler l'activation au clavier
- `stroke-linecap="round"` sur le `<circle>` SVG — extrémité arrondie comme la maquette
- `status: "idle"` ajouté dans `SET_MODE` et `RESET_DURATIONS` — changement de mode ou de durée remet le timer à zéro
- Police respective appliquée sur chaque label "Aa" via `style={{ fontFamily }}` inline
- Animation d'ouverture de la modal via `@starting-style` — opacity + translateY, sans JS
- A11y reportée au post Frontend Mentor (audit intégré à la plateforme)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| `<label>` focusable via `tabIndex={0}` | Nouvelle | Label avec `htmlFor` → clic sur le label active l'input associé |
| Space sur `<label>` ≠ Space sur `<button>` | Nouvelle | `<label>` ne simule pas de clic au clavier nativement — uniquement les `<button>` et `<a>` |
| `e.preventDefault()` + `e.currentTarget.click()` sur `onKeyDown` | Nouvelle | Pattern universel pour rendre un élément non-interactif activable au clavier |
| `opacity-0` peut sortir un élément du tab order | Nouvelle | Préférer `appearance-none` ou `sr-only` pour masquer un input tout en le gardant accessible |
| Arbre d'accessibilité DevTools ≠ état réel | Nouvelle | Le panneau Accessibility ne se rafraîchit pas toujours en temps réel sur les composants React contrôlés — tester avec NVDA ou le DOM Elements pour confirmer |

### ⚠️ Notions faussement acquises détectées

- **Space sur un label focusable** — croyait que `tabIndex={0}` sur un label suffisait pour l'activer au clavier. Non : seuls `<button>` et `<a>` ont ce comportement natif. Pour les autres éléments, `onKeyDown` + `e.currentTarget.click()` est nécessaire.

### 💡 Pattern à retenir — activer un élément custom au clavier

```tsx
// Sur n'importe quel élément focusable (label, div, span) qui doit réagir à Space/Enter :
onKeyDown={(e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault()       // empêche le comportement par défaut (scroll pour Space)
    e.currentTarget.click()  // simule un clic → déclenche onClick ou htmlFor
  }
}}
```

**Pourquoi `e.currentTarget.click()` et pas `e.target.click()` ?**
`currentTarget` = l'élément sur lequel le handler est posé (le label).
`target` = l'élément qui a reçu l'événement en premier (peut être un enfant).

---

## Session 2026-04-16 — localStorage + Web Notifications API

### ✅ Étapes accomplies

- Lazy initialization de `useState` dans `SettingsProvider` — lecture du localStorage au mount, fallback sur `DEFAULT_SETTINGS`
- `useEffect` de sauvegarde dans `SettingsProvider` — `JSON.stringify(settings)` à chaque changement
- `useEffect` au mount dans `Timer` — demande de permission via `Notification.requestPermission()` (pattern async dans useEffect)
- Notification OS déclenchée dans le `useEffect` `timeLeft === 0` — affiche la durée écoulée via `currentDuration`
- Variable `stateMode` renommée en `currentDuration` — nommage trompeur détecté et corrigé

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| Lazy initialization de `useState` | Nouvelle | Passer une fonction évite d'exécuter la lecture localStorage à chaque render |
| `JSON.stringify` / `JSON.parse` | Nouvelle | localStorage ne stocke que des strings — aller-retour obligatoire |
| `as Settings` — cast TypeScript sur `JSON.parse` | Nouvelle | `JSON.parse` retourne `any` — cast assumé, Zod pour valider proprement |
| `Notification.permission` — 3 états | Nouvelle | `"default"` / `"granted"` / `"denied"` — propriété globale navigateur |
| `Notification.requestPermission()` — promesse | Nouvelle | Async obligatoire, résultat lisible ensuite via `Notification.permission` |
| `async` interdit sur le callback `useEffect` | Nouvelle | `async` retourne une Promise — React attend une fonction cleanup ou `undefined` |
| Pattern : fonction `async` définie et appelée dans `useEffect` | Nouvelle | Seule façon correcte d'utiliser `await` dans un `useEffect` |
| `new Notification(title, { body })` | Nouvelle | Déclenche une notification OS native |

### ⚠️ Notions faussement acquises détectées

- **Reducer et side effects** — réflexe initial de mettre la demande de permission dans le reducer. Reducers = fonctions pures, zéro side effect.
- **`currentDuration` comme doublon de dépendance** — listée dans le tableau de dépendances alors qu'elle est dérivée de `settings.durations` et `state.mode`, déjà présents.

### 🔄 Étapes restantes

- Post Frontend Mentor + audit A11y intégré à la plateforme
- Vérifier build propre (zéro erreur TypeScript) avant le submit

### 📈 Évaluation de session

- **Points solides :** lazy init écrite sans aide après explication du pattern ; séparation des `useEffect` par responsabilité appliquée naturellement ; `JSON.parse` / `JSON.stringify` compris et appliqués correctement ; raisonnement UX autonome sur `status: "idle"` au changement de mode
- **Points fragiles :** contrainte `async` sur `useEffect` — pas connue, levée par explication ; réflexe reducer pour les side effects à surveiller
- **Priorité pour la prochaine session :** post Frontend Mentor + démarrage prochain projet

### 💬 Notes de contexte

- `@starting-style` découvert et appliqué — nouveauté CSS 2023/2024, remplace le JS pour animer l'apparition d'un `<dialog>`
- Projet considéré terminé — CSS polish, responsive, UX, features bonus (localStorage, notifications). A11y validée à la soumission FM
- Deux features committées ensemble en cours de session — à éviter, préférer `git add -p` pour séparer à l'avenir

---

## Session 2026-04-15 — RESET_DURATIONS + ModeSelector branché + bugs SVG + CSS presets

### ✅ Étapes accomplies

- `RESET_DURATIONS` — nouvelle action reducer, `useEffect` branché sur `settings.durations[state.mode]`, `stateMode` utilisé dans le body pour satisfaire ESLint
- `ModeSelector` intégré dans `Timer` (choix d'architecture délibéré), branché sur `SET_MODE`, `useState` local supprimé, `state.mode` passé en prop
- Bug rayon `CircularProgress` corrigé : rayon formule (120) ≠ rayon cercle (135)
- Bug formule offset corrigé : `totalDuration / timeLeft` → `timeLeft / totalDuration`
- Bug sens horaire corrigé : `scale(1 -1) translate(0 -300)` retiré du transform
- Clés de durées renommées en `"short break"` / `"long break"` (avec espaces) dans types, defaults, SettingsModal
- Bug `cn()` / `tailwind-merge` : classes `text-preset-*` écrasées car préfixe `text-` confondu avec utilitaires Tailwind → preset sorti du `cn()` dans ModeButton
- CSS presets refactorisé : classes `-mobile` supprimées, responsive via `@media` dans `index.css`, classes `-settings` ajoutées pour la modale
- Responsive SettingsModal corrigé

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| `tailwind-merge` merge les classes `text-*` custom | Nouvelle | Ne reconnaît pas les presets custom — les sort du `cn()` |
| `md:text-preset-X` génère `md\:text-preset-X` dans le DOM | Nouvelle | Incompatible avec les sélecteurs CSS custom — responsive via `@media` à la place |
| Architecture état partagé — remonter vs intégrer | Révisée | ModeSelector intégré dans Timer par choix délibéré et justifié |
| `stateMode` comme dépendance calculée hors `useEffect` | Consolidée | Satisfait ESLint sans ajouter `settings.durations` + `state.mode` comme dépendances séparées |
| Clés d'objet avec espaces — notation bracket obligatoire | Nouvelle | `durations["short break"]` et `{ ...obj, "short break": value }` |

### ⚠️ Notions faussement acquises détectées

- **`md:` avec classes custom** — croyait que le préfixe responsive Tailwind fonctionnait sur n'importe quelle classe. Il ne génère que des variantes pour les utilitaires Tailwind natifs.
- **Formule `dashoffset`** — a inversé `timeLeft / totalDuration` en `totalDuration / timeLeft` lors d'une correction, causant plusieurs tours de cercle.

### 🔄 Étapes restantes

- CSS timer (finitions visuelles)
- Animations (optionnel)
- A11y — vérification complète (focus, ARIA, sémantique)

### 📈 Évaluation de session

- **Points solides :** raisonnement architectural sur ModeSelector (a identifié le problème et justifié le choix) ; debugging autonome du `cn()` via DevTools ; compréhension du flux callback props
- **Points fragiles :** formule SVG `dashoffset` — a inversé deux fois ; réflexe de chercher au mauvais endroit (cherchait dans Timer quand le bug était dans SettingsModal)
- **Priorité pour la prochaine session :** finitions CSS timer + vérification A11y

### 💬 Notes de contexte

- Design system de la maquette imposait 20+ classes de presets — verbeux mais inévitable vu les métriques typographiques par fonte
- Architecture CSS presets custom incompatible avec `tailwind-merge` et préfixes responsive Tailwind — à anticiper sur le prochain projet
- `ModeSelector` dans `Timer` : choix d'architecture valide pour une SPA de cette taille, identifié et assumé

---

## 💡 À appliquer sur le prochain projet — Data-first vs Type-first

**Ce qu'on a fait ici (type-first) :**
```ts
// types.ts
type TimerMode = "pomodoro" | "shortBreak" | "longBreak"

// ModeSelector.tsx
const MODES: TimerMode[] = ["pomodoro", "shortBreak", "longBreak"]
```
Les valeurs sont définies à deux endroits — le type ET le tableau. Si on ajoute un mode, il faut modifier les deux.

**L'alternative (data-first) :**
```ts
// constants.ts — source de vérité unique
export const MODES = ["pomodoro", "shortBreak", "longBreak"] as const
export const APP_COLORS = ["red-400", "cyan-300", "purple-400"] as const
export const APP_FONTS = ["kumbh-sans", "roboto-slab", "space-mono"] as const

// types.ts — dérivés des données
type TimerMode = (typeof MODES)[number]
type AppColor = (typeof APP_COLORS)[number]
type AppFont = (typeof APP_FONTS)[number]
```
Une seule source de vérité — les types sont dérivés automatiquement des tableaux. Modifier une valeur = modifier à un seul endroit.

**`as const`** gèle le tableau — TypeScript le traite comme un tuple de valeurs littérales exactes plutôt qu'un `string[]`.
**`(typeof X)[number]`** extrait un union type depuis les valeurs du tableau.

---

## Session 2026-04-14 — SettingsModal contenu + SettingsProvider injection

### ✅ Étapes accomplies

- `draftSettings` — état local `useState<Settings>(settings)` dans `SettingsModal` pour isoler les modifications avant Apply
- 3 inputs `number` pour les durées (pomodoro, shortBreak, longBreak) avec double spread sur `durations`
- 3 boutons radio font (`kumbh-sans`, `roboto-slab`, `space-mono`) avec `has-checked:` Tailwind + `as AppFont`
- 3 boutons radio couleur (`red-400`, `cyan-300`, `purple-400`) avec `has-checked:` + `as AppColor`
- Bouton Apply `type="button"` — `setSettings(draftSettings)` + `onClose()`
- Aperçu live font/couleur sur le bouton Apply : `style={{ background, fontFamily }}` inline
- `useEffect` dans `SettingsProvider` : injection `dataset.font` + `style.setProperty("--app-color")` sur `document.documentElement`
- Suppression du `useEffect` vide sur `draftSettings`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| État local "draft" dans une modale | Nouvelle | Isoler les modifications avant confirmation — pattern courant |
| Double spread pour objet imbriqué | Nouvelle | `{ ...obj, nested: { ...obj.nested, key: value } }` — shallow copy oblige |
| Shallow copy vs deep copy (spread) | Nouvelle | Spread copie le premier niveau seulement — les objets imbriqués sont des références |
| `as AppFont` / `as AppColor` — cast TypeScript | Nouvelle | `e.target.value` est toujours `string` — cast nécessaire à la frontière DOM/TypeScript |
| `has-[:checked]:` / `has-checked:` Tailwind v4 | Nouvelle | Variant CSS pour styliser un ancêtre selon l'état d'un descendant |
| `document.documentElement.dataset.font` | Nouvelle | Injection d'attribut `data-*` sur `<html>` depuis JS |
| `style.setProperty("--app-color", value)` | Nouvelle | Injection d'une CSS custom property depuis JS |
| `type="button"` obligatoire dans un `<form>` | Nouvelle | Sans ça, le bouton est `type="submit"` par défaut → rechargement |

### ⚠️ Notions faussement acquises détectées

- **Shallow copy du spread** — ignorait que `{ ...obj }` ne copie pas les objets imbriqués. Gap réel, levé par expérimentation dans la console.
- **Nommage des variables** — confusion récurrente quand `settings`, `setSettings`, `draftSettings` coexistent. Règle retenue : préfixer l'état local avec `draft`.

### 🔄 Étapes restantes

- `useEffect` dans `Timer` — resetter `timeLeft` quand `settings.durations[state.mode]` change
- `ModeSelector` branché sur le reducer (`SET_MODE`)
- Vérification complète du flux : changer mode → timer reset → nouveau cycle

### 📈 Évaluation de session

- **Points solides :** raisonnement autonome sur état local vs global dans la modale ; structure des inputs radio correcte sans aide ; aperçu live trouvé et implémenté de manière autonome
- **Points fragiles :** shallow copy du spread — notion clé pas encore automatique ; cast TypeScript (`as Type`) encore inconnu
- **Priorité pour la prochaine session :** `useEffect` dans `Timer` pour sync durées + `ModeSelector` branché sur `SET_MODE`

### 💬 Notes de contexte

- `draftSettings` initialisé avec `settings` au mount — si la modale est fermée sans Apply, les modifications sont perdues (comportement voulu)
- Injection couleur via `style.setProperty` plutôt que sélecteurs CSS `[data-color]` — plus direct, même résultat
- Bouton Apply : aperçu live intentionnel — `fontFamily` mappé manuellement depuis `AppFont`, `background` via `var(--color-${draftSettings.color})`

## Session 2026-04-13 — useEffect + CircularProgress SVG + SettingsModal scaffold

### ✅ Étapes accomplies

- `useEffect` #1 : `setInterval` + early return + cleanup `clearInterval`
- `useEffect` #2 : détecte `timeLeft === 0` → dispatch `COMPLETE` avec `payload.duration`
- Action `COMPLETE` ajoutée dans `TimerAction` et le reducer
- `formatTime(seconds)` extraite hors composant — `Math.floor`, `%`, `padStart(2, "0")`
- Bug détecté et corrigé : durées stockées en minutes → conversion `* 60` à l'initialisation, dans `COMPLETE` et dans `totalDuration` de `CircularProgress`
- `CircularProgress.tsx` — SVG avec `viewBox`, `stroke-dasharray`, `stroke-dashoffset`, `transform="rotate(-90 150 150) scale(1 -1) translate(0 -300)"`, transition `stroke-dashoffset 1s linear`
- Formule `offset` corrigée : `circumference * (timeLeft / totalDuration)` — cercle vide au départ, plein à la fin (temps écoulé, pas temps restant)
- `stroke="var(--app-color)"` — cercle branché sur la CSS custom property
- `SettingsModal.tsx` — scaffold avec `<dialog>`, `useRef<HTMLDialogElement>`, `useEffect` sur `[isOpen]` pour `.showModal()` / `.close()`
- Bug CSS corrigé : Tailwind v4 écrasait `display: none` natif du `<dialog>` → réglé avec `dialog:not([open]) { display: none }` dans `index.css`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| `useEffect` retourne le cleanup, pas le side effect | Nouvelle | Confusion levée — le return est réservé au cleanup |
| Early return dans `useEffect` | Nouvelle | `if (status !== "running") return` — pas de else |
| `clearInterval` dans le cleanup | Nouvelle | React l'appelle automatiquement quand la dépendance change |
| Deux `useEffect` séparés — une responsabilité chacun | Nouvelle | Un sur `status`, un sur `timeLeft` |
| `padStart(2, "0")` | Nouvelle | Sorti sans aide |
| `payload` dans une action — les trois bouts | Nouvelle | Type / dispatch / reducer — c'est le dev qui tient les trois, pas automatique |
| SVG `viewBox` + CSS pour le sizing responsive | Nouvelle | Rayon fixe dans le code, taille d'affichage gérée par CSS |
| `stroke-dasharray` / `stroke-dashoffset` | Nouvelle | `dasharray` = périmètre entier, `dashoffset` = portion cachée |
| `transform="rotate(-90) scale(1 -1)"` sur circle SVG | Nouvelle | Démarre à 12h, sens horaire |
| `style={{ transition }}` sur un élément SVG | Nouvelle | Doit être sur l'élément qui change, pas sur le `<svg>` parent |
| `<dialog>` + `.showModal()` / `.close()` via `useRef` | Nouvelle | Contrôle impératif de l'élément natif depuis React |
| `dialog:not([open])` en CSS | Nouvelle | Nécessaire quand Tailwind écrase le `display: none` natif |

### ⚠️ Notions faussement acquises détectées

- **Ce que `useEffect` retourne** — pensait que `useEffect` retournait le tick. Le return est réservé au cleanup.
- **`payload` comme magie automatique** — pensait que `action.payload.duration` se branchait automatiquement sur les settings. C'est le dev qui passe la valeur dans le `dispatch`.
- **Transition sur `<svg>` vs `<circle>`** — réflexe de mettre la transition sur le conteneur SVG. Elle doit être sur l'élément dont la propriété change.

### 🔄 Étapes restantes

- `SettingsModal` — contenu : inputs durées, sélection font/couleur, bouton Apply
- Injection `data-font` / `data-color` dans `SettingsProvider` via `useEffect`
- `ModeSelector` branché sur le reducer (`SET_MODE`)

### 📈 Évaluation de session

- **Points solides :** raisonnement autonome sur `COMPLETE` vs `PAUSE` ; `formatTime` sans aide ; détection du bug minutes/secondes avant que ça cause des problèmes visibles ; architecture `<dialog>` choisie délibérément sur `<div>`
- **Points fragiles :** `payload` comme convention pas encore automatique ; confusion initiale sur ce que `useEffect` retourne
- **Priorité pour la prochaine session :** contenu `SettingsModal` — inputs durées (`<input type="number">`), sélection font/couleur, bouton Apply qui appelle `setSettings`

### 💬 Notes de contexte

- `CircularProgress` reçoit `timeLeft` et `totalDuration` en secondes — conversion faite dans `Timer`
- `stroke="var(--app-color)"` — découplé des settings React, suit la CSS custom property
- `dialog:not([open])` ajouté manuellement dans `index.css` — Tailwind v4 reset écrase le comportement natif

## Session 2026-04-13 — useEffect + setInterval + formatTime + COMPLETE

### ✅ Étapes accomplies

- `useEffect` #1 : `setInterval` qui dispatch `TICK` chaque seconde, conditionné à `status === "running"`, avec early return et cleanup `clearInterval`
- `useEffect` #2 : détecte `timeLeft === 0` et dispatch `COMPLETE` avec `payload.duration`
- Action `COMPLETE` ajoutée dans `TimerAction` et dans le reducer — reset `status: "idle"` + `timeLeft` à la durée du mode actuel
- `formatTime(seconds)` extraite hors composant — `Math.floor`, `%`, `padStart(2, "0")`
- Timer vérifié dans le navigateur : décompte, pause, reprise, fin de cycle → retour à l'état initial

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| `useEffect` retourne une fonction de nettoyage | Nouvelle | Distinct du side effect produit à l'intérieur — confusion initiale levée |
| Side effect vs valeur de retour | Nouvelle | `setInterval` est un effet de bord, pas ce que `useEffect` retourne |
| Early return dans `useEffect` | Nouvelle | `if (status !== "running") return` — pas de else nécessaire |
| `clearInterval` dans le cleanup | Nouvelle | Appelé automatiquement par React quand `status` change |
| Deux `useEffect` séparés — une responsabilité chacun | Nouvelle | Un réagit à `status`, l'autre à `timeLeft` |
| `padStart(2, "0")` | Nouvelle | Sorti sans aide après avoir trouvé `Math.floor` et `%` |
| `payload` dans une action — les trois bouts | Nouvelle | Type / dispatch / reducer : c'est le développeur qui tient les trois — pas automatique |
| `settings.durations[state.mode]` vs `initialState.timeLeft` | Nouvelle | `initialState` est toujours `"pomodoro"` — la valeur dynamique doit venir de `state.mode` |

### ⚠️ Notions faussement acquises détectées

- **Ce que `useEffect` retourne** — pensait que `useEffect` retournait le tick. Gap levé : le return du `useEffect` est réservé au cleanup. Le tick est un side effect produit à l'intérieur.
- **`payload` comme magie automatique** — pensait que `action.payload.duration` se branchait automatiquement sur `DEFAULT_SETTINGS`. Levé : c'est le développeur qui passe la valeur dans le `dispatch`, le reducer reçoit juste un nombre.

### 🔄 Étapes restantes

- `CircularProgress` — SVG avec `stroke-dasharray` / `stroke-dashoffset`
- `SettingsModal`
- Injection `data-font` / `data-color` dans `SettingsProvider` via `useEffect`

### 📈 Évaluation de session

- **Points solides :** raisonnement autonome sur `COMPLETE` vs `PAUSE` (sémantique distincte, extensibilité future) ; `formatTime` écrite sans aide après avoir trouvé les deux opérations ; structure deux `useEffect` séparés comprise et appliquée
- **Points fragiles :** confusion initiale sur ce que `useEffect` retourne — notion clé pas encore automatique ; `payload` comme convention (pas magie) nécessitait explication explicite
- **Priorité pour la prochaine session :** `CircularProgress` — SVG `stroke-dasharray` / `stroke-dashoffset`, calcul du périmètre

### 💬 Notes de contexte

- `formatTime` sortie hors composant — fonction pure, aucune dépendance au state
- `COMPLETE` a un payload `{ duration: number }` — décision délibérée pour ne pas coupler le reducer aux settings
- Label du bouton en majuscules confirmé par la maquette — pas du debug

## Session 2026-04-12 — useReducer + TimerState + scaffolding Timer

### ✅ Étapes accomplies

- Compris la tuyauterie Context de bout en bout : `DEFAULT_SETTINGS` → `useState` dans `SettingsProvider` → `useContext` → `useSettings()` → disponible dans `Timer`
- `TimerState` interface écrite : `mode`, `timeLeft`, `status`
- `TimerAction` union type écrit : `START`, `PAUSE`, `RESTART`, `TICK`, `SET_MODE`
- `timerReducer` écrit hors composant avec switch/case correct
- `initialState` branché dans `useReducer`
- `handleButtonClick` — fonction qui retourne l'action selon le status, typée `TimerState["status"]` → `TimerAction`
- Bouton avec `dispatch(handleButtonClick(state.status))` — label dérivé via `.type`
- Scaffold JSX du Timer : cercle, affichage `timeLeft`, bouton START/PAUSE/RESTART fonctionnel
- Transitions d'état vérifiées dans le navigateur : idle → running → paused → running

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| `useReducer` — structure complète | Nouvelle | State / Action / Reducer / dispatch — compris après exemple neutre |
| Union type discriminé pour les actions | Nouvelle | `\| { type: "START" } \| { type: "SET_MODE"; payload: ... }` |
| `status: "idle" \| "running" \| "paused"` vs deux booléens | Nouvelle | 3 états mutuellement exclusifs → un seul champ, pas deux booléens |
| Reducer hors composant | Nouvelle | Fonction pure, pas de dépendance externe, pas recréée à chaque render |
| Typage `TimerState["status"]` pour un paramètre | Nouvelle | Accès à un champ d'interface comme type — évite de dupliquer le union |
| `.type` sur un objet action | Nouvelle | `handleButtonClick(state.status).type` pour extraire la string du label |
| État dérivé dans le JSX | Révisée | Label du bouton dérivé depuis state, pas stocké séparément |

### ⚠️ Notions faussement acquises détectées

- **Syntaxe du return dans le reducer** — confusion initiale : `return { ...state, state.status === "running" }` au lieu de `return { ...state, status: "running" }`. La différence entre *lire* une valeur et *assigner* une clé dans un objet n'était pas encore automatique.
- **`dispatch` vs `setSettings`** — croyait que `dispatch` pouvait modifier les settings du Context. Distinction état local (reducer) vs état global (Context) à consolider.

### 🔄 Étapes restantes

- `useEffect` + `setInterval` pour le tick réel (nettoyage, stale closures, `useRef`)
- Formater `timeLeft` en `MM:SS`
- `CircularProgress` — SVG avec `stroke-dasharray` / `stroke-dashoffset`
- `SettingsModal`
- Injection `data-font` / `data-color` dans `SettingsProvider` via `useEffect`

### 📈 Évaluation de session

- **Points solides :** raisonnement autonome sur `status` à 3 valeurs vs deux booléens ; `handleButtonClick` typée et structurée sans aide directe ; compréhension de la tuyauterie Context reconstruite par lui-même
- **Points fragiles :** syntaxe du return reducer pas encore automatique ; confusion dispatch/setSettings révèle que la frontière local/global n'est pas encore solidement ancrée
- **Priorité pour la prochaine session :** `useEffect` + `setInterval` + `clearInterval` — le pattern le plus délicat du projet

### 💬 Notes de contexte

- Grosse session de découverte pure : Context + useReducer + discriminated unions — tout nouveau en une session
- `RESTART` ajouté comme action distincte dans `TimerAction` (même comportement que `START` mais label différent — décision à reconsidérer si on veut simplifier)
- `handleButtonClick` vit dans le composant avant le return — pattern à retenir pour les handlers qui calculent avant de dispatcher

---

## Session 2026-04-10 — Context API + ModeSelector + layout

### ✅ Étapes accomplies

- `SettingsProvider.tsx` + `SettingsContext.ts` + `useSettings` branchés et compris
- `ModeButton.tsx` — props typées, `cn()` utilisé, `setMode(mode: TimerMode)` correct
- `ModeSelector.tsx` — `useState<TimerMode>`, map sur `MODES`, `isActive={modeItem === mode}` dérivé sans state séparé
- `MODES` sorti hors du composant (constante module-level)
- Layout `App.tsx` structuré : `header`, `nav`, `main`, `footer`
- Fonctionnement vérifié dans le navigateur — clic change l'état actif visuellement

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| Context API bout en bout | Nouvelle | Compris après démonstration en live — Provider/useContext/hook |
| `useContext` + hook custom `useSettings` | Nouvelle | Encapsule la vérification `if (!context)` |
| `isActive` dérivé depuis state existant | Nouvelle | `modeItem === mode` — pas besoin d'un deuxième state |
| `cn()` pour classes conditionnelles | Nouvelle | Appliqué correctement sur `ModeButton` |
| Types TypeScript effacés au runtime | Nouvelle | On ne peut pas itérer sur un type — tableau nécessaire |
| Éléments sémantiques HTML comme conteneurs | Révisée | `header`, `nav`, `main`, `footer` — pas de nœud DOM supplémentaire pour `Provider` |

### ⚠️ Notions faussement acquises détectées

- **État dérivé vs state séparé** — réflexe initial de créer `useState<boolean>` pour `isActive` alors que la valeur se calcule depuis `mode` existant. Pattern à surveiller.
- **Types TypeScript au runtime** — pensait pouvoir itérer sur un type union. Les types sont effacés à la compilation.

### 🔄 Étapes restantes

- Composant `Timer` — squelette + `useReducer` pour l'état du timer
- `TimerDisplay` — affichage du temps restant
- `CircularProgress` — SVG
- `SettingsModal`
- Injection `data-font` / `data-color` dans `SettingsProvider` via `useEffect`

### 📈 Évaluation de session

- **Points solides :** raisonnement autonome sur `isActive` dérivé (après correction) ; `cn()` appliqué sans aide ; architecture composants cohérente
- **Points fragiles :** Context encore flou conceptuellement au début — nécessite de voir en action pour ancrer ; réflexe de créer trop de states séparés
- **Priorité pour la prochaine session :** composant `Timer` + introduction `useReducer`

### 💬 Notes de contexte

- `SettingsProvider` ne génère aucun nœud DOM — transparent visuellement
- `data-font` ajouté manuellement dans `index.html` pour le développement — sera injecté dynamiquement par `SettingsProvider` via `useEffect` plus tard
- `MODES` déclaré hors composant — constante statique, pas besoin d'être recréée à chaque render

---

### 🧭 Ancre conceptuelle — pourquoi on fait tout ça

**Le problème concret :**
L'utilisateur peut changer la couleur, la police et les durées du timer dans une modal settings. Ces préférences doivent être connues par plusieurs composants en même temps — le timer, la modal, et l'app entière pour injecter la bonne font et la bonne couleur.

**Qui a besoin de lire les settings ?**
- Le timer (pour connaître les durées)
- L'app entière (pour appliquer `data-font` et `data-color` sur `<html>`)
- La modal settings (pour afficher les valeurs actuelles)

**Qui peut les modifier ?**
- Uniquement la modal settings — via `setSettings`

**Pourquoi pas des props ?**
Parce que `App` devrait passer `settings` à `Timer`, qui le passerait à ses enfants, qui le passeraient aux leurs. Trop de chaîne — Context résout ça.

---

**Les 3 pièces du Context et leur rôle :**

| Fichier | Rôle | Analogie |
|---------|------|----------|
| `Settings` (interface TypeScript) | Décrit la **forme** des données — uniquement à la compilation | Le plan d'un casier |
| `AppContext` (`SettingsContext.ts`) | Le **canal** React — existe au runtime, React l'écoute pour re-rendre | Le casier lui-même |
| `SettingsProvider.tsx` | Le **détenteur** — stocke l'état réel avec `useState`, le distribue via le Provider | Le gardien du casier |

**Comment un composant consomme le Context :**
```
SettingsProvider (stocke + distribue)
  └── App
        ├── Timer → useContext(AppContext) → lit settings.durations
        └── SettingsModal → useContext(AppContext) → lit ET modifie via setSettings
```

**Prochaine étape concrète :** créer `useSettings` — un hook custom qui encapsule `useContext(AppContext)` pour ne pas répéter la vérification `if (!context)` partout.

---

### 🔬 Dissection — ce qui vient de TypeScript vs ce qui vient de Context

**Context en JS pur — c'est juste ça :**
```js
// 1. Créer le canal
const AppContext = createContext()

// 2. Le Provider — détient et distribue l'état
function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  return <AppContext.Provider value={{ settings, setSettings }}>{children}</AppContext.Provider>
}

// 3. Le hook — lire le canal
function useSettings() {
  return useContext(AppContext)
}
```

**Ce que TypeScript ajoute par-dessus :**

| Ce qu'on a écrit | Pourquoi — TypeScript ou Context ? |
|---|---|
| `interface SettingsContextType { ... }` | **TypeScript** — décrit la forme de ce que le canal transporte |
| `createContext<SettingsContextType \| undefined>` | **TypeScript** — type générique sur le canal |
| `(undefined)` comme valeur initiale | **Context** — valeur hors Provider ; `\| undefined` dans le type en découle |
| `if (!context) throw new Error(...)` | **TypeScript** — nécessaire parce que `undefined` est possible selon le type |
| `useState<Settings>(DEFAULT_SETTINGS)` | **TypeScript** — type explicite sur le state |
| `{ children }: { children: React.ReactNode }` | **TypeScript** — typage des props du Provider |

**Ce que ça veut dire concrètement :**
La moitié de la verbosité vient de TypeScript qui rend explicite ce que JS laisse implicite. Le mécanisme Context lui-même est simple — 3 blocs : créer, distribuer, lire.

---

## Session 2026-04-09 — Scaffold + types + CSS base

### ✅ Étapes accomplies

- Scaffold Vite React TypeScript, Tailwind v4 installé et vérifié dans `package.json`
- Nettoyage immédiat : fichiers template Vite supprimés, `App.css` vidé
- `clsx` + `tailwind-merge` installés, `cn()` créé dans `src/lib/utils.ts`
- Structure de dossiers : `components/`, `hooks/`, `lib/`, `utils/`, `types/`
- `src/types/types.ts` : `TimerMode`, `AppColor`, `AppFont`, `Settings`
- `src/utils/defaults.ts` : `DEFAULT_SETTINGS` typé avec `: Settings`
- `index.css` : 18 text-presets (6 × 3 fonts) via sélecteurs `[data-font="..."]`
- `AppFont` mis à jour avec les valeurs kebab-case cohérentes avec les `data-font`
- 2 commits propres : `feat(types)` et `feat(css)`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
|--------|--------|-------------|
| `Record<TimerMode, number>` | Nouvelle | Compris et appliqué — objet avec toutes les clés du type |
| `type` union | Révisée | Syntaxe retrouvée sans aide |
| Interface TypeScript imbriquée | Consolidée | `Settings` construit avec raisonnement autonome |
| `import type` | Nouvelle | Utilisé spontanément dans `defaults.ts` |
| Sélecteur `[data-font="..."]` + cascade CSS | Nouvelle | Pattern compris — une seule ligne JS change tout |
| `dataset.font` pour injection dynamique | Nouvelle | Compris le mécanisme, pas encore implémenté |
| `cn()` / `clsx` + `twMerge` | Nouvelle | Cherché et compris de manière autonome |
| Convention de nommage `data-*` : kebab-case minuscules | Nouvelle | Incohérence détectée et corrigée |

### ⚠️ Notions faussement acquises détectées

- **`Record<K, V>` vs valeur unique** — confusion initiale entre stocker *toutes* les options (`Record`) et stocker la valeur *sélectionnée* (type simple). Résolu après explication du cas concret `color: AppColor` vs `durations: Record<TimerMode, number>`.

### 🔄 Étapes restantes

- Implémenter le Context API pour les settings (injection `data-font` et `data-color` sur `<html>`)
- Construire le composant `App.tsx` / layout principal
- `useReducer` pour l'état du timer
- Composant timer + circular progress bar SVG

### 📈 Évaluation de session

- **Points solides :** raisonnement architectural autonome (qui stocke quoi, pourquoi `Record` ici et pas là) ; `cn()` cherché et compris sans aide ; cohérence des conventions nommage repérée et corrigée
- **Points fragiles :** `Record` vs type simple — gap réel, résolu mais à surveiller ; confusion initiale sur la portée de `cn()` (voulu l'appliquer là où une variable CSS est meilleure)
- **Priorité pour la prochaine session :** Context API pour les settings + layout principal

### 💬 Notes de contexte

- Pattern `[data-font]` + `dataset.font` retenu pour les fonts ET les couleurs — une décision architecturale à appliquer dans le Context
- `AppFont` = kebab-case pour correspondre aux attributs HTML (`"kumbh-sans"`, `"roboto-slab"`, `"space-mono"`)
- `AppColor` = suffixe court (`"red-400"`) — construction de la string CSS au moment de l'injection : `var(--color-${color})`

---

## Project Kickoff — 2026-04-09

### Contexte de départ

Projet entamé après le Galleria Slideshow (12 sessions, score FM 7.7, audit 3.4/5).
Stack retenue : **React 19 + Vite + TypeScript + Tailwind CSS v4**.
Focus déclaré : **TypeScript** — approfondir au-delà des interfaces de base.

---

## Socle d'exigence — ce qui est attendu sur CE projet

Ce sont les standards minimaux, non-négociables dès la première session. Pas des objectifs d'apprentissage — des habitudes à intégrer comme réflexes.

### Commits (priorité 1 du rapport Galleria)

- Scopes en minuscules : `feat(timer):` pas `feat(Timer):`
- Types corrects : `fix` = comportement cassé réparé / `refactor` = restructuration sans changement / `feat` = nouvelle capacité / `chore` = nettoyage
- Pas de WIP dans les messages de commit
- Pas de `!` de breaking change hors contexte

### Démarrage de projet (priorité 2 du rapport Galleria)

- Supprimer immédiatement après scaffold : `react.svg`, `vite.svg`, contenu de `App.css`
- Vérifier que `tailwindcss` est bien dans `package.json` (pas seulement installé globalement)

### Classes Tailwind (priorité 3 du rapport Galleria)

- Au-delà de ~5-6 classes utilitaires : utiliser `cn()` avec groupes logiques
- Zéro ligne de 150 chars de classes sur une seule ligne

### TypeScript — socle minimal

- Zéro `any` — si bloqué, utiliser `unknown` et caster proprement
- Tout état `useState` a un type explicite : `useState<TimerMode>("pomodoro")`
- Tout paramètre de fonction est typé, y compris les callbacks
- Les fonctions qui retournent quelque chose ont un type de retour explicite

### Conventions de nommage

Identifié dans l'audit Galleria : fait par habitude, pas par règle consciente. Voici les règles précises pour cette stack.

| Ce qu'on nomme         | Convention                                          | Exemples                                   |
| ---------------------- | --------------------------------------------------- | ------------------------------------------ |
| Composant React        | `PascalCase`                                        | `Timer`, `SettingsModal`, `CircularBar`    |
| Fichier de composant   | `PascalCase.tsx` — **doit correspondre à l'export** | `Timer.tsx` exporte `function Timer()`     |
| Hook custom            | `camelCase` préfixé `use`                           | `useTimer`, `useSettings`                  |
| Fichier de hook        | `camelCase.ts`                                      | `useTimer.ts`                              |
| Fichier utilitaire     | `camelCase.ts`                                      | `formatTime.ts`, `generatePath.ts`         |
| Fichier de types       | `camelCase.ts` ou `types.ts`                        | `types.ts`, `timerTypes.ts`                |
| Fonction / variable    | `camelCase`                                         | `handleStart`, `timeLeft`, `isRunning`     |
| Constante module-level | `UPPER_SNAKE_CASE`                                  | `DEFAULT_DURATIONS`, `LONG_BREAK_DURATION` |
| Interface / Type TS    | `PascalCase`                                        | `TimerMode`, `Settings`, `AppColor`        |
| Prop booléenne         | préfixe `is` / `has` / `on`                         | `isRunning`, `hasError`, `onClose`         |

**Règle à retenir par-dessus tout :** le nom du fichier = le nom de l'export par défaut. Toujours. Si le fichier s'appelle `Timer.tsx`, la fonction exportée s'appelle `Timer`.

**Fragile à surveiller (observé sur Galleria) :** `Articles.tsx` exportait `function Article()` — incohérence fichier/export. Et `"Progession-bar"` (faute de frappe dans un className). Les classNames sont du texte libre — le compilateur ne détecte pas les fautes.

---

## Axes d'apprentissage TypeScript — focus de ce projet

### Axe 1 — Union types et discriminated unions

Le Pomodoro a 3 modes (`pomodoro | shortBreak | longBreak`). C'est le terrain idéal pour ancrer les union types et comprendre quand un discriminated union apporte de la sécurité.

```ts
// À ancrer sur ce projet :
type TimerMode = "pomodoro" | "shortBreak" | "longBreak";
// vs enum — quand choisir l'un ou l'autre ?
```

**Fragile à surveiller :** tendance à hardcoder les valeurs de mode plutôt qu'à centraliser le type.

### Axe 2 — Interfaces pour les objets de config

Les settings (durées, couleur, police) sont un objet structuré — occasion naturelle de pratiquer des interfaces imbriquées et l'usage de `Readonly<>`.

```ts
interface Settings {
  durations: Record<TimerMode, number>;
  color: AppColor;
  font: AppFont;
}
```

**Fragile à surveiller :** confondre interface de composant (props) et type de données (état global).

### Axe 3 — Types des événements React

Les inputs de la modal settings (`<input type="range">`, `<input type="radio">`) génèrent des `React.ChangeEvent<HTMLInputElement>`. Occasion de typer correctement les handlers au lieu de laisser l'inférence faire le travail.

**Fragile à surveiller :** écrire `onChange={(e) => ...}` sans typer `e` explicitement.

### Axe 4 — Hooks typés : useReducer pour l'état du timer

L'état du timer (mode actif, temps restant, running/paused) est un bon cas pour `useReducer` plutôt que plusieurs `useState`. Occasion d'introduire un type d'action discriminé.

```ts
type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "TICK" }
  | { type: "SWITCH_MODE"; payload: TimerMode };
```

**Fragile à surveiller :** réflexe de multiplier les `useState` quand l'état est interdépendant.

### Axe 5 — Custom hook avec type de retour explicite

Extraire la logique du timer dans un `useTimer()` custom hook — et typer son retour explicitement.

```ts
function useTimer(): {
  timeLeft: number
  isRunning: boolean
  mode: TimerMode
  start: () => void
  pause: () => void
  reset: () => void
} { ... }
```

**Fragile à surveiller :** laisser TypeScript inférer le retour du hook sans le déclarer.

---

## Notions techniques à surveiller (hors TypeScript)

### useEffect + setInterval

Le timer repose sur `setInterval` dans un `useEffect`. Pattern critique où les stale closures causent des bugs silencieux.

- `clearInterval` dans le return du `useEffect`
- `useRef` pour stocker l'ID de l'intervalle
- Tableau de dépendances correct

**Fragile à surveiller :** effet qui ne se nettoie pas → fuite mémoire + comportement imprévisible.

### SVG circular progress bar

Nécessite de comprendre `stroke-dasharray` et `stroke-dashoffset` — calcul mathématique du périmètre du cercle.

```
circumference = 2 * π * radius
offset = circumference * (1 - progress)
```

**Fragile à surveiller :** hardcoder les valeurs du SVG au lieu de les calculer dynamiquement.

### Modal settings — état global vs local

Les settings (couleur, police, durées) doivent être accessibles depuis plusieurs composants. Décision à prendre : Context API ou prop drilling ?

**Fragile à surveiller :** prop drilling qui devient ingérable, ou Context utilisé sans comprendre le re-render qu'il implique.

---

## Auto-évaluation kickoff — à remplir

> Réponds pour chaque notion : **confiant / rouillé / pas vu**

| Notion                                          | Auto-évaluation |
| ----------------------------------------------- | --------------- |
| Union types TypeScript                          | rouillé         |
| Interfaces imbriquées                           | confiant        |
| useReducer                                      | pas vu          |
| Custom hooks                                    | pas vu          |
| useEffect + setInterval / clearInterval         | rouillé         |
| useRef pour valeur mutable                      | rouillé         |
| SVG manipulé en React                           | pas vu          |
| Context API                                     | pas vu          |
| Typage des événements React (ChangeEvent, etc.) | pas vu          |
| cn() / clsx pour classes conditionnelles        | pas vu          |

---

<!-- Les sessions s'ajoutent ici au fur et à mesure, les plus récentes en tête -->
