## Project Wrap-up — 2026-05-28 — Memory Game

### 🏁 Score final : 7.2/10 (7.7 sans malus tests)

### 🗺️ Auto-évaluation : avant vs réalité

| # | Notion | Auto-éval initiale | Réalité observée |
|---|---|---|---|
| 1 | Zustand — store, actions, middleware | jamais utilisé | Maîtrisé — create, set/get, persist, partialize, migrate, useShallow |
| 2 | setInterval dans useEffect | syntaxe à revoir | Consolidé — timer, cleanup, isRunning comme signal |
| 3 | TypeScript discriminated unions | à voir | Appliqué — `phase`, `GameConfig | null`, `ReturnType<typeof setTimeout>` |
| 4 | Fisher-Yates shuffle | aucune idée | Implémenté de façon autonome |
| 5 | React Router | réflexes pas certitudes | Consolidé — navigate, routing, navigation guards |
| 6 | useMemo | ça devrait aller | **Faussement acquis** — ajouté par réflexe sans vérifier la stabilité des dépendances |
| 7 | Grid responsive Tailwind | pas de soucis | Confirmé |
| 8 | Focus trap / dialog natif | dialog gère auto | **Faussement acquis** — focus trap, aria-modal, aria-labelledby, retour de focus : tout était à apprendre |
| 9 | cn() avec notation objet | syntaxe à revoir | Consolidé |

### 🆕 Notions non prévues au kickoff, acquises en cours de projet

- Race condition `setTimeout` / reset de state
- `useRef` comme mount flag — guard d'initialisation dans un `useEffect`
- Race condition React Scheduler (resetGame + navigate non-déterministe)
- `persist` Zustand — versioning, migration, partialize explicite
- Error Boundary — composant classe, getDerivedStateFromError
- `useShallow` Zustand — pourquoi nécessaire même pour les sélecteurs d'actions
- `onCancel` sur `<dialog>` natif — Échap désynchronise React sans preventDefault
- `disabled:pointer-events-none` Tailwind

### ⚠️ Points fragiles à surveiller sur le prochain projet

- `useMemo` — vérifier la stabilité des dépendances avant d'ajouter
- `key` dans les composants extraits — toujours sur le composant dans le `.map()`, pas à l'intérieur
- Localisation du code dans l'arbre de composants — confusion récurrente entre où vivent les refs, les handlers, et les appels

### 💬 Décision de clôture

Tests non implémentés — décision délibérée. Le store Zustand avec timers et side effects est un contexte trop complexe pour un premier contact avec Vitest. À reprendre sur un projet plus simple. Score potentiel avec tests : ~8.5.

---

## Session 2026-05-28 — Passe de corrections Frontend Mentor (11 points)

### ✅ Étapes accomplies

- **Bug hauteur GameBoard** : marges réduites (`mt-25` → `mt-21`, `md:p-16.5` → `md:py-14`, `mb-20 md:pb-21.5` → `mb-18`)
- **`checkMatch` non-null assertions** : `!` supprimés, guard `if (!tile1 || !tile2) return` ajouté
- **`flipTile` race condition** : `flippedIdsState` extrait avant `set`, utilisé dans `set` et dans le `if`
- **`partialize` champs explicites** : spread supprimé, 8 champs listés + `as unknown as GameStore`
- **`useEffect` init + `useRef` mount flag** : bug plateau aléatoire diagnostiqué (React Scheduler non-déterministe entre `resetGame` et `navigate`), corrigé via `hasInitialized`
- **`iconUtils.ts`** : `icon.tsx` renommé, extension `.tsx` → `.ts`
- **A11y bouton Menu** : `aria-expanded`, `aria-controls="menuModal"`, focus management via `menuButtonRef`
- **`tick` dans deps timer** : ajouté au tableau de dépendances du `useEffect` setInterval
- **`useShallow` sélecteurs Zustand** : 15 subscriptions → 2 blocs groupés
- **`resetGame` timeoutId** : `timeoutId: null` ajouté dans le `set` après `clearTimeout`
- **`GameOverModal` guard** : `topPlayer = rankedPlayers[0]`, `if (!topPlayer) return null` avant le `filter`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `useRef` comme mount flag | Nouvelle | `hasInitialized.current` — survit aux re-renders, se réinitialise à l'unmount |
| Race condition React Scheduler | Nouvelle | `resetGame()` + `navigate()` dans le même handler — ordre d'exécution non-déterministe |
| `useShallow` Zustand — pourquoi nécessaire même pour les actions | Nouvelle | Sans `useShallow`, le sélecteur retourne un nouvel objet à chaque render → boucle infinie |
| `as unknown as GameStore` — double cast TypeScript | Révisée | Escape hatch quand le type du middleware est trop strict |
| `aria-expanded` + `aria-controls` | Nouvelle | `aria-expanded` indique l'état ouvert/fermé, `aria-controls` pointe vers l'id de l'élément contrôlé |
| Focus management — retour de focus après fermeture modale | Nouvelle | `useRef<HTMLButtonElement>` + `.focus()` dans les handlers de fermeture |
| Guard clauses + early return | Révisée | Pattern général — sortir tôt avant la logique principale |

### ⚠️ Notions faussement acquises détectées

- **`useShallow` nécessaire pour les actions** — tendance à penser que les actions stables n'en ont pas besoin. Faux : c'est la référence de l'objet retourné par le sélecteur qui compte, pas le contenu.
- **Où placer le code de focus** — confusion entre Header, GameBoard et MenuModal. La ref vit là où le composant est monté (GameBoard), le `.focus()` s'appelle là où la fermeture est déclenchée (GameBoard), la ref est attachée là où le bouton est rendu (Header via prop).

### 🔄 Étapes restantes

- **Tests game logic** — `checkMatch`, `flipTile`, `generateBoard` avec Vitest (P0, ~4h — session dédiée)
- `useEffect` deps + ESLint `react-hooks/exhaustive-deps` (P1, ~1h)
- Self-host Google Fonts via fontsource (P1, ~30min)
- `aria-live="polite"` pour les annonces game events (nice-to-have)
- `ErrorBoundary` sans logging prod (nice-to-have)

### 📈 Évaluation de session

- **Score Frontend Mentor : 7.2/10** (7.7 sans malus tests)
- **Points solides :** Diagnostic du bug plateau raisonné de façon autonome après explication ; guards écrits correctement du premier coup ; `useShallow` appliqué après la boucle infinie
- **Points fragiles :** Localisation du code dans l'arbre de composants — confusion récurrente Header/GameBoard/MenuModal ; `useShallow` sur les actions pas intuitif
- **Priorité pour la prochaine session :** Tests game logic — Vitest, nouvelle stack, session dédiée

### 💬 Notes de contexte

- Session orientée corrections review Frontend Mentor — 11 points traités
- Bug plateau aléatoire causé par `useEffect` deps + React Scheduler : diagnostic collaboratif, cause profonde bien comprise après discussion
- `useRef` mount flag : notion nouvelle mais bien ancrée grâce au contexte concret du bug

---

## Session 2026-05-27 — Audit complet : 3 blockers + 7 code quality + mineurs

### ✅ Étapes accomplies

- **Bug 1 — Race condition `checkMatch`** : `timeoutId: ReturnType<typeof setTimeout> | null` ajouté au store, `clearTimeout` dans `startGame()` et `resetGame()`
- **Bug 3 — Navigation directe `/game`** : guard `if (!config) { navigate("/"); return; }` dans le `useEffect` de `GameBoard`
- **Bug 2 — Touche Échap désynchronise l'état React** : `onCancel={(e) => { e.preventDefault(); onResume/onRestart(); }}` sur les deux `<dialog>`
- **`useMemo` inefficace** : supprimé — remplacé par ternaire `phase === "game-over" ? [...].sort() : []`
- **`partialize` opaque** : commentaire explicite listant les champs sérialisés
- **`TileProps.onFlip` signature trompeuse** : `(id: string) => void` → `() => void`
- **`ICON_MAP` mensonge de type** : `Record<string, LucideIcon | undefined>` + guard `Icon ? <Icon /> : null`
- **Répétition boutons radio** : composant `RadioOptions` extrait, `StartScreen` réduit
- **Mineurs** : `tiles &&` supprimé, `rounded-xl` ajouté sur `GameOverModal`, `<main>` validé comme correct

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `ReturnType<typeof setTimeout>` — utilitaire TypeScript | Nouvelle | Extrait le type de retour d'une fonction — adaptatif selon l'environnement |
| `clearTimeout(id)` — annuler un timeout planifié | Nouvelle | Symétrique à `clearInterval` — nécessite de stocker la ref du timeout |
| Race condition `setTimeout` / reset de state | Nouvelle | Le timeout survit au reset — ne sait pas que le contexte a changé |
| `onCancel` sur `<dialog>` natif | Nouvelle | Se déclenche sur Échap — `e.preventDefault()` empêche la fermeture native avant la synchro React |
| `useMemo` — quand l'utiliser vraiment | Nouvelle | Mémoïser une valeur calculée une seule fois en fin de partie n'a pas de sens — calcul conditionnel plus honnête |
| `Partial<GameStore>` — sous-type explicite | Nouvelle | Annotation de retour pour indiquer un sous-ensemble du store — limites TypeScript avec `persist` |
| Composant `RadioOptions` — encapsulation `onChange` | Nouvelle | Le composant appelle `onChange(value)` — le parent reçoit la valeur, pas l'événement HTML |
| `Record<string, T | undefined>` | Nouvelle | Type honnête pour un objet dont les clés ne sont pas garanties |

### ⚠️ Notions faussement acquises détectées

- **`useMemo` — utilité réelle** : tendance à ajouter `useMemo` par réflexe sans vérifier si la dépendance est stable. Ici `[unRankedScore]` (référence nouvelle à chaque render) rendait le memo totalement inutile — détecté après discussion.

### 🔄 Étapes restantes

- **Bug hauteur GameBoard** — layout dépasse 1024px sur desktop (1440×1024) — à diagnostiquer avec DevTools (suspect : `mt-25` footer + `p-16.5`)
- Tests game logic — `checkMatch`, `flipTile`, `generateBoard` (P0, ~4h — session dédiée)
- `useEffect` deps + ESLint `react-hooks/exhaustive-deps` (P1, ~1h)
- Supprimer les `!` non-null assertions dans `gameStore.ts` (P1, ~30min)
- Self-host Google Fonts via fontsource (P1, ~30min)
- `aria-live="polite"` pour les annonces game events (nice-to-have)

### 📈 Évaluation de session

- **Score Frontend Mentor : 7.0/10** — sans les tests (comptent pour 1/5 de la note)
- **Points solides :** Race condition bien comprise après explication étape par étape ; `RadioOptions` extrait de façon autonome ; `ICON_MAP` guard écrit correctement ; raisonnement sur `useMemo` juste (correction proposée meilleure que celle de l'audit)
- **Points fragiles :** `useMemo` — réflexe à questionner ; syntaxe JSX dans ternaire imbriqué (accolades en trop) ; `Partial<GameStore>` — limites TypeScript avec `persist` pas encore évidentes
- **Priorité pour la prochaine session :** Bug hauteur layout, puis tests game logic — Vitest, nouvelle stack

### 💬 Notes de contexte

- Session marathon (7h-15h+) — audit complet + README + deploy Vercel + soumission Frontend Mentor
- Score 7.0 sans les tests — potentiel ~8.5 une fois les tests écrits
- Le raisonnement sur `useMemo` était meilleur que la correction de l'audit — calcul conditionnel vs dépendance corrigée
- Décision UX validée : Échap sur `GameOverModal` = restart (état terminal, pas de "juste fermer")

---

## Audit 2026-05-27 — Liste de corrections à apporter

### 🔴 Blockers — bugs fonctionnels (ordre : 1 → 3 → 2)

- [x] **1. Race condition `checkMatch`** — `gameStore.ts:100` — le `setTimeout` du mismatch se déclenche après un Restart/Reset et écrase `currentPlayerIndex` et `flippedIds` de la nouvelle partie. Fix : stocker la ref du timeout dans le store (`flipBackTimeout: ReturnType<typeof setTimeout> | null`), annuler avec `clearTimeout` dans `startGame()` et `resetGame()`.
- [x] **3. Navigation directe `/game` sans config** — `GameBoard.tsx:51` — `startGame()` retourne silencieusement si `gameConfig` est null → plateau vide, aucune redirection. Fix : guard explicite dans le `useEffect` : `if (!config) { navigate("/"); return; }`.
- [x] **2. Touche Échap désynchronise l'état React** — `MenuModal.tsx` + `GameOverModal.tsx` — le `<dialog>` se ferme nativement mais `isOpen` reste `true` → re-render suivant rappelle `showModal()`. Fix : `onCancel={(e) => { e.preventDefault(); onClose(); }}` sur le `<dialog>`.

### 🟡 Code quality — bloquants en review

- [x] **4. `useMemo` inefficace** — `GameBoard.tsx:41-43` — `unRankedScore` est recréé à chaque render → dépendance `[unRankedScore]` invalide le memo à chaque render. Fix : dépendre de `score` directement.
- [x] **5. `partialize` opaque** — `gameStore.ts:126` — spread de tout le state (actions incluses) relié sur un effet de bord de `JSON.stringify`. Fix : lister explicitement les champs sérialisés.
- [x] **6. `TileProps.onFlip` signature trompeuse** — `Tile.tsx:5` — `onFlip: (id: string) => void` déclaré mais le paramètre n'est jamais utilisé par aucun caller. Fix : soit `() => void`, soit passer `onFlip={flipTile}` depuis le parent.
- [x] **7. `ICON_MAP` mensonge de type** — `icon.tsx:23` — `Record<string, LucideIcon>` prétend qu'une clé absente retourne un `LucideIcon`. Fix : `Record<string, LucideIcon | undefined>` + guard avant `<Icon />`.

### ⚪ Mineurs — pas bloquants

- [x] `tiles &&` inutile — `GameBoard.tsx:86` — `tiles` est `Tile[]`, jamais null, à supprimer.
- [x] Touche Échap non gérée sur `MenuModal` — même fix que le point 2.
- [ ] `ErrorBoundary` sans logging prod — `ErrorBoundary.tsx:20` — `componentDidCatch` présent mais sans service de reporting.
- [x] Répétition boutons radio `StartScreen.tsx` — 4 boutons joueurs copier-collés.
- [x] `<dialog>` sans `rounded-xl` dans `GameOverModal` — incohérence visuelle vs `MenuModal`.
- [x] `<main>` absent dans `GameBoard.tsx` — structure déjà correcte (header / main / footer au même niveau).

---

## Session 2026-05-26b — Error Boundary, localStorage versioning, refactoring GameBoard

### ✅ Étapes accomplies

- `ErrorBoundary` — composant classe avec `getDerivedStateFromError` + `componentDidCatch`, wrappé autour de `GameBoard` dans `App.tsx`
- `persist` versioning — `version: 1` + `migrate` ajoutés pour gérer les états localStorage périmés
- `disabled={flippedIds.length >= 2}` + `disabled:pointer-events-none` sur les boutons tuiles — bloque hover et clic pendant l'attente de vérification
- Refactoring `GameBoard` 260 → 156 lignes — extraction de `Tile`, `Header`, `FooterSolo`, `FooterMulti` en composants dédiés

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| Composant classe React — syntaxe `extends Component<Props, State>` | Nouvelle | Premier contact — `this.props`, `this.state`, méthode `render()` obligatoire |
| `static getDerivedStateFromError` | Nouvelle | Méthode statique appelée par React quand un enfant lance une erreur — retourne le nouveau state |
| Pourquoi Error Boundary = classe uniquement | Nouvelle | Pas de hook équivalent — React doit reconnaître la classe pour intercepter les erreurs de rendu |
| Race condition `persist` Zustand / `useEffect` | Nouvelle | `useEffect` peut se déclencher avant que `persist` finit de charger localStorage — `startGame()` appelé sur état initial au lieu de l'état restauré |
| `version` + `migrate` dans Zustand `persist` | Nouvelle | `version` : numéro du schéma actuel. `migrate` : transforme l'ancien état vers le nouveau — `savedVersion < 1` → reset partiel |
| `disabled:pointer-events-none` Tailwind | Nouvelle | Bloque hover ET clic sur un bouton désactivé — `disabled` HTML bloque le clic mais pas les événements CSS |
| `key` appartient au composant dans `.map()`, pas à l'intérieur | Consolidée | Erreur faite deux fois (Tile, FooterMulti) — notion à ancrer |
| Extraction de composants — props, interfaces, séparation des responsabilités | Révisée | `Tile`, `Header`, `FooterSolo`, `FooterMulti` extraits de façon autonome |

### ⚠️ Notions faussement acquises détectées

- **`key` dans les composants extraits** — tendance à mettre `key` sur l'élément racine à l'intérieur du composant plutôt que sur le composant lui-même dans le `.map()`. Corrigé deux fois dans la même session.

### 🔄 Étapes restantes

- Tests game logic — `checkMatch`, `flipTile`, `generateBoard` (P0, ~4h — session dédiée)
- `useEffect` deps + ESLint react-hooks/exhaustive-deps (P1, ~1h)
- Supprimer `!` non-null assertions dans `gameStore.ts` (P1, ~30min)
- Self-host Google Fonts via fontsource (P1, ~30min)
- `aria-live="polite"` pour annonces game events (nice-to-have)

### 📈 Évaluation de session

- **Points solides :** Error Boundary compris après explication du "pourquoi", `migrate` écrit de façon autonome après l'exemple neutre, extraction des composants fluide et autonome
- **Points fragiles :** `key` dans les composants extraits — erreur récurrente dans la même session ; syntaxe composant classe encore étrange (normal, premier contact)
- **Priorité pour la prochaine session :** Tests game logic — nouvelle stack (Vitest), session dédiée

### 💬 Notes de contexte

- Session très productive — deux sessions dans la même journée, rythme soutenu
- La question "pourquoi on fait ça" avant la syntaxe est un bon réflexe — à encourager
- `GameBoard` est passé de 260 à 156 lignes

---

## Session 2026-05-26 — audit pass, a11y modales et tuiles

### ✅ Étapes accomplies

- Typo classe `w` orpheline supprimée dans `GameBoard.tsx`
- `id="modal"` dupliqués → `id="menuModal"` / `id="gameoverModal"` uniques
- `ICON_NAMES` dérivé depuis `Object.keys(ICON_MAP)` — plus de risque de désync
- `useMemo` + `[...arr].sort()` pour `rankedPlayers` — copie avant tri, recalcul uniquement sur changement de `score`
- Focus trap modales corrigé — `flex` retiré du `<dialog>`, délégué à un `<div>` wrapper avec `h-full`
- ARIA modales : `aria-modal="true"`, `aria-labelledby` sur chaque `<dialog>`, `id` sur les `<h2>` titres
- ARIA tuiles : `onClick` déplacé sur `<button>` (accessibilité clavier native), `aria-label` conditionnel (hidden / flipped / matched)
- `disabled={tile.isMatched}` sur les boutons de tuiles matchées

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `Object.keys(obj)` | Nouvelle | Retourne un tableau des clés — alternative correcte au spread pour extraire des clés |
| `useMemo` — syntaxe et dépendances | Nouvelle | Même structure que `useEffect` — callback + tableau de deps. Valeur recalculée uniquement si deps changent |
| `[...arr].sort()` — copie avant mutation | Nouvelle | `.sort()` mute en place — le spread crée une copie avant de trier |
| `flex` sur `<dialog>` écrase `display:none` natif | Consolidée | Déjà vu session 24, corrigé de façon autonome cette fois |
| `aria-modal="true"` | Nouvelle | Indique explicitement une modale aux screen readers — ne pas compter uniquement sur `showModal()` |
| `aria-labelledby` — référencer un titre par `id` | Nouvelle | Erreur initiale : pointait vers l'`id` du dialog lui-même. Bien compris après correction |
| Hiérarchie headings en modale — `h2` pas `h1` | Nouvelle | `<h1>` réservé au titre de la page — une modale utilise `<h2>` |
| `aria-label` conditionnel sur élément interactif | Nouvelle | Trois états tuile — hidden / flipped / matched — ternaire imbriqué |
| `disabled` sur `<button>` | Révisée | Bloque l'interaction clavier + annonce l'état au screen reader |

### ⚠️ Notions faussement acquises détectées

- **`aria-labelledby` référence** — tendance à pointer vers l'`id` du dialog lui-même plutôt que vers l'`id` du titre. La distinction "qui référence quoi" pas encore instinctive.
- **`<h1>` dans une modale** — réflexe d'utiliser `<h1>` pour tout titre important, sans tenir compte de la hiérarchie de page.

### 🔄 Étapes restantes

- Error Boundary (P0, ~30min)
- Tests game logic — `checkMatch`, `flipTile`, `generateBoard` (P0, ~4h — session dédiée)
- `useEffect` deps + ESLint react-hooks/exhaustive-deps (P1, ~1h)
- localStorage versioning + `migrate` dans `persist` (P1, ~1h)
- Supprimer `!` non-null assertions dans `gameStore.ts` (P1, ~30min)
- Self-host Google Fonts via fontsource (P1, ~30min)
- `aria-live="polite"` pour annonces game events (nice-to-have)

### 📈 Évaluation de session

- **Points solides :** Focus trap diagnostiqué et corrigé de façon autonome, `useMemo` écrit correctement du premier coup, `aria-label` conditionnel construit sans aide
- **Points fragiles :** `aria-labelledby` — logique de référence pas encore instinctive ; hiérarchie des headings HTML à ancrer
- **Priorité pour la prochaine session :** Error Boundary (P0, ~30min) — nouveau pattern React, faisable seul

### 💬 Notes de contexte

- Session orientée audit — 8 points corrigés en une session, rythme soutenu
- Responsive + styling final considéré comme terminé par l'utilisateur
- Tests planifiés pour une session dédiée — nouveau domaine (Vitest), mérite un focus complet

---

## Session 2026-05-25 — responsive cards, hover tuiles, bugs timer

### ✅ Étapes accomplies

- Cards multi-joueurs responsive : `P1` sur mobile (`sm:hidden`), `Player 1` sur écrans larges (`hidden sm:block`) — CSS pur, aucun JS
- Flèche indicateur joueur actif : `<span>` en `absolute`, carré `rotate-45`, rendu conditionnel sur `isCurrentPlayer`
- Bug flèche + flex corrigé : le span arrow conditionnel sur ses *classes* restait en flow comme enfant flex → rendu conditionnel sur le *nœud entier* (`{isCurrentPlayer && <span />}`)
- Bug timer post-restart corrigé : `startGame()` ne remettait pas `isRunning: false` → ancien `setInterval` continuait sans être nettoyé
- Bug `useEffect` dependency array : `[phase]` accidentellement introduit → remis à `[]`
- Hover tuiles : `hover:bg-blue-350` sur le `<li>` caché par le `<span>` full-size → déplacé sur le span face cachée (`bg-blue-800`)
- Transition ciblée : `transition-[background-color]` pour ne pas transitionner la couleur du texte

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| Responsive CSS pur vs `useWindowSize` JS | Nouvelle | Pour affichage/layout → Tailwind breakpoints. JS uniquement si la logique en a besoin |
| Rendu conditionnel nœud vs classes conditionnelles | Consolidée | Un nœud sans classes reste un enfant flex avec 0 dimension — `justify-evenly` redistribue différemment selon le nombre d'enfants en-flow |
| `setInterval` vit dans le composant, pas dans le store | Consolidée | `isRunning` est le signal — le `useEffect` crée/détruit l'intervalle en réaction |
| `startGame` doit reset `isRunning: false` | Nouvelle | Sans ça, l'ancien intervalle survit au restart car `isRunning` ne change pas → `useEffect` ne se relance pas |
| Hover sur container vs enfant full-size | Nouvelle | Hover sur le `<li>` masqué par le `<span>` qui le recouvre entièrement → hover sur l'enfant direct |
| `transition-[background-color]` — arbitrary value | Nouvelle | Cible uniquement `background-color`, pas `color` ni `border-color` |
| localStorage stale state | Révisée | Ancienne valeur `isRunning: true` sans `partialize` → fausse piste diagnostiquée correctement |

### ⚠️ Notions faussement acquises détectées

- Aucune détectée cette session.

### 🔄 Étapes restantes

- Responsive + styling final selon maquette (en cours)
- A11y — focus trap modales, aria

### 📈 Évaluation de session

- **Points solides :** Diagnostic flèche/flex raisonné de façon autonome avant confirmation, lien `isRunning`/`setInterval` bien compris après explication, CSS responsive sans JS instinctif
- **Points fragiles :** La relation store ↔ `useEffect` ↔ `setInterval` nécessite encore de la visualisation mentale — les bugs timer sont détectés mais la cause profonde pas immédiatement évidente
- **Priorité pour la prochaine session :** Responsive + styling final selon maquette

### 💬 Notes de contexte

- Session orientée bugs + petits détails styling — pas de nouvelle feature
- Le commentaire "il faudrait presque un schéma" sur les relations store/timer/composant est juste — noter pour la wrap-up du projet

---

## Session 2026-05-24b — persist Zustand, resetGame, timer au premier clic

### ✅ Étapes accomplies

- `persist` middleware Zustand ajouté — store wrappé via variable `storeConfig: StateCreator<GameStore>` pour lisibilité
- `partialize` configuré — `isRunning` forcé à `false` à la restauration
- `isRunning: true` retiré de `startGame` — timer démarre au premier clic via guard dans `flipTile`
- `useEffect` de `GameBoard` conditionné — `phase === "playing" && tiles.length > 0` → `resumeTimer()`, sinon → `startGame()`
- `resetGame` ajouté dans le store — `phase: "setup"`, `tiles: []`
- `onNewGame` corrigé dans `MenuModal` et `GameOverModal` — les deux appellent `resetGame()` avant `navigate("/")`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `persist` Zustand — syntaxe middleware avec `create<T>()()` | Nouvelle | Blocage initial sur l'imbrication — résolu en extrayant `storeConfig` dans une variable |
| `StateCreator<GameStore>` | Nouvelle | Type Zustand pour typer le callback du store extrait |
| `partialize` — sélectionner ce qu'on persiste | Nouvelle | Bien compris — `isRunning` exclu pour éviter le timer fantôme au refresh |
| `localStorage` persiste entre sessions (pas seulement refresh) | Nouvelle | Comportement attendu de localStorage — à distinguer de sessionStorage |
| Guard `!get().isRunning` dans `flipTile` | Consolidée | Écrit de façon autonome — réflexe en progression |

### ⚠️ Notions faussement acquises détectées

- Aucune détectée cette session.

### 🔄 Étapes restantes

- Responsive + styling final selon maquette
- A11y — focus trap modales, aria

### 📈 Évaluation de session

- **Points solides :** Diagnostic du bug New Game → deux endroits à corriger trouvé de façon autonome, logique `resetGame` correcte du premier coup
- **Points fragiles :** Syntaxe middleware Zustand — imbrication difficile à visualiser mentalement ; `StateCreator` ajouté comme couche abstraite
- **Priorité pour la prochaine session :** Responsive + styling final selon maquette

### 💬 Notes de contexte

- `storeConfig` extrait pour contourner l'illisibilité du `persist` sur 80 lignes — pattern à retenir
- Le renommage `gameOverModal.tsx` était une fausse note — fichier déjà correct depuis le début

---

## Session 2026-05-24 — MenuModal, thème icons (Lucide), aspect-square tiles

### ✅ Étapes accomplies

- `resumeTimer` ajouté dans le store (interface + implémentation)
- `MenuModal.tsx` créé — `<dialog>` natif, même patron que `GameOverModal`, 3 boutons : Restart / New Game / Resume
- Bouton Menu dans `GameBoard` câblé : `setIsMenuOpen(true)` + `stopTimer()` au lieu de naviguer directement
- `isOpen`/`setIsOpen` renommé en `isGameOverOpen`/`setIsGameOverOpen` — convention corrigée
- `stopTimer` identifié comme équivalent fonctionnel de `pauseTimer` — pas de doublon nécessaire
- `lucide-react` installé (Heroicons écarté — moins de choix)
- `src/lib/icon.tsx` créé — `ICON_MAP: Record<string, LucideIcon>` + `ICON_NAMES: string[]` avec 18 icônes
- `generateBoard` mis à jour — `theme` utilisé (underscore retiré), condition `theme === "numbers"` vs `ICON_NAMES.slice(0, n)`
- `GenerateBoardProps.theme` corrigé : `number | string` → `"numbers" | "icons"`
- Rendu icônes dans `GameBoard` — `ICON_MAP[tile.value as string]`, guard `typeof tile.value === "number"`
- Tuiles passées à `aspect-square` — suppression des tailles hardcodées `h-18 w-18` etc.

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| Référence de composant vs JSX rendu (`Bird` vs `<Bird />`) | Nouvelle | Blocage initial — confusion entre ranger une fonction et l'appeler. Bien compris après explication analogie fonction |
| `typeof` pour distinguer `string` vs `number` au runtime | Nouvelle | Appliqué correctement après hint |
| `as string` sur la clé vs `as LucideIcon` sur le résultat | Nouvelle | Correction spontanément acceptée — cast au bon endroit |
| `aspect-square` CSS — hauteur dérivée de la largeur sans hardcoding | Nouvelle | Approche trouvée après exploration infructueuse du flex-col |
| `clearInterval` — ne remet pas le compteur à zéro | Consolidée | Bien reformulé de façon autonome : deux choses séparées, timer JS vs `timeElapsed` dans le store |
| `<dialog>` + `flex` Tailwind écrase `display:none` natif | Nouvelle | Bug révélé par le flex-col sur le container — dialog capturait les clics même fermé |

### ⚠️ Notions faussement acquises détectées

- Aucune détectée cette session.

### 🔄 Étapes restantes

- Responsive + styling final selon maquette
- Renommage `gameOverModal.tsx` → `GameOverModal.tsx`
- A11y — focus trap modales, aria
- `persist` middleware Zustand (localStorage)

### 📈 Évaluation de session

- **Points solides :** Logique `stopTimer` = `pauseTimer` raisonnée de façon autonome, structure `ICON_MAP`/`ICON_NAMES` comprise après explications, `typeof` appliqué sans aide
- **Points fragiles :** Référence composant vs JSX — notion pas encore instinctive ; chaîne de hauteurs CSS (`h-full` nécessite parents hauteur définie) pas encore automatique
- **Priorité pour la prochaine session :** Responsive + styling final selon maquette

### 💬 Notes de contexte

- Session productive — thème icons fonctionnel de bout en bout
- Bug `<dialog>` + `flex` Tailwind noté : à surveiller si on ajoute `pointer-events-none` pour le fix propre
- `aspect-square` retenu comme approche définitive pour les tuiles

---

## Session 2026-05-23b — footer multi, tailwind-merge bug

### ✅ Étapes accomplies

- Footer multi-joueurs : `.map()` sur `unRankedScore` — 4 `<li>` hardcodés remplacés, `currentPlayerIndex` extrait du store pour mettre en valeur le joueur actif avec `cn()`
- Bug `tailwind-merge` diagnostiqué et compris : `text-preset-7` écrasée par `text-white`/`text-blue-800` car `twMerge` voit deux `text-*` comme un conflit — fix avec modificateur `!` (Tailwind v4 `!important`)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `.map()` — utiliser le paramètre callback plutôt que réindexer | Révisée | Réflexe à ancrer : l'utilisateur a d'abord tenté `unRankedScore[???].player` au lieu d'utiliser directement le paramètre du callback |
| `tailwind-merge` + `@utility` custom | Nouvelle | `twMerge` ne connaît pas les classes custom — conflit sur préfixe `text-*` → supprime la classe inconnue |
| Modificateur `!` Tailwind v4 | Nouvelle | `text-preset-7!` → `!important` sur la règle |

### ⚠️ Notions faussement acquises détectées

- Aucune détectée cette session.

### 🔄 Étapes restantes

- Responsive + styling final selon maquette
- Modale Menu (bouton Menu en jeu → options Restart / New Game / Resume)
- A11y — focus trap modales, aria
- `persist` middleware Zustand (localStorage)
- Renommage `gameOverModal.tsx` → `GameOverModal.tsx`

### 📈 Évaluation de session

- **Points solides :** `.map()` construit correctement après un hint ciblé, compréhension du bug `tailwind-merge` rapide une fois le mécanisme expliqué
- **Points fragiles :** Réflexe "paramètre de callback" pas encore automatique — tendance à vouloir accéder aux éléments par index
- **Priorité pour la prochaine session :** Responsive + styling selon maquette

### 💬 Notes de contexte

- Session courte, focus sur deux points précis
- Le fix `!` est laissé en place (acceptable), le fix propre (sortir la preset du `cn()`) est connu

---

## Session 2026-05-23 — refactoring store, fin de partie, GameOverModal, audit + bug fixes

### ✅ Étapes accomplies

- Refactoring double source de vérité : `isFlipped` supprimé du type `Tile` et de `generateBoard` — rendu dérivé via `flippedIds.includes(tile.id) || tile.isMatched`
- Guard `flippedIds.includes(id)` ajouté dans `flipTile` pour remplacer l'ancien guard `isFlipped`
- `checkMatch` nettoyé : destructuring `{ flippedIds, tiles }`, variables `id1/id2/tile1/tile2`, branche mismatch réduite à `flippedIds: []`
- Condition fin de partie : `newTiles.every(tile => tile.isMatched)` → `phase: "game-over"`, `isRunning: false`
- `startGame` complété : reset `moves`, `flippedIds`, `currentPlayerIndex` au restart
- `rankedPlayers` construit dans `GameBoard` — map vers `{ player, score }` puis `.sort((a, b) => b.score - a.score)`
- `GameOverModal` — `<dialog>` natif avec `showModal()`/`close()`, rendu conditionnel solo/multi, détection égalité via `winners.filter`, mise en valeur du vainqueur avec `cn()`
- `FLIP_BACK_DELAY_MS` — magic number extrait en constante
- Bug fix `?.players!` → `?.players ?? 1` dans `checkMatch` — double contradiction opérateur corrigée
- `startTimer` supprimé du store — `startGame` gère directement `isRunning: true` (couplage éliminé)
- Bug fix crash `rankedPlayers[0]` — compris et discuté ; résolu par rendu conditionnel dans le parent (`phase === "game-over"`) plutôt que guard dans le composant

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| Source unique de vérité — dériver vs stocker | Nouvelle | Compris et appliqué — `isFlipped` supprimé, dérivé depuis `flippedIds` |
| `array.every()` | Nouvelle | Appliqué correctement pour la détection fin de partie |
| `array.some()` | Nouvelle | Découverte en contexte — "au moins un élément satisfait la condition" |
| `array.sort()` avec comparateur | Révisée | Confusion ascendant/descendant corrigée (`a-b` vs `b-a`) |
| `<dialog>` natif + `showModal()` | Nouvelle | Bon choix a11y, appliqué de façon autonome |
| Données de présentation vs logique de jeu | Nouvelle | Décision correcte : tri dans `GameBoard`, pas dans le store |
| Destructuring dans `get()` | Révisée | `const { flippedIds, tiles } = get()` — réflexe en progression |
| Montage React vs visibilité `<dialog>` | Faussement acquise | L'utilisateur supposait que `<dialog>` caché = composant hors DOM. Faux : React monte toujours le composant, `<dialog>` contrôle uniquement la visibilité CSS/HTML. Bien compris après explication. |
| Guard haut dans l'arbre vs guard dans le composant | Nouvelle | Rendu conditionnel dans le parent (`{phase === "game-over" && <Modal />}`) est préférable à un guard défensif dans le composant — JS n'explore pas le composant inutilement |

### ⚠️ Notions faussement acquises détectées

- **`<dialog>` natif vs montage React** — confusion entre "dialog caché" (HTML) et "composant non monté" (React). L'utilisateur pensait que `isOpen: false` suffisait à empêcher l'exécution du JS interne. À surveiller dans d'autres cas de composants toujours montés (tooltips, drawers, etc.).

### 🔄 Étapes restantes

- Rendu conditionnel `GameOverModal` dans `GameBoard` à implémenter (`{phase === "game-over" && ...}`)
- Footer multi-joueurs hardcodé à 4 — à remplacer par un `.map()` sur `scores`
- Responsive + styling final selon maquette
- A11y — focus trap dans la modal, aria
- `persist` middleware Zustand (localStorage)
- Nommage fichier `gameOverModal.tsx` → `GameOverModal.tsx` (convention PascalCase)

### 📈 Évaluation de session

- **Points solides :** Refactoring source de vérité compris et exécuté, logique winners/tie construite de façon autonome, choix architectural `<dialog>` natif correct, diagnostic rapide sur `startTimer`/`startGame`
- **Points fragiles :** `array.sort()` sens ascendant/descendant — à ancrer ; montage React vs visibilité HTML — notion à consolider
- **Priorité pour la prochaine session :** Responsive + styling final selon maquette

### 💬 Notes de contexte

- Session très productive — code review externe (audit style senior) utilisée comme point de départ du refactoring
- Le refactoring a réduit la densité de `checkMatch` de façon significative
- Décision délibérée de garder la prop `score` dans GameOverModal pour la clarté (plutôt que de dériver depuis `rankedPlayers.length`)

---

## Session 2026-05-22 — bug fix flipTile, timer, logique multi

### ✅ Étapes accomplies

- Bug fix : guard dans `flipTile` pour tuiles déjà `isFlipped` ou `isMatched` — deux lignes, résout le freeze au move 43
- Timer : `tick`, `startTimer`, `stopTimer` dans le store + `useEffect` avec `setInterval` + cleanup dans `GameBoard`
- `timeElapsed: 0` ajouté au reset dans `startGame`
- `scores` initialisé dans `startGame` via `Array.from({ length: config.players }, () => 0)`
- Branche match dans `checkMatch` : nouveau tableau `scores` avec spread + incrément sur `currentPlayerIndex`
- Branche mismatch : `currentPlayerIndex` avec modulo `% get().gameConfig?.players ?? 1`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| Cleanup `useEffect` — quand s'exécute le `return` | Révisée | Compris : au démontage ET quand la dépendance change — lien fait avec `isRunning` |
| `setInterval` avec cleanup `clearInterval` | Nouvelle | Appliqué correctement, structure bien comprise |
| `get()` vs `state` dans `setTimeout` | Consolidée | Lien fait spontanément avec le bug "variable stale" de la session précédente |
| `array.every()` | Nouvelle | Nommée, pas encore appliquée — session interrompue |
| `set(state => { ... return {...} })` vs `set(state => ({...}))` | Nouvelle | Blocage répété — la distinction entre les deux formes n'est pas encore un réflexe |
| Modulo pour rotation d'index | Nouvelle | Principe compris, appliqué avec guidage |

### ⚠️ Notions faussement acquises détectées

- **Structure du callback `set` Zustand** — tentatives répétées d'écrire des expressions dans un objet littéral `({...})`. La forme avec accolades + `return` n'est pas encore instinctive. À revoir au prochain contact.
- **Zustand en général** — la densité des imbrications `set/get/setTimeout/state` atteint la limite cognitive. Le code devient difficile à lire même pour l'auteur. Signal clair que le refactoring `handleMatch`/`handleMismatch` est nécessaire avant d'aller plus loin.

### 🔄 Étapes restantes

- **Priorité absolue session suivante :** Refactoriser `checkMatch` en `handleMatch()` + `handleMismatch()` — fonctions séparées dans le store, avant d'ajouter quoi que ce soit
- Condition de fin de partie — `tiles.every(t => t.isMatched)` → `phase: "game-over"`, `isRunning: false`
- Modal de fin de partie
- `persist` middleware Zustand (localStorage)
- A11y + responsive
- Composant `Tile` dédié

### 📈 Évaluation de session

- **Points solides :** Diagnostic du bug freeze autonome et rapide, timer implémenté sans aide majeure, lien `get()` vs stale variable fait spontanément
- **Points fragiles :** Syntaxe `set` avec logique multi-lignes — blocage récurrent ; densité de `checkMatch` devient un mur cognitif
- **Priorité pour la prochaine session :** (1) Refactoring `checkMatch` → `handleMatch`/`handleMismatch` EN PREMIER (2) Condition de fin de partie

### 💬 Notes de contexte

- Session productive sur le fond mais charge cognitive élevée — fin de session sur saturation, pas sur échec
- Le refactoring n'est plus optionnel : `checkMatch` est trop dense pour être modifiable sereinement
- `stopTimer()` dans le bouton Menu est redondant (cleanup `useEffect` suffit) — laissé en place, pas prioritaire

---

## Session 2026-05-21 — checkMatch, moves, footer solo/multi

### ✅ Étapes accomplies

- Action `checkMatch` dans le store — filter `isFlipped && !isMatched`, comparaison de `value`, mise à jour `isMatched` ou reset après `setTimeout(1000ms)`
- Guard dans `flipTile` — bloque le 3ème clic tant que 2 tuiles sont en attente de vérification
- Appel de `checkMatch` depuis `flipTile` après le `set`, via `get().flippedIds.length === 2`
- Compteur `moves` incrémenté dans `checkMatch` après la vérification de longueur
- Footer `GameBoard` — layout solo (Time + Moves) et layout multi (4 colonnes fixes) avec rendu conditionnel sur `config?.players === 1`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `filter` vs `map` — distinction fonctionnelle | Révisée | Confusion initiale map/filter corrigée de façon autonome après hint |
| `get()` dans une action Zustand — valeur courante vs valeur capturée | Nouvelle | Bug subtil : variable capturée avant `set` vs `get()` appelé après — bien compris |
| `||` dans `.map()` pour cibler deux éléments | Nouvelle | Logique comprise après explication — chaque élément évalué indépendamment |
| `set({ propriété: valeur })` — convention Zustand | Révisée | Tentative `set(state => state.moves + 1)` sans clé — à ancrer |
| `setTimeout` avec `set` Zustand à l'intérieur | Nouvelle | Appliqué correctement |

### ⚠️ Notions faussement acquises détectées

- **Variables capturées vs `get()` en temps réel** — `flippedIdsLength` capturé avant `set` restait à l'ancienne valeur. L'utilisateur a bien diagnostiqué que `checkMatch` n'était jamais appelé, mais la cause (variable stale) n'était pas évidente. À surveiller dans les prochains `useEffect` avec dépendances.
- **Syntaxe `set` Zustand** — tentative de passer une valeur brute plutôt qu'un objet partiel. Corrigé rapidement mais pas encore un réflexe.

### 🔄 Étapes restantes

- Timer — `tick`, `startTimer`, `stopTimer` dans le store + `useEffect` avec `setInterval` dans `GameBoard`
- Initialisation de `scores[]` dans `startGame` selon `config.players`
- Logique multi — tours, scores par joueur (incrémenter `scores[currentPlayerIndex]` au match)
- Condition de fin de partie — toutes les tuiles matchées
- Modal de fin de partie
- `persist` middleware Zustand (localStorage)
- A11y + responsive
- Composant `Tile` dédié (extraire du GameBoard)

### 📈 Évaluation de session

- **Points solides :** Diagnostic autonome du bug `checkMatch` jamais appelé, raisonnement sur `||` dans `.map()` compris après explication, structure de `checkMatch` construite sans aide majeure
- **Points fragiles :** Variable stale vs `get()` — notion subtile, à revoir en contexte `useEffect` ; syntaxe `set` Zustand pas encore automatique
- **Priorité pour la prochaine session :** (1) Timer — `setInterval` dans le store avec `startTimer`/`stopTimer`/`tick` (2) Condition de fin de partie

### 💬 Notes de contexte

- Session productive malgré plusieurs points de blocage — l'utilisateur a su diagnostiquer les bugs par lui-même avec des hints ciblés
- Layout multi hardcodé à 4 colonnes — confirmé par la maquette, pas un bug
- `moves` est solo uniquement ; `scores: number[]` est prévu pour le multi mais non initialisé encore

---

## Session 2026-05-20 — generateBoard, startGame, GameBoard, flipTile

### ✅ Étapes accomplies

- `src/lib/generateBoard.ts` — Fisher-Yates shuffle générique + génération des paires + map vers `Tile[]`
- Action `startGame` dans le store — lit `gameConfig` via `get()`, appelle `generateBoard`, met à jour `tiles` et `phase`
- `GameBoard.tsx` — `useEffect` au montage, grille responsive via `cn()` + `config?.gridSize`, rendu conditionnel face/pile
- Action `flipTile` dans le store — met à jour `flippedIds` et `isFlipped` sur la tuile via spread immutable
- Tuiles cliquables et retournement visuel fonctionnel confirmé

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| TypeScript génériques `<T>` | Nouvelle | Premier contact — logique comprise, syntaxe encore étrange |
| `Array.from({ length: n }, callback)` | Nouvelle | Pour générer une séquence [1..N] |
| `const arr: Type[] = .map(...)` — typer le tableau plutôt que le callback | Nouvelle | Bonne intuition trouvée de façon autonome |
| Zustand `get()` dans une action | Nouvelle | Pour lire l'état courant depuis une autre action |
| Mise à jour immutable dans Zustand — `{ ...tile }` + `.map()` | Révisée | Appliqué correctement sans aide |
| Optional chaining `config?.gridSize` | Révisée | Réflexe présent |

### ⚠️ Notions faussement acquises détectées

- Aucune détectée cette session — bonne progression

### 🔄 Étapes restantes

- Logique de matching — `checkMatch` : comparer les 2 tuiles retournées, `isMatched` ou reset après délai
- Timer — `tick`, `startTimer`, `stopTimer` dans le store + `useEffect` avec `setInterval`
- Compteur de moves (solo)
- Mode multi — tours, scores par joueur
- Modal de fin de partie
- `persist` middleware Zustand (localStorage) — décision prise, à implémenter après la logique de jeu
- A11y + responsive StartScreen et GameBoard
- Composant `Tile` dédié (extraire du GameBoard)

### 📈 Évaluation de session

- **Points solides :** Mise à jour immutable Zustand écrite sans aide, optional chaining instinctif, `flipTile` correctement structurée du premier coup
- **Points fragiles :** Génériques TypeScript encore fragiles — compris conceptuellement mais syntaxe à revoir, abstractions Zustand (`get()`) nécessitent encore du guidage
- **Priorité pour la prochaine session :** (1) `checkMatch` — logique de matching avec délai + reset (2) Timer `setInterval` dans le store

### 💬 Notes de contexte

- Deux demi-sessions dans la même journée — switch cognitif UX designer → développeur en cours de session, rythme trouvé en fin de première demi-session
- `persist` middleware Zustand à ajouter pour localStorage — décision justifiée (cas du tunnel dans le train)
- Le niveau de complexité de ce projet est objectivement plus élevé que tous les précédents — l'utilisateur en est conscient et continue malgré tout

---

## Session 2026-05-19 — Kickoff, types, store, StartScreen, routing

### ✅ Étapes accomplies

- Décisions architecturales actées : Zustand, GameConfig dans le store, timer dans le store
- `src/types/game.ts` — interfaces `Tile` et `GameConfig` créées
- `src/store/gameStore.ts` — interface `GameStore`, état initial, action `setConfig`
- `src/pages/StartScreen.tsx` — trois fieldsets (theme, players, gridSize), états locaux contrôlés, onClick câblé
- `src/pages/GameBoard.tsx` — placeholder
- `src/App.tsx` — routing React Router (`/` → StartScreen, `/game` → GameBoard)
- Dev server confirmé fonctionnel

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| Zustand — `create`, `set`, interface, usage composant | Nouvelle | Pattern assimilé en cours de session, quelques hésitations sur interface vs implémentation |
| `GameConfig["field"]` — indexed access types TypeScript | Nouvelle | Trouvé de façon autonome — bonne intuition |
| Radio inputs contrôlés avec `onChange` | Révisée | `e.target.value as Type` pour strings, valeur directe pour nombres |
| React Router — `BrowserRouter`, `Routes`, `Route` | Consolidée | Écrit sans aide |
| `useNavigate` | Révisée | Réflexe présent |
| `GameConfig | null` — type nullable pour état non initialisé | Nouvelle | Compris et appliqué |

### ⚠️ Notions faussement acquises détectées

- **Syntaxe objet JS** — points-virgules utilisés à la place de virgules dans `create()`. Mélange entre syntaxe d'objet et syntaxe de bloc. Corrigé mais à surveiller.
- **Deux booleans vs phase unique** — tendance à modéliser `isStarted` + `isOver` séparément plutôt qu'un `phase: 'setup' | 'playing' | 'game-over'`. La notion d'états impossibles n'était pas spontanée.
- **Rôle de l'interface Zustand** — pas évident au départ pourquoi déclarer les actions dans l'interface si elles sont déjà typées dans `create()`. Nécessité de plusieurs explications.

### 🔄 Étapes restantes

- `generateBoard` — fonction utilitaire dans `src/lib/` (Fisher-Yates + création des paires)
- Action `startGame` dans le store (appelle `generateBoard`, passe `phase` à `'playing'`)
- `GameBoard.tsx` — appel à `startGame` au montage, structure du plateau
- Composant `Tile.tsx`
- Logique de matching (`flipTile`, vérification, reset)
- Timer (`tick`, `startTimer`, `stopTimer`)
- Mode multi (tours, scores)
- Modal de fin de partie

### 📈 Évaluation de session

- **Points solides :** React Router écrit sans aide, intuition correcte sur `GameConfig["field"]`, autonomie sur la structure HTML du formulaire
- **Points fragiles :** Zustand mental model en construction (interface vs implémentation, pourquoi pas de séparation état/actions), O7 dans l'abstrait difficile — l'utilisateur apprend mieux en écrivant qu'en planifiant
- **Priorité pour la prochaine session :** (1) `generateBoard` avec Fisher-Yates — fonction pure, O7 minimal avant code (2) Action `startGame` dans le store (3) Début de `GameBoard`

### 💬 Notes de contexte

- Session de reprise après une semaine en mode UX designer avec agents IA — switch cognitif difficile en début de session, rythme trouvé en seconde moitié
- O7 dans le vide résiste — adapter : faire la décomposition en cours d'écriture plutôt qu'avant
- Zustand choisi délibérément pour comparer avec useReducer (vu 2x). Redux écarté comme overkill.

---

## Project Kickoff — 2026-05-18 — Memory Game

### 🗺️ Self-assessment initial

| #   | Notion                                                               | Auto-évaluation                                |
| --- | -------------------------------------------------------------------- | ---------------------------------------------- |
| 1   | Zustand — créer un store avec actions typées (remplace `useReducer`) | _(jamais utilisé)_                             |
| 2   | `setInterval` dans `useEffect` avec cleanup                          | _(déjà vu , mais syntaxe à revoir)_            |
| 3   | TypeScript — discriminated unions pour actions/état                  | _(à voir)_                                     |
| 4   | Fisher-Yates shuffle (algorithme de mélange)                         | _(aucune idée)_                                |
| 5   | React Router — `useNavigate`, `location.state`                       | _(des réflexes pas des certitudes)_            |
| 6   | `useMemo` — valeurs dérivées vs état stocké                          | _(ça devrait aller)_                           |
| 7   | Grid responsive Tailwind (4×4 et 6×6 dynamiques)                     | _(pas de soucis)_                              |
| 8   | Gestion du focus sur un modal                                        | _(j'utiliserai dialog, focus auto géré)_       |
| 9   | `cn()` avec notation objet sur composant multi-états                 | _(déjà utilisé j'aime bien, syntaxe à revoir)_ |

### 🏗️ Décisions architecturales

- **State management :** Zustand (choix délibéré — useReducer vu 2x, comparaison avec lib pro)
- **Passage de GameConfig :** Store Zustand — StartScreen écrit dans le store, GameBoard lit depuis le store. React Router = navigation pure.
- **Timer :** Dans le store — `timeElapsed`, `isRunning`, `tick()`, `startTimer()`, `stopTimer()` tous dans Zustand.

### ✅ Checklist de démarrage

- [x] Prettier + prettier-plugin-tailwindcss installés et configurés
- [ ] Self-assessment rempli (ci-dessus)
- [ ] O7 — Décomposition algorithmique en français avant tout code
  - [ ] Génération du plateau (config → tiles[])
  - [ ] Logique de matching (flip → check → update)
  - [ ] Gestion des tours (move → check match → advance)
- [ ] Décisions architecturales actées

---
