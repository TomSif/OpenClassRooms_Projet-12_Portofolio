## Project Wrap-up — 2026-03-16 — BMI Calculator ✅

### Bilan final

**8 sessions** — 2026-03-09 → 2026-03-16 (dont 1 jour de repos volontaire).

### Évaluation avant/après des notions clés

| Notion | Kickoff | Fin de projet |
| --- | --- | --- |
| Architecture composants React | Ancré | Ancré — confirmé |
| `useState` + gestion d'inputs | Ancré | Ancré — confirmé |
| Callbacks parent ↔ enfant | Fragile | Amélioré — erreur `onChange={fn()}` faite 1x puis corrigée |
| Tailwind v4 — layout, responsive | Ancré | Ancré — CSS Grid staircase maîtrisé |
| Logique JS pure | Solide | Solide — confirmé |
| TypeScript — `interface` pour props | Zéro | Acquis — écrit sans aide dès session 3 |
| TypeScript — union types | Zéro | Acquis — appliqué et compris |
| TypeScript — `useState<Type>` | Zéro | Acquis — appliqué correctement |
| TypeScript — `interface extends` | Zéro | Acquis — compris en profondeur |
| CSS Grid avancé | Fragile | Consolidé — grille 6 colonnes + offsets via index |
| a11y — ARIA live regions, aria-describedby | Zéro | Nouvelle — appliqué en fin de projet |

### Points fragiles persistants à surveiller sur le prochain projet

- `onChange={fn()}` vs `onChange={() => fn()}` — erreur répétée sur 3 projets consécutifs. Pas encore automatique.
- `--color-*` singulier Tailwind v4 — erreur verbalement connue, pas ancrée en pratique (3 occurrences)

---

## Session 2026-03-16 — CSS finition : inputs, radios, labels, spinners

### ✅ Étapes accomplies

- Fix breakpoint section limitations — staircase uniquement sur `xl:`, résout le bug `1024–1300`
- Décision : texte dynamique section 2 abandonné — challenge ne fournit pas de textes alternatifs
- `focus:outline-none` ajouté sur `InputField` — corrige le focus invisible (outline natif masquait le border)
- Hover state sur inputs — `hover:border-blue-500` fonctionnel
- Radios custom — `appearance-none` + taille fixe `w-3.75 h-3.75` + `translate` + `margin-right` pour compenser le décalage layout lié au `ring`
- Labels metric sans className détectés et corrigés — `height` et `weight` n'avaient aucune classe
- Spinners `<input type="number">` supprimés via `index.css` — pseudo-éléments `-webkit-` et `-moz-appearance`
- CSS déclaré terminé — prêt pour déploiement

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `focus:outline-none` — supprimer l'outline natif browser | Nouvelle | Outline natif masquait le border change — diagnostic correct |
| `appearance-none` pour custom radio | Nouvelle | Supprime le style natif browser — point d'entrée obligatoire pour styler les radios |
| `ring` + `ring-offset` pour simuler un double cercle | Nouvelle | Pattern expliqué — non utilisé finalement (pas sur la maquette) |
| `translate` + `margin` pour compenser décalage layout | Nouvelle | Solution non-conventionnelle mais fonctionnelle — résout le shift dû au changement de taille au `checked:` |
| Pseudo-éléments `-webkit-inner/outer-spin-button` et `-moz-appearance` | Nouvelle | Pas couverts par Tailwind — à mettre dans `index.css`, varient par browser |
| Debug DOM : classes absentes → mauvais élément inspecté | Consolidée | A identifié seul que les labels metric n'avaient pas de className |

### ⚠️ Notions faussement acquises détectées

- Aucune cette session.

### 🔄 Étapes restantes

- ~~README de solution~~ ✅
- ~~Déploiement Vercel~~ ✅
- ~~Soumission Frontend Mentor~~ ✅
- ~~Peer review~~ ✅

### ✅ Corrections a11y post-soumission FM

- `<form>` remplacé par `<div>` — pas de soumission réelle, `<fieldset>` suffit pour le groupement sémantique
- `aria-describedby="${name}-unit"` ajouté sur les inputs + `id="${name}-unit"` sur les spans unité dans `InputField.tsx`
- `role="status" aria-live="polite"` ajouté sur le container résultat BMI

### 📈 Évaluation de session

- **Points solides :** Diagnostic autonome sur le focus invisible (a identifié l'outline natif sans aide). Debug "classes absentes" résolu seul en croisant code et inspecteur. Décisions CSS pragmatiques et assumées. A questionné la solution "hidden submit button" et trouvé la bonne réponse (`<div>` à la place du `<form>`).
- **Points fragiles :** Aucun gap technique bloquant — session de finition fluide.
- **Priorité pour la prochaine session :** Prochain projet TypeScript.

### 💬 Notes de contexte

- Radio styling : solution `translate` + `margin-right` est order-dependent et fragile si le layout change — acceptable pour un challenge statique
- `index.css` contient maintenant des règles globales hors Tailwind pour les spinners — pattern à retenir pour les cas non couverts par les utilitaires

---

## Session 2026-03-15 — Pause / Point de planification

### ✅ Étapes accomplies

- Aucun code — journée de repos volontaire (3h de sommeil, décision de ne pas coder)
- Point de bilan fait : état du projet évalué, plan précis posé pour finir demain

### 🔄 Plan de finition — 2026-03-16

**Matin — CSS + données dynamiques :**
- Fix breakpoint intermédiaire `1024–1300` sur la section limitations (staircase qui se casse)
- Hover + focus states sur les inputs et les radios du Calculator (requis FM)
- Responsive global — passer à travers tous les breakpoints une dernière fois
- Trancher la question du texte section 2 : statique (design copy) ou dynamique (relié au state Calculator)

**Après-midi — Déploiement + soumission FM :**
- Déploiement sur Vercel
- README de solution complété (`README-template.md`)
- Soumission sur Frontend Mentor

### 📈 Contexte

- **Rythme respecté** : 7e jour sur le projet, objectif une semaine — tenu
- **Bonne décision** : reporter plutôt que coder en état de fatigue. Pas de code = pas de régression.

---

## Session 2026-03-14 — App.tsx : section limitations + layout CSS grid staircase

### ✅ Étapes accomplies

- Section limitations ajoutée dans `App.tsx` — `.filter((card) => !card.isIconResponsive).map()`
- `grid` manquant sur le `<ul>` détecté et corrigé (gap ne fonctionnait pas)
- `box-shadow` + `border-radius` conditionnels sur `InfoCard` via ternaire dans `className` — pattern className forwarding appliqué
- `className?: string` ajouté dans `infoCardsProps` (InfoCard.tsx) — prop optionnelle avec fallback `?? ""`
- Root element de `InfoCard` changé de `<div>` à `<li>` — enfant direct du `<ul>` grid container
- Layout staircase desktop — problème complexe résolu : grille 6 colonnes, `col-span-2` par card, `col-start` ciblés via `index` du `.map()`
- Texte "Limitations of BMI" sorti du flux en `lg:absolute lg:top-0 lg:left-0` — section en `relative`
- `last:col-start-2` / trick "4 colonnes virtuelles" pour centrer le dernier élément (md) compris et appliqué
- Variantes Tailwind v4 `nth-of-type-[n]` découvertes — natives v4, pas disponibles en v3
- Solution finale : `index` du `.map()` avec ternaires — plus lisible que `nth-of-type`, même compromis order-dependent

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `display: grid` obligatoire pour que `gap` fonctionne | Révisée | Oubli corrigé rapidement |
| Ternaire dans `className` template literal | Consolidée | Appliqué sans aide, syntaxe correcte |
| Pattern className forwarding | Nouvelle | `className?: string` prop optionnelle — pattern courant dans shadcn/ui, Radix, etc. |
| `?? ""` pour éviter `undefined` dans le DOM | Nouvelle | Compris et appliqué immédiatement |
| `last:` / `first:` — variantes Tailwind `:last-child` / `:first-child` | Révisée | Bien appliqué, compréhension correcte (DOM position, pas type d'élément) |
| `nth-of-type-[n]` Tailwind v4 | Nouvelle | Variante native v4 — suggérée par l'IDE, fonctionne correctement |
| `display: contents` | Nouvelle | Concept expliqué — rend un élément transparent au grid parent |
| `position: absolute` pour sortir du flux | Révisée | Appliqué sur le texte pour libérer le layout des cards |
| index dans `.map()` pour cibler des éléments spécifiques | Nouvelle | Utilisé pour les ternaires `col-start` — plus lisible que `nth-of-type` |
| CSS Grid — pas de justification par row | Nouvelle | Compris que `justify-content` est global, pas par ligne |

### ⚠️ Notions faussement acquises détectées

- Aucune cette session.

### 🔄 Étapes restantes

- Breakpoint intermédiaire `1024-1300` sur la section limitations (staircase qui se casse)
- Styles Tailwind finaux — responsive complet + hover/focus sur inputs et radios du Calculator
- Texte dynamique section 2 ("A BMI range of 18.5 to 24.9...") — valeurs à relier au state du Calculator
- Vérification assemblage global `App.tsx`

### 📈 Évaluation de session

- **Points solides :** Raisonnement architectural autonome sur le layout — a identifié la contrainte `display: contents`, compris le trade-off nth-of-type vs data-driven vs index. A trouvé la solution finale (index + ternaires) par lui-même avec assistance IA.
- **Points fragiles :** Aucun gap technique bloquant cette session — la complexité était sur le CSS Grid, pas sur React/TypeScript.
- **Priorité pour la prochaine session :** Styles finaux — hover/focus sur Calculator, texte dynamique section 2.

### 💬 Notes de contexte

- Layout limitations : grille 6 colonnes, `col-span-2` par card, offsets via `index` ternaires — order-dependent, acceptable pour données statiques
- Texte section "absolute" est un choix de contournement pragmatique — alternative aurait été grille 12 col sur la section
- Tailwind v4 `nth-of-type-[n]` confirmé natif — à noter pour référence future

---

## Session 2026-03-13 — infoCards.ts + InfoCard.tsx : data-driven rendering + interface extends

### ✅ Étapes accomplies

- Création de `src/data/infoCards.ts` — tableau typé avec `export interface infoCardsDataProps`
- Décision architecturale : données séparées de l'affichage, `variant` et `isIconResponsive` clairement distingués
- `iconBg?: string` optionnel — présent section 1, absent section 2
- `isIconResponsive: boolean` dans les données pour différencier les deux layouts
- `interface InfoCardProps extends infoCardsDataProps` — ajout de `variant: "row" | "col"` sans dupliquer les champs
- `import type` pour importer une interface TypeScript
- `style={{ backgroundColor: iconBg }}` — couleur arbitraire en style inline (pas de classe Tailwind dynamique)
- `flex-${variant}` — classe dynamique sans ternaire imbriqué, compris de façon autonome
- `.filter((card) => card.isIconResponsive)` dans `App.tsx` pour la première section
- Première section affichée et fonctionnelle
- `variant` prop supprimée — Tailwind media queries suffisent (`md:flex-row`), `isIconResponsive` gère déjà la séparation des layouts
- `iconBg` supprimée — les SVG incluent déjà leur propre fond

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `Type[]` pour typer un tableau TypeScript | Nouvelle | Compris et appliqué sans aide après exemple |
| `interface extends` | Nouvelle | Logique comprise — hérite et ajoute. Appliqué correctement |
| `export interface` / `import type` | Nouvelle | `import type` requis par `verbatimModuleSyntax` — règle retenue |
| Classes Tailwind dynamiques vs style inline | Nouvelle | `bg-[${iconBg}]` ne fonctionne pas — style inline compris comme solution correcte |
| `.map()` — paramètre unique objet entier | Faussement acquise | A tenté de passer les champs comme paramètres séparés `(title, description, icon...)` — confusion avec destructuring de fonction |
| `.filter()` vs `.find()` | Nouvelle | `find` = un seul élément, `filter` = tableau filtré — distinction faite après question |
| Pattern data-driven rendering | Nouvelle | Bien raisonné de façon autonome — séparation données/affichage, scalabilité comprise |

### ⚠️ Notions faussement acquises détectées

- **`.map((a, b, c) => ...)`** : a tenté de destructurer les champs comme paramètres séparés du callback. Le paramètre de `.map()` est toujours un objet unique — le deuxième paramètre c'est l'index, pas un champ.

### 🔄 Étapes restantes

- Deuxième section `App.tsx` — `.filter((card) => !card.isIconResponsive).map()`
- Assemblage complet `App.tsx` avec `Calculator` + les deux sections `InfoCard`
- Styles Tailwind finaux + responsive + hover/focus sur inputs et radios
- ⚠️ Le texte de la section résultat ("A BMI range of 18.5 to 24.9...") contient des valeurs dynamiques — le range doit venir du `Calculator` et s'afficher selon le BMI calculé

### 📈 Évaluation de session

- **Points solides :** Raisonnement architectural autonome et pertinent — séparation données/affichage, `isIconResponsive` vs `variant`, scalabilité. A réalisé seul que `flex-${variant}` suffisait sans ternaire imbriqué. `interface extends` compris en profondeur dès la première explication.
- **Points fragiles :** `.map()` — confusion sur la structure du callback. Pas encore ancré. À surveiller sur la prochaine occurrence.
- **Priorité pour la prochaine session :** Deuxième section + assemblage `App.tsx` complet, puis styles Tailwind.

### 💬 Notes de contexte

- 4h de session — bonne endurance, progression réelle
- `infoCardsData` contient 8 objets : 3 `isIconResponsive: true` (section 1), 5 `isIconResponsive: false` (section 2)
- `style={{ backgroundColor: iconBg }}` utilisé pour les couleurs de fond des icônes — Tailwind ne génère pas de classes dynamiques interpolées

---

## Session 2026-03-12 — InputField.tsx + Calculator.tsx : composant réutilisable + imperial range

### ✅ Étapes accomplies

- Création de `InputField.tsx` avec interface TypeScript : `name`, `value`, `unit`, `onChange`
- Décision de ne pas passer `label` en prop — label reste dans le JSX parent (un label pour deux inputs en imperial)
- `name` sert pour `id`, `name`, et `aria-label` — prop unique pour les trois attributs
- `unit` maintenu en prop après inspection maquette — span absolu positionné en overlay sur l'input
- `onChange: (e: React.ChangeEvent<HTMLInputElement>) => void` — type de callback compris et écrit sans aide
- Câblage expliqué : l'enfant appelle `props.onChange(e)`, le parent décide quel state mettre à jour
- Remplacement de tous les inputs répétés dans Calculator par `<InputField />` (metric + imperial)
- Message conditionnel état vide : "Welcome! / Enter your height and weight..."
- `getBMICategory(bmi)` intégré dans la phrase dynamique au lieu d'un `<p>` séparé
- Fix imperial range : `const range` reécrit avec ternaire `unity === "metric"` — branche imperial utilise `convertToMetric(...).height`
- `convertRangeToImperial(kg)` — fonction de conversion kg → `{ st, lb }` écrite sans aide
- Affichage imperial range : `Xst Ylbs - Xst Ylbs` câblé correctement dans le JSX

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `interface` TypeScript pour props composant enfant | Consolidée | Écrit sans aide, raisonnement sur quelles props inclure/exclure solide |
| `React.ChangeEvent<HTMLInputElement>` | Nouvelle | Type du callback — compris après explication du flux parent→enfant |
| Flux de données parent→enfant via callback | Nouvelle | Confusion initiale sur "comment React sait quel state changer" — résolu par explication du câblage explicite |
| `aria-label` sur input | Nouvelle | Appliqué correctement avec template literal `\`input zone for ${name}\`` |
| Variable dérivée avec ternaire imbriqué | Consolidée | `const range = unity === "metric" ? ... : convertToMetric(...).height` — pattern maîtrisé |
| `.toFixed()` retourne une string — pas de mutation du float | Nouvelle | Bonne vigilance sur double-arrondi — clarification que toFixed est display-only |
| `Math.floor` + `Math.round` pour conversion unités | Nouvelle | Formule kg→st/lbs comprise et appliquée correctement |

### ⚠️ Notions faussement acquises détectées

- Aucune cette session.

### 🔄 Étapes restantes

- `InfoCard.tsx` : interface TypeScript avec variante `"row" | "col"`, props `icon`, `title`, `description`
- Assemblage `App.tsx`
- Styles Tailwind finaux + responsive + hover/focus
- Finition : unités imperial dans range (st/lbs) — variables dérivées `imperialMin`/`imperialMax` optionnelles

### 📈 Évaluation de session

- **Points solides :** Interface TypeScript pour composant enfant — raisonnement sur quelles props inclure/exclure autonome et pertinent. Flux callback parent→enfant compris en profondeur après explication. `convertRangeToImperial` et le câblage imperial range entièrement écrits sans aide — c'est du travail solide.
- **Points fragiles :** Confusion initiale sur le flux `onChange` — notion nouvelle, à consolider sur `InfoCard`.
- **Priorité pour la prochaine session :** `InfoCard.tsx` — premier composant entièrement piloté par props avec `interface`, variante `"row" | "col"` (union type en prop), et contenu statique.

### 💬 Notes de contexte

- `Calculator.tsx` logique complète et fonctionnelle — metric + imperial + range des deux modes
- `convertRangeToImperial` placée dans le composant — candidate à extraction dans `src/utils/bmi.ts` avec les autres fonctions utilitaires
- `range?.` optional chaining maintenu dans branche metric par précaution — `range` n'est plus jamais null mais pas bloquant

---

## Session 2026-03-11 (après-midi) — Calculator.tsx : refactoring + healthy weight range

### ✅ Étapes accomplies

- Fix bug `calculateBMI` : `if (unity === "metric")` remis en branche extérieure
- Refactoring states `number | null` → `useState<number>(0)` — suppression de tous les `?? ""`
- Guards `> 0` au lieu de truthy check
- `?? 0` supprimés dans `convertToMetric` — params maintenant `number` propres
- `onFocus={(e) => e.target.select()}` sur tous les inputs — UX : sélection au focus
- `resetStates()` — reset des 6 states au switch metric/imperial
- `getHealthyWeightRange(height)` — retourne `{ min, max }` via formule inverse BMI
- Variable dérivée `const range = height > 0 ? getHealthyWeightRange(height) : null`
- Affichage `{range?.min.toFixed(1)} kgs - {range?.max.toFixed(1)} kgs` avec optional chaining

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `useState<number>(0)` vs `number \| null` | Nouvelle | Décision architecturale liée au design — bien raisonnée |
| `> 0` guard vs truthy check | Nouvelle | Compris pourquoi `0` est falsy — adapté sans aide |
| `onFocus` + `e.target.select()` | Nouvelle | Jamais vu — compris et appliqué correctement sur tous les inputs |
| Optional chaining `?.` | Nouvelle | Expliqué, appliqué correctement |
| Variable dérivée objet (`range`) | Révisée | Pattern acquis depuis `bmi` — transféré sans aide |
| Inférence TypeScript — pas besoin de typer variables locales | Nouvelle | Compris que `: number` sur `const min` est inutile |
| Fallback `null` vs `""` pour optional chaining | Nouvelle | Confusion initiale — corrigé sur signalement |

### ⚠️ Notions faussement acquises détectées

- Aucune nouvelle cette session.

### 🔄 Étapes restantes

- `Header.tsx` : logo, HTML sémantique
- `InfoCard.tsx` : props TypeScript (`interface`), variante `"row" | "col"`
- Assemblage `App.tsx`
- Styles Tailwind + responsive + hover/focus

### 📈 Évaluation de session

- **Points solides :** Refactoring autonome et bien raisonné. Pattern variable dérivée transféré sans aide. `onFocus`/`e.target.select()` compris et appliqué immédiatement. Logique `getHealthyWeightRange` écrite sans aide.
- **Points fragiles :** Optional chaining + fallback `null` vs `""` — confusion sur le type de retour. Notion ancrée en fin de session.
- **Priorité pour la prochaine session :** `Header.tsx` puis `InfoCard.tsx` avec `interface` TypeScript pour les props — premier contact avec le typage de composants enfants.

### 💬 Notes de contexte

- `Calculator.tsx` logique complète — metric + imperial + reset + healthy weight range
- `range` est `null` quand `height === 0` — `?.` gère l'affichage proprement
- Fonctions candidates à extraction dans `src/utils/bmi.ts` : `getBMICategory`, `getHealthyWeightRange`, `convertToMetric`

---

## Session 2026-03-10 (matin) — Calculator.tsx : logique metric

### ✅ Étapes accomplies

- `useState` typé avec union type `"metric" | "imperial"`
- Radios contrôlés avec `checked={unity === "metric"}` + `onChange`
- Inputs height/weight typés `number | null`, valeur `?? ""`
- Calcul BMI en variable dérivée (`const bmi = calculateBMI()`)
- `getBMICategory(bmi: number)` — classification 4 catégories
- Affichage BMI avec `toFixed(2)` et guard `bmi ?`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `useState<union type>` | Nouvelle | Compris et appliqué sans aide après explication |
| Typage paramètre fonction `: number` | Nouvelle | Syntaxe expliquée, appliquée correctement |
| `number \| null` — state nullable | Nouvelle | Bonne intuition sur le cas vide |
| `??` nullish coalescing | Nouvelle | Compris et appliqué |
| Variable dérivée vs state | Nouvelle | A voulu mettre `scoreBMI` en state — corrigé, notion assimilée |
| `onChange` vs `onClick` sur radio | Révisée | A utilisé `onClick` initialement — corrigé sur signalement |
| `fn()` vs `() => fn()` dans JSX | Faussement acquise | A retapé `onChange={setUnity("metric")}` — même erreur que projets précédents. Corrigé rapidement après signalement |
| Scope de variable (locale vs composant) | Révisée | A cru pouvoir afficher `scoreBMI` depuis le JSX — scope clarifié |

### ⚠️ Notions faussement acquises détectées

- **`onChange={fn("valeur")}`** : a reproduit l'erreur `onClick={fn()}` des projets précédents dans un nouveau contexte. Le réflexe "arrow function obligatoire quand on passe un argument fixe" n'est pas ancré.

### 🔄 Étapes restantes

- Mode imperial : nouveaux states (ft, in, lbs), formule différente, affichage conditionnel des inputs
- Plage de poids sain (healthy weight range)
- `Header.tsx`, `InfoCard.tsx`
- Assemblage `App.tsx`
- Styles Tailwind + responsive + hover/focus

### 📈 Évaluation de session

- **Points solides :** TypeScript de base assimilé rapidement — union types, typage paramètre, `number | null`. Logique JS (calcul, conditions, ranges) solide et autonome.
- **Points fragiles :** `onChange={fn("val")}` — même pattern d'erreur que projets 1 et 2. Pas encore ancré malgré 3+ occurrences.
- **Priorité pour la prochaine session :** Mode imperial — affichage conditionnel des inputs selon `unity`, nouveaux states ft/in/lbs, formule BMI imperial.

### 💬 Notes de contexte

- `getBMICategory` placée dans le composant pour l'instant — candidat à extraire dans `src/utils/bmi.ts` plus tard
- `calculateBMI` utilise le closure sur les states — pas de paramètres

---

## Session 2026-03-09 — Setup + Architecture

### ✅ Étapes accomplies

- Scaffolding Vite + React + TypeScript + SWC
- Installation et câblage Tailwind v4 (`@tailwindcss/vite` + `@import "tailwindcss"`)
- Fonts Inter (400/600) en woff2 → `public/fonts/`
- Design tokens dans `@theme` : couleurs + `--font-inter`
- Text presets 1→7 dans `@utility` + gradient utilitaire
- `index.html` nettoyé (favicon PNG, `<div id="root">` vide)
- `App.tsx` nettoyé, Tailwind vérifié fonctionnel
- Git init dans `bmi-calc/` + premier commit
- Réflexion architecturale : 3 composants identifiés (`Header`, `Calculator`, `InfoCard`)
- Stubs créés dans `src/components/`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Setup Vite react-ts | Révisée | Commande correcte sans aide. Template `react-ts` vs `react` compris |
| SWC vs Babel vs React Compiler | Nouvelle | Rôle du compilateur compris. SWC = standard actuel |
| `--color-*` singulier Tailwind v4 | Faussement acquise | 3e occurrence — a retapé `--colors-*` malgré corrections précédentes. Corrigé sur signalement |
| `letter-spacing` en `em` (pas `%`) | Faussement acquise | A écrit `-5%` (syntaxe Figma) — CSS n'accepte pas les pourcentages ici. Corrigé sur signalement |
| Fonts dans `public/` vs `src/assets/` | Révisée | A mis les fonts dans `src/assets/` initialement — rappel nécessaire |
| Nested git repo (Vite auto-init) | Nouvelle | Vite crée un `.git` automatiquement — bloque `git add .` depuis le parent. Résolu en supprimant le `.git` racine |
| Stub de composant | Nouvelle | Terme inconnu — explication nécessaire |
| Architecture composants — variante partagée | Révisée | Bonne décision autonome : `InfoCard` unique avec variante row/col plutôt que 2 composants séparés |

### ⚠️ Notions faussement acquises détectées

- **`--color-*` singulier** : erreur répétée pour la 3e fois sur 3 projets. La règle est verbalement connue, le réflexe en pratique ne l'est pas.
- **`letter-spacing` en CSS** : valeur Figma en `%` copiée telle quelle — syntaxe invalide en CSS.

### 🔄 Étapes restantes

- `Header.tsx` : logo, HTML sémantique
- `Calculator.tsx` : sélection metric/imperial, inputs, calcul BMI, résultat
- `InfoCard.tsx` : props TypeScript (`interface`), variante row/col
- Assemblage dans `App.tsx`
- Responsive + états hover/focus

### 📈 Évaluation de session

- **Points solides :** Setup autonome et fluide. Réflexes Tailwind v4 présents (plugin, @import, @theme, @utility). Analyse architecturale correcte et bien raisonnée.
- **Points fragiles :** `--color-*` singulier — ancrage toujours absent en pratique malgré 3 corrections. Attention aux détails de syntaxe Figma → CSS.
- **Priorité pour la prochaine session :** Commencer `Calculator.tsx` — première interface TypeScript + `useState` typé. C'est le cœur du projet et le premier contact réel avec TypeScript.

### 💬 Notes de contexte

- Git dans `bmi-calc/` (pas à la racine) — Vite avait auto-initialisé un repo, conflit résolu en supprimant le `.git` parent
- `InfoCard` : variante `"row" | "col"` — union type TypeScript à introduire quand on développe ce composant
- `App.css` supprimé, `index.css` = source unique de styles

---

## Project Kickoff — 2026-03-09 — BMI Calculator

### Stack retenue

- React 19 + Vite + Tailwind CSS v4 + **TypeScript** — premier projet avec TS

### Contexte utilisateur au démarrage

- 2 projets React + Tailwind v4 complétés (Password Generator, Frontend Quiz App)
- Architecture React, useState, callbacks, objet de lookup — en bonne voie de consolidation
- Points fragiles persistants : `onClick={fn()}` vs `onClick={() => fn()}`, scope dans closures, callback pattern sous stress
- TypeScript : jamais pratiqué, formation précédente ne l'incluait pas — novice complet en syntaxe ET en fonctionnement

### Auto-évaluation initiale des notions clés

| Notion | Niveau réel (basé sur historique) |
| --- | --- |
| Architecture composants React | Ancré |
| `useState` + gestion d'inputs | Ancré |
| Callbacks parent ↔ enfant | Fragile — erreurs répétées sur 2 projets |
| Tailwind v4 — layout, responsive | Ancré |
| Logique JS pure (calcul, conditions) | Solide |
| TypeScript — syntaxe de base | Zéro — entièrement nouveau |
| TypeScript — `interface` pour props | Zéro |
| TypeScript — union types (`"metric" \| "imperial"`) | Zéro |
| TypeScript — typage de `useState` | Zéro |

### Priorités pour ce projet

1. Introduire TypeScript progressivement — typage des props avec `interface`, union types, `useState<Type>`
2. Consolider le callback pattern en contexte réel (sélection metric/imperial → remonter vers App)
3. Vigilance sur `onClick={fn()}` — erreur répétée 3x sur projet 1

### Features du challenge

- Sélection unités metric / imperial
- Inputs hauteur + poids
- Calcul BMI + classification (Underweight / Healthy / Overweight / Obese)
- Plage de poids sain calculée
- Layout responsive
- États hover/focus sur tous les éléments interactifs