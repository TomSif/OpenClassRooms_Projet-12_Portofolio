# Code Review — Results Summary Component — 2026-04-20

## Contexte

| | |
|---|---|
| **Niveau de review** | N°3 (Niveau 1 uniquement) |
| **Stack** | React 19 + Vite + Tailwind CSS v4 + TypeScript |
| **Durée du projet** | 4 sessions |
| **Review précédente** | Pomodoro — 3.4/5 |
| **Cible fixée en début de projet** | 4/5 |

---

## Progression depuis la review précédente

**Priorité 1 Pomodoro (commits fourre-tout) :** ✅ Réglée. Les commits atomiques sont au rendez-vous — 25 commits, chacun à intention unique. Plus de `fix:` fourrant 4 intentions, plus de `refacto`. C'est la progression la plus visible de ce projet.

**Priorité 2 Pomodoro (console.log et code mort) :** ✅ Réglée. Zéro `console.log` dans le code. La passe systématique est intégrée.

**Priorité 3 Pomodoro (nommage des props callbacks) :** ✅ Réglée. `onScoreChange` est correct, `ResultCardProps` et `SummaryItemProps` sont en place. Le problème `ModeButtonInterface` ne se répète pas ici.

Trois priorités, trois coches. C'est la première review où les trois axes ciblés sont tous réglés.

---

## Évaluation par axe

### 1.1 Structure & organisation — 4/5 =

Organisation impeccable : `components/`, `data/`, `types/`, `utils/`, `lib/` — tout est en place, séparé, cohérent. `App.tsx` est une enveloppe d'orchestration de 68 lignes, sans logique enfouie. Cohérence nom/export parfaite sur tous les fichiers. Pas de fichiers Vite résiduels — le réflexe de la checklist de démarrage est ancré.

**Un défaut structurel :** `App.tsx:4`

```tsx
import data from "../src/data/data.json";
```

`App.tsx` est dans `src/`. Le chemin `../src/` remonte au dossier parent, puis redescend dans `src/` — ce qui arrive par hasard au bon endroit. Le chemin correct est `./data/data.json`. Le code fonctionne, mais il révèle une confusion sur les chemins relatifs qui peut causer des bugs dans des projets plus complexes.

---

### 1.2 Nommage — 4.5/5 ⬆️

Grande progression. PascalCase, camelCase, `UPPER_SNAKE_CASE` (`COLORS`, `FEEDBACK_DATA`) — tout est cohérent. Les noms sont intentionnels et lisibles sans ambiguïté : `isAnimationOver`, `displayScore`, `scoresByCategories`, `getFeedback`. La convention `onXxx` est systématiquement respectée pour les callbacks. Aucune interface avec suffixe `Interface`.

**Un seul point mineur :** `ResultCard.tsx:14`

```tsx
const id = setInterval(...)
```

`id` est trop court pour ce qu'il représente. `intervalId` serait immédiatement lisible et éviterait la confusion avec un DOM id ou un identifiant métier.

---

### 1.3 Commits — 3.5/5 ⬆️

Progression nette. L'atomicité, qui était le problème structurel du Pomodoro, est résolue — les 25 commits sont chacun à intention unique. La sémantique `feat/fix/refactor/chore` est bien utilisée dans l'ensemble.

**Ce qui stagne — les mêmes irrégularités depuis 3 reviews :**

`doc` au lieu de `docs` — encore une fois :
```
115184d doc(readme): update documentation
```
Le type correct est `docs`. C'était déjà signalé en session le 2026-04-18.

Casse de scope incohérente dans le même projet :
```
450aa68 feat(A11y): add label on SummaryItem   ← majuscule
6d57099 fix(a11y):add alt on icons              ← minuscule
```
Deux commits sur le même axe, deux casings différents. La règle est tout en minuscules.

Espace manquante après `:` :
```
fix(a11y):add alt on icons
```
Le format standard est `type(scope): message` — l'espace après `:` est obligatoire.

Double espace dans un message :
```
50fa074 fix(app): state closure  on setScore with prev
```

Ce sont quatre irrégularités dans un lot de 25 commits — la maîtrise globale progresse, mais ces détails n'ont pas encore le statut de réflexe automatique.

---

### 1.4 Lisibilité — 3.5/5 ⬆️

Les fichiers sont courts, les fonctions à responsabilité unique, zero console.log, zero code mort. `getFeedback.ts` est un exemple propre de fonction utilitaire : types importés, données constantes en module-level, `throw` explicite sur le cas impossible. `SummaryItem.tsx` et `ResultCard.tsx` se lisent sans effort.

**Ce qui nuit à la lisibilité — commentaires redondants dans `App.tsx` :**

```tsx
//function reduce transform data table in object
const scoresByCategories = data.reduce<Record<string, number>>(...)

//useState to stock scores by categories
const [scores, setScores] = useState(scoresByCategories);

// store the score result
const [scoreResult, setScoreResult] = useState(...)

// calcul the Result
const values = Object.values(scores);

// set Result Score
setScoreResult(result);
```

Cinq commentaires qui décrivent ce que le code dit déjà. Le nom `scoresByCategories`, le nom `scoreResult`, l'appel à `setScoreResult` — tout est lisible sans aide. Ces commentaires n'ajoutent pas de WHY, ils paraphrasent le WHAT. Résultat : le fichier est plus long et plus bruyant, pas plus clair.

En plus, `calcul` est une faute d'anglais (`calculate` ou pas de commentaire).

**Un point secondaire :** `SummaryItem.tsx:47`

```tsx
onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  const value = Number(e.target.value);
  return onScoreChange(category, value);   // ← return inutile
}}
```

`return` sur un event handler ne retourne rien d'exploitable. C'est trompeur — un lecteur peut se demander si la valeur retournée sert à quelque chose. Supprimer le `return`.

---

## ✅ 3 priorités pour ce projet

### Priorité 1 — Commits : finir le travail (axe récurrent, 3e review)

**Le problème :** `doc` vs `docs`, `feat(A11y)` vs `fix(a11y)`, espace manquante après `:`, double espace dans un message. Ce ne sont pas des erreurs architecturales — ce sont des automatismes qui ne sont pas encore en place.

**L'objectif pour le prochain projet :** zéro `doc`, zéro scope avec majuscule, espace systématique après `:`. Avant chaque commit, une relecture de 10 secondes du message : type correct ? scope en minuscules ? espace après les deux-points ?

Prochain projet : l'axe commits doit passer à 4/5.

---

### Priorité 2 — Commentaires redondants (axe 1.4)

**Le problème :** 5 commentaires dans `App.tsx` qui décrivent ce que le code dit déjà. Des fautes d'anglais (`calcul`). Ces commentaires créent du bruit sans valeur.

**La règle à ancrer :** un commentaire se justifie quand il explique le POURQUOI — une contrainte cachée, un comportement non-évident, un workaround. Il ne se justifie jamais pour décrire ce que le code fait déjà clairement.

Dans `App.tsx`, aucun des cinq commentaires n'explique un POURQUOI. Ils peuvent tous être supprimés. Le seul commentaire qui aurait une valeur dans ce fichier serait quelque chose du genre : `// lazy init — computed once to avoid recalculation on every render` au-dessus du `useState` avec la fonction.

---

### Priorité 3 — Import path erroné

**Le problème :** `App.tsx:4`

```tsx
import data from "../src/data/data.json"; // ← chemin conceptuellement faux
```

`App.tsx` est dans `src/`. Le chemin correct est `./data/data.json`. Le chemin `../src/` arrive au bon endroit par chance (remonte au parent, redescend dans `src/`), mais il montre une confusion sur les chemins relatifs. Dans un monorepo ou avec un alias de path, ce type d'erreur casse le build.

Correction : `import data from "./data/data.json";`

---

## 📋 Backlog de progression

| Axe | Observation |
|-----|-------------|
| [1.4] | `SummaryItem.tsx:47` — `return onScoreChange(...)` dans un event handler : le `return` est inutile et trompeur. Supprimer. |
| [1.4] | `SummaryItem.tsx:29` — `cn()` avec un seul argument non conditionnel : n'apporte rien. `cn()` se justifie avec des classes conditionnelles ou un merge conflictuel. |
| [1.4] | `SummaryItem.tsx:29` — trailing space dans le template literal : `` `...${COLORS[category].text} ` `` — espace final invisible. |
| [1.4] | `index.css:185` — commentaire en français (`/* important : garder le contenu au-dessus */`) dans un projet en anglais. Uniformiser. |
| [1.3] | `App.tsx:42` — `key={index}` dans le map. La liste est statique donc inoffensif, mais `key={item.category}` est plus correct sémantiquement. |
| [Niveau 2] | `ResultCard.tsx:17` — `setIsAnimationOver(true)` appelé à l'intérieur du setter de `setDisplayScore`. Effet secondaire dans une fonction d'update de state — pattern à éviter, à signaler au passage au Niveau 2. |

---

## 📊 Score global

| Axe | Galleria | Pomodoro | Results Summary | Delta |
|-----|---------|---------|----------------|-------|
| 1.1 Structure | 3.5/5 | 4/5 | 4/5 | = |
| 1.2 Nommage | 4/5 | 3.5/5 | 4.5/5 | ⬆️ +1 |
| 1.3 Commits | 3/5 | 3/5 | 3.5/5 | ⬆️ +0.5 |
| 1.4 Lisibilité | 3/5 | 3/5 | 3.5/5 | ⬆️ +0.5 |
| **Moyenne** | **3.4/5** | **3.4/5** | **3.9/5** | **⬆️ +0.5** |

**Verdict :** Première review au-dessus de 3.5. Le score global monte de 0.5 point — c'est la meilleure progression en une review depuis le début. La cible de 4/5 fixée en début de projet est pratiquement atteinte : il manque 0.1 point, imputable aux commentaires redondants et aux dernières irrégularités de commits.

---

## Note finale

Ce projet marque un cap. Trois priorités ciblées, trois réglées — c'est la première fois que ça arrive. Le nommage bondit à 4.5/5 : `onScoreChange`, `ResultCardProps`, `FEEDBACK_DATA`, `isAnimationOver` — tous pertinents, tous cohérents. La lisibilité structurelle est bonne : des fichiers courts, des fonctions focalisées, zero code mort.

Ce qui reste, c'est de la précision : des commentaires qui n'auraient pas dû être écrits, quatre irrégularités dans les commits, un chemin d'import conceptuellement faux. Aucun de ces points n'est architectural — ce sont des habitudes de discipline à quelques semaines d'être automatiques.

Sur le fond technique, le projet va au-delà du brief original : inputs contrôlés, animation compteur avec `setInterval` et cleanup propre, `aria-hidden` synchronisé sur l'animation, gradient CSS en pseudo-élément — c'est du travail soigné. La note Frontend Mentor de 8.5/10 avec la mention *Exceptional* est cohérente avec ce que montre le code.

**La prochaine review devrait montrer commits à 4/5 et lisibilité à 4/5. Ces deux axes sont à portée.**

---

# Code Review — Pomodoro App — 2026-04-17

## Contexte

|                       |                                                |
| --------------------- | ---------------------------------------------- |
| **Niveau de review**  | N°2 (Niveau 1 uniquement)                      |
| **Stack**             | React 19 + Vite + Tailwind CSS v4 + TypeScript |
| **Durée du projet**   | 9 sessions                                     |
| **Review précédente** | Galleria Slideshow — 3.4/5                     |

---

## Progression depuis la review précédente

**Priorité 1 (Commits) :** Progrès partiel. Les scopes sont plus souvent en minuscules, le `!` de breaking change a disparu, plus aucun WIP dans les messages. Mais la sémantique et l'atomicité régressent — détail ci-dessous. L'axe stagne globalement.

**Priorité 2 (Fichiers morts) :** ✅ Réglée. `react.svg`, `vite.svg` supprimés dès le scaffold. La checklist de démarrage est intégrée.

**Priorité 3 (Classes Tailwind longues) :** ✅ Partiellement réglée. Plus aucune ligne de 150 chars. `cn()` est utilisé. Quelques regroupements logiques absents encore, mais le problème structurel est corrigé.

---

## Évaluation par axe

### 1.1 Structure & organisation — 4 / 5 ⬆️

Nette progression. `components/`, `hooks/`, `lib/`, `utils/`, `types/`, `context/` — tout est présent, séparé, cohérent. `App.tsx` ne contient que l'enveloppe Provider + Timer (14 lignes). La cohérence nom de fichier / export est respectée sur tous les fichiers : `Timer.tsx` exporte `Timer`, `ModeButton.tsx` exporte `ModeButton`, etc. La faiblesse Galleria (`Articles.tsx` / `Article`) a été corrigée par réflexe.

**Une réserve :** `Timer.tsx` cumule le type `TimerState`, le type `TimerAction`, la fonction `timerReducer`, `formatTime`, `formatISO8601` et le composant — 207 lignes. Ce n'est pas encore critique au Niveau 1, mais c'est la dette lisible principale du projet. Un fichier `useTimer.ts` aurait pu absorber toute la logique.

---

### 1.2 Nommage — 3.5 / 5 ⬇️

Les fondations sont là : PascalCase, camelCase, `DEFAULT_SETTINGS` en UPPER_SNAKE_CASE, noms intentionnels (`formatISO8601`, `currentDuration`, `handleButtonClick`). Mais trois problèmes concrets tirent le score vers le bas.

**Incohérence `setMode` / `onModeChange`**
`ModeButton` expose une prop `setMode`. `ModeSelector` passe une prop `onModeChange` à `Timer`. Ce sont deux noms pour la même intention — changer le mode. La convention React est `on` + verbe pour les callbacks de composant. `setMode` est un nom de setter (état interne), pas un nom d'handler. En lisant `ModeButton.tsx`, on ne comprend pas immédiatement que c'est un callback déclenché par l'utilisateur.

**`ModeButtonInterface` comme nom d'interface**
`interface ModeButtonInterface` — le suffixe `Interface` est redondant. TypeScript sait que c'est une interface vu le mot-clé. La convention dans l'écosystème React est `ComponentNameProps`. L'interface devrait s'appeler `ModeButtonProps`. Même chose pour `TimerModeProps` dans `ModeSelector.tsx` — le nom attendu est `ModeSelectorProps`.

**`console.log` de debug non supprimé**
`SettingsModal.tsx:181` — `console.log("onChange fired", e.target.value)`. Un `console.log` laissé en place dans un projet soumis et audité par Frontend Mentor. Ce n'est pas un problème de nommage à proprement parler, mais c'est un oubli qui se voit dès qu'on ouvre la console DevTools.

---

### 1.3 Commits — 3 / 5 = (stagnation)

C'était la priorité 1 du rapport Galleria. Les scopes ont progressé — `fix(timer)`, `fix(css)`, `feat(settings)` sont en minuscules dans la majorité des commits. C'est un progrès réel à reconnaître.

Mais deux problèmes persistent ou empirent :

**Commits fourre-tout**

```
c659ae1 fix(JSX): change mode li key to modeItem, add security in settingsProvider,
         add type button on timer, move dialog outside main
```

Quatre intentions dans un commit. Un commit = une intention. Idem pour `6b0b604` (5 choses), `797da7a` (CSS + reducer), `cd86c0d` (useEffect + bug rayon).

**Sémantique incorrecte**

```
7c02f7a fix(settings) persist settings to localStorage & add browser notifications
```

Ce n'est pas un `fix` — c'est deux `feat`. `fix` = corriger un comportement cassé. Ajouter localStorage et les notifications est une nouvelle capacité.

```
41f0a7e refacto(css): ...
```

`refacto` n'est pas un type Conventional Commits. C'est `refactor`.

**Scopes encore incohérents**
`feat(Time)`, `feat(Timer)`, `fix(A11y)`, `fix(JSX)` — quelques majuscules subsistent. La règle est systématiquement minuscules.

**Ce qui est résolu par rapport à Galleria :** plus de `!` hors contexte, plus de WIP dans les messages, plus de typos dans les messages. Ce sont des progrès réels.

---

### 1.4 Lisibilité — 3 / 5 =

Les fichiers courts sont irréprochables : `CircularProgress.tsx` (29 lignes), `ModeSelector.tsx` (32 lignes), `useSettings.ts`, `defaults.ts`, `types.ts` — tous lisibles du premier coup. Les commentaires architecturaux dans `Timer.tsx` (sections numérotées "1. Le type de l'état", "2. Les actions"...) sont une bonne habitude qui aide à naviguer.

**Problèmes :**

**`data-font` dans une className**

`SettingsModal.tsx:356` :

```tsx
className={`button-apply data-font bg-(--app-color) text-preset-2-settings ...`}
```

`data-font` n'est pas une classe CSS — c'est un attribut HTML data-\*. Il est déjà passé correctement comme prop : `data-font={draftSettings.font}`. Dans la className, c'est soit une erreur, soit du code mort. Aucun sélecteur CSS dans `index.css` ne cible `.data-font` — ce token est inutile et trompeur.

**Fautes de frappe dans les commentaires**

```tsx
// APi call for notifications   ← majuscule random
// useEffet TimeLeft === 0      ← "useEffet" sans 'c'
```

Les commentaires de navigation sont une bonne habitude, mais des fautes dans le code d'un projet soumis donnent une impression de finition bâclée.

**`initialState` défini à l'intérieur du composant**

```tsx
function Timer() {
  const initialState: TimerState = {  // recréé à chaque render
    mode: "pomodoro",
    timeLeft: settings.durations["pomodoro"] * 60,
    status: "idle",
  };
  const [state, dispatch] = useReducer(timerReducer, initialState);
```

`useReducer` n'utilise `initialState` qu'une seule fois — au premier render. Redéfinir l'objet à chaque render est inoffensif en pratique, mais trompeur : un lecteur peut croire que le state se réinitialise à chaque render. La clarté du code s'en ressent.

---

## ✅ 3 priorités pour ce projet

### Priorité 1 — Commits : atomicité (axe récurrent, deuxième signal)

**Le problème :** `fix` utilisé pour des `feat`, `refacto` au lieu de `refactor`, commits fourre-tout avec 3-5 intentions mélangées.

**Ce qui s'améliore :** les scopes minuscules progressent, le `!` a disparu, les typos dans les messages aussi. Ce n'est pas ignoré.

**Ce qui reste bloqué :** avant chaque commit, la question à se poser est : _est-ce qu'il y a une seule intention dans ce commit ?_ Si le message contient `+` ou `&` entre deux choses différentes, c'est le signal pour splitter. `git add -p` permet de stager partiellement un fichier modifié pour deux raisons.

Prochain projet : zéro `&` dans les messages de commit.

---

### Priorité 2 — `console.log` et code mort à supprimer avant chaque submit

**Le problème :**

- `SettingsModal.tsx:181` — `console.log("onChange fired", e.target.value)` — debug non supprimé
- `SettingsModal.tsx:356` — `data-font` dans la className — token mort

**Ce que tu intègres dès maintenant :** avant chaque push, une passe systématique :

```bash
grep -r "console.log" src/
```

Et une relecture de chaque className pour vérifier qu'aucun attribut HTML ne s'est glissé dedans.

---

### Priorité 3 — Nommage cohérent des props de callbacks

**Le problème :** `setMode` dans `ModeButton` vs `onModeChange` dans `ModeSelector`. La convention React est `on` + verbe pour les callbacks exposés par un composant. `setMode` ressemble à un setter d'état interne.

**La règle à ancrer :** si une prop est un callback déclenché par l'utilisateur → préfixe `on`. Si c'est un setter d'état passé directement → `set` est acceptable mais plus rare. Dans ce projet, `onModeChange` est le bon nom jusqu'au bout — dans `ModeButton` aussi.

Bonus à corriger en même temps : `ModeButtonInterface` → `ModeButtonProps`, `TimerModeProps` → `ModeSelectorProps`.

---

## 📋 Backlog de progression

_À traiter dans les projets suivants — pas maintenant._

| Axe   | Observation                                                                                                                                                                                  |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1.4] | Commentaires avec fautes dans `Timer.tsx` : `APi`, `useEffet` — corriger avant le prochain push                                                                                              |
| [1.4] | `initialState` déclaré dans le composant mais utilisé une seule fois — le déplacer en argument initialisateur de `useReducer` ou hors du composant pour clarifier l'intention                |
| [2.1] | `SettingsModal.tsx` : 3 blocs `<label>` quasiment identiques pour les polices, 3 autres pour les couleurs — à factoriser en sous-composant dans le prochain projet de complexité équivalente |
| [2.1] | `Timer.tsx` : reducer, types, utilitaires et composant dans le même fichier — externaliser dans `useTimer.ts` quand la complexité du prochain projet le justifie                             |
| [2.4] | `onKeyDown` dans les labels radio gère Space mais pas Enter — acceptable pour un label, mais à documenter si c'est intentionnel                                                              |

---

## 📊 Score global

| Axe                          | Galleria    | Pomodoro    | Delta   |
| ---------------------------- | ----------- | ----------- | ------- |
| 1.1 Structure & organisation | 3.5 / 5     | 4 / 5       | ⬆️ +0.5 |
| 1.2 Nommage                  | 4 / 5       | 3.5 / 5     | ⬇️ -0.5 |
| 1.3 Commits                  | 3 / 5       | 3 / 5       | =       |
| 1.4 Lisibilité               | 3 / 5       | 3 / 5       | =       |
| **Moyenne**                  | **3.4 / 5** | **3.4 / 5** | **=**   |

---

## Note finale

Le score global est stable, mais derrière ce chiffre il y a un vrai tableau de progression différencié. La structure a progressé d'un demi-point — pas un hasard, c'est le résultat d'avoir appliqué la checklist de démarrage et la règle de cohérence nom/export dès le premier commit. Ce réflexe est ancré.

Ce qui tire vers le bas, c'est la finition : un `console.log` oublié, une classe morte, des fautes dans les commentaires, des commits qui mélangent plusieurs intentions. Aucun de ces problèmes n'est architectural — ce sont des habitudes de discipline qui s'installent lentement, mais qui s'installent.

Sur le fond technique, il n'y a rien à redire : `useReducer` avec discriminated unions écrit de manière autonome, Context API bout en bout, deux `useEffect` à responsabilité unique, `useRef` sur un `<dialog>` natif, SVG avec `stroke-dashoffset` calculé dynamiquement — c'est un niveau de complexité nettement au-dessus du standard junior. Le code fonctionne et il est lisible.

**La priorité 1 des trois prochains projets reste les commits.** C'est le seul axe qui n'a pas bougé en deux reviews. Pas parce que tu ne comprends pas — tu comprends. Mais parce que ça ne devient pas encore un réflexe automatique avant de committer. C'est là-dessus que le prochain audit devrait montrer un delta visible.

---

# Code Review — Galleria Slideshow — 2026-04-08

## Contexte

|                      |                                                                               |
| -------------------- | ----------------------------------------------------------------------------- |
| **Niveau de review** | N°1 (Niveau 1 uniquement)                                                     |
| **Stack**            | React 19 + Vite + Tailwind CSS v4 + TypeScript + Framer Motion + React Router |
| **Durée du projet**  | 12 sessions                                                                   |
| **Progression**      | Première review — pas de comparaison possible                                 |

