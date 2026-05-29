## Project Wrap-up — 2026-03-21 — Tic Tac Toe ✅

### Bilan final

**5 sessions** — 2026-03-17 → 2026-03-21

### Evaluation avant/apres des notions cles

| Notion | Kickoff | Fin de projet |
| --- | --- | --- |
| Architecture composants React | Ancre | Ancre — confirme |
| useState + TypeScript | Acquis (BMI) | Consolide — applique sans aide |
| useEffect | Fragile | Acquis — applique correctement (sessionStorage) |
| Logique JS pure (algorithme IA) | Solide | Solide — getCpuMove construit de maniere autonome |
| Methodes de tableau (find, every, map, filter) | Fragile | Ameliore — applique avec aide, pas encore automatique |
| JSON.stringify / JSON.parse | Inconnu | Nouvelle — compris et applique |
| sessionStorage vs localStorage | Inconnu | Nouvelle — raisonnement UX autonome (choix sessionStorage justifie) |
| useState initializer function | Inconnu | Nouvelle — applique apres pattern montre |
| Gestion d'evenements asynchrones dans un handler | Fragile | Ameliore — encore des allers-retours, la logique murrit |
| Deploiement Vercel + diagnostic package.json | Revise | Consolide — a identifie seul que tailwind manquait dans package.json |

### Points fragiles persistants a surveiller sur le prochain projet

- Methodes de tableau (`find`, `every`, `forEach`) — pas encore automatiques, necessite rappel
- Chaine d'operations dans un handler (ordre, setState async, early return) — logique presente mais fragile
- `onChange={fn()}` vs `onChange={() => fn()}` — non teste sur ce projet, a surveiller

### Note de cloture

Premier projet avec logique metier non triviale (IA, gestion de tour, modal conditionnelle). La logique algorithmique est presente et s'ancre. Le mode guidage reste necessaire mais les adaptations autonomes sont de plus en plus frequentes. Trajectoire claire.

---

## Session 2026-03-21 — Hover states + sessionStorage + deploiement

### Etapes accomplies

- `isHovered` state dans `Cell.tsx` — `onMouseEnter`/`onMouseLeave`, icone outline au survol
- Transition opacity (opacity-0/100, duration-0 sur fade-out pour eviter glitch fantome) — icone en `absolute` pour ne pas impacter le layout
- `playerTurn` passe en prop a `Cell` depuis `Game`
- sessionStorage dans `Game.tsx` — `scoreX`, `scoreO`, `scoreT`, `board`, `playerTurn` persistes
- sessionStorage dans `App.tsx` — `currentView`, `gameMode`, `firstPlayerChoice` persistes
- `onQuit` nettoie `board` et `playerTurn` du sessionStorage — bug UX identifie et corrige
- Faute de frappe `firstPlayerChoise` detectee et corrigee
- `tailwindcss` et `@tailwindcss/vite` absents du `package.json` — installes, build Vercel repare
- Deploiement Vercel reussi

### Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `onMouseEnter` / `onMouseLeave` | Nouvelle | Applique correctement, logique comprise |
| Transition opacity + `absolute` pour hover sans layout shift | Nouvelle | Solution trouvee de maniere autonome apres le glitch |
| `useState` avec fonction d'initialisation | Nouvelle | Pattern montre une fois, applique ensuite sans aide pour tous les states |
| `useEffect` pour ecriture sessionStorage | Nouvelle | Applique correctement avec tableau de dependances |
| `sessionStorage` vs `localStorage` | Nouvelle | Choix sessionStorage justifie par raisonnement UX autonome |
| `JSON.stringify` / `JSON.parse` | Nouvelle | Notion inconnue — comprise et appliquee |
| `sessionStorage.removeItem` | Nouvelle | Applique pour le fix bug onQuit |
| Dependances npm manquantes dans package.json | Revisee | A identifie seul le lien entre l'erreur Vercel et tailwind installe a la racine |

### Notions faussement acquises detectees

- Aucune cette session.

### Evaluation de session

- **Points solides :** Choix sessionStorage vs localStorage argumente sans aide (raisonnement UX). Pattern useState initializer et useEffect appliques de maniere autonome apres presentation. Diagnostic Vercel / package.json correct.
- **Points fragiles :** JSON.stringify/parse etait inconnu — notion a consolider sur le prochain projet.
- **Priorite pour la prochaine session :** Prochain challenge Frontend Mentor.

---

## Session 2026-03-20 — CPU IA + RestartModal + finalisation

### Etapes accomplies

- `RestartModal.tsx` — composant separe avec props `onCancel` et `onRestart`, overlay inclus
- Bouton restart cable : `isRestartPressed` state, `setIsRestartPressed(true)` au click
- `getCpuMove(board, cpuMark)` — IA simple en 3 priorites :
  1. Gagner si possible (deux cpuMark + null dans un triplet)
  2. Bloquer si humain a deux en ligne
  3. Case aleatoire sinon (`Math.random`)
- `cpuMark` derive de `firstPlayerChoice` — generique, ne depend pas de "X" ou "O" hardcode
- CPU joue immediatement apres le coup humain dans le meme handler (setTimeout 500ms pour effet visuel)
- `setPlayerTurn(firstPlayerChoice)` apres le coup CPU pour retoggler vers le joueur
- `checkWinner(lastBoard)` apres le coup CPU pour detecter victoire CPU + score + modal
- `return` apres `openModal(newWinner)` pour eviter que le CPU joue apres une victoire humaine
- `getCpuMove` et `checkWinner` deplacees hors du composant

### Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `onMouseEnter` / `onMouseLeave` | A faire | Hover state Cell avec playerTurn en prop |
| `setTimeout` dans un handler | Nouvelle | Entourer tout le bloc CPU — compris apres essai |
| Parametre generique vs valeur hardcodee | Nouvelle | `cpuMark` passe en argument plutot que "O" fixe |
| Early return dans un handler pour stopper la chaine | Revisee | `return` apres openModal pour empecher CPU de jouer |

### Bugs corriges en session

- `setBoard(cpuPlay)` — erreur : cpuPlay est un index, pas un board. Corrige en `lastBoard[cpuPlay] = cpuMark; setBoard(lastBoard)`
- `lastBoard[cpuPlay] = setBoard(lastBoard)` — fusion de deux lignes distinctes. Corrige.
- CPU jouait avec le mark du joueur — `getCpuMove` hardcode "O"/"X". Corrige avec `cpuMark` / `humanMark`
- `playerTurn` async : CPU utilisait l'ancien state. Corrige en derivant `cpuMark` depuis `firstPlayerChoice`
- CPU jouait apres victoire humaine — pas de `return` apres `openModal`. Corrige.
- `setPlayerTurn` non retoggle apres coup CPU — joueur rejouait avec cpuMark. Corrige.

### Etapes restantes

- Hover states sur les cellules (`onMouseEnter`/`onMouseLeave` + `playerTurn` en prop)
- Responsive — verifier layout mobile
- localStorage (bonus) — persister les scores

### Evaluation de session

- **Points solides :** A construit `getCpuMove` de maniere autonome avec la bonne structure. A raisonne correctement sur `cpuMark` vs `playerTurn` async. A identifie que `checkWinner(lastBoard)` etait necessaire apres le coup CPU.
- **Points fragiles :** Chaine d'evenements dans un handler (ordre, early return, setState async) — encore des allers-retours necessaires. `setTimeout` : a eu du mal a voir qu'il fallait entourer tout le bloc.
- **Priorite prochaine session :** Hover states Cell, puis localStorage.

---

## Session 2026-03-19 — Moteur de jeu + Modal resultat

### Etapes accomplies

- Ajustements CSS (aspect-square sur les `<li>` du board)
- `WIN_COMBS` — tableau de 8 triplets d'indices, constante correctement construite, deplacee hors du composant
- `checkWinner(board)` — `find` sur WIN_COMBS avec destructuring `([a, b, c])`, retourne `board[a]` ou `null`
- `score(newWinner)` — met a jour `scoreX` ou `scoreO` + `setGameIsOver(true)`
- `gameIsOver` state — bloque toute ecriture sur le board des la fin d'un round
- Detection de tie — `newBoard.every(cell => cell !== null) && newWinner === null`
- `winnerIs` state `"X" | "O" | "Tie" | null` — stocke le resultat pour la modal
- `Modal.tsx` — composant generique avec props `winner`, `onQuit`, `onRestart`
- Modal rendue conditionnellement `{winnerIs !== null && <Modal />}`
- `onRestart` — reset board, gameIsOver, winnerIs ; suppression du no-op `setPlayerTurn`
- `firstPlayerChoice` comme valeur initiale de `playerTurn` — corrige
- Messages modal corriges pour le mode human (P1/P2 au lieu de YOU/CPU)
- Ordre correct dans le onClick : copie -> ecriture -> setBoard -> checkWinner -> score -> tie check -> toggle turn

### Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Tableau de tableaux (matrice) comme structure de donnees | Nouvelle | Pas le reflexe spontane, bien assimile une fois nomme |
| `Array.find()` vs `Array.forEach()` — court-circuit | Nouvelle | `return` dans un `forEach` ne sort pas de la fonction — gap reel decouvert en session |
| Destructuring dans le callback de `find` : `([a, b, c])` | Nouvelle | Applique correctement apres explication |
| `Array.every()` | Nouvelle | Pas connu — `find` propose d'instinct, `every` explique |
| Ordre des operations dans un handler — etat stale | Revisee | A compris que `checkWinner(board)` lirait l'ancien etat, a applique `newBoard` sans aide apres rappel |
| `if (gameIsOver) return;` — early return pour bloquer | Revisee | Applique correctement |
| `useState<boolean>(false)` — syntaxe generics | Revisee | A inverse `useState(false)<boolean>` — corrige rapidement |

### Notions faussement acquises detectees

- **`return` dans un `forEach`** — croyait que `return` dans le callback sortirait de la fonction parente.
- **No-op** — notion inconnue. `setPlayerTurn((p) => p!)` retourne la meme valeur sans changer l'etat — supprime une fois explique.

### Evaluation de session

- **Points solides :** Raisonnement algorithmique globalement juste. A construit le pattern modal de maniere autonome.
- **Points fragiles :** Methodes de tableau (`find`, `every`, `forEach`) — pas encore automatiques.

---

## Session 2026-03-18 — Game screen + Board mecanique

### Etapes accomplies

- `Game.tsx` — header complet (logo, afficheur tour avec SVG conditionnel, bouton restart)
- Footer scores avec logique `firstPlayerChoice` + `gameMode` pour labels X/O (P1/P2/YOU/CPU)
- `board` state : `useState<("X" | "O" | null)[]>(Array(9).fill(null))` — tableau plat de 9 cases
- `Cell.tsx` — composant bouton avec `value`, `onClick`, `disabled={value !== null}`
- Map sur le board pour afficher les 9 cellules avec index correct
- Click fonctionnel : update board + toggle playerTurn — la mecanique de base du jeu fonctionne

### Bugs rencontres

- Variable du `.map` nommee `playerTurn` — ecrasait le state du meme nom. Corrige en renommant en `cell`.
- `playerTurn` initialise a `"O"` au lieu de `"X"`. Corrige.
- `key={board[0]}` et `value={board[0]}` hard-codes sur index 0 — corrige avec `key={index}` et `value={cell}`.

---

## Session 2026-03-17 — Setup + Menu + App routing

### Etapes accomplies

- Setup Vite + React + TypeScript + Tailwind v4
- Assets copies, polices woff2 importees, font-face, text-preset et variables couleurs configures dans `index.css`
- Design system boutons cree (`@utility button-primary`, etc.) avec `@apply`
- `Menu.tsx` — structure HTML complete, radios custom stylises via CSS pur (`input:checked + label`)
- `MenuProps` interface ecrite correctement — `onStart: (mark: "X" | "O", mode: "cpu" | "human") => void`
- `App.tsx` — pattern objet `views` lookup reutilise depuis Quiz App, `currentView` state, flow Menu -> App -> Game cable
- `Game.tsx` — squelette cree avec `GameProps` interface, verifie dans React DevTools

---

## Project Kickoff — 2026-03-17 — Tic Tac Toe

### Stack retenue

- React 19 + Vite + Tailwind CSS v4 + TypeScript

### Contexte utilisateur au demarrage

- 3 projets React + Tailwind v4 completes (Password Generator, Frontend Quiz App, BMI Calculator)
- TypeScript introduit sur BMI Calculator — interfaces, union types, useState type : acquis
- Points fragiles persistants : `onChange={fn()}` vs `onChange={() => fn()}`, `--color-*` singulier Tailwind v4

### Features du challenge

- Layout responsive selon la taille d'ecran
- Hover states sur tous les elements interactifs
- Solo vs ordinateur OU multijoueur (2 joueurs)
- **Bonus 1** : sauvegarder l'etat dans localStorage
- **Bonus 2** : IA proactive (bloquer + essayer de gagner) — FAIT

### Comportement attendu

- Ecran "New Game" au demarrage — choix du mark (X/O) + mode (solo/multi)
- Le mark non selectionne par P1 est auto-assigne a P2
- Premier tour du 1er round : toujours joue par X
- Rounds suivants : le 1er tour alterne entre O et X
- Icone restart -> modal "Restart game?" (reset ou annuler) — FAIT
- Bouton quit apres un round -> retour au menu — FAIT
