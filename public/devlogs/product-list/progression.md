## Session 2026-04-26 — Finitions visuelles + soumission

### ✅ Étapes accomplies

- Ajouté hover / focus states sur tous les éléments interactifs (user story README)
- Ajouté bordure rouge conditionnelle sur `<picture>` dans `ProductCard` via `isBordered = quantity > 0`
- Corrigé la structure `src/types/index.ts` — dossier renommé en fichier via l'explorateur VS Code

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Classe conditionnelle Tailwind via variable booléenne dérivée | Consolidée | `isBordered` local, pattern propre et lisible |
| `feat` vs `style` dans Conventional Commits | Révisée | `style` = formatage de code, pas CSS — hover states = `feat` |

### ⚠️ Notions faussement acquises détectées

- Aucune détectée cette session

### 🔄 Étapes restantes

- Attendre les corrections Frontend Mentor

### 📈 Évaluation de session

- **Points solides :** bordure conditionnelle construite sans aide, distinction `feat`/`style` bien intégrée
- **Points fragiles :** aucun observé — session courte de finition
- **Priorité pour la prochaine session :** lire les corrections FM et identifier les axes à travailler sur le prochain challenge

### 💬 Notes de contexte

- Projet soumis à FM en fin de session
- La bordure rouge sur `<picture>` était un détail design non remarqué lors de la review — bon réflexe de l'avoir adressé avant soumission

---

## Session 2026-04-27 — Compréhension post-audit + clôture

### ✅ Étapes accomplies

- Relu et discuté le rapport d'audit (score 3.6/5)
- Compris l'anti-pattern `setIsOpen` → `onOpenModal` en profondeur
- Déblocage sur `() => void` — notion faussement acquise résolue

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `() => void` — pas d'arguments + ne retourne rien | Faussement acquise | Syntaxe lue depuis le début, jamais vraiment interrogée — déblocage ce matin |
| Encapsulation via `() => void` — boîte noire | Nouvelle | Passer `() => setIsOpen(true)` empêche le consommateur d'accéder à `setIsOpen(false)` — compris via l'argument ignoré |
| `on+verb` vs setter brut comme prop | Consolidée | Lien fait entre nommage et restriction de responsabilité |
| Absence de protection en JS pur | Nouvelle | TypeScript pallie une lacune du langage — pas une lacune du développeur |

### ⚠️ Notions faussement acquises détectées

- **`() => void`** : lu depuis le début comme "une fonction qui retourne void" — la partie "pas d'arguments" et ses implications n'avaient jamais été interrogées. Compris définitivement ce matin via un exemple concret.

### 🔄 Étapes restantes

- Aucune — projet clôturé et soumis

### 📈 Évaluation de session

- **Score FM : 8.4/10** — meilleur score personnel
- **Score audit : 3.6/5** — pénalisé principalement par `setIsOpen` comme prop (régression Pomodoro P3) et double `<section>` dans le ternaire (DRY)
- **Points solides :** encapsulation comprise en profondeur, `() => void` débloqué, TypeScript vs JS pur clarifiés
- **Priorité pour le prochain projet :** `on+verb` systématique pour les callbacks, passe DRY avant commit sur les ternaires qui dupliquent du JSX structurel

### 💬 Notes de contexte

- Session de compréhension pure — pas de code écrit
- Le double `<section>` dans Cart : le user trouvait ça plus lisible — l'argument est valide, le risque réel est la maintenance (changer les 6 classes CSS deux fois)
- Projet clôturé définitivement

---

## Session 2026-04-26 — Corrections FM + soumission finale

### ✅ Étapes accomplies

- Corrigé `aria-label` sur les boutons "Add to Cart" — ajout de `product.name` pour identifier chaque bouton
- Ajouté `aria-labelledby` sur `<dialog>` + `id` sur le `<h2>` "Order Confirmed"
- Déplacé `aria-live="polite"` du heading vers le `<span>` du compteur uniquement — plus précis
- Revu toute la hiérarchie des headings : `h1` Desserts → `h2` "Your Cart" → `h3` noms d'items / noms de produits
- Ajouté `aria-modal="true"` sur le `<dialog>`
- Ajouté bouton close explicite dans `ConfirmationModal` (icône remove, `aria-label`, positionné en `absolute`)
- Supprimé `with { type: "json" }` de l'import `data.json` dans `App.tsx`
- Remplacé `<section>` par `<figure>` pour l'image produit dans `ProductCard`
- Supprimé `itemProp="price"` sans conteneur microdata
- Séparé les transitions `.img-btn` et `.img-btn img` (transform/box-shadow/background vs filter)
- Ajouté `.big-btn:focus-visible` et `.big-btn:focus-visible::after` pour les utilisateurs clavier
- Corrigé l'outline de `.img-btn:focus` : `rgba(0,0,0,0.12)` → `var(--color-rose-900)` (contraste insuffisant)
- Déplacé l'import Google Fonts de `index.css` vers `index.html` avec `<link rel="preconnect">` + `<link rel="stylesheet">`
- Corrigé la structure `src/types/index.ts` — dossier renommé en fichier via l'explorateur

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `aria-labelledby` + `id` pour nommer un dialog | Nouvelle | Lien explicite entre le dialog et son titre |
| `aria-modal="true"` | Nouvelle | Signale aux AT que le contenu derrière est inert |
| `aria-live` sur un `<span>` isolé vs heading entier | Révisée | Plus précis — n'annonce que le chiffre, pas tout le texte |
| `:focus-visible` vs `:focus` | Nouvelle | Focus clavier uniquement, pas au clic souris |
| `<figure>` vs `<section>` pour une image avec contrôle | Nouvelle | `<figure>` = unité visuelle autonome, `<section>` = subdivision thématique avec titre |
| `perf` comme type de commit | Nouvelle | Performance visible (chargement fonts) — ni `feat` ni `fix` |
| Transitions séparées par élément | Révisée | Chaque propriété animée sur l'élément qui l'utilise réellement |
| `feat` vs `style` dans Conventional Commits | Consolidée | `style` = formatage code, pas CSS |

### ⚠️ Notions faussement acquises détectées

- **Outline d'accessibilité** : `rgba(0,0,0,0.12)` était présent mais visuellement inutile — l'intention d'accessibilité était là, pas l'exécution

### 🔄 Étapes restantes

- Aucune — projet clôturé

### 📈 Évaluation de session

- **Score FM final :** 8.4 — Accessibilité 9.2 / HTML 8.2 / CSS 8.5 / JavaScript 7.7
- **Points solides :** accessibilité bien adressée, corrections appliquées proprement, hiérarchie headings reconstruite avec logique
- **Points fragiles :** 54 commits pour ce challenge — trop granulaire, certaines corrections FM auraient pu être regroupées en un seul commit
- **Priorité pour le prochain projet :** regrouper les commits de même nature en une seule intention avant de push

### 💬 Notes de contexte

- Session de 8h30 à 16h42 — longue session de corrections post-review FM
- Score 8.4 = meilleur score personnel à ce jour, plafond précédent franchi
- Deux corrections FM non traitées : faux positif sur `src/types/index.ts` (corrigé côté code, FM cache l'ancien scan) + `key` non-id (choix assumé, pas d'`id` dans `data.json`)
- 54 commits sur ce projet — fonctionnel mais trop atomique pour ce niveau de challenge

---

## Session 2026-04-25 — Responsive layout + ConfirmationModal + état vide Cart

### ✅ Étapes accomplies

- Corrigé le layout responsive : `md:flex-row` → `xl:flex-row xl:items-start`, padding adaptatif via media queries CSS dans `index.css`, `width: 100dvw` sur `.root`
- Créé `ConfirmationModal.tsx` avec `<dialog>` natif, `useRef<HTMLDialogElement>`, et deux `useEffect` distincts (contrôle `showModal()`/`close()` + cleanup event listener natif `close`)
- Câblé dans `App` : `isOpen` state, `onClose`, `onStartNewOrder` (reset `quantities` à `{}`), `isCartEmpty` dérivé de `cartItems.length`
- Ajouté état vide dans `Cart` : JSX conditionnel via `isCartEmpty` prop — illustration + message quand panier vide
- Déplacé `<main>` de `ProductList` vers `App` (refactor structural)
- Commitée l'interface `CartItem` (écrite en session précédente, pas encore commitée)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `useRef<HTMLDialogElement>` | Nouvelle | Premier usage d'une ref sur un élément DOM non-input |
| `useEffect` + `showModal()` / `close()` | Nouvelle | Synchronisation état React ↔ comportement DOM natif |
| Pattern cleanup `useEffect` : `addEventListener` + `return () => removeEventListener` | Nouvelle | Pattern de nettoyage pour éviter les fuites mémoire sur les listeners |
| `<dialog>` natif HTML | Nouvelle | Élément HTML natif pour modale — accessibilité intégrée (focus trap, Escape) |
| JSX conditionnel avec Fragment `<>` au niveau `App` | Révisée | Utilisé pour `ConfirmationModal` hors du flux `<main>` |
| Responsive Tailwind breakpoints + media queries CSS | Révisée | Mix des deux approches — Tailwind pour layout, CSS pour padding racine |

### ⚠️ Notions faussement acquises détectées

- Reconstitution depuis les commits uniquement — impossible d'évaluer honnêtement sans avoir suivi la session en direct. À compléter si tu te souviens d'un blocage.

### 🔄 Étapes restantes

- Hover / focus states sur tous les éléments interactifs (exigence README)
- Bordure rouge sur l'image produit quand l'item est dans le panier
- Extraction `CartItemCard` — duplication de JSX entre `Cart.tsx` et `ConfirmationModal.tsx`
- Corriger la structure `src/types/index.ts` — c'est un **dossier** nommé `index.ts` contenant un fichier `index.ts`, pas un fichier direct

### 📈 Évaluation de session

- **Points solides :** `ConfirmationModal` câblée de bout en bout, gestion `isOpen` / `onClose` / `onStartNewOrder` bien structurée dans `App`, commits atomiques et bien formés
- **Points fragiles :** double `useEffect` dans `ConfirmationModal` (séparation des effets pas encore intuitive), structure `src/types/index.ts` incorrecte (dossier au lieu de fichier)
- **Priorité pour la prochaine session :** hover/focus states + bordure rouge sur image produit (finitions visuelles) — et corriger la structure `src/types/`

### 💬 Notes de contexte

- Session reconstituée depuis les commits git — sans présence en direct
- Le `<dialog>` natif est utilisé avec `useRef` + `useEffect` plutôt que JSX conditionnel — choix correct pour l'accessibilité (focus trap, gestion Escape native)
- `isCartEmpty` est dérivé dans `App` et passé comme prop — cohérent avec la colocalisation de l'état

---

## Session 2026-04-24 — JSX conditionnel ProductCard + composant Cart

### ✅ Étapes accomplies

- Corrigé les `onClick` dans `ProductCard` : fonctions référencées sans appel → ajout parenthèses + argument `product.name`
- Ajouté `?? 0` fallback dans `onIncrement` et `onDecrement` dans `App` pour gérer `undefined` au premier clic
- Corrigé positionnement de `- 1` dans `Math.max(0, (prev[name] ?? 0) - 1)`
- Ajouté `onClick` sur le bouton "Add to Cart"
- Remonté l'import de `data.json` de `ProductList` vers `App`
- Corrigé le typage `data: Product` → `data: Product[]` dans `ProductListProps`
- Défini interface `CartItem` dans `types/index.ts` (`name`, `price`, `quantity`)
- Dérivé `cartItems` dans `App` via `.filter().map()` (produits avec `quantity >= 1`)
- Créé composant `Cart` : liste items, `.reduce()` pour total, bouton remove, badge carbon-neutral, bouton Confirm Order
- Câblé `removeItemFromCart` dans `App` avec `[name]: 0`
- Corrigé mutation directe `prev[name] = 0` → valeur `0` dans le spread

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Appel de fonction dans `onClick` (parenthèses + argument) | Faussement acquise | Référençait la fonction sans l'appeler — gap révélé en début de session |
| `?? 0` comme fallback pour `undefined` dans state | Nouvelle | Compris après explication sur `Record` vide et première clé absente |
| `??` vs `\|\|` | Nouvelle | Distinction sémantique comprise — `??` intercepte null/undefined uniquement |
| `Product[]` — tableau typé | Révisée | Confusion initiale sur les crochets, compris après explication interface vs tableau |
| `.filter().map()` enchaînés | Nouvelle | Logique construite progressivement — lien entre `data` et `quantities` via closure |
| Closure — accès scope parent dans callback | Nouvelle | Blocage réel sur "comment quantities est accessible dans filter" — résolu via valeurs concrètes |
| `.reduce()` pour somme | Nouvelle | Syntaxe pas constructible sans exemple parallèle — comprise après |
| Immutabilité React — mutation vs nouvel objet | Nouvelle | `prev[name] = 0` vs `[name]: 0` — distinction posée |
| `CartItem` interface dérivée | Nouvelle | Bien construite de façon autonome |

### ⚠️ Notions faussement acquises détectées

- **`onClick` et appel de fonction** : le user écrivait `onDecrement;` sans parenthèses ni argument — la fonction était référencée, pas appelée. Pattern pas encore automatique.
- **Closure** : le lien entre `quantities` (scope `App`) et le callback de `.filter()` n'était pas évident — nécessité de l'objectiver avec des valeurs concrètes pour que ça rentre.

### 🔄 Étapes restantes

- Modale "Order Confirmed" — récapitulatif (thumbnail + nom + quantité + sous-total) + total + bouton "Start New Order" (reset)
- Câbler le bouton "Confirm Order" dans `Cart` pour ouvrir la modale
- Extraire un composant `CartItemCard` partagé entre `Cart` et la modale
- Responsive layout mobile/desktop finalisé
- État vide du Cart (affichage quand aucun item)

### 📈 Évaluation de session

- **Points solides :** `CartItem` interface construite sans aide, `removeItemFromCart` câblé correctement, `reduce` adapté après un seul exemple, raisonnement architectural autonome (pas de re-filtre dans Cart, `cartItems` dérivé dans App)
- **Points fragiles :** closure pas encore intuitive, `.reduce()` syntaxe pas restituable sans exemple, `onClick` appel de fonction pas encore automatique
- **Priorité pour la prochaine session :** modale "Order Confirmed" — premier usage de JSX conditionnel au niveau App (afficher/masquer), reset du state, et extraction du composant `CartItemCard`

### 💬 Notes de contexte

- Le user apprend par modèles mentaux avec valeurs concrètes — les explications abstraites ne rentrent pas sans exemples objectivés
- Session longue (~6h) — beaucoup de notions nouvelles en une fois, certaines fragiles
- `cartItems` est dérivé à chaque render depuis `quantities` + `data` — pas de state séparé pour le panier

---

## Session 2026-04-23 — Câblage état quantities App → ProductCard

### ✅ Étapes accomplies

- Corrigé le `key` dupliqué sur `<li>` et `<ProductCard>` dans `ProductList`
- Vérifié le fonctionnement du `<picture>` responsive (images changent bien au refresh)
- Défini l'interface `ProductCardProps` avec `quantity: number`, `onIncrement: (name: string) => void`, `onDecrement: (name: string) => void`
- Défini l'interface `ProductListProps` avec `quantities: Record<string, number>` + callbacks
- `ProductList` passe `quantity={quantities[product.name]}` à chaque `ProductCard`
- `App` : `useState<Record<string, number>>({})`, `onIncrement`, `onDecrement` avec `Math.max(0, ...)` pour borner à zéro
- Commit atomique : `feat(state): handle quantities props from App to ProductCard`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `key` sur l'élément racine du `map` uniquement | Révisée | Doublon `<li>` + `<ProductCard>` corrigé |
| `<picture>` responsive — test au refresh | Révisée | Le browser cache l'image initiale — test valide via DevTools + refresh |
| Callbacks typés `onXxx: (name: string) => void` | Révisée | Écrit correctement sans aide après clarification du flux |
| `Record<string, number>` | Révisée | Logique comprise après hésitation initiale sur tableau vs objet |
| `useState<Record<string, number>>({})` | Nouvelle | Syntaxe dense — comprise après construction guidée |
| Computed property names `{ [name]: valeur }` | Révisée | Utilisé dans `onIncrement` / `onDecrement` sans blocage |
| `Math.max(0, prev[name] - 1)` pour borner | Nouvelle | Préféré à un `if` — pattern retenu |
| Flux descendant props / remontée callbacks | Révisée | Câblage mental long à poser — compris via analogie `addEventListener` |

### ⚠️ Notions faussement acquises détectées

- **Flux des callbacks** : le sens de circulation données / fonctions n'était pas câblé intuitivement. La confusion "c'est `ProductList` qui appelle `onIncrement`" révèle que ce pattern n'est pas encore automatique — il faut encore le raisonner explicitement.
- **`useState` avec type générique imbriqué** : la syntaxe `useState<Record<string, number>>` n'était pas constructible sans aide — lue et comprise, pas encore restituable d'instinct.

### 🔄 Étapes restantes

- JSX conditionnel dans `ProductCard` : bouton "Add to Cart" ou contrôle +/− selon `quantity > 0`
- Composant `Cart` — liste, quantité, prix unitaire, total, suppression par item
- Modale "Order Confirmed" — récapitulatif + reset
- Responsive layout mobile/desktop finalisé

### 📈 Évaluation de session

- **Points solides :** raisonnement architectural autonome (pas de boolean redondant, colocalisation de l'état, dérivation de `isInCart`), computed property names sans blocage, commit bien formé après correction
- **Points fragiles :** syntaxe des types génériques imbriqués, flux callback pas encore automatique
- **Priorité pour la prochaine session :** JSX conditionnel dans `ProductCard` (`quantity > 0` → contrôle +/−) — premier usage réel de `isInCart` dérivé

### 💬 Notes de contexte

- `product.name` utilisé comme identifiant faute d'`id` dans `data.json` — décision documentée
- `onDecrement` borné avec `Math.max` — pattern plus élégant qu'un `if`, retenu

---

## Session 2026-04-21 — Setup scaffold + design tokens

### ✅ Étapes accomplies

- Initialisation du projet avec Vite + React 19 + TypeScript
- Configuration Tailwind CSS v4 (`@import "tailwindcss"`)
- Design tokens définis dans `src/index.css` via bloc `@theme` : couleurs (red, green, rose-50→900), font-family (Red Hat Text via Google Fonts), text-presets (1→4-bold) avec line-height et font-weight, spacing (50→1100)
- Utilitaire `cn()` mis en place dans `src/lib/cn.ts` (clsx + tailwind-merge)
- `data.json` placé dans `src/data/` (9 produits, structure image imbriquée)
- `index.html` configuré (favicon, titre, lang)
- `App.tsx` au minimum — titre placeholder uniquement

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Tailwind CSS v4 — syntaxe `@theme` | Nouvelle | Setup réalisé, logique des custom properties Tailwind v4 exposée |
| `cn()` / clsx + tailwind-merge | Révisée | Mis en place, pas encore utilisé en contexte |

### ⚠️ Notions faussement acquises détectées

- Aucune — session de setup uniquement, pas de code fonctionnel écrit

### 🔄 Étapes restantes

- Créer `src/types/index.ts` — interfaces `ProductImage` et `Product` dérivées de `data.json`
- Créer `src/utils/formatPrice.ts` — fonction utilitaire de formatage des prix
- Composant `ProductCard` — affichage statique d'un produit
- Composant `ProductList` — rendu par `map` depuis `data.json`
- Gestion de l'état du panier dans `App` — `useState` avec `Record<string, CartItem>`
- Bouton "Add to Cart" + contrôle quantité (+/−)
- Composant `Cart` — liste, total, suppression par item
- Modale "Order Confirmed" — récapitulatif + reset
- Responsive layout mobile/desktop

### 📈 Évaluation de session

- **Points solides :** mise en place propre du scaffold, tokens design bien structurés en v4
- **Points fragiles :** aucun observé — session sans écriture de logique
- **Priorité pour la prochaine session :** interfaces TypeScript (`ProductImage`, `Product`) dérivées du JSON — premier exercice concret sur le typage data-first

### 💬 Notes de contexte

- Session courte volontaire (setup uniquement) — cohérent avec le rythme de travail établi
- Tailwind v4 confirmé (non v3 comme noté dans le kickoff initial) — les tokens sont en `@theme`, pas dans `tailwind.config.js`

---

## Project Kickoff — Product List with Cart

### Contexte

| | |
|---|---|
| **Challenge** | Product List with Cart — Frontend Mentor |
| **Stack** | React 19 + Vite + Tailwind CSS v3 + TypeScript + clsx + tailwind-merge |
| **Numéro de review** | N°4 — Niveau 1 + **Niveau 2 introduit** |
| **Review précédente** | Results Summary Component — 3.9/5 |

---

### Ce que ce challenge va demander

- Lire `data.json` — 9 produits, structure imbriquée (image mobile/desktop/thumbnail, category, name, price)
- Liste de produits renderisée par map, image responsive
- Bouton "Add to Cart" — état par produit (ajouté / non ajouté), contrôle quantité +/−
- Panier — liste, quantité, prix unitaire, total, suppression par item
- Modale "Order Confirmed" — récapitulatif + "Start New Order" remet tout à zéro
- Layout responsive mobile/desktop

---

### Auto-évaluation initiale

> À remplir avant de commencer (Confiant / Rouillé / Pas sûr)

| Notion | Auto-éval | Réalité observée |
|---|---|---|
| Lire `data.json` + dériver interfaces TypeScript | Pas sûr | |
| Types fonction dans interface (`onXxx: (x: Type) => void`) | Rouillé | |
| `Array.map()` en JSX avec `key` | Confiant | |
| `useState` simple (booléen, nombre) | Confiant | |
| `useState` avec objet ou tableau (cart) | Pas sûr | |
| Computed property names `{ [key]: value }` | Pas sûr | |
| `useReducer` pour état complexe | — | |
| Props + callbacks typés (`interface XxxProps`) | Rouillé | |
| `Record<K, V>` | Rouillé | |
| Composant à responsabilité unique | Confiant | |
| Colocalisation de l'état | Pas sûr | |
| Éviter la duplication JSX/logique | — | |
| Commits atomiques + Conventional Commits | Confiant | |
| `cn()` avec classes conditionnelles | Rouillé | |

---

## Plan pédagogique

Ce projet est le premier évalué en **Niveau 1 + Niveau 2**. Le plan est structuré en deux couches d'exigence distinctes.

---

### COUCHE 1 — Socle d'intransigeance (Niveau 1)

Ces quatre axes sont évalués depuis le projet 1. Après 3 reviews, ils ne sont plus négociables. Une régression ici serait un signal sérieux.

**Cibles minimales absolues :**

| Axe | Acquis actuel | Cible ce projet | Statut |
|---|---|---|---|
| 1.1 Structure & organisation | 4/5 | 4/5 | Maintenir |
| 1.2 Nommage | 4.5/5 | 4.5/5 | Maintenir |
| 1.3 Commits | 3.5/5 | **4/5** | À franchir — 4e tentative |
| 1.4 Lisibilité | 3.5/5 | **4/5** | À franchir |

#### 1.3 Commits — franchir 4/5 (récurrent depuis 3 reviews)

Les erreurs sont connues et documentées. Ce ne sont pas des erreurs d'architecture — ce sont des automatismes qui manquent encore :

- `doc` au lieu de `docs` — apparu dans les deux derniers projets
- Scope avec majuscule : `feat(A11y)` → `feat(a11y)`
- Espace manquante : `fix(a11y):add` → `fix(a11y): add`
- Commits fourre-tout avec `&` entre deux intentions

**Règle de travail :** avant chaque commit, relecture de 10 secondes — type correct ? scope en minuscules ? espace après `:` ? une seule intention ?

#### 1.4 Lisibilité — franchir 4/5

Règle unique à ancrer : **un commentaire explique le POURQUOI, jamais le WHAT**.

Test à appliquer avant d'écrire un commentaire :
> "Est-ce que ce commentaire explique une contrainte cachée, un comportement non-évident, un workaround — ou est-ce qu'il paraphrase ce que le code dit déjà ?"

Dans le dernier projet : 5 commentaires supprimables dans `App.tsx`, aucun n'expliquait un POURQUOI.

---

### COUCHE 2 — Niveau 2 introduit (projets 4–6)

Ces quatre axes sont **évalués pour la première fois** sur ce projet. L'objectif n'est pas la perfection — c'est d'en prendre conscience et de poser les bases. La montée en exigence se fait sur 3 projets.

**Trajectoire sur 3 projets :**

| Axe | Ce projet (N°4) | Projet N°5 | Projet N°6 |
|---|---|---|---|
| 2.1 Composants React | Conscience — 3/5 | Maîtrise — 3.5/5 | Solide — 4/5 |
| 2.2 TypeScript | Conscience — 3.5/5 | Maîtrise — 4/5 | Solide — 4.5/5 |
| 2.3 Gestion de l'état | Conscience — 3/5 | Maîtrise — 3.5/5 | Solide — 4/5 |
| 2.4 DRY & réutilisabilité | Conscience — 3/5 | Maîtrise — 3.5/5 | Solide — 4/5 |

#### 2.1 Composants React — responsabilité unique

**Ce que ça veut dire ici :**
- Un composant = une responsabilité. `ProductCard` affiche un produit. Il ne calcule pas le total du panier.
- La logique métier ne va pas dans le JSX — pas de ternaires complexes ou de calculs dans le `return`
- Le découpage est pertinent : ni composants trop gros (tout dans `App`), ni over-engineered (composant pour 3 lignes)

**Signal d'alerte :** si un composant dépasse ~80 lignes ou fait deux choses distinctes, c'est le moment de questionner le découpage.

#### 2.2 TypeScript — pas de `any`, interfaces complètes

**Ce qui sera travaillé :**
- Dériver les interfaces directement de `data.json` (approche data-first — confirmée efficace)
- Typer **toutes** les props : pas de composant sans `interface XxxProps`
- Typer les **callbacks** : `onAddToCart: (id: string) => void` — syntaxe encore fragile, à exercer sur chaque composant
- Pas de `any` — si TypeScript résiste, chercher le bon type plutôt que de contourner

**Fragilité documentée à travailler :**
Le pattern `onXxx: (param: Type) => void` dans une interface était systématiquement faux sans aide sur les deux derniers projets. Ce projet crée plusieurs occasions réelles de l'écrire : `onAddToCart`, `onRemove`, `onIncrement`, `onDecrement`.

#### 2.3 Gestion de l'état — colocalisation

**Principe :** l'état vit au plus près de là où il est utilisé.

**Ce que ça implique concrètement ici :**
- L'état du panier est partagé par plusieurs composants (`ProductList`, `Cart`, `Modal`) → il monte dans `App` ou dans un contexte — justifié
- L'état local (ex : hover d'un bouton) reste dans le composant — il ne monte pas sans raison
- Avant d'écrire `useState` dans `App`, se demander : est-ce que d'autres composants ont besoin de cette donnée ?

**Choix architectural à justifier avant d'écrire :** `useState` avec `Record<string, CartItem>` ou `useReducer` avec actions typées ? Les deux sont valides — mais le choix doit être posé et expliqué, pas subi.

**Note :** les computed property names (`{ ...cart, [id]: ... }`) sont une zone de confusion documentée. Ce pattern apparaîtra forcément dans la gestion du panier.

#### 2.4 DRY & réutilisabilité — pas de duplication évidente

**Ce projet implique plusieurs patterns répétés :**
- Bouton +/− dans le panier et dans le contrôle quantité sur la carte produit → même composant ?
- Prix formaté (`$6.50`) affiché à plusieurs endroits → fonction utilitaire `formatPrice`

**Ce qui sera surveillé :**
- Duplication de JSX identique dans deux composants différents
- Logique dupliquée (même calcul écrit deux fois)
- Les utilitaires répétés sont extraits dans `src/utils/`

**Niveau d'exigence ce projet :** signaler les duplications évidentes, pas les optimiser à l'extrême. L'objectif est de développer le réflexe de les voir.

---

### Points fragiles hérités — à surveiller activement

Ces fragilités sont documentées depuis les projets précédents. Elles apparaîtront dans ce challenge.

| Fragilité | Où elle va réapparaître |
|---|---|
| `(param: Type) => void` dans interface | Chaque composant avec callback |
| Computed property names `{ [key]: val }` | Update du panier |
| Import path `../src/` au lieu de `./` | Premier import de `data.json` |
| Commentaires WHAT | `App.tsx` ou composants complexes |
| `doc` vs `docs` dans les commits | Premier commit de documentation |

---

### Cibles de review — vision complète

| Axe | Results Summary | Cible ce projet | Note |
|---|---|---|---|
| 1.1 Structure | 4/5 | 4/5 | Maintenir |
| 1.2 Nommage | 4.5/5 | 4.5/5 | Maintenir |
| 1.3 Commits | 3.5/5 | **4/5** | Récurrent — doit passer |
| 1.4 Lisibilité | 3.5/5 | **4/5** | Commentaires WHY seulement |
| 2.1 Composants React | — | 3/5 | **Nouveau** — conscience |
| 2.2 TypeScript | — | 3.5/5 | **Nouveau** — fragilité déjà connue |
| 2.3 Gestion de l'état | — | 3/5 | **Nouveau** — colocalisation |
| 2.4 DRY | — | 3/5 | **Nouveau** — voir les duplications |

---
