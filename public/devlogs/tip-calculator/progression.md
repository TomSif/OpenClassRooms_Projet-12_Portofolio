## 🏁 Résultat final — 2026-06-16

**Score Frontend Mentor : 8.5 / 10 — "Exceptional"** — premier score de ce niveau sur le parcours, obtenu du premier coup. Frontend Mentor n'a pas proposé de feedback de correction (réservé aux scores en dessous du seuil exceptionnel) — le projet est clos tel quel, aucun changement à apporter.

Points ayant vraisemblablement contribué au score : tests Vitest + RTL sur logique métier et composant (premier projet testé du parcours), a11y câblée en cours de route (`aria-invalid`, `aria-describedby`, `fieldset`/`legend`, `role="status"` + `aria-label`), discipline de commit régulière, validation des inputs complète (onBlur, valeurs négatives, plafonds, état intermédiaire décimal).

---

## Session 2026-06-16 — Tip Calculator App — Refactor input décimal (type="text" + local raw state)

### ✅ Étapes accomplies

- Confirmation de l'addendum du 15/06 : `lang="en"` seul ne suffit pas — `Number(e.target.value)` reste le vrai point de blocage, indépendamment du `lang`. `Number()` est locale-indépendant (contrairement à `Intl.NumberFormat`).
- Exploration des deux architectures possibles : (a) `bill: string` dans App → trop de ripple (types InputProps, callers de calcul, condition d'erreur) ; (b) `raw: string` local dans Input → App.tsx et tests inchangés. Choix de (b).
- Décision de ne PAS supporter la virgule : une substitution "tape `,`, voit `.`" est une mauvaise UX ("un caractère tapé, un autre apparaît"). `preventInvalidKeys` bloque désormais tout sauf chiffres et `.`.
- Réécriture complète de `preventInvalidKeys` (`utils.ts`) : garde `e.ctrlKey || e.metaKey` (Ctrl+C/V/A), garde `e.key.length > 1` (toutes les touches spéciales automatiquement — plus de liste explicite), garde double `.` (`e.currentTarget.value.includes('.')`), regex `/^[0-9.]$/`. — `fix(utils): restrict preventInvalidKeys to digits and decimal point`
- Refactor de `Input.tsx` : `type="number"` → `type="text"` + `inputMode="decimal"`, suppression `min`/`max`, ajout `useState<string>` + `useEffect` (sync Reset), `onChange` avec `setRaw` + early return `endsWith('.')` + appel parent conditionnel, `onBlur` avec `.replace(/\.$/, '')` + `onChange` final + `onBlur?.()`. — `fix(input): prevent decimal point from erasing current value`
- Tests : tous passent sans modification de `App.tsx` ni de `App.test.tsx` — preuve que le changement est bien encapsulé dans `Input.tsx`

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Pattern "UI state local (string) + business state parent (number)" | Nouvelle | Jamais rencontré — nécessite `useState` + `useEffect` + `onChange`/`onBlur` coordonnés. Difficile à assembler seul, mais chaque pièce bien comprise une fois expliquée |
| React controlled input : enforcement après chaque event, même sans setState | Nouvelle | Contre-intuitif mais central — "return anticipé dans onChange n'empêche pas React de reset la valeur". Bien reformulé par Thomas en fin de session : "c'était `{value}` qui ne l'acceptait et React re-rendait avant d'atteindre le calcul" |
| `e.key.length === 1` pour cibler les vrais caractères vs touches spéciales | Nouvelle | Remplace avantageusement une liste exhaustive de touches à autoriser (plus maintenable, aucun oubli possible) |
| `e.ctrlKey \|\| e.metaKey` pour les raccourcis clavier | Nouvelle | Guard nécessaire avant tout filtrage par regex — sinon Ctrl+C/V/A bloqués |
| `String.endsWith()` | Nouvelle | Non connu a priori — découvert dans ce contexte précis |
| `String.replace(/\.$/, '')` | Nouvelle | Regex avec ancre `$` (fin de string) pour supprimer uniquement un point terminal |
| Optional chaining `?.()` sur callbacks | Nouvelle | Raccourci idiomatique pour `if (fn) fn()` |
| `eslint-disable-next-line` pour désactiver une règle localement | Nouvelle | Utilisé pour `react-hooks/set-state-in-effect` (règle récente, conservatrice, valide à désactiver ponctuellement ici) |
| `Number()` est locale-indépendant | Corrigée | Confusion initiale avec `Intl.NumberFormat` — `Number()` utilise toujours `.` comme séparateur, indépendamment de la locale du navigateur |

### ⚠️ Notions faussement acquises détectées

- **"`Number()` est locale-aware"** : Thomas a supposé que `Number()` "formatait au format local" — invalidée en constatant que le problème persistait même après le fix `lang="en"`. `Number()` est toujours `.`-based, c'est `Intl.NumberFormat` qui est locale-aware.
- **"early return dans onChange empêche React de re-rendre"** : Thomas supposait que ne pas appeler setState évitait le re-render et préservait la valeur affichée. Faux — React enforce `value prop = DOM value` après chaque event, setState ou pas. Bien compris une fois le mécanisme expliqué, et bien reformulé en fin de session.

### 🔄 Étapes restantes

- Vérification alignement visuel avec `active-states.jpg` (reportée depuis plusieurs sessions) — priorité maintenant que les inputs sont stables
- Rédaction du post Frontend Mentor

### 📈 Évaluation de session

- **Points solides :** Bonne lucidité sur les limites de sa compréhension ("j'aurais probablement pas réussi sans ton aide" — dit explicitement). C'est un signal de conscience métacognitive précieux : Thomas sait ce qu'il sait. La reformulation finale du mécanisme en ses propres mots ("c'était `{value}` qui ne l'acceptait, React re-rendait avant d'atteindre le calcul") est exacte et prouve que la notion est bien intégrée, même si l'assemblage autonome du pattern complet reste hors de portée pour l'instant. `preventInvalidKeys` réécrit avec des gardes bien ordonnées, dont le double-dot guard ajouté spontanément sans sollicitation. Code écrit à chaque étape par Thomas.
- **Points fragiles :** Le pattern "local UI state + useEffect sync" reste flou dans l'ensemble — chaque pièce individuelle est comprise, mais l'architecture globale n'est pas encore autonome. C'est normal : c'est le premier contact avec ce pattern, et c'est un des plus subtils de React. À revoir en contexte différent pour consolider.
- **Priorité pour la prochaine session :** Passe CSS avec `active-states.jpg`, puis post Frontend Mentor.

### 💬 Notes de contexte

- Session démarrée le lendemain de la session 15/06 (fatigue) — Thomas est revenu avec une décision claire ("on passe en type='text', let's go")
- L'addendum du 15/06 a été entièrement résolu : `lang="en"` insuffisant confirmé, `Number()` locale-indépendant confirmé, solution `type="text"` + local state choisie et implémentée
- Tests passent sans toucher App.tsx ni App.test.tsx — bon signal que l'encapsulation est correcte
- Remarque finale de Thomas ("c'est hallucinant qu'il ait pas fixé ça à la source") → explication de la tension de design browser/React, et l'existence de librairies dédiées (`react-number-format`, `cleave.js`) qui encapsulent exactement ce pattern

---

## Session 2026-06-15 — Tip Calculator App — Validation des inputs (blur, valeurs négatives, plafonds)

### ✅ Étapes accomplies

- `fix(input)` : déclenchement de "Can't be zero" au `onBlur` (en plus du `onChange`) — le cas "cliquer dans le champ puis sortir sans rien taper" ne déclenchait pas l'erreur. `handlePeopleBlur` extrait dans `App.tsx`, prop `onBlur?: () => void` ajoutée (optionnelle) à `InputProps`, non branchée sur `Bill`
- Discussion et décision UX assumée : la maquette interdit les messages d'erreur supplémentaires → pour les valeurs négatives (Bill, Number of People, Custom %), blocage **silencieux à la saisie** plutôt qu'affichage d'erreur
- Création de `preventInvalidKeys` (`lib/utils.ts`) : bloque la touche `-` au clavier via `onKeyDown` + `e.preventDefault()`, branchée sur les 3 champs numériques
- Création de `clampMax` (`lib/utils.ts`) : plafonds appliqués à la **source** (state), pas seulement à l'affichage — Bill/Number of People → `99999`, Custom % → `100`
- Bug réel détecté en testant à la main : un premier essai de clamp uniquement sur `value={...}` (affichage) désynchronisait affichage et calcul (`Result` utilisait la valeur brute non plafonnée du state). Corrigé en plafonnant `setBill`/`setNumberOfPeople`/`setTipPercent`/`setCustomValue` directement, puis nettoyage des clamps d'affichage devenus redondants (`Input.tsx` ET `App.tsx`, harmonisés)
- Fix layout connexe : `min-w-29` sur le `<li>` du champ Custom — résout le placeholder "Custom" tronqué en "Cus" (lié à `min-width: auto` sur les enfants de grid + taille intrinsèque d'un `<input type="number" max=...>`)
- Décision de garder `preventInvalidKeys`/`clampMax` dans `utils.ts` (pas de nouveau fichier) — cohérent avec l'heuristique générique/portable du 10/06
- `fix(input): guard against negative and out-of-range values` — un seul commit pour les fonctions utilitaires ET leur usage, après discussion sur la granularité des commits
- (Reprise l'après-midi) Nouveau bug détecté en testant manuellement : taper `.` dans Bill/Number of People efface la saisie en cours. Diagnostic en plusieurs étapes : `<input type="number">` interprète le séparateur décimal selon la locale du navigateur/OS, et quand le caractère tapé n'est pas le bon séparateur, `e.target.value` devient `''` → `Number('') === 0` → l'état repasse à `0` → React force l'affichage à `0`, effaçant la saisie
- Hypothèse initiale ("`Number(value)` agit comme une garde qui n'accepte que les nombres") testée en console AVANT implémentation et invalidée par Thomas lui-même : `Number(",5")` retourne aussi `NaN`, pas seulement `Number(".5")` en locale fr
- Fix trouvé et confirmé fonctionnel : ajout de `lang="en"` directement sur l'`<input>` (pas seulement sur `<html>`) + `inputMode="decimal"` + `step="0.01"` — le point `.` fonctionne désormais sans effacer le champ
- Simplification spontanée de `clampMax` : suppression du paramètre `result` (toujours égal à `max` dans tous les appels) — signature passée de `(value, max, result)` à `(value, max): number`, callers mis à jour dans `App.tsx` et `Input.tsx`, 0 erreur TypeScript (`tsc --noEmit`) à l'arrêt de la session
- Décision de scope mise en pause : support de la virgule (`,`) comme séparateur décimal pour cohérence avec `Result` (qui affiche des `.`) — deux options identifiées, voir Étapes restantes

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `onBlur` vs `onChange` pour "touched" | Nouvelle | Confusion initiale ("un change est en soi un blur") corrigée : les deux événements sont des signaux valides de "touched", mais ne sont pas équivalents |
| Props optionnelles (`?`) pour callbacks non utilisés partout | Révisée | Généralisation spontanée du pattern déjà vu sur `value?: number` |
| `onKeyDown` + `e.preventDefault()` pour bloquer une touche | Nouvelle | Premier contact, bien assimilé — parallèle fait avec `e.preventDefault()` de `onSubmit` |
| `value` JSX (affichage) vs state React (source de vérité) | Faussement acquise → corrigée | Vraie surprise ("comment la valeur peut être différente de ce qui s'affiche ?") — généralisation de "state dérivé" (déjà vu) à un nouveau cas concret, corrigée et appliquée correctement aux 2 endroits concernés |
| `min-width: auto` sur enfants grid/flex (`min-w-*`) | Nouvelle | Notion CSS non triviale, expliquée directement — bonne hypothèse spontanée avant l'explication ("le placeholder affiche moins de lettres... donc il doit shrink") |
| Granularité des commits : 1 changement = 1 commit, même réparti sur plusieurs fichiers | Consolidée | Raisonnement autonome solide après question ouverte ("code mort si séparé") |
| `<input type="number">` et séparateur décimal locale-dépendant | Nouvelle | Diagnostic empirique mené en plusieurs étapes (hypothèse → vérification en console → test dans le navigateur) ; découverte que `lang` sur l'élément lui-même (pas seulement `<html>`) influence le parsing |
| `Number(value)` et la virgule | Nouvelle | `Number(",5")` === `NaN`, tout comme `Number(".5")` en locale fr — invalide l'idée que `Number()` "comprend" la virgule comme séparateur décimal |
| Simplification de signature (paramètre redondant) | Nouvelle | `clampMax(value, max, result)` → `clampMax(value, max)` — initiative spontanée après avoir remarqué que `result === max` dans tous les appels |

### ⚠️ Notions faussement acquises détectées

- **`value` JSX vs state** : Thomas n'avait pas anticipé qu'un clamp posé uniquement sur `value={...}` (affichage) n'a aucun effet sur la logique si le state sous-jacent reste non plafonné. Détecté par lui-même via test manuel (pas signalé par l'agent au départ — juste une question posée), puis corrigé et généralisé correctement aux deux cas similaires (`Input.tsx` et `handleCustomTip`), avec une harmonisation finale des deux approches.
- **`Number(value)` comme garde de saisie** : Thomas a d'abord supposé que `Number(value)` filtrait/acceptait naturellement les nombres avec virgule (`,`). Corrigée AVANT implémentation, via vérification en console (`Number(",5")` → `NaN`) — bon réflexe de test d'hypothèse avant d'écrire du code, à encourager.

### 🔄 Étapes restantes

- **Décision en attente (priorité #1 prochaine session)** : support de la virgule comme séparateur décimal. Deux options posées par Thomas lui-même : (a) garder `type="number" lang="en"` tel quel — simple, `.` fonctionne désormais, mais `,` non supporté ; (b) réécrire en `type="text"` + regex `[0-9]*[.,]?[0-9]*` — plus propre/cohérent, supporte les deux séparateurs, mais plus de travail (parsing manuel, `inputMode`, validation). Thomas penche initialement pour (a) par fatigue, mais identifie (b) comme la solution propre
- Vérification alignement visuel avec `active-states.jpg` (reportée plusieurs fois) — début entrevu via un ajout `index.css` non commité (transitions + `active:scale-97` sur `button`), non discuté dans cette session
- Rédaction du post Frontend Mentor

### 📈 Évaluation de session

- **Points solides :** Série de découvertes autonomes de bonne qualité — distinction `onBlur`/`onChange`, usage spontané de prop optionnelle, et surtout détection d'un vrai bug (affichage/calcul désynchronisés) en testant manuellement, sans intervention de l'agent au-delà d'une question ouverte. Généralisation correcte à deux endroits du code avec des approches légèrement différentes, harmonisées ensuite de sa propre initiative. Raisonnement de granularité de commit mature et autonome. **Signal le plus important relevé par Thomas lui-même en fin de session** : la conception et le branchement autonomes de `clampMax` (idée → signature → implémentation → usage dans 2 fichiers) — *"passer de l'idée à la décomposition [en fonction]"* a longtemps été une zone de friction (cf. objectifs pédagogiques du projet, axe sur la difficulté à transformer un raisonnement en code structuré), et c'est la première fois que ce passage se fait aussi naturellement, malgré le détail manqué sur `value` vs state. **Reprise de l'après-midi** : démarche de diagnostic exemplaire sur le bug "." — formulation d'hypothèses, vérification empirique en console avant d'agir (`Number(",5")`), et identification autonome de deux pistes de solution avec leurs compromis respectifs (simple-mais-limité vs propre-mais-coûteux). Simplification spontanée de `clampMax` (suppression d'un paramètre redondant) — encore une fois idée → décomposition, en confirmation du signal du matin.
- **Points fragiles :** Confusion initiale sur la terminologie "change vs blur", corrigée immédiatement sans s'y attarder. `min-width: auto` était un vrai trou (normal, CSS avancé jamais rencontré), mais bonne intuition de debug avant l'explication. Fatigue explicitement reconnue en fin de session ("mon footing m'a tué") — bon réflexe de s'arrêter sur un état stable plutôt que de pousser une décision de scope sous fatigue.
- **Priorité pour la prochaine session :** Trancher la question de la virgule (option a vs b ci-dessus) en début de session, à tête reposée. Ensuite : passe CSS/alignement visuel avec `active-states.jpg`, puis rédaction du post Frontend Mentor.

### 💬 Notes de contexte

- Session démarrée sur la clarification de changements a11y déjà committés avant la session (pas de confusion durable)
- Flake Vitest "0 test" reproduit 2x avant de passer au 3e essai — cohérent avec le pattern connu (~30-50% sous Windows), pas d'investigation
- Reprise l'après-midi comme prévu, mais sur un nouveau bug (séparateur décimal) plutôt que la passe CSS initialement annoncée — fix `.` trouvé et confirmé, support `,` mis en pause
- Session arrêtée sur fatigue assumée et explicite, code dans un état stable et compilant (0 erreur `tsc`), mais rien committé. Changements non liés présents dans l'arbre de travail (`src/index.css` : transitions/`active:scale-97` sur `button` ; `README.md` : gros diff antérieur non commité) — non discutés aujourd'hui, à clarifier avec Thomas avant tout commit

### 📌 Addendum (✅ résolu en session 2026-06-16)

- `lang="en"` seul insuffisant — confirmé. `Number()` locale-indépendant — confirmé. Solution choisie : `type="text"` + `raw` local state dans `Input.tsx`. Voir session 2026-06-16.

---

## Session 2026-06-13 — Tip Calculator App — Finalisation de la suite de tests

### ✅ Étapes accomplies

- Reprise après 2 jours de pause ("j'ai l'impression d'avoir tout oublié") — recap calme, pas de dump complet, et finalement tout le contexte est revenu naturellement en cours de session
- `fix(test)` : résolution de la race condition Vitest 4.1.8 (`globals: true` + simplification de `setup.ts` au seul import `@testing-library/jest-dom/vitest`, cleanup délégué à l'auto-`afterEach` de RTL)
- `test(calculation)` : complété `calculation.test.ts` avec 7 tests (cas normal, `numberOfPeople === 0`, `tipPercent === null` pour `calculateTipAmount` et `calculateTotalAmount`, + cas d'arrondi à 3 décimales)
- `test(app)` : terminé le test "happy path" (Assert avec `getByRole('status', {name:...})` + `toHaveTextContent`) et ajouté le test Reset (avec correction spontanée de la casse `'reset'` → `'RESET'`, sensibilité à la casse de `getByRole` découverte)
- `test(app)` : ajout du test du champ Custom (`getByPlaceholderText('Custom')`) et du scénario "Can't be zero"
- En écrivant le scénario "Can't be zero", découverte que `userEvent.type` tape à la position du curseur (n'efface pas le contenu existant) → `numberOfPeople` finissait à `10` au lieu de `0`
- Thomas a identifié lui-même qu'un vrai bug UX (clic sur un input numérique ne sélectionne pas son contenu) réglait À LA FOIS ce problème de test ET une vraie gêne utilisateur → `fix(input)` : `onFocus={(e) => e.target.select()}` sur `Input.tsx` et le champ Custom de `App.tsx`
- Commits séparés correctement : `fix(input)` (UX) vs `test(app)` (scénarios) — discipline de commit toujours bonne
- Discussion sur la redondance de `getByText(...)).toHaveTextContent(...)` (le `getByText` seul prouve déjà la présence du texte) — nuance comprise, pas un vrai problème

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `userEvent.type` tape au curseur, ne remplace pas | Nouvelle | Découverte en debuggant le scénario "Can't be zero" — explique la concaténation `'1'+'0'='10'` |
| select-all-on-focus (`onFocus={(e) => e.target.select()}`) | Nouvelle | Proposée par Thomas lui-même comme fix UX + fix de test en même temps — bon réflexe de relier un problème de test à un vrai problème produit |
| `getByRole` sensible à la casse (`'reset'` ≠ `'RESET'`) | Nouvelle | Auto-corrigée par Thomas après lecture du message d'erreur |
| `getByText` vs `getByLabelText` vs `getByPlaceholderText` | Révisée | Distinction consolidée au fil des 3 derniers tests écrits |
| Coercion JS (`null / 100 === 0`) | Révisée | Correction d'une hypothèse de Thomas (pensait `NaN`) |
| Arrondi flottant (`toFixed` sur `159.27499999999998`) | Nouvelle | Explique le cas de test à 3 décimales (`159.27`, pas `159.28`) |

### ⚠️ Notions faussement acquises détectées

- Aucune nouvelle. Le sentiment initial de "tout avoir oublié" après 2 jours de pause ne s'est pas confirmé — Thomas a retrouvé le fil rapidement et a même fait une découverte UX spontanée.

### 🔄 Étapes restantes

- Vérification alignement visuel avec `active-states.jpg` (états actifs des boutons %, focus, erreurs) — prévue pour la prochaine session, en même temps que la rédaction du post Frontend Mentor (grosse journée de rendu annoncée)

### 📈 Évaluation de session

- **Points solides :** Objectif n°1 du projet (tests) est maintenant couvert sur les deux axes (logique métier + composant), avec les cas qui comptent (normal, division par zéro, `null`, arrondi). Discipline de commit toujours solide, y compris la séparation `fix(input)`/`test(app)` sans qu'on ait besoin d'en discuter longtemps. Initiative remarquable : relier un test qui échoue à un vrai bug UX, et le corriger à la racine plutôt que de "patcher" le test.
- **Points fragiles :** Quelques tâtonnements normaux sur les requêtes RTL (casse de `getByRole`, choix entre `getByText`/`getByLabelText`/`getByPlaceholderText`) — cohérent avec un terrain encore récent.
- **Priorité pour la prochaine session :** Vérification visuelle avec `active-states.jpg`, en parallèle de la rédaction du post Frontend Mentor.

### 💬 Notes de contexte

- Session démarrée sur une note d'inquiétude ("j'ai l'impression d'avoir tout oublié") après 2 jours de pause — non confirmée dans les faits, bon signal de résilience
- Flakiness résiduelle de Vitest 4.1.8 sous Windows ("0 test" / erreur de setup, ~30-50% des runs) : ne se résout PAS par le fix `globals: true` (qui a corrigé le bug systématique), mais reste un quirk connu qui se résout toujours par un simple retry — accepté pour la suite du projet, pas d'investigation supplémentaire prévue
- Prochaine session = grosse journée (vérif visuelle + post FM) — Thomas a explicitement choisi de "digérer" les tests plutôt que d'enchaîner sur du CSS aujourd'hui

---

## Session 2026-06-10 — Tip Calculator App — A11y, extraction de la logique de calcul & premiers tests

### ✅ Étapes accomplies

- `fix(a11y)` : remplacement de `<label>` + `<div>` par `<fieldset>`/`<legend>` pour le groupe "Select Tip %" — **auto-correction spontanée** en relisant le code, généralisation directe de la notion `<label htmlFor>`/sémantique de formulaire vue (et "faussement acquise") la veille
- `style(index)` : commit du reformatage Prettier de `index.html` (favicon)
- Extraction de `tipAmountCalcul`/`totalAmountCalcul` (internes à `App`) vers `src/lib/calculation.ts` : `calculateTipAmount`/`calculateTotalAmount`, interface partagée `CalculateAmount` (renommée depuis `calculateProps` → casse PascalCase + suffixe `Props` retiré après discussion)
- Décision argumentée de garder `tipPercent: number | null` + guard `=== null` **à l'intérieur** des fonctions de calcul (plutôt que de déléguer à `App`) — bon raisonnement sur la responsabilité du "et si rien n'est sélectionné ?"
- Décision de garder `utils.ts` et `calculation.ts` ensemble dans `lib/` (pas de sur-découpage pour 2 fichiers) — heuristique "générique/portable vs métier" posée pour plus tard
- `refactor(app)` x2 : `App.tsx` utilise désormais les fonctions importées, suppression du code dupliqué, regroupement des deux imports
- Premier test unitaire Vitest (`calculation.test.ts`) : cas normal de `calculateTipAmount` (bill=100, tip=10%, people=2 → 5) — passe, mais fichier non commité (reste à compléter)
- `App.test.tsx` : remplacement du test placeholder cassé (`<h1>` inexistant) par 4 smoke tests (Bill, bouton 10%, Number of People, Reset)
- Découverte et correction d'un bug d'infrastructure de test : pas de cleanup RTL entre tests (`afterEach(cleanup)` manquant dans `setup.ts`, car `globals: false`) → rendus accumulés → "multiple elements found". Corrigé.
- `test(app)` : commit des smoke tests + fix de cleanup
- Installation de l'extension VSCode "Vitest" (`vitest.explorer`) pour le test runner inline
- Démarrage du test "happy path" (`userEvent`) : Arrange + Act écrits (remplir Bill=100, cliquer 10%, remplir Number of People=2) — Assert pas encore écrit
- En préparant l'Assert, **découverte d'un vrai bug d'affichage** : `Number(tipAmount.toFixed(2))` perd le formatage décimal (`5` au lieu de `5.00`) → `Result.tsx` affichait `$5` au lieu de `$5.00` (design attend 2 décimales)
- Résolu avec `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` dans `Result.tsx` — séparation respectée (calcul arrondit, affichage formate), ternaire `result ? ... : '0.00'` simplifié puis supprimé une fois `formatter.format(0)` identifié comme suffisant
- Ajout spontané de `aria-label={label}` sur les `<div role="status">` de `Result` — résout à la fois l'a11y (annonce distincte Tip Amount/Total pour lecteurs d'écran) et l'ambiguïté de requête de test (`getByRole('status', { name: ... })`)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Sémantique `fieldset`/`legend` vs `label` | Consolidée | Généralisation spontanée d'une notion "faussement acquise" la veille (`label htmlFor`) à un nouveau contexte, sans intervention |
| `fix` vs `refactor` vs `style` (commits) | Consolidée | Appliqué correctement et de façon autonome sur 4-5 commits successifs, avec justification à chaque fois |
| Séparation des responsabilités (calcul vs affichage) | Consolidée | Appliquée deux fois dans la session : guard `null` dans `calculation.ts`, puis formatage dans `Result.tsx` — raisonnement explicite à chaque fois |
| AAA / `describe`/`it`/`expect` (Vitest) | Nouvelle | "Rouillé" confirmé — explication directe nécessaire, mais bien intégrée ensuite |
| Un test appelle l'implémentation réelle (pas une réécriture) | Nouvelle | Question clé posée par Thomas lui-même ("pourquoi importer si on reconstruit ?") — bon signe de réflexion, bien comprise après explication |
| Statement vs expression / virgules en JS | Nouvelle | Confusion sur `it(...), it(...),` — syntaxe JS de base, pas spécifique aux tests, expliquée directement |
| Isolation des tests / cleanup RTL | Nouvelle | Bug d'infra découvert et diagnostiqué ensemble ("Found multiple elements") — bonne compréhension de la cause une fois expliquée |
| `userEvent` + `async`/`await` | Nouvelle | Plusieurs allers-retours (élément vs assertion, `getByLabelText` vs `getByRole` pour un bouton) avant stabilisation |
| Représentation des nombres en JS (`5 === 5.00`) | Nouvelle | Question directe et pertinente de Thomas sur `Number(toFixed(2))` — explication menant à un vrai fix de bug d'affichage |

### ⚠️ Notions faussement acquises détectées

- Aucune nouvelle détection cette session. À noter : la notion `<label>`/sémantique de formulaire, identifiée comme "faussement acquise" hier, a été **reconsolidée avec succès** aujourd'hui — généralisée à `fieldset`/`legend` sans aide.

### 🔄 Étapes restantes

- Terminer le test "happy path" : `Assert` (`getByRole('status', { name: 'Tip Amount' })` / `'Total'` + `toHaveTextContent('$5.00')` / `'$55.00'`), puis ajouter l'interaction Reset + vérifications de remise à zéro
- Scénario 2 : champ Custom utilisé + "Number of People" laissé à 0 → vérifier l'affichage du message "Can't be zero"
- Compléter `calculation.test.ts` : `numberOfPeople === 0`, `tipPercent === null`, arrondi, + cas équivalents pour `calculateTotalAmount` — puis committer (`test(calculation): ...`)
- Committer les changements de `Result.tsx` (Intl.NumberFormat + aria-label) — discuter du type/scope (probablement `fix(result)` vu que ça corrige un bug d'affichage + a11y)
- Vérification alignement visuel avec `active-states.jpg` (reportée depuis plusieurs sessions)

### 📈 Évaluation de session

- **Points solides :** la généralisation spontanée de la notion `fieldset`/`legend` (qui était "faussement acquise" la veille) est le signal le plus fort de la session — la notion est désormais consolidée. Discipline de commit (`fix`/`refactor`/`style`/`test`) appliquée de façon autonome et juste sur toute la session, sans erreur. Raisonnement de séparation des responsabilités mature et réutilisé spontanément (null handling, puis formatage). Initiative sur `aria-label` qui résout deux problèmes (a11y + testabilité) en une ligne — vraie compréhension du lien entre les deux.
- **Points fragiles :** le terrain testing reste neuf et a demandé beaucoup d'explications directes (syntaxe JS de base, cycle RTL, `userEvent`) — cohérent avec le statut "rouillé" du kickoff, pas un signal d'inquiétude. Quelques tâtonnements normaux sur la récupération d'éléments DOM avant stabilisation.
- **Priorité pour la prochaine session :** terminer le test "happy path" (Assert + Reset), écrire le scénario de validation, puis compléter `calculation.test.ts`. Une fois ces 2-3 tests posés, le projet aura une vraie base de tests sur les deux axes (logique métier + composant) — objectif n°1 du projet quasiment atteint.

### 💬 Notes de contexte

- Session longue et dense, avec une vraie tangente productive : l'écriture du test "happy path" a directement révélé un bug réel d'affichage (`$5` au lieu de `$5.00`), corrigé en cours de route avec `Intl.NumberFormat` — bel exemple concret de "les tests trouvent des bugs avant qu'ils n'arrivent en prod"
- Thomas a exprimé de la frustration ("j'ai rien compris à ce qu'il fallait faire") sur la syntaxe `userEvent`/structure de test — débloqué via un exemple neutre entièrement commenté, conformément à sa préférence ("explication directe quand c'est vraiment nouveau")
- Reste 3 changements non commités en fin de session : `App.test.tsx` (test happy path incomplet), `Result.tsx` (Intl.NumberFormat + aria-label), `calculation.test.ts` (1 test, untracked) — à reprendre demain avant de committer

---

## Session 2026-06-09 — Tip Calculator App — Logique de state & validation

### ✅ Étapes accomplies

- Choix de `tipPercent: number | null` (null = rien de sélectionné) — raisonnement sur le bug de désync custom input → preset argumenté et compris
- Ajout de `customValue: string` pour le champ Custom contrôlé — résistance initiale ("ça fait pas sens"), levée après explication UI state / business state
- `handleCustomTip` : met à jour `customValue` et dérive `tipPercent` (null si vide, Number sinon)
- `handlePercent` : vide `customValue` + met à jour `tipPercent` — gestionnaire dédié pour éviter la désync visuelle
- `isActive={tipPercent === value && customValue === ''}` — condition double pour éviter l'activation simultanée preset + custom sur le même chiffre
- `handlePeopleChange` : `setNumberOfPeople` + `setPeopleTouched(true)` — named handler extrait de l'inline
- `tipAmountCalcul()` et `totalAmountCalcul()` : state dérivé calculé à la volée, guard `tipPercent === null || numberOfPeople === 0` → retourne 0
- `handleReset` : remise à zéro des 5 states (`bill`, `numberOfPeople`, `tipPercent`, `customValue`, `peopleTouched`)
- `Input` rendu contrôlé avec `value?: number` — nécessaire pour que le Reset vide visuellement les champs
- Validation "Can't be zero" : `peopleTouched && numberOfPeople === 0` passé en `isError` à `Label` et `Input`
- Focus border vert : `focus:outline-none` ajouté pour masquer l'outline navigateur qui cachait la bordure custom

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| State dérivé vs useState | Consolidée | Thomas n'a pas créé de useState pour tipAmount/total — calculé à la volée sans sollicitation. Cohérent avec Mortgage/Memory Game dans rapport.md |
| UI state vs business state | Révisée | Résistance initiale sur `customValue` séparé de `tipPercent` ("ça fait pas sens"). Levée après explication concrète avec tableau de scénarios |
| Props custom vs événements DOM | Faussement acquise | A typé `handlePercent` comme `(e: React.MouseEvent<HTMLButtonElement>)` — pensait que le MouseEvent remontait jusqu'à App.tsx. Gap expliqué via la chaîne complète |
| Ce qui déclenche un re-render | Faussement acquise | A suggéré `useRef` puis `useEffect` pour stocker `isTouched` — n'avait pas identifié que seul un setter `useState` déclenche un re-render |
| Inputs contrôlés (value prop) | Révisée | Savait qu'un input contrôlé a un `value` prop, mais n'avait pas anticipé que sans ça le Reset ne vide pas visuellement le champ |
| Lambda wrapper inutile | En consolidation | Réapparu : `onChange={(value) => handlePeopleChange(value)}` — 3e+ occurrence dans le parcours. Corrigé une fois signalé |

### ⚠️ Notions faussement acquises détectées

- **Props custom vs DOM events** : a supposé que `handlePercent` recevait un `MouseEvent` — n'avait pas suivi la chaîne de propagation dans `TipButton` (l'event est consommé à l'intérieur, le prop reçoit un `number`). Compris après explication pas-à-pas.
- **Ce qui déclenche un re-render** : a proposé `useRef` (pas de re-render) puis `useEffect` (s'exécute après le render, ne le déclenche pas) avant d'arriver à `useState`. Révèle une compréhension approximative du cycle de rendu React.

### 🔄 Étapes restantes

- Tests Vitest : `tipAmountCalcul` et `totalAmountCalcul` — cas normal, division par zéro, arrondis (reporté à demain)
- Vérification alignement visuel avec `active-states.jpg`
- `App.test.tsx` à mettre à jour (cherche encore le `<h1>` placeholder)

### 📈 Évaluation de session

- **Points solides :** State dérivé appliqué spontanément et correctement — c'était le test réel du kickoff, c'est passé. Bonne capacité à reformuler le problème une fois le contexte posé (désync custom/preset, condition isActive double).
- **Points fragiles :** Lambda wrapper inutile réapparu (3e occurrence) — le réflexe n'est pas encore ancré. Deux gaps sur le cycle React (useRef/useEffect pour le re-render, et propagation d'events dans les props custom) révèlent que le modèle mental de React reste approximatif sur certains points internes.
- **Priorité pour la prochaine session :** Écrire les tests Vitest — premier vrai contact avec l'axe testing du projet. Cas à couvrir : valeur normale, `numberOfPeople === 0`, `tipPercent === null`, arrondi à 2 décimales.

### 💬 Notes de contexte

- Thomas a explicitement demandé des explications directes à deux reprises ("explique moi", "je tourne en rond") — signal à retenir : quand la notion est vraiment nouvelle ou bloquante, le mode Socratique peut être contreproductif ; une explication directe + vérification de compréhension est plus efficace
- Session productive malgré plusieurs moments de résistance initiale (customValue, UI/business state) — la compréhension arrive toujours, parfois après 2-3 échanges

---

## 🎯 Objectifs pédagogiques — Tip Calculator App

> Définis à partir de la code review Memory Game (`rapport.md`, 2026-05-28 — score 7.2/10, 7.7 sans malus tests) et de la trajectoire des 7 reviews précédentes (Galleria → Memory Game). Ces objectifs ciblent les habitudes qui reviennent review après review — ils complètent, sans la remplacer, l'auto-évaluation "Project Kickoff" sur les concepts techniques du challenge (à faire séparément, cf. `AGENTS.md`).

### 🥇 1. Tests — combler le point faible identifié sur le projet précédent

Le score Memory Game est de **7.2/10, 7.7/10 sans le malus tests** — l'absence de tests y était une "décision délibérée" assumée. Ce challenge est précisément celui qui introduit Vitest + RTL : c'est la première fois qu'un projet sera noté sur ce terrain.

L'objectif n'est pas la couverture à 100 % — c'est le **réflexe** d'écrire un test pour la logique métier (calcul du pourboire, montant par personne) au moment où on l'écrit, pas après coup. Quelques tests pertinents sur les cas qui comptent (cas normal, 0 personne / division par zéro, arrondis) suffisent à faire disparaître le malus la prochaine fois.

### 🇬🇧 2. Strings en anglais — stagnation sur 2 reviews consécutives (axe 1.4)

C'est le point le plus insistant du rapport : `"Une erreur est survenue..."` (Memory Game) faisait écho à `"Chargement..."` / `"Erreur lors du fetch"` (Rest Countries, review précédente) — **la même observation deux fois de suite**, ce qui l'a fait passer en Priorité 1 avec la mention explicite "stagnation".

Zones à risque sur ce projet : messages de validation des inputs (montant, nombre de personnes), `aria-label` / textes `sr-only`, commentaires. La règle ne change pas : un codebase choisit une langue pour **tout** — UI, erreurs, accessibilité, commentaires. Ici, anglais.

### 📝 3. Discipline de commit — un score qui plafonne entre 3 et 4 depuis 7 projets (axe 1.3)

Sur les 7 reviews, cet axe n'a jamais dépassé 4/5, et a reculé à 3.5 sur Memory Game pour des détails de forme : parenthèse manquante (`featfooter)`), double espace après le type, scope avec majuscule (`fix(Game)`). Le diagnostic du rapport est direct : *"ce n'est pas un problème de compréhension — c'est un problème de réflexe."*

Avant chaque commit, relecture de 10 secondes : type correct (`feat`/`fix`/`refactor`/`chore`/`test`…), scope **toujours en minuscules**, espace après `:`, pas de caractère parasite en fin de message. Petit projet = bon terrain pour ancrer ce réflexe avant un projet plus complexe.

### 🏷️ 4. Nommage des callbacks `on+verb` — un pattern qui se corrige puis revient (axe 1.2)

Le pattern le plus révélateur de la série : `setMode` corrigé en Priorité 3 du Pomodoro → réapparu sous la forme `setIsOpen` dans Product List → enfin acquis depuis Mortgage. La leçon : une règle corrigée une fois n'est pas encore internalisée — il faut qu'elle survive à un changement de contexte.

Sur ce projet, ça se jouera sur les handlers du sélecteur de pourcentage et du formulaire (nombre de personnes, montant) : tout callback déclenché par une interaction utilisateur → `on` + verbe (`onPercentageSelect`, `onPeopleCountChange`…), jamais un setter brut exposé tel quel.

### 👀 5. Point de vigilance secondaire — wrappers lambda inutiles (axes 1.4 / 3.2)

Signalé pour la première fois sur Memory Game : `onClick={() => onStart()}` au lieu de `onClick={onStart}`. Référence stable, lisibilité immédiate, zéro re-render parasite. À surveiller en câblant les boutons de sélection de pourcentage et le reset.

### Ce qui n'a pas besoin d'un effort particulier ici

A11y (3.5/5), TypeScript (4/5) et sécurité (5/5) sont déjà des points solides de la trajectoire. Pas d'effort spécial à fournir — juste maintenir le niveau (labels et `aria-*` corrects sur les inputs et le sélecteur de pourcentage, pas de `any`, types explicites).

---

## 🚦 Project Kickoff — Auto-évaluation des concepts clés

> Réalisée avant l'écriture du code de la solution, conformément à `AGENTS.md` §3. Liste de concepts extraite du design (`desktop-design-completed.jpg`, `active-states.jpg`) et du `style-guide.md` : input Bill, 5 boutons de % + champ Custom, input Number of People avec état d'erreur ("Can't be zero"), panneau résultat (Tip Amount / Total per person), bouton Reset.

| Concept                                       | Auto-évaluation initiale         | Note                                                                                                                                                |
| --------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Composants contrôlés & state React             | À l'aise                         | —                                                                                                                                                   |
| State dérivé vs state stocké                   | Notion inconnue ("je sais pas ce que ça veut dire") | Expliquée en kickoff avec un exemple neutre (firstName/lastName → fullName non stocké). À observer concrètement : tip/total seront-ils calculés à la volée ou stockés dans un `useState` séparé ? |
| Rendu conditionnel & classes conditionnelles   | À l'aise                         | —                                                                                                                                                   |
| Validation de formulaire & garde-fous          | "Ça devrait aller"               | A exprimé l'envie d'installer React Hook Form pour ne pas "réinventer la roue" — voir notes de contexte                                            |
| Layout responsive Tailwind                     | Très à l'aise                    | —                                                                                                                                                   |
| Accessibilité de formulaire                    | Pratique régulièrement           | Auto-diagnostic spontané : a11y souvent ajoutée en fin de projet plutôt qu'en cours de route — rejoint exactement le `aria-live` manquant relevé sur Memory Game (axe 3.1, `rapport.md`) |
| Tests unitaires de logique métier              | Rouillé                          | Vu en formation il y a ~1 an, peu pratiqué depuis — cohérent avec le statut "nouveau terrain" de cet axe pour ce projet                            |

### 💬 Notes de contexte (kickoff)

- **State dérivé** : notion non identifiée par Thomas au moment du kickoff (gap honnête, pas une fausse certitude). Expliquée verbalement avec un exemple neutre plutôt qu'avec le code de la solution. Le test réel sera dans l'écriture : est-ce que `tipAmount`/`total` deviennent des `useState` séparés (anti-pattern) ou des valeurs calculées à chaque render à partir de `bill`, `tipPercent`, `numberOfPeople` (la bonne approche, déjà identifiée comme point fort sur Mortgage et Memory Game dans `rapport.md`) ?
- **React Hook Form** : proposition de Thomas, déclinée pour ce projet. Argument donné : 3 champs avec validation simple (`bill > 0`, `people !== 0`) — écrire cette validation à la main est justement la répétition qui ancre la mécanique de formulaire contrôlé ; sauter à l'abstraction maintenant ferait perdre l'occasion de ressentir le problème qu'elle résout. RHF reste un excellent choix pour un futur projet à formulaire complexe (8+ champs, règles imbriquées).
- **Accessibilité** : diagnostic que Thomas a posé lui-même, sans qu'on le lui demande — signe de recul réel sur sa pratique. Coïncide avec le constat exact de `rapport.md` (Memory Game 3.1, 3.5/5 : a11y solide mais `aria-live` absent sur les annonces dynamiques). Sur ce projet, le panneau résultat change à chaque saisie — bon terrain pour câbler `aria-live="polite"` *au moment où* le composant s'écrit, pas en repasse finale.

---

## Session 2026-06-08 (suite) — Tip Calculator App — Premiers composants & structure UI

### ✅ Étapes accomplies

- Première écriture de code de la solution par Thomas lui-même (rupture avec la session du matin, où l'agent avait fait tout le scaffolding à sa demande) : structure JSX complète du calculateur dans `App.tsx`
- Décomposition en composants avec props typées : `Label`, `Input`, `TipButton`, `Result` — chacun à responsabilité unique
- Génération des boutons de % via un tableau centralisé itéré (`TIP_PERCENTAGES.map(...)`) plutôt que du JSX répété — réflexe DRY appliqué spontanément, sans sollicitation
- Trois allers-retours de correction sur des points relevés par l'agent :
  1. `Results.tsx` exportant `Result` (incohérence fichier/export) → harmonisé en `Result.tsx`/`Result`, en revenant à la question "qu'est-ce que ce composant représente ?" (un seul résultat, invoqué deux fois) plutôt qu'en alignant arbitrairement un nom sur l'autre
  2. `<label htmlFor={label}>` orphelin sur un `<div role="status">` → remplacé par `<p>` une fois la sémantique de `<label>` reposée, plutôt que de "réparer" l'association `htmlFor`/`id` qui n'aurait de toute façon pas produit le comportement attendu
  3. Constante `TipButtonValues` (PascalCase) → renommée `TIP_PERCENTAGES` (`UPPER_SNAKE_CASE`), avec un bonus spontané : le type associé renommé `TipPercentage` (au lieu de `TipButtonValue`) — généralisation du principe au-delà du point précis signalé

### 🧠 Notions de code vues

| Notion                                              | Statut                                  | Commentaire                                                                                                                                                                                                                   |
| --------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Décomposition de composants & props typées          | Consolidée                              | Coupe pertinente dès le premier jet ; correction explicite et assumée d'un travers identifié par Thomas lui-même sur ses projets précédents (sous-décomposition)                                                             |
| Rendu de listes via `.map()` sur données centralisées | Consolidée                            | `TIP_PERCENTAGES.map(...)` — réflexe DRY spontané, non sollicité                                                                                                                                                              |
| Convention de nommage fichier ↔ export               | Faussement acquise → en consolidation  | Déjà signalée 2x dans `rapport.md` (Galleria : `Articles`/`Article` ; Rest Countries : `CountryContext`/`CountriesContext`). Réapparue ici, mais — différence notable — corrigée en remontant à la question sémantique plutôt qu'en alignant un nom sur l'autre au hasard |
| Sémantique HTML `<label>` / `htmlFor`                | Faussement acquise                      | Pensait l'association résolue en ajoutant `id={label}` ; n'avait pas identifié que `<label>` cible un contrôle de formulaire focusable, pas un `<div>`. Corrigé à la racine (suppression du `<label>`) une fois la question reposée |
| Constantes module-level (`UPPER_SNAKE_CASE`)         | Révisée                                 | Correction appliquée + généralisation spontanée au type associé — signal positif d'internalisation au-delà de l'instance signalée                                                                                            |

### ⚠️ Notions faussement acquises détectées

- **Cohérence nom de fichier / export** : première intention = aligner l'export sur le nom du fichier (`Results.tsx` → `const Results`), sans se demander lequel des deux noms décrivait correctement ce que représente le composant. Rattrapé en seconde passe en posant la question à l'envers — mais le réflexe initial montre que la règle "fichier = export" est appliquée mécaniquement, sans vérifier la justesse sémantique du nom de départ. C'est la 3e occurrence de ce pattern précis dans le parcours de Thomas.
- **`<label htmlFor>`** : pensait avoir réparé l'association en faisant matcher `htmlFor` et `id` par coïncidence de chaînes — n'avait pas anticipé que `<label>` est une construction de formulaire ciblant un élément focusable. Notion d'a11y que Thomas se dit pratiquer régulièrement (cf. kickoff), mais qui révèle ici une zone d'ombre précise sur le fonctionnement réel de `<label>` — exactement le type de détail qu'il a lui-même identifié comme "rattrapé en fin de projet" lors du kickoff.

### 🔄 Étapes restantes

- Logique de calcul : state du formulaire (`bill`, `%` sélectionné/`custom`, `numberOfPeople`) et dérivation de `tipAmount`/`total` — terrain direct pour observer si la notion de **state dérivé** (posée comme inconnue au kickoff) se traduit en pratique par un `useState` séparé (anti-pattern) ou un calcul à la volée
- Validation des inputs et garde-fous (`Can't be zero`, division par zéro)
- Bouton Reset fonctionnel
- Alignement visuel avec `active-states.jpg` (état actif des boutons de %, focus, erreurs)
- Tests de la logique du calculateur (Vitest) — premier vrai contact avec l'axe testing du projet
- `App.test.tsx` à mettre à jour : cherche encore le `<h1>` du placeholder, qui n'existe plus dans la structure réelle

### 📈 Évaluation de session

- **Points solides :** Décomposition spontanée et pertinente dès le premier jet — correction assumée d'un travers identifié sur lui-même ; réflexe DRY non sollicité (tableau + `.map()`) ; et surtout, capacité à *revenir* sur une correction de surface une fois la bonne question posée — la deuxième passe sur `Result`/`<p>` est une vraie révision du raisonnement, pas un ajustement de façade
- **Points fragiles :** Deux corrections de première intention qui traitaient le symptôme sans interroger le choix de départ (nom de fichier aligné sans vérifier le sens, `htmlFor` "réparé" sans vérifier la sémantique de `<label>`). C'est le même pattern que `setMode` → `setIsOpen` dans `rapport.md` : patcher l'instance signalée plutôt qu'absorber la règle sous-jacente. Différence à noter : ici, la deuxième passe a corrigé *à la racine* — première fois que ce sursaut est observé sur ce projet
- **Priorité pour la prochaine session :** Écrire la logique de state et observer — sans intervention préalable de l'agent — comment Thomas gère "state stocké vs state dérivé". C'est le test réel de la notion posée comme inconnue au kickoff

### 💬 Notes de contexte

- Première session où Thomas écrit lui-même du code de la solution — rupture nette avec la session du matin (setup fait par l'agent à sa demande). Premier vrai test du protocole socratique défini dans `AGENTS.md`
- Rythme observé : Thomas livre un premier jet complet, accueille le retour, corrige — et quand la première correction ne suffit pas, il *repart de la question* plutôt que de défendre son choix initial. Signal de collaboration sain pour la suite
- Session d'environ 5h englobant la matinée (setup, cf. session précédente) et l'après-midi (composants + UI) — toute la structure visuelle du calculateur est posée et prête pour la logique

---

## Session 2026-06-08 — Tip Calculator App — Setup & scaffolding

### ✅ Étapes accomplies

- Scaffold du projet avec Vite + React + TypeScript (template `react-ts`), fusionné dans le dossier existant du challenge en préservant README/AGENTS/design/style-guide
- Assets du challenge déplacés vers `public/images/`, `index.html` reconfiguré (favicon, titre)
- Installation et configuration de Tailwind CSS v4 via `@tailwindcss/vite` (plugin Vite natif, pas de `tailwind.config.js`)
- Ajout de `clsx` + `tailwind-merge` avec un helper `cn()` dans `src/lib/utils.ts`
- Extraction de la palette de couleurs depuis les captures Figma vers `@theme` dans `index.css` (`grey-*`, `green-*`, `orange-400`, `font-mono`)
- Création des 6 text presets (`text-preset-1` à `6`) via `@utility` à la demande explicite de Thomas (une classe = 4 propriétés, plutôt que les tokens `--text-*` qui génèrent plusieurs classes)
- Conversion des unités `px` → `rem`/`em` sur les presets, avec explication du choix : `rem` pour `font-size` (accessibilité, respecte le zoom utilisateur), `em` pour `line-height`/`letter-spacing` (proportionnalité avec la taille de police de l'élément)
- Détection et résolution d'un blocage d'environnement : Avast interceptait le trafic HTTPS de npm (certificat non reconnu par Node, ~70s par paquet) → export du certificat racine Avast et configuration de `NODE_EXTRA_CA_CERTS` en variable d'environnement persistante (validé avec Thomas avant application, car modification système)
- Échange sur le choix d'outils de test (Vitest vs Jest, RTL) — recommandation argumentée et acceptée
- Installation de Vitest + React Testing Library + `jest-dom` + `user-event`, détection et correction d'une faille de sécurité critique dans la version de Vitest installée par défaut (`<4.1.0` → upgrade vers `4.1.8`)
- Configuration de Vitest (`defineConfig` depuis `vitest/config`, environnement `jsdom`, fichier de setup utilisant `@testing-library/jest-dom/vitest` — pas l'export par défaut qui suppose un `expect` global façon Jest)
- Premier test d'exemple (`App.test.tsx`) écrit et passant, démontrant la philosophie RTL (interroger par rôle plutôt que par classe CSS)
- Installation et configuration de Prettier + `prettier-plugin-tailwindcss` (`prettier.config.js`, `.prettierignore`, scripts `format`/`format:check`) — Thomas a identifié lui-même ce manque après avoir relu la code review Memory Game, qui pointe explicitement cet outil comme LA solution qui a réglé en une fois le problème récurrent des doubles espaces dans les classNames (5 reviews consécutives avant Rest Countries). Vérifié avec `--check` puis `--write` sur le code source ; suite de tests toujours verte après reformattage

### 🧠 Notions de code vues

| Notion                                | Statut   | Commentaire                                                                                                            |
| ------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| Tailwind v4 `@theme` / design tokens   | Nouvelle | Vue en contexte via l'extraction Figma → variables CSS ; pas encore manipulée directement par Thomas                   |
| Tailwind v4 `@utility`                 | Nouvelle | Thomas a explicitement préféré cette approche aux tokens `--text-*` — bon instinct sur la lisibilité du HTML résultant |
| `rem` vs `em` (accessibilité, ratios)  | Révisée  | Demande explicite de conversion ; principe général connu, calcul délégué à l'agent                                     |
| Vitest / React Testing Library         | Nouvelle | Première approche du domaine des tests unitaires ("exercice simple pour découvrir")                                    |

### ⚠️ Notions faussement acquises détectées

- Aucune observée. Cette session n'a pas comporté de moments où Thomas écrit du code lui-même (setup/scaffolding fait par l'agent à sa demande explicite) — donc pas de matière pour détecter un écart entre confiance perçue et maîtrise réelle. Le prochain créneau d'écriture de code sera plus révélateur sur ce plan.

### 🔄 Étapes restantes

- Auto-évaluation "Project Kickoff" sur les concepts clés du challenge — pas encore faite, aucun code de la solution n'a été écrit
- Structure HTML/JSX du calculateur (formulaire, sélection de pourcentage de pourboire, champs nombre de personnes)
- Logique de calcul : state, gestion des inputs/validation, calcul du montant du pourboire et du total par personne
- Mise en page responsive Tailwind (mobile 375px / desktop 1440px, cf. `style-guide.md`)
- Tests de la logique du calculateur, au-delà de l'exemple `App.test.tsx`

### 📈 Évaluation de session

- **Points solides :** Formule ses besoins avec précision (ex. préférence explicite pour `@utility` plutôt que tokens, demande de conversion `rem`/`em` ciblée) ; pose les bonnes questions avant d'adopter un outil (a comparé Vitest/Jest avant de trancher plutôt que d'accepter la première suggestion sans recul)
- **Points fragiles :** N/A pour cette session — aucun code de la solution écrit par Thomas, donc rien à évaluer sur ce plan
- **Priorité pour la prochaine session :** Démarrer l'écriture du HTML/JSX du calculateur — Thomas écrit, l'agent guide avec indices progressifs (conformément au protocole défini dans `AGENTS.md` §5)

### 💬 Notes de contexte

- Session explicitement dédiée au setup : Thomas a demandé à l'agent d'installer/configurer directement (Vite, React, TS, Tailwind, clsx, tailwind-merge, Vitest, RTL) plutôt que de le faire lui-même — choix assumé pour ne pas perdre de temps sur l'infrastructure avant d'attaquer le challenge
- Stack choisie pour ce projet : Vite + React + TypeScript + Tailwind v4 + clsx + tailwind-merge, au lieu du HTML/CSS/JS vanilla suggéré par le challenge — pratique délibérée de la stack actuelle plutôt qu'un choix par défaut
- Thomas a importé manuellement un nouveau fichier `AGENTS.md` personnalisé en cours de session (passage en mode "apprentissage socratique") — l'agent suit désormais cette version mise à jour