---

## Évaluation par axe

### 1.1 Structure & organisation des fichiers — 3.5 / 5

Organisation solide : `components/`, `pages/`, `hooks/`, `utils/`, `types/`, `data/` — tout est là et bien séparé. C'est au-dessus du standard junior sur ce point.

**Deux problèmes :**

**Fichiers morts du template Vite**
`src/assets/react.svg` et `src/assets/vite.svg` sont des restes du scaffold. Rien n'importe ces fichiers. Ils n'ont pas leur place dans un projet soumis.

**Incohérence nom de fichier / export**
Le fichier s'appelle `Articles.tsx` (pluriel) mais exporte `function Article()` (singulier). Un lecteur qui cherche le composant `Article` ne trouvera pas d'emblée où regarder.

---

### 1.2 Nommage — 4 / 5

PascalCase sur les composants, camelCase sur les fonctions, constantes module-level en UPPER_SNAKE_CASE (`GAP`). Noms en anglais, intentionnels et descriptifs. `solveMasonry`, `useColumns`, `getCorrectPath`, `goBack`, `goNext` : tous lisibles sans ambiguïté.

**Un seul défaut repéré :**
Faute de frappe dans un className — `"Progession-bar"` (`Articles.tsx:249`) au lieu de `"Progression-bar"`.

---

### 1.3 Commits — 3 / 5

Le format Conventional Commits est appliqué, les scopes existent, les commits sont en général atomiques. C'est le niveau de base attendu.

**Ce qui ne va pas :**

**Casse des scopes inconsistante**
`(A11y)`, `(Animation)`, `(Articles)`, `(responsive)`, `(css)` — certains en PascalCase, d'autres en minuscules. La convention standard est tout en minuscules.

**`!` (breaking change) mal placé**
`fix(readme)!:add proper readme` — le `!` signifie _breaking change_, ce qui n'a aucun sens pour un fix de README.

**`fix:` utilisé pour un refactor majeur**
`fix(Article) : refactorisation of animation...` — c'est un `refactor:`, pas un `fix:`. Un fix corrige un comportement cassé ; une refactorisation restructure sans changer le comportement observable.

**Fautes dans les messages**
`"clod modal"` (close), `"wrapp into a function"`, espace avant le `:` dans un message.

**Un message contient du WIP visible**
`"need to fix some hover and make a proper readme"` dans un commit `feat:` — ça documente de la dette dans l'historique au lieu de la résoudre avant de committer.

---

### 1.4 Lisibilité du code — 3 / 5

Les fichiers courts sont impeccables : `Layout.tsx`, `Cards.tsx`, `data/index.ts`, `generatePath.ts`, `useColumns.ts` sont tous lisibles du premier coup. Le commentaire architectural en tête d'`Articles.tsx` (session 11) est une bonne habitude.

**Ce qui nuit à la lisibilité :**

**`Articles.tsx` est un composant de 294 lignes avec 5 responsabilités**
Modal lightbox, navigation back/next, logique de slideshow, resize listener, et animation. Ce n'est pas encore dans les critères Niveau 2, mais c'est la principale source de dette lisible dans ce projet.

**Classes Tailwind illisibles**
Exemple réel, ligne 189 :

```tsx
className =
  "flex flex-col  items-center justify-center w-full p-6 md:p-10  xl:flex-row xl:mt-24 lg:gap-6 2xl:gap-36 2xl:px-24 xl:h-156 max-w-93.75 md:max-w-3xl xl:max-w-360 ";
```

Double espace intérieur, espace trailing en fin de string. À cette longueur, impossible de lire rapidement ce que fait ce composant visuellement.

**Commentaire en anglais approximatif** (ligne 77) :

```tsx
// location.state allow state of modal to be share between urls otherwise isOpen(false)
```

Un commentaire mal formulé nuit à la compréhension plutôt qu'il ne l'aide.

---

## ✅ 3 priorités pour ce projet

### Priorité 1 — Commits : cohérence des scopes et sémantique des types

**Le problème :** casse mixte sur les scopes, `fix:` utilisé pour un `refactor:`, un `!` de breaking change sorti de contexte.

**Ce que tu travailles dès le prochain projet :** avant chaque commit, une question rapide —
_est-ce que c'est un `fix:` (comportement cassé → réparé), un `feat:` (nouvelle capacité), un `refactor:` (restructuration sans changement de comportement), ou un `chore:` ?_
Et les scopes en minuscules, systématiquement.

---

### Priorité 2 — Fichiers morts à supprimer avant soumission

`src/assets/react.svg` et `src/assets/vite.svg` ne doivent jamais se retrouver dans un projet soumis.

**Checklist de démarrage à intégrer :** après le scaffold, supprimer immédiatement les fichiers template (`react.svg`, `vite.svg`, contenu de `App.css`, composant `HelloWorld` si présent).

---

### Priorité 3 — Classes Tailwind longues : les nommer ou les découper

Une classe de 150 caractères sur une ligne n'est pas lisible. Deux options valables :

```tsx
// Option A — variable intermédiaire
const wrapperClass = "flex flex-col items-center ...";
<SlideWrapper className={wrapperClass} ... />

// Option B — cn() avec groupes logiques
className={cn(
  "flex flex-col items-center justify-center w-full",
  "p-6 md:p-10",
  "xl:flex-row xl:mt-24 xl:h-156",
  "max-w-93.75 md:max-w-3xl xl:max-w-360"
)}
```

Choix à toi — mais l'objectif est qu'on puisse lire la structure visuelle du composant sans décoder une ligne de 150 chars.

---

## 📋 Backlog de progression

_À traiter dans les projets suivants — pas maintenant._

| Axe              | Observation                                                                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1.2 Nommage]    | Faute de frappe `"Progession-bar"` dans `Articles.tsx:249` — corriger avant le prochain push                                                                                        |
| [1.1 Structure]  | Incohérence `Articles.tsx` (fichier) / `Article` (export) — harmoniser : soit `Article.tsx`, soit le composant s'appelle `Articles`                                                 |
| [2.1 Composants] | `Articles.tsx` cumule 5 responsabilités — modal, navigation, slideshow, resize, animation. À découper en hooks ou sous-composants dans le prochain projet de complexité équivalente |
| [2.3 État]       | `isPlaying` géré dans `Layout` et passé via `useOutletContext` — pattern fonctionnel mais à surveiller : l'état appartient-il vraiment au Layout ou à une couche plus proche ?      |

---

## 📊 Score global

| Axe                          | Score       |
| ---------------------------- | ----------- |
| 1.1 Structure & organisation | 3.5 / 5     |
| 1.2 Nommage                  | 4 / 5       |
| 1.3 Commits                  | 3 / 5       |
| 1.4 Lisibilité               | 3 / 5       |
| **Moyenne**                  | **3.4 / 5** |

---

## Verdict

Niveau junior solide, proche du standard professionnel sur le nommage. La structure de fichiers est bonne. Les deux axes qui tirent le score vers le bas — commits et lisibilité — ont des corrections concrètes et rapides disponibles. Ce n'est pas du code qui fait peur ; c'est du code qui montre que les fondations sont là et que ce sont les habitudes de discipline (commit, nettoyage, longueur de ligne) qui manquent encore de régularité.

La partie technique du projet — `solveMasonry`, `SlideWrapper`/`enterDir`/`exitDir`, `AnimatePresence` — est clairement au-dessus du niveau junior standard. Ça se voit dans le code.

**Les 3 priorités sont toutes corrigeables en moins d'une session au démarrage du prochain projet.** Aucune ne concerne de l'architecture à repenser — c'est du polish et de la discipline. Le plus utile maintenant : intégrer la checklist de démarrage comme réflexe, pas comme chose à se rappeler.
