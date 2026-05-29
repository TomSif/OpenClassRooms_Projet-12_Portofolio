## Session 2026-05-11 — Migration API REST Countries v2 → v3.1 & architecture Context

### ✅ Étapes accomplies

- Branche `feat/api-v3-migration` créée et mergée sur `main`
- `type Country` mis à jour pour v3.1 : `name.common`, `name.nativeName`, `cca3`, `tld`, `flags.png`, `currencies` et `languages` en `Record`
- `CountrySummary` créé : type allégé pour le fetch `/all` (7 champs, limite API)
- `CountryMapEntry` créé : type minimal `{cca3, name: {common}}` pour la résolution des borders
- `CountriesProvider` migré vers `/v3.1/all?fields=...` avec `CountrySummary[]`
- `CountryContext` mis à jour : `CountrySummary[]` + exposition de `loading` et `error`
- `Home` et `CountryCard` corrigés pour v3.1 (accès `name.common`, `flags.png`, `capital.join`)
- `CountryDetail` refactorisé : fetch local `/v3.1/alpha/{cca3}` + `Promise.all` pour les borders
- `Object.values(nativeName)[0]?.common` pour afficher le native name
- `Object.values(languages).join(", ")` et `Object.entries(currencies)` pour les listes
- `loading` et `error` déplacés du Provider vers les consommateurs (`Home`)
- 6 commits atomiques sur la branche, push + soumission FM

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `git checkout -b` — créer et basculer en une commande | Nouvelle | Premier usage conscient des branches git |
| Commits atomiques — un commit = un changement cohérent | Nouvelle | Appliqué spontanément sur toute la session |
| Limite 10 champs sur `/all`, pas sur `/alpha/{code}` | Nouvelle | Découvert par erreur 400, résolu par diagnostic curl |
| Types distincts pour données partielles (`CountrySummary`, `CountryMapEntry`) | Nouvelle | Pattern bien compris après explication du problème de type |
| `Promise.all` pour deux fetch en parallèle | Nouvelle | Écrit sans aide après explication du besoin |
| `Object.values()` / `Object.entries()` sur un `Record` TypeScript | Nouvelle | Appliqué correctement sur `currencies` et `languages` |
| `response.json() as Country[]` — typer la réponse fetch | Révisée | Ajouté après avertissement FM |
| Exposer `loading`/`error` via Context plutôt que early returns dans le Provider | Nouvelle | Concept compris après explication du problème architectural |

### ⚠️ Notions faussement acquises détectées

- **Comportement du endpoint `/alpha/{code}` avec `?fields`** : croyait qu'il retournait toujours un tableau — en réalité retourne un objet direct quand `?fields` est spécifié. Diagnostiqué via `console.log` après bug silencieux.

### 🔄 Étapes restantes

- Tests — reportés volontairement, à aborder sur un projet dédié
- **Projet soumis et clos sur Frontend Mentor.**

### 📈 Évaluation de session

- **Points solides :** diagnostic par curl (erreur 400 → champ invalide → limite API), commits atomiques appliqués sans rappel, `Promise.all` écrit proprement, `Object.values/entries` sur les Records bien utilisés
- **Points fragiles :** comportement des endpoints REST selon les paramètres (array vs objet) — pas instinctif, nécessite vérification
- **Priorité pour la prochaine session :** (1) Corrections visuelles post-maquette, (2) Premier regard sur les tests unitaires si motivé

### 💬 Notes de contexte

- Double fetch dans `CountryDetail` (`Promise.all`) choisi à la place du Context pour les borders — décision pragmatique, fonctionne mais crée un appel API redondant à chaque navigation détail
- Note FM plafonnée à 6.8 à cause de l'absence de tests — décision consciente de reporter les tests à un projet dédié
- `git checkout -b` premier usage réel des branches — pattern branche de feature → merge → main maintenant acquis

---

## Session 2026-05-10 — Borders cliquables, dark mode CountryDetail & corrections structure

### ✅ Étapes accomplies

- Border Countries rendus cliquables : `Link` vers `/country/${b}` sur chaque bouton dans `CountryDetail`
- Structure HTML corrigée sur `CountryDetail` : `li` à l'extérieur, `Link` à l'intérieur — `<a>` autour de `<li>` invalide
- Même correction appliquée sur `Home` (même problème non signalé en session précédente)
- `key` corrigé sur les borders : `b` (alpha3Code) au lieu de `index` — valeur sémantique unique
- Dark mode ajouté sur `CountryDetail` : `dark:bg-blue-950`, `dark:bg-blue-900`, `dark:text-white`
- Dark mode ajouté sur les boutons borders : `dark:bg-blue-900`
- `Link to="/"` ajouté sur le `h1` du `Header` — navigation Home depuis toutes les pages
- Composant `Fallback` créé avec dark mode et texte d'erreur

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| Structure `li > Link` vs `Link > li` — HTML valide | Nouvelle | `<a>` ne peut pas contenir `<li>` hors `<ul>` — pattern corrigé sur les deux composants |
| `key` sémantique vs `key={index}` | Révisée | Identifié spontanément que `b` (alpha3Code) est meilleur que l'index |
| `navigate(-1)` vs lien hardcodé — décision UX | Nouvelle | `navigate(-1)` correct en général, mais dépend de la présence d'un lien Home alternatif |
| `Link` sur le titre du header vers `/` | Nouvelle | Convention standard — logo/titre toujours cliquable vers Home |

### ⚠️ Notions faussement acquises détectées

- **Structure `Link > li`** : avait reproduit sur `CountryDetail` le même pattern invalide que sur `Home`, sans le détecter comme problème. Le réflexe "élément racine de la liste = l'élément de liste" n'est pas encore automatique. À noter : ce même problème était présent sur `Home` depuis la session précédente sans avoir été signalé.

### 🔄 Étapes restantes

- Passe de corrections visuelles (comparaison maquette Frontend Mentor)
- Migration API REST Countries v2 → v3.1 (décision prise en fin de session)

#### Plan de migration v3.1

3 étapes dans l'ordre :
1. Réécrire `interface Country` dans `src/types/index.ts`
2. Mettre à jour `CountriesProvider` — URL `https://restcountries.com/v3.1/all` + fetch décommenté
3. Corriger les accès aux propriétés dans `CountryCard`, `CountryDetail`, `Home`

Changements clés v2 → v3.1 :

| v2 | v3.1 |
|---|---|
| `alpha3Code` | `cca3` |
| `name` (string) | `name.common` (objet) |
| `nativeName` (string) | `name.nativeName` (objet imbriqué par code langue) |
| `flag` (URL string) | `flags.png` (objet) |
| `topLevelDomain` | `tld` |
| `currencies` (array d'objets) | `currencies` (objet keyed par code devise) |
| `languages` (array d'objets) | `languages` (objet keyed par code langue, valeur = string) |
| `capital` (string) | `capital` (array de strings) |

Point de départ : réécrire l'interface — `currencies` et `languages` sont des objets, pas des tableaux.

### 📈 Évaluation de session

- **Points solides :** dark mode appliqué de façon autonome sur `CountryDetail`, `key` sémantique identifié sans aide, raisonnement UX sur `navigate(-1)` vs Home link pertinent
- **Points fragiles :** structure HTML `Link > li` — le pattern invalide reproduit deux fois sans être détecté spontanément
- **Priorité pour la prochaine session :** (1) Corrections visuelles post-comparaison maquette, (2) Réactivation API

### 💬 Notes de contexte

- Décision wrapping borders : boutons qui passent à la ligne plutôt que débordement — correct, la maquette ne couvre pas les pays à nombreuses frontières ni les noms longs
- `navigate(-1)` conservé sur le bouton Back — justifié par l'ajout du `Link` Home sur le header
- `Fallback` créé avec dark mode — texte anglais, deux fautes corrigées ("There are", "to where you came from")

---

## Session 2026-05-09 — CountryDetail, routing & navigation

### ✅ Étapes accomplies

- Responsive et styling finalisés sur `Header`, `Home`, `CountryCard` (fait avant la session)
- `CountryDetail` structuré : `useParams<{ alpha3Code: string }>()`, `find` sur `countries`, early return si pays non trouvé
- `getBorderName` écrit : fonction dans le corps du composant, `find` + `?.name` en une ligne
- `topLevelDomain` corrigé : `.join(", ")` sans `.map()` — tableau de strings direct
- Bouton Back branché avec `useNavigate(-1)`
- Navigation cards corrigée : `onClick` sur `li` → `Link` de React Router autour de `CountryCard`
- `NavLink` remplacé par `Link` (NavLink inutile sur des cards, pas une nav principale)
- `key` déplacé du `li` vers le `Link` (élément racine de la liste)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `useParams<{ alpha3Code: string }>()` — type et comportement | Nouvelle | Compris que le générique est `string` mais React Router retourne `string \| undefined` de toute façon |
| `find()` dans le corps du composant — pas de `useMemo` ni `useEffect` | Nouvelle | Distinction correctement faite : pas d'effet de bord, pas de calcul coûteux |
| `getBorderName` — helper function dans le composant | Nouvelle | Pattern compris après décomposition du problème en deux sous-questions |
| `find()?.property` — type de retour d'un `find` | Fragile | Pas instinctif : se demander "quel est le type de retour de ce find ?" n'est pas encore automatique |
| `useNavigate(-1)` — navigation dans l'historique | Nouvelle | Syntaxe nombre vs string expliquée et comprise |
| `Link` vs `NavLink` vs `navigate()` — quand utiliser quoi | Nouvelle | `Link` pour URL connue à l'avance, `navigate()` pour navigation conditionnelle, `NavLink` pour nav active |
| `key` sur l'élément racine de la liste, pas un enfant | Révisée | Erreur corrigée sans hésitation après signalement |

### ⚠️ Notions faussement acquises détectées

- **`find()?.property` pas instinctif** : a écrit la logique correctement après guidage, mais le réflexe "quel est le type de retour de ce find ?" n'est pas encore automatique. A eu du mal à voir que `find()` retourne un objet `Country` sur lequel on peut chaîner `.name`.

### 🔄 Étapes restantes

- Border Countries cliquables : `Link` vers `/country/:alpha3Code` sur chaque bouton de border
- Dark mode sur `CountryDetail`
- Réactiver l'API avant mise en ligne

### 📈 Évaluation de session

- **Points solides :** décomposition du problème `getBorderName` correcte après ralentissement, `useNavigate` branché sans aide, correction `Link` vs `NavLink` immédiate après explication
- **Points fragiles :** `find()?.property` — le chaînage sur le résultat d'un `find` n'est pas encore instinctif, nécessite de se poser explicitement la question du type de retour
- **Priorité pour la prochaine session :** (1) Border Countries cliquables, (2) Dark mode `CountryDetail`, (3) commit + éventuel push

### 💬 Notes de contexte

- `getBorderName` écrit en une ligne : `countries.find(c => c.alpha3Code === code)?.name` — version deux lignes avec variable nommée aussi valide pour la lisibilité
- Navigation back via `navigate(-1)` — correct car l'utilisateur peut arriver sur la page detail depuis différentes sources
- `useMemo` ne cache pas les images — le cache navigateur gère ça via les headers HTTP du CDN

---

## Session 2026-05-08 — useMemo combiné, CountryCard & grille

### ✅ Étapes accomplies

- `useMemo` combiné écrit : double filtre région + recherche avec `&&` et `(x === "" || condition)`
- Recherche partielle et insensible à la casse : `includes()` + `toLowerCase()` sur les deux côtés
- `CountryCard` créée : `interface CountryCardProps`, destructuring, `dl/dt/dd` sémantique, `capital?` optionnel
- Rendu conditionnel `{capital && ...}` pour masquer la ligne entière si capital absent
- `population.toLocaleString()` pour le formatage des nombres
- `Home` mis à jour : `CountryCard` intégré dans la grille, `filteredCountries` branché

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| Double filtre combiné dans un seul `useMemo` | Nouvelle | Pattern `(x === "" \|\| condition) && (y === "" \|\| condition)` — nécessité plusieurs échanges |
| `includes()` + `toLowerCase()` pour recherche partielle | Nouvelle | Appliqué correctement après exemple |
| Champ optionnel `?` en TypeScript | Révisée | Appliqué spontanément sur `capital` |
| Rendu conditionnel `{capital && <div>...}` | Révisée | Choix justifié correctement vs `??` fallback |
| `toLocaleString()` pour formatter les nombres | Nouvelle | Avait pensé à `NumberFormat` mais pas à `toLocaleString` |
| `dl/dt/dd` pour données structurées | Révisée | Utilisé spontanément — bon réflexe sémantique |

### ⚠️ Notions faussement acquises détectées

- **Logique booléenne combinée dans `.filter()`** : a d'abord créé deux `useMemo` séparés (un par filtre) sans voir qu'ils devaient se cumuler. Puis la condition `(filter === "" || country.region === filter)` a nécessité plusieurs échanges — la distinction entre "tester si vide pour court-circuiter" et "comparer une valeur vide" n'était pas claire.

### 🔄 Étapes restantes

- Grille responsive : confirmer breakpoints explicites sur la maquette (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`)
- Styling complet : input search, select, Header
- Page `CountryDetail` (routing + `useParams` + affichage)
- Réactiver l'API avant mise en ligne

### 📈 Évaluation de session

- **Points solides :** `CountryCard` écrite proprement du premier coup, sémantique `dl/dt/dd` spontanée, `capital?` identifié sans aide, justification `&&` vs `??` correcte
- **Points fragiles :** logique booléenne combinée dans `.filter()` — le pattern `(x === "" || condition)` a demandé plusieurs allers-retours avant d'être compris
- **Priorité pour la prochaine session :** (1) Confirmer breakpoints grille sur la maquette, (2) Styling `Home` + `CountryCard`, (3) Démarrer `CountryDetail`

### 💬 Notes de contexte

- Grille actuellement en `auto-fit minmax(16.5rem, 1fr)` — à remplacer par breakpoints explicites pour coller à la maquette
- `capital &&` choisi pour masquer la ligne entière si absent — décision correcte, hauteur fixe écartée
- `toLocaleString()` sans arguments : formate selon la locale du navigateur, suffisant pour ce challenge

---

## Session 2026-05-07 — Header, dark mode Tailwind & Home (début)

### ✅ Étapes accomplies

- `ThemeProvider` : `useEffect` ajouté pour toggler la classe `dark` sur `document.documentElement`
- `index.css` : `@variant dark (&:where(.dark, .dark *))` configuré pour le dark mode class-based
- `Header` écrit : `dark:` variant Tailwind, `onClick={toggleTheme}` direct, chemins d'images corrigés (`/images/...`)
- `Header` déplacé de `Home` vers `App` (présent sur toutes les pages)
- `Region` union type défini dans `src/types/index.ts`
- `REGIONS` constante array définie dans `Home`
- `Home` : `useState` pour `searchInput` et `filter`, `useCountries()` branché
- `useMemo` écrit pour la liste filtrée par région (cas `filter === ""` géré)
- `select` contrôlé : `value={filter}` + `onChange` + option initiale "Filter by Region"
- 3 commits : `assets(img)`, `feat(theme)`, `feat(header)` + `refactor(app)` en cours

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `dark:` variant Tailwind — class-based via `document.documentElement` | Nouvelle | Bien comprise — useEffect dans ThemeProvider, @variant dans CSS |
| `@variant dark` Tailwind v4 | Nouvelle | Syntaxe v4 spécifique, différent de `darkMode: 'class'` en v3 |
| `onClick={fn}` vs `onClick={() => fn()}` | Nouvelle | Référence directe suffisante sans arguments — compris |
| Type alias union simple vs type objet | Révisée | Gap levé : avait écrit `type Regions = { regions?: ... }` au lieu de `type Region = "..." \| "..."` |
| Type TypeScript vs valeur runtime (union type vs array) | Nouvelle | Compris que le type disparaît à l'exécution — besoin d'un tableau séparé pour itérer |
| `useMemo` — valeur mémorisée, tableau de dépendances | Nouvelle | Pattern bien appliqué, distinction avec `useCallback` faite |
| Composant contrôlé — `value` + `onChange` sur `<select>` | Révisée | Avait oublié `value` — select non-contrôlé identifié et corrigé |
| Layout partagé — Header dans App au-dessus des Routes | Nouvelle | Compris spontanément après la question sur le routing |

### ⚠️ Notions faussement acquises détectées

- **Type alias objet vs type alias valeur** : a écrit `type Regions = { regions?: "Africa" | ... }` — confusion entre la syntaxe d'un type objet (shape) et d'un type valeur (union simple). Gap levé avec explication et exemple concret.

### 🔄 Étapes restantes

- Brancher la recherche dans `Home` : `value={searchInput}` + `onChange` sur l'input, `searchInput` dans le `useMemo`
- Créer `CountryCard`
- Styler `Home` et `CountryCard` (grille responsive, dark mode)
- Page `CountryDetail`

### 📈 Évaluation de session

- **Points solides :** `useMemo` appliqué correctement du premier coup, `Region` union type compris après correction, Header architectural layout identifié sans aide, réflexe REGIONS array vs type solide
- **Points fragiles :** distinction type objet vs type valeur en TypeScript (gap réel malgré confiance affichée), composant contrôlé — `value` oublié sur le select
- **Priorité pour la prochaine session :** (1) Finir le branchement search dans Home, (2) CountryCard avec typage des props, (3) grille responsive

### 💬 Notes de contexte

- Dark mode implémenté via `document.documentElement.classList.toggle("dark", isDark)` dans ThemeProvider + `@variant dark` dans index.css — pattern propre, pas besoin de `useTheme` dans chaque composant pour le styling
- `filter === ""` = aucun filtre, tous les pays affichés — géré dans le `useMemo` avec `if (filter === "") return true`
- Search non branché volontairement en fin de session — prochain démarrage immédiat

---

## Session 2026-05-06 — Hooks, ThemeContext & branchement données locales

### ✅ Étapes accomplies

- `CountriesProvider` branché dans `main.tsx` (ordre : BrowserRouter > CountriesProvider > ThemeProvider > App)
- Hook `useCountries` écrit dans `src/hook/useCountries.ts` — pattern garde `undefined` + `return context` direct
- Hook `useTheme` écrit dans `src/hook/useTheme.ts` — même structure, même pattern
- `ThemeContext` créé avec `isDark: boolean` + `toggleTheme: () => void`
- `ThemeProvider` créé avec `useState(false)` + toggle via `(prev) => !prev`
- `ThemeProvider` branché dans `main.tsx`
- API v2 REST Countries confirmée morte (400) — paywall identifié (countrylayer.com)
- Décision : import `data.json` local pendant le dev, API réactivée avant la mise en ligne
- `.env` créé avec `VITE_API_KEY`, vérifié présent dans `.gitignore`
- Boucle infinie diagnostiquée et corrigée (`setCountries` appelé dans le corps du composant → déplacé dans `useEffect`)
- 2 commits : `chore(git): add .env to .gitignore` + `feat(data): import local data temporarily, real API to restore before release`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| Hook custom — pattern `useContext` + garde `undefined` | Révisée | Écrit sans aide pour les deux hooks, pattern ancré |
| Ce qu'on expose dans un contexte vs ce qui reste interne | Consolidée | A compris seul que `toggleTheme` doit être dans le contexte |
| Provider indépendants — ordre dans l'arbre | Nouvelle | Compris que l'ordre n'a pas d'importance fonctionnelle ici, convention = plus global à l'extérieur |
| `(prev) => !prev` pour un toggle | Révisée | Utilisé spontanément — bon réflexe |
| `useState(initialValue)` vs `setCountries()` dans le corps | Nouvelle | Gap : a appelé `setCountries` dans le corps → boucle infinie. Correction guidée |
| `throw new Error` dans un hook — où ça remonte | Nouvelle | Expliqué : remonte jusqu'à un Error Boundary, ou plante l'app si absent |
| Conventional Commits — `!` breaking change vs scope simple | Révisée | Confondait `!` avec une annotation personnelle — gap levé |
| `chore` vs `feat` pour les commits de config | Révisée | Confirmé : `.gitignore` = `chore`, pas `feat` |

### ⚠️ Notions faussement acquises détectées

- **`setCountries` dans le corps du composant** : a placé l'appel directement dans le render au lieu d'initialiser `useState` avec la valeur ou d'utiliser `useEffect` — confusion entre "modifier le state" et "initialiser le state"
- **`!` dans Conventional Commits** : croyait que `(!api)` était une annotation de scope personnalisée — en réalité signifie breaking change

### 🔄 Étapes restantes

- Commencer les composants UI : `Header`, `HomePage`, `CountryCard`
- Implémenter le dark mode Tailwind (`dark:` variant) branché sur `ThemeContext`
- Réactiver l'API avant la mise en ligne (décommenter `loading`, `error`, fetch)

### 📈 Évaluation de session

- **Points solides :** hooks custom écrits proprement sans aide, `ThemeProvider` complet du premier coup, questions architecturales pertinentes (ordre des providers, utilité du hook vs useContext direct)
- **Points fragiles :** initialisation de state vs modification en cours de render (gap conceptuel sur le cycle de vie React), Conventional Commits encore partiellement intégré
- **Priorité pour la prochaine session :** (1) Composant `Header` avec toggle dark mode, (2) `HomePage` avec grille de pays, (3) `CountryCard`

### 💬 Notes de contexte

- API v2 REST Countries derrière paywall (countrylayer.com) — clé disponible dans `.env`, 100 req/mois max → import local pendant tout le dev
- `loading` et `error` commentés dans `CountryContextType` et `CountriesProvider` — à décommenter simultanément lors de la réactivation API
- Ordre providers dans `main.tsx` : `ThemeProvider` à l'intérieur de `CountriesProvider` — fonctionnellement neutre, à inverser par convention si souhaité

---

## Session 2026-05-05 — Architecture, Types & CountriesContext

### ✅ Étapes accomplies

- Self-assessment des 9 notions complété — carte de départ établie
- Décision architecturale : Context API pour le thème (pas Zustand), deux contextes séparés
- Méthodologie "data first" ancrée : données → design → types → routes → composants
- `interface Country` définie dans `src/types/index.ts` avec sous-types `Currency` et `Language`
- `borders?: string[]` marqué optionnel (certains pays n'ont pas de frontières)
- React Router mis en place : 3 routes (`/`, `/country/:alpha3Code`, `*`)
- `CountriesContext` créé dans `src/context/CountryContext.tsx`
- `CountriesProvider` créé dans `src/context/CountriesProvider.tsx` avec `useEffect` + fetch async complet (try/catch/finally, cast `as Country[]`, URL v2 avec filtrage des champs)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| TypeScript — interface pour données API, champs optionnels | Révisée | A extrait Currency et Language en sous-types spontanément — bon réflexe |
| `?` optionnel vs `\| null` | Nouvelle | Confondait les deux — gap levé en session |
| React Router — Routes, Route, param naming | Révisée | A corrigé `:id` → `:alpha3Code` sans aide après explication |
| `createContext<T | undefined>(undefined)` | Révisée | Pattern correctement appliqué |
| useState — types explicites, valeur initiale | Révisée | `loading: true` initial corrigé après question ciblée |
| useEffect + async fetch (try/catch/finally) | Révisée | Bien exécuté malgré la rouille déclarée |
| `response.json() as Country[]` | Nouvelle | Avait oublié de typer la réponse — récupéré après rappel |
| Context shape — lecture seule, setter interne | Nouvelle | Gap conceptuel résolu : setter vit dans le Provider, pas dans le contexte |

### ⚠️ Notions faussement acquises détectées

- **Setter dans le contexte** : croyait que `setCountries` devait être exposé dans le contexte — confusion entre le mécanisme `useState` et ce qu'on choisit d'exposer aux consommateurs
- **`loading` initial à `false`** : erreur de logique — le fetch démarre au mount, donc `loading` est `true` dès le premier rendu
- **`borders?: string[] | null`** : a ajouté `| null` par réflexe sans savoir pourquoi — distinction `undefined` (champ absent) vs `null` (valeur explicite) pas encore ancrée

### 🔄 Étapes restantes

- Brancher `CountriesProvider` dans `main.tsx`
- Créer le hook `useCountries` (consommation du contexte)
- Créer `ThemeContext` + `ThemeProvider`
- Commencer les composants UI (Header, HomePage, CountryCard)

### 📈 Évaluation de session

- **Points solides :** async/await pattern dans useEffect correct sans aide, try/catch/finally propre, `instanceof Error` utilisé spontanément, sous-types Currency/Language extraits sans prompt
- **Points fragiles :** distinction `undefined` vs `null` en TypeScript, ce qu'on met dans un contexte vs ce qui reste interne, valeurs initiales de state (logique à raisonner, pas à deviner)
- **Priorité pour la prochaine session :** (1) Brancher le Provider + écrire `useCountries`, (2) ThemeContext, (3) tester que le fetch fonctionne avant de commencer l'UI

### 💬 Notes de contexte

- API v2 choisie pour cohérence avec `data.json` local — v3.1 casserait les types (alpha3Code→cca3, name imbriqué, flag emoji)
- Filtrage des champs dans l'URL API : `/v2/all?fields=name,alpha3Code,...` — payload réduit
- Méthodologie "data first" bien reçue — le blocage initial venait d'essayer de répondre à toutes les questions en même temps

---

## Session 2026-05-04 — Setup & Design Tokens

### ✅ Étapes accomplies

- `git init` + dépôt lié au remote GitHub
- Scaffold complet : Vite + React 19 + TypeScript + Tailwind CSS v4 + clsx + twMerge
- `src/lib/cn.ts` créé (combinaison clsx + twMerge)
- Prettier + `prettier-plugin-tailwindcss` installés et configurés dans `prettier.config.js` — **O1 fermé mécaniquement**
- Fichiers de base créés : `src/App.tsx`, `src/main.tsx`, `src/types/index.ts` (placeholder), `src/vite-env.d.ts`
- `data.json` inclus (250 pays — fallback si l'API est down)
- `index.html` : import Google Font Nunito Sans (400 light, 600 semibold, 800 extrabold)
- `src/index.css` : tokens couleurs via `@theme`, échelle typographique complète via `@utility` (text-preset-1 à text-preset-6-light)
- 2 commits propres : `chore: init project scaffold...` + `feat(css): add design and fonts tokens`
- 2 pushes sur le remote

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| ------ | ------ | ----------- |
| `@theme` Tailwind v4 — déclaration de tokens CSS | Révisée | Utilisé pour les couleurs et la font — syntaxe `--color-*` et `--font-*` |
| `@utility` Tailwind v4 — classes utilitaires custom | Nouvelle | Text presets définis comme utilities Tailwind — pattern spécifique à v4 |
| `clsx` + `twMerge` → `cn()` | Révisée | Utilitaire en place, pas encore utilisé en pratique |
| Prettier + prettier-plugin-tailwindcss | Révisée | Configuré d'emblée — corrige O1 mécaniquement |
| Convention commits Conventional Commits | Révisée | 2 commits bien formés, scopes corrects |

### ⚠️ Notions faussement acquises détectées

- Aucune à détecter à ce stade — session purement outillage/setup, sans écriture de logique.

### 🔄 Étapes restantes

- **Checklist de démarrage (objectifs.md) :**
  - [x] Prettier configuré
  - [x] Self-assessment des 9 notions — complété le 2026-05-04
  - [ ] O7 appliqué en français sur les 3 flux principaux (fetch, filtre, routing) avant tout code
- Définir `interface Country` dans `src/types/index.ts`
- Initialiser React Router (structure des routes `/` et `/country/:cca3`)
- Implémenter le dark mode via Context API

### 📈 Évaluation de session

- **Points solides :** Setup Tailwind v4 propre, tokens bien structurés, Prettier en place d'entrée — la leçon de Mortgage Calculator a été retenue.
- **Points fragiles :** Aucun gap détectable à ce stade — session outillage.
- **Priorité pour la prochaine session :** (1) Compléter le self-assessment des 9 notions, (2) Appliquer O7 sur l'architecture globale en français, (3) Décider prop drilling vs Context pour le dark mode.

### 💬 Notes de contexte

- Prettier installé dès le premier commit — décision correcte, ferme O1 avant que les `dark:` variants multiplient les classNames.
- `data.json` présent dans le scaffold — option de démarrer sans l'API REST Countries pour ne pas bloquer l'architecture sur des aléas réseau.
- `src/types/index.ts` est un placeholder vide — à remplir avant d'écrire le moindre composant (cf. O5 et N4).

---

## Project Kickoff — REST Countries API (2026-05-04)

**Bilan d'entrée depuis Mortgage Calculator** (voir `objectifs.md` pour le détail complet) :

| Axe | Score entrant | Cible |
|-----|---------------|-------|
| O1 Lisibilité | 3/5 — anomalie active | **4/5** — Prettier installé, doit bouger |
| O2 Nommage | 4/5 — solide | 4.5/5 |
| O3 Commits | 4/5 — quasi-acquis | 4.5/5 |
| O4 DRY / cn() | 3.5/5 — en consolidation | 4/5 |
| O5 TypeScript | 4/5 — solide | 4/5 (API types = niveau supérieur) |
| O6 A11y | Acquis | À transposer sur nouveaux composants |
| O7 Décomposition | Gap identifié tardivement | Protocole obligatoire sur ce projet |

### Self-assessment — complété le 2026-05-04

| # | Notion | Auto-évaluation | Observations |
|---|--------|-----------------|--------------|
| 1 | `useEffect` pour le data fetching (fetch + loading + error) | Rouillé | Pattern async dans useEffect flou — jamais pratiqué avec fetch |
| 2 | React Router — routes, `Link`, `useParams` | Rouillé | Logique globale OK, syntaxe pas par cœur — utilisé sur projet précédent |
| 3 | TypeScript — interfaces pour données JSON imbriquées, champs optionnels | Rouillé / prudent | Reconnaît lui-même le risque de faussement acquis — bonne posture |
| 4 | Dark mode Tailwind — variant `dark:`, toggle via état | À découvrir | — |
| 5 | Context API React (`useContext`) | À découvrir | Confondait avec "une API REST" → confusion levée en session |
| 6 | `useMemo` — quand et pourquoi | À découvrir | Ne s'en souvient plus du tout |
| 7 | Responsive grid (Tailwind) — carte de pays 250x | Acquis | Pas de stress, rappels ponctuels acceptés |
| 8 | `cn()` avec groupes logiques sur des classNames longs | En consolidation | Utilisé sur Mortgage, besoin d'ancrer l'automatisme |
| 9 | A11y sur un dropdown de filtre custom | À découvrir | Ne savait pas ce que "dropdown custom" signifiait |

### Décisions architecturales prises au kickoff

- **Gestion du thème dark/light :** Context API React (pas Zustand, pas prop drilling). Justification : 1 seul booléen à partager, Context est le pattern fondation à maîtriser avant d'introduire des libs externes. Zustand sera vu sur un projet dédié après celui-ci.
- **Données :** démarrer avec `data.json` local, passer au fetch REST API une fois l'architecture en place.