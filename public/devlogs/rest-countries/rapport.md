# Code Review — Rest Countries API with Color Theme Switcher — 2026-05-11

## Contexte

|                       |                                                                  |
| --------------------- | ---------------------------------------------------------------- |
| **Niveau de review**  | N°6 (Niveaux 1 + 2 évalués)                                      |
| **Stack**             | React 19 + TypeScript + Tailwind CSS v4 + React Router v7 + Vite |
| **Review précédente** | Mortgage Repayment Calculator — 3.9/5 (Niveaux 1 + 2)            |

---

## Progression depuis la review précédente

**Priorité 1 Mortgage (lisibilité — doubles espaces)** : ✅ Résolue et bien résolue. Prettier est installé (`prettier: ^3.8.3`), `prettier-plugin-tailwindcss` est dans les devDependencies, et `prettier.config.js` active le plugin. Zéro double espace dans tous les classNames. C'est la première fois que cet axe passe à 4/5 en 6 reviews. Le bon outil, bien configuré — ça se voit.

**Priorité 2 Mortgage (commits — guillemets parasites et anglais)** : ✅ Résolue. Aucun message ne se termine par `"`. Aucun mot français dans les messages anglais. Le niveau d'attention s'est clairement amélioré.

**Priorité 3 Mortgage (architecture — `Result` dans `types/index.ts` + `formatter` hors composant)** : N/A (projet différent). Mais le principe "les types partagés vont dans `types/index.ts`" est bien en place ici — `Region`, `Country`, `CountrySummary`, `CountryMapEntry` y sont tous.

---

## Évaluation par axe — Niveau 1

### 1.1 Structure & organisation — 4/5 =

`components/`, `context/`, `hooks/`, `lib/`, `types/` — tout est en place et séparé proprement. `App.tsx` tient en 18 lignes et ne fait qu'orchestrer les routes. Pas de fichiers morts du scaffold Vite. `prettier.config.js` au bon endroit à la racine.

**Un point structurel mineur :** `CountryContext.tsx` (nom de fichier au singulier) exporte `CountriesContext` (nom au pluriel). Le nom du fichier ne correspond pas à l'export — un lecteur qui cherche `CountriesContext` doit d'abord trouver `CountryContext.tsx`. La cohérence nom de fichier / export était un acquis depuis Pomodoro.

```ts
// CountryContext.tsx — exporte CountriesContext
export const CountriesContext = createContext<CountryContextType | undefined>(
  undefined,
);
// Attendu : CountryContext.tsx → CountryContext, ou CountriesContext.tsx → CountriesContext
```

---

### 1.2 Nommage — 4/5 =

PascalCase, camelCase, `REGIONS` en UPPER_SNAKE_CASE — convention en place. Interfaces nommées correctement : `CountryContextType`, `ThemeContextType`, `CountryCardProps`. Pas de suffixe `Interface`.

**Trailing spaces dans deux alt texts (`Header.tsx:21,30`) :**

```tsx
alt = "sun symbol "; // espace final invisible dans le DOM
alt = "moon symbol "; // idem
```

Le pattern est identique au trailing space dans l'`aria-label` signalé en backlog sur Product List. Cette fois c'est un `alt` — même logique, même bruit invisible.

**`countriesMap` nomme un tableau comme si c'était une Map :**

```ts
const [countriesMap, setCountriesMap] = useState<CountryMapEntry[]>([]);
```

`CountryMapEntry[]` est un tableau (`Array`), pas une `Map`. Le nom `countriesMap` laisse entendre une structure clé/valeur. `countriesList` ou simplement `countries` serait plus exact.

---

### 1.3 Commits — 4/5 =

Les deux problèmes de Mortgage (guillemets parasites, mot français) sont définitivement corrigés. Les scopes sont tous en minuscules. L'atomicité est bonne sur les 49 commits. `feat/fix/chore/refactor/docs` utilisés correctement dans l'ensemble.

**Deux irrégularités :**

**Double colon dans `4751ca6` :**

```
feat(css):: add text-preset-10
```

Le `::` est probablement un copier-coller qui a doublé le séparateur. Le format attendu est `type(scope): message`.

**`assets` n'est pas un type Conventional Commits (`15de065`) :**

```
assets(img): add icons png in public/images
```

`assets` n'existe pas dans la spécification. Le type correct pour ajouter des ressources statiques est `chore(img)`.

---

### 1.4 Lisibilité — 4/5 ⬆️ (+1 — progression la plus nette depuis Galleria)

C'est la progression de cette review. Prettier est installé, configuré avec `prettier-plugin-tailwindcss`, et utilisé — les classNames sont propres du premier au dernier fichier. Zéro double espace, zéro trailing space dans les strings de classes. C'était la priorité n°1 depuis Galleria (5 reviews) et c'est réglé.

**Ce qui reste :**

**Strings en français dans un codebase anglais — `CountryDetail.tsx` et `CountriesProvider.tsx` :**

```tsx
// CountryDetail.tsx
if (loading) return <p>Chargement...</p>;
if (!country) return <p>Aucun pays trouvé</p>;
setError("Erreur lors du fetch");

// CountriesProvider.tsx
throw new Error("Erreur lors du fetch");
setError("Une erreur inconnue est survenue");
```

L'UI et les messages d'erreur sont en français dans un projet en anglais. Dans un dépôt partagé, ce mélange est visible immédiatement.

**Artefact `{" "}` dans `CountryDetail.tsx:151` :**

```tsx
</ul>{" "}
```

Ce `{" "}` après le `</ul>` est un espace invisible dans le DOM. C'est un résidu de modification sans utilité.

---

## Évaluation par axe — Niveau 2

### 2.1 Composants React — 4/5 =

Découpage pertinent et cohérent. `CountryCard` est purement présentationnel. `Home` encapsule la logique de filtrage avec `useMemo`. `Header` délègue le toggle via `useTheme()`. Le provider pattern est bien respecté.

**Un point mineur — `Fallback.tsx` :**

```tsx
<Link to={`/`}>
  <h3 className="...">Go back to Home</h3>
</Link>
```

Envelopper un `<h3>` dans un `<Link>` est sémantiquement discutable — un heading ne devrait pas être le contenu cliquable d'un lien. La convention est un `<Link>` avec du texte brut ou un `<span>`.

---

### 2.2 TypeScript — 4/5 =

Pas de `any`. Tous les états sont typés explicitement. `useParams<{ alpha3Code: string }>`, `useState<CountrySummary[]>`, `useState<Country | null>` — tous corrects. L'import `type` est utilisé correctement dans `CountryDetail.tsx`.

**`CountriesProvider.tsx` importe `CountrySummary` sans le mot-clé `type` :**

```ts
import { CountrySummary } from "../types";
// devrait être :
import type { CountrySummary } from "../types";
```

C'est un type-only import — le mot-clé `type` est la convention correcte et permet au bundler de tree-shaker le type à la compilation.

**`capital` affiché sans `.join()` dans `CountryCard.tsx:42` :**

```tsx
<dd className="text-preset-8-light">{capital}</dd>
```

`capital` est de type `string[]`. React concatène les éléments d'un tableau sans séparateur. Pour un pays à capitale unique (`["Paris"]`) le rendu est correct — mais pour un pays avec plusieurs capitales (`["Suva", "Lautoka"]`), le rendu sera `SuvaLautoka`. Le commit `767891d` a corrigé ce problème dans `CountryDetail.tsx` avec `.join(", ")` mais `CountryCard.tsx` n'a pas été mis à jour.

---

### 2.3 Gestion de l'état — 3.5/5 ⬇️

L'architecture global/local est bien pensée : `CountriesProvider` pour les pays, `ThemeProvider` pour le thème, état local dans `Home` pour la recherche et le filtre. C'est cohérent.

**Problème principal : `CountryDetail` refetche la liste complète des pays à chaque visite :**

```ts
// CountryDetail.tsx — déclenché à chaque montage du composant
const [countryRes, mapRes] = await Promise.all([
  fetch(`https://restcountries.com/v3.1/alpha/${alpha3Code}?...`),
  fetch("https://restcountries.com/v3.1/all?fields=cca3,name"), // ← inutile
]);
```

`CountriesProvider` a déjà fetchés `https://restcountries.com/v3.1/all?fields=name,flags,cca3,...` au mount de l'application. Ce fetch inclut `cca3` et `name.common` — exactement ce dont `getBorderName` a besoin. Chaque navigation vers une page pays déclenche un appel réseau redondant vers la même API pour les mêmes données.

---

### 2.4 DRY & réutilisabilité — 3.5/5 =

`cn()` est configuré mais n'est utilisé dans aucun composant. Le projet n'a pas de classNames très conditionnels — l'absence n'est pas un problème actuel, mais l'outil est là pour le moment où ça devient nécessaire.

**`CountryMapEntry` est structurellement redondant avec `CountrySummary` :**

```ts
export type CountryMapEntry = {
  cca3: string;
  name: { common: string };
};
// CountrySummary contient déjà cca3 et name.common — CountryMapEntry n'ajoute rien
```

Si la Priorité 1 est appliquée (utiliser `useCountries()` dans `CountryDetail`), `CountryMapEntry` devient obsolète et peut être supprimé.

---

## ✅ 3 priorités pour ce projet

### Priorité 1 — État : CountryDetail refetche inutilement la liste des pays (axe 2.3)

**Le problème :** Chaque visite d'une page pays déclenche un appel vers `/all?fields=cca3,name` — la requête la plus lourde (250+ pays). Ces données sont déjà disponibles via `CountriesContext`.

**La correction :**

```tsx
// CountryDetail.tsx — avant
const [countriesMap, setCountriesMap] = useState<CountryMapEntry[]>([]);
// + fetch("https://restcountries.com/v3.1/all?fields=cca3,name") dans le useEffect

// CountryDetail.tsx — après
const { countries } = useCountries();

const getBorderName = (code: string) =>
  countries.find((c) => c.cca3 === code)?.name.common;
```

`Promise.all` devient un simple `fetch` pour le pays en cours. L'état `countriesMap`, le second fetch, et le type `CountryMapEntry` disparaissent. La règle : avant d'écrire un `fetch`, vérifier ce qui est déjà disponible dans le contexte.

---

### Priorité 2 — Lisibilité : corriger les strings en français (axe 1.4)

**Le problème :** Quatre messages en français dans un codebase anglais — états de chargement, d'erreur, et exceptions.

**La correction :**

```tsx
// CountryDetail.tsx
if (loading) return <p>Loading...</p>;
if (!country) return <p>Country not found</p>;
setError("Failed to fetch country data");

// CountriesProvider.tsx
throw new Error("Failed to fetch countries");
setError("An unknown error occurred");
```

La règle : un codebase choisit une langue pour les strings. Ici c'est l'anglais — les labels, textes et messages d'erreur doivent tous l'être.

---

### Priorité 3 — Cohérence : `CountryCard` affiche les capitales sans `.join()` (axe 2.2)

**Le problème :** Le commit `767891d` a corrigé l'affichage dans `CountryDetail` mais pas dans `CountryCard`. Un pays à deux capitales affichera `SuvaLautoka` au lieu de `Suva, Lautoka` dans les cards.

**La correction :**

```tsx
// CountryCard.tsx:42 — avant
<dd className="text-preset-8-light">{capital}</dd>

// après
<dd className="text-preset-8-light">{capital.join(", ")}</dd>
```

La règle à ancrer : quand un fix corrige un rendu, passer systématiquement en revue tous les endroits où la même donnée est affichée.

---

## 📋 Backlog de progression

| Axe   | Observation                                                                                                                                              |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1.2] | `alt="sun symbol "` et `alt="moon symbol "` dans `Header.tsx:21,30` — trailing space dans les alt texts, même pattern que l'`aria-label` de Product List |
| [1.2] | `countriesMap` nomme un tableau — `countriesList` ou `countries` serait plus précis (résolu automatiquement si Priorité 1 appliquée)                     |
| [1.3] | `feat(css)::` — double colon dans `4751ca6`, résidu de copier-coller                                                                                     |
| [1.3] | `assets(img)` — type invalide dans `15de065`, devrait être `chore(img)`                                                                                  |
| [2.1] | `Fallback.tsx` — `<h3>` à l'intérieur d'un `<Link>` — à remplacer par du texte brut dans le lien                                                         |
| [2.2] | `CountriesProvider.tsx` — `import { CountrySummary }` sans `type` — à passer en `import type`                                                            |
| [2.4] | `CountryMapEntry` superflu si Priorité 1 appliquée — à supprimer de `types/index.ts`                                                                     |
| [1.4] | `{" "}` résidu dans `CountryDetail.tsx:151` — à supprimer                                                                                                |

---

## 📊 Score global

| Axe            | Galleria | Pomodoro | Results Summary | Product List | Mortgage | Rest Countries | Delta   |
| -------------- | -------- | -------- | --------------- | ------------ | -------- | -------------- | ------- |
| 1.1 Structure  | 3.5      | 4        | 4               | 4.5          | 4.5      | **4**          | ⬇️ -0.5 |
| 1.2 Nommage    | 4        | 3.5      | 4.5             | 3.5          | 4        | **4**          | =       |
| 1.3 Commits    | 3        | 3        | 3.5             | 4            | 4        | **4**          | =       |
| 1.4 Lisibilité | 3        | 3        | 3.5             | 3            | 3        | **4**          | ⬆️ +1   |
| **Moy. N1**    | 3.4      | 3.4      | 3.9             | 3.75         | 3.9      | **4**          | ⬆️ +0.1 |
| 2.1 Composants | —        | —        | —               | 3.5          | 4        | **4**          | =       |
| 2.2 TypeScript | —        | —        | —               | 4            | 4        | **4**          | =       |
| 2.3 État       | —        | —        | —               | 3.5          | 4        | **3.5**        | ⬇️ -0.5 |
| 2.4 DRY        | —        | —        | —               | 3            | 3.5      | **3.5**        | =       |
| **Moy. N1+2**  | —        | —        | —               | 3.6          | 3.9      | **3.9**        | =       |

**Verdict :** Le score N1+2 reste à 3.9 mais le tableau interne a changé de façon significative. La lisibilité passe enfin à 4/5 — c'est le saut le plus attendu depuis le début de la série. La moyenne Niveau 1 passe pour la première fois au-dessus de 4. En contrepartie, la gestion d'état régresse légèrement à 3.5 à cause du double fetch dans `CountryDetail`. Ce recul est architectural et corrigible en une passe.

---

## Note finale

Ce projet est propre. La structure, le TypeScript, les composants — tout ça est au niveau. Et pour la première fois depuis Galleria, la lisibilité n'est plus un frein : Prettier est configuré, branché, et les classNames le prouvent.

Ce qui reste, c'est un problème classique qui apparaît quand on monte en complexité : la gestion du cache. `CountriesProvider` a déjà fetchés la liste des pays — mais `CountryDetail` la refetche quand même. Ce n'est pas un oubli de débutant ; c'est le type d'erreur qui apparaît précisément quand l'architecture commence à avoir plusieurs niveaux. La correction enseigne un réflexe important : avant d'écrire un `fetch`, vérifier ce qui est déjà disponible dans le contexte.

**Le Niveau 3 (accessibilité, performance, gestion des erreurs) s'approche. Les fondations sont assez solides pour l'accueillir.**

# Code Review — Mortgage Repayment Calculator — 2026-05-02

## Contexte

|                       |                                                |
| --------------------- | ---------------------------------------------- |
| **Niveau de review**  | N°5 (Niveaux 1 + 2 évalués)                    |
| **Stack**             | React 19 + Vite + Tailwind CSS v4 + TypeScript |
| **Review précédente** | Product List with Cart — 3.6/5 (Niveaux 1 + 2) |

---

## Progression depuis la review précédente

**Priorité 1 Product List (lisibilité — double espaces avant push)** : ❌ Non réglée. Les doubles espaces sont présents dans cinq fichiers différents (`FormSection.tsx`, `InputNumber.tsx`, `InputRadio.tsx`, `ResultSection.tsx`). C'est la cinquième review consécutive où ce point apparaît — c'est désormais le signal le plus fort de toute la série.

**Priorité 2 Product List (nommage — `setIsOpen` → `onOpenModal`)** : ✅ Réglée et internalisée. Aucun setter brut passé comme prop dans ce projet. `onChange`, `onSubmit`, `onClear` — tous corrects. La règle `on+verb` est devenue un réflexe.

**Priorité 3 Product List (DRY — refactorer `Cart.tsx`)** : N/A (projet différent). Mais `cn()` est maintenant utilisé activement dans `InputNumber.tsx` et `InputRadio.tsx` — l'objectif O4 est atteint.

---

## Évaluation par axe — Niveau 1

### 1.1 Structure & organisation — 4.5/5 =

`components/`, `hooks/`, `lib/`, `types/` — tout est présent, séparé, cohérent. `App.tsx` tient en 77 lignes et ne fait qu'orchestrer l'état et les props. Pas de fichiers morts du scaffold Vite. Noms de fichiers = noms d'exports sans exception.

**Un seul point structurel :** `Result` est définie dans `useMortgageCalculator.ts` et importée depuis là par `ResultSection.tsx`.

```ts
// ResultSection.tsx:1
import { Result } from "../hooks/useMortgageCalculator";
```

L'interface `Result` est un type de données partagé entre deux composants — sa place naturelle est `types/index.ts`, pas dans le fichier du hook. `Inputs` et `Errors` y sont déjà ; `Result` devrait l'être aussi.

---

### 1.2 Nommage — 4/5 ⬆️

Grande amélioration sur le point signalé. `onChange`, `onSubmit`, `onClear` dans `FormSectionProps` — convention `on+verb` appliquée correctement et systématiquement. Interfaces nommées proprement : `FormSectionProps`, `InputNumberProps`, `InputRadioProps`, `ResultSectionProps`. Pas de suffixe `Interface`.

**Un point mineur :**

```tsx
// InputNumber.tsx:27
const [isFocus, setIsFocus] = useState(false);
```

En anglais, le participe passé est `focused` : `isFocused` serait plus idiomatique. `isFocus` se lit comme un nom (`the focus`), pas comme un état booléen.

**Un point de présentation :** les labels passés à `InputRadio` ne sont pas cohérents :

```tsx
<InputRadio label={"repayment"}     ... />   // minuscule
<InputRadio label={"interest Only"} ... />   // espace + majuscule interne
```

Ce n'est pas un problème de nommage de variable, mais une incohérence dans les données textuelles affichées.

---

### 1.3 Commits — 4/5 =

Structure globale propre : 54 commits, intentions atomiques, scopes en minuscules, sémantique `feat/fix/chore/refactor/docs/perf` correctement utilisée. `refactor(form)`, `chore(assets)`, `docs(readme)` — tous pertinents. `perf(html)` est un type valide.

**Deux irrégularités :**

**Guillemets parasites dans deux messages :**

```
1f917d2 fix(input): add relative class to inputRadio label"
d62b96d fix(result): change typo in section class"
```

Le `"` final est probablement un résidu de copier-coller depuis l'IDE ou la ligne de commande. Un message de commit ne devrait jamais finir par un guillemet isolé.

**Anglicisme manqué — "deplace" :**

```
175d1a6 fix(hook): deplace guard n === 0 order
```

`deplace` n'existe pas en anglais. Le verbe correct est `move` ou `reorder`. C'est une fuite du français dans un message anglais — le genre d'erreur visible dans un historique git partagé.

---

### 1.4 Lisibilité — 3/5 = (stagnation — 5e review consécutive)

Les fichiers sont courts, les fonctions à responsabilité unique, zéro `console.log`, zéro code mort. `useMortgageCalculator.ts` est particulièrement propre : guards mathématiques explicites, séparation `r === 0` / `r !== 0`, logique de branche lisible.

**Les doubles espaces persistent dans cinq fichiers :**

```tsx
// FormSection.tsx:20
className = "...md:rounded-t-[1.25rem]  xl:rounded-l-[1.25rem]...";

// InputNumber.tsx:38
("...border-slate-500 relative  hover:not-focus-within:...");

// InputRadio.tsx:35
("...peer-focus-visible:border-lime  transition  z-10");

// ResultSection.tsx:14
("...bg-slate-900  md:rounded-b-lg...");

// ResultSection.tsx:17
className = "...justify-center  gap-4 w-full";

// ResultSection.tsx:18
className = "w-48  h-48 "; // double espace + trailing space
```

**Espace en tête de clé `cn()` dans `InputNumber.tsx:47` :**

```tsx
{
  " text-preset-3-error bg-red": isError,
}
```

L'espace devant `text-preset-3-error` est invisible dans le rendu mais présent dans le DOM. Ce type d'espace parasite dans un objet `cn()` est exactement le genre de bruit que `cn()` est censé éliminer.

---

## Évaluation par axe — Niveau 2

### 2.1 Composants React — 4/5 ⬆️

Découpage clair et pertinent. Chaque composant a une responsabilité unique. `InputNumber` encapsule sa logique de filtrage de saisie et son état `isFocus`. `InputRadio` est minimal (43 lignes). `FormSection` délègue sans contenir de logique métier.

L'état vide / état résultats dans `ResultSection` est géré par un ternaire propre — pas de duplication de section contrairement à `Cart.tsx` du projet précédent. Progrès visible sur l'axe DRY composants.

**Seul point :** `Result` exportée depuis le hook, importée directement dans `ResultSection` — couplage entre le composant et le fichier du hook, alors que `types/index.ts` existe précisément pour éviter ça.

---

### 2.2 TypeScript — 4/5 =

Pas de `any`. Interfaces définies pour toutes les props. `keyof Inputs` dans `FormSectionProps.onChange` — usage avancé et correct de l'inférence structurelle. `aria-invalid={isError}` — `boolean` accepté nativement, aucune annotation manuelle nécessaire.

**Observation :** `loanType: "repayment" | "interestOnly" | ""` — le string vide comme sentinel fonctionne et évite les vérifications `null`. C'est un choix défendable, mais `null` est plus idiomatique pour "aucune valeur sélectionnée" et s'aligne avec `result: Result | null` du hook.

**Annotation redondante supprimée :** Aucun `(item: Type)` dans un `.map()` — l'habitude signalée en backlog depuis `ProductList.tsx` est intégrée.

---

### 2.3 Gestion de l'état — 4/5 ⬆️

`inputs` et `errors` colocalisés dans `App`. `result` dans le hook — séparation logique propre. `isFocus` local dans `InputNumber`. Prop drilling sur deux niveaux max (App → FormSection → InputNumber) — acceptable.

`calculate` et `reset` retournés par le hook — convention correcte pour les fonctions de hook (pas de préfixe `on`, ce qui serait réservé aux props).

**Aucun setter brut passé comme prop.** L'anti-pattern `setIsOpen` du projet précédent est définitivement corrigé.

---

### 2.4 DRY & réutilisabilité — 3.5/5 ⬆️

`cn()` est enfin utilisé activement — dans `InputNumber.tsx` et `InputRadio.tsx`. L'objectif O4 est atteint. Les classNames conditionnels passent par `cn()` avec la notation objet `{ "class": condition }` — c'est exactement ce qui était demandé.

**Un anti-pattern de performance / DRY :**

```tsx
// ResultSection.tsx:7-10
const ResultSection = ({ result }: ResultSectionProps) => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });
```

`Intl.NumberFormat` est instancié à chaque render. L'objet est identique à chaque appel — il n'a aucune dépendance sur les props ou le state. Il doit être déclaré en dehors du composant, au niveau module :

```tsx
const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const ResultSection = ({ result }: ResultSectionProps) => {
```

---

## ✅ 3 priorités pour ce projet

### Priorité 1 — Lisibilité : casser le pattern des doubles espaces (stagnant depuis Galleria)

**Le problème :** Cinq fichiers contiennent des doubles espaces dans les classNames. C'est la cinquième review où ce point apparaît. Il a été signalé comme Priorité 1 dans le projet précédent. La relecture avant `git add` n'est toujours pas systématique.

**Ce que ça révèle :** ce n'est pas un oubli ponctuel — c'est une habitude de composition des classNames qui produit régulièrement des espaces parasites. L'espace vient souvent d'un copier-coller ou d'une modification partielle d'une chaîne.

**La règle à ancrer :** configurer Prettier avec le plugin `prettier-plugin-tailwindcss` règle ce problème automatiquement et définitivement. Alternativement : avant chaque commit, passer un `grep -r "  " src/` (deux espaces) sur les fichiers modifiés.

Prochain projet : **1.4 à 4/5, zéro double espace**.

---

### Priorité 2 — Commits : guillemets parasites et anglais

**Le problème :** deux messages terminent par `"`. Un message contient "deplace" (mot français).

**Pourquoi c'est important :** un historique git est lu par d'autres développeurs. Un `"` final ou un mot français dans un message anglais signalent un manque de relecture — le même type d'inattention que les doubles espaces. Les deux viennent du même endroit : l'absence de relecture avant commit.

**La règle :** après `git commit`, relire le message dans le terminal avant de valider. Si le message contient `"`, `&` entre deux choses, ou un mot qui n'est pas anglais : corriger avec `git commit --amend` (avant push).

Prochain projet : **4.5/5 sur les commits**.

---

### Priorité 3 — Architecture : `Result` dans `types/index.ts` + `formatter` hors composant

**Deux petites corrections, même logique :**

**`Result` à déplacer :**

```ts
// types/index.ts — ajouter
export interface Result {
  monthlyPayment: number;
  totalRepayment: number;
}
```

Supprimer l'export depuis `useMortgageCalculator.ts`. `ResultSection` importera depuis `../types` comme tous les autres composants.

**`formatter` à sortir du composant :**

```tsx
// ResultSection.tsx — avant le composant
const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
```

La règle : tout objet qui ne dépend ni des props ni du state appartient au niveau module, pas au niveau composant.

---

## 📋 Backlog de progression

| Axe   | Observation                                                                                                                                                                                                                                                                        |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1.2] | `isFocus` → `isFocused` — participe passé attendu pour un état booléen                                                                                                                                                                                                             |
| [1.2] | Labels radio : `"repayment"` (minuscule) vs `"interest Only"` (espace + majuscule interne) — uniformiser la casse des textes affichés                                                                                                                                              |
| [1.3] | `../../assets/images/icon-calculator.svg` dans `FormSection.tsx` — chemin relatif qui fonctionne "par chance" depuis la racine (le navigateur ne peut pas remonter au-dessus de `/`). À aligner avec `ResultSection.tsx` qui utilise `/assets/images/...` (chemin absolu, correct) |
| [2.2] | `loanType: "" \| "repayment" \| "interestOnly"` — le string vide comme sentinel vs `null`. À réfléchir pour le prochain projet avec un état "non sélectionné"                                                                                                                      |
| [1.4] | `" text-preset-3-error bg-red"` dans `InputNumber.tsx:47` — espace en tête du nom de classe dans l'objet `cn()`. À corriger avec la passe de nettoyage                                                                                                                             |

---

## 📊 Score global

| Axe            | Galleria | Pomodoro | Results Summary | Product List | Mortgage | Delta         |
| -------------- | -------- | -------- | --------------- | ------------ | -------- | ------------- |
| 1.1 Structure  | 3.5      | 4        | 4               | 4.5          | **4.5**  | =             |
| 1.2 Nommage    | 4        | 3.5      | 4.5             | 3.5          | **4**    | ⬆️ +0.5       |
| 1.3 Commits    | 3        | 3        | 3.5             | 4            | **4**    | =             |
| 1.4 Lisibilité | 3        | 3        | 3.5             | 3            | **3**    | = (5e review) |
| **Moy. N1**    | 3.4      | 3.4      | 3.9             | 3.75         | **3.9**  | ⬆️ +0.15      |
| 2.1 Composants | —        | —        | —               | 3.5          | **4**    | ⬆️ +0.5       |
| 2.2 TypeScript | —        | —        | —               | 4            | **4**    | =             |
| 2.3 État       | —        | —        | —               | 3.5          | **4**    | ⬆️ +0.5       |
| 2.4 DRY        | —        | —        | —               | 3            | **3.5**  | ⬆️ +0.5       |
| **Moy. N1+2**  | —        | —        | —               | 3.6          | **3.9**  | ⬆️ +0.3       |

**Verdict :** La progression sur le Niveau 2 est nette — trois axes progressent de 0.5 point. L'architecture des composants, la gestion de l'état et le DRY sont tous en bonne trajectoire. La lisibilité reste l'anomalie : c'est le seul axe à ne pas avoir bougé en cinq reviews, malgré deux fois où il était en Priorité 1. Ce n'est plus un oubli — c'est une habitude à cassser activement.

---

## Note finale

Le projet est techniquement solide. `useMortgageCalculator` est proprement séparé, les guards mathématiques (`r === 0`, `n === 0`, `Number.isFinite`) sont en place et bien ordonnés. La gestion a11y — `aria-describedby` sur les inputs en erreur, `aria-live` sur le panneau résultat, `checked` contrôlé sur les radios, `peer-focus-visible:` pour la navigation clavier — montre une attention réelle à l'expérience utilisateur complète. `cn()` est activement utilisé. La convention `on+verb` est devenue un réflexe.

Ce qui reste, c'est un point qui n'aurait pas dû suivre jusqu'ici : les doubles espaces dans les classNames. Cinq reviews, deux fois en Priorité 1, toujours présents. Ce n'est pas un problème de compréhension. C'est l'absence d'un outil ou d'un geste systématique avant le commit. Prettier avec `prettier-plugin-tailwindcss` résout ça une fois pour toutes — et libère de l'espace mental pour progresser sur autre chose.

**Le prochain projet devrait montrer 1.4 à 4/5. C'est le seul axe en retard sur la trajectoire.**

---

# Code Review — Product List with Cart — 2026-04-26

## Contexte

|                       |                                                |
| --------------------- | ---------------------------------------------- |
| **Niveau de review**  | N°4 (Niveaux 1 + 2 évalués)                    |
| **Stack**             | React 19 + Vite + Tailwind CSS v4 + TypeScript |
| **Review précédente** | Results Summary — 3.9/5 (Niveau 1 seul)        |

---

## Progression depuis la review précédente

**Priorité 1 Results Summary (commits — `doc`/casse/espace)** : ✅ Réglée. Zéro `doc`, tous les scopes en minuscules, espaces systématiques après `:`. Les 55 commits sont propres sur la forme. C'est la première review où les commits passent au-dessus de 3.5.

**Priorité 2 Results Summary (commentaires redondants)** : ✅ Réglée — et même overcorrigée. Zéro commentaire dans tout le projet. C'est bien ; une ligne de WHY aurait parfois été utile (ex. sur le double `useEffect` du modal), mais c'est le bon sens du réglage.

**Priorité 3 Results Summary (import path `../src/data/`)** : ✅ Réglée. `App.tsx:2` est maintenant `import data from "./data/data.json"`. Réflexe en place.

Trois sur trois — deuxième fois consécutive. La dynamique de correction est clairement installée.

---

## Évaluation par axe — Niveau 1

### 1.1 Structure & organisation — 4.5/5 ⬆️

`components/`, `data/`, `types/`, `utils/`, `lib/` — tout est présent et cohérent. Noms de fichiers = noms d'exports sans exception. Pas de fichier mort du scaffold Vite. `App.tsx` tient en 63 lignes et ne fait qu'orchestrer. Import path correct. C'est le meilleur score sur cet axe depuis le début.

Un micro-point : `lib/cn.ts` est présent et correctement configuré, mais `cn()` n'est utilisé nulle part dans le projet — les classNames sont tous des strings inline ou des template literals. L'utilitaire est importé dans aucun composant.

---

### 1.2 Nommage — 3.5/5 ⬇️

PascalCase, camelCase, `on+verb` pour les callbacks exposés — tout ça est en place et cohérent sur la majorité du code. Interfaces nommées correctement : `ProductCardProps`, `CartProps`, `ConfirmationModalProps` — aucun suffixe `Interface`.

**Régression — `setIsOpen` comme prop de `Cart.tsx:6` :**

```tsx
interface CartProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ...
}
```

C'est exactement le problème `setMode` du Pomodoro, corrigé en Priorité 3 de cette review. Le setter d'état interne est passé tel quel comme prop. La convention React est `on+verb` pour les callbacks exposés. Ici la bonne interface est `onOpenModal: () => void`, et dans `App.tsx` on passe `() => setIsOpen(true)`.

**Typo — `priceFormated` (`ProductCard.tsx:17`) :**

```tsx
const priceFormated = formatPrice(product.price);
```

`formatted` s'écrit avec deux `t`.

---

### 1.3 Commits — 4/5 ⬆️

Première fois que cet axe passe la barre des 4. Les problèmes structurels des reviews précédentes (casse, `doc`, espace après `:`) sont réglés. L'atomicité est bonne sur l'ensemble des 55 commits.

**Ce qui reste à affiner :**

`fix(types): delete subfolder` — supprimer un dossier n'est pas un `fix`. C'est un `chore` ou un `refactor`.

Deux commits successifs sur la même chose : `fix(readme): change img paths` puis `fix(readme): change img paths with public`. Si le premier n'était pas complet, le second aurait dû être évité par une meilleure relecture avant commit.

---

### 1.4 Lisibilité — 3/5 = (stagnation, 4e review)

Zéro `console.log`, zéro code mort, fonctions courtes, responsabilités claires. Mais les mêmes impuretés sont là depuis Galleria.

**Double espaces et trailing spaces dans les classNames — encore :**

```tsx
// ProductCard.tsx:20
className = "flex flex-col  items-center gap-4";

// ProductList.tsx:19
className = "grid  md:grid-cols-[repeat(3,1fr)] w-full gap-y-8 gap-x-6 ";

// ConfirmationModal.tsx:44
className = "backdrop:bg-black/50  max-w-148 ...";

// Cart.tsx:51
className = "flex flex-col ";
```

**`className=""` mort dans `ProductCard.tsx:89` :**

```tsx
<img className="" src="/assets/images/icon-increment-quantity.svg" alt="" />
```

**`return setIsOpen(false)` dans `App.tsx:33` :**

```tsx
function onClose() {
  return setIsOpen(false); // return inutile sur un setter void
}
```

Ce pattern était dans le backlog depuis Results Summary (`SummaryItem.tsx:47`). Il revient ici.

**`aria-label` avec trailing space dans `ProductCard.tsx:48` :**

```tsx
aria-label={`Add ${product.name} to cart `}
```

---

## Évaluation par axe — Niveau 2 (premier projet évalué sur ce niveau)

### 2.1 Composants React — 3.5/5

Chaque composant a une responsabilité claire. Props bien nommées et typées. Le découpage `ProductCard` / `ProductList` / `Cart` / `ConfirmationModal` est pertinent.

**Duplication structurelle dans `Cart.tsx` :** Le `<section>` et le `<h2>` sont copiés-collés entre l'état vide et l'état non-vide. La `<section>` avec ses 6 classes et le `<h2>` sont identiques des deux côtés du ternaire. Seul le contenu du body change.

---

### 2.2 TypeScript — 4/5

Pas de `any`. Interfaces définies pour toutes les props. `types/index.ts` expose `ProductImage`, `Product`, `CartItem` — propre. `useRef<HTMLDialogElement>`, `useState<Record<string, number>>` — bien typés.

**Un anti-pattern :** `Cart.tsx:6` — `setIsOpen: React.Dispatch<React.SetStateAction<boolean>>` expose l'implémentation interne du state au consommateur. Le type correct pour un callback exposé est `() => void`.

**Annotation redondante :** `ProductList.tsx:20` — `data.map((product: Product) => ...)` — TypeScript infère `Product` depuis `data: Product[]`.

---

### 2.3 Gestion de l'état — 3.5/5

`quantities` et `isOpen` colocalisés au bon niveau dans `App.tsx`. `cartItems` et `isCartEmpty` sont dérivés (calculés, pas stockés) — bonne pratique. Prop drilling `App` → `ProductList` → `ProductCard` à 2 niveaux — acceptable.

**Anti-pattern :** `setIsOpen` passé comme prop à `Cart` expose le dispatch interne. Si demain on veut logger ou animer à l'ouverture, il faut modifier `Cart` alors que c'est la responsabilité de `App`. La bonne pratique est `onOpenModal: () => void`.

---

### 2.4 DRY & réutilisabilité — 3/5

La duplication dans `Cart.tsx` est le problème principal (voir 2.1). `cn()` est configuré mais non utilisé — les template literals sont restés la solution par défaut partout.

Le calcul `item.quantity * item.price` apparaît dans `Cart.tsx:53` et `ConfirmationModal.tsx:69` — acceptable car les deux composants sont indépendants.

---

## ✅ 3 priorités pour ce projet

### Priorité 1 — Lisibilité : la passe de nettoyage avant push (axe stagnant depuis 4 reviews)

**Le problème :** Quatre doubles espaces dans les classNames, des trailing spaces, un `className=""` vide, un `return` sur un setter void, un trailing space dans un `aria-label`. Ce ne sont pas des erreurs architecturales — c'est une relecture qui n'est pas faite avant chaque commit.

**La règle à ancrer :** Avant chaque `git add`, une passe de 30 secondes :

1. Chercher `className=""` → supprimer
2. Chercher les double espaces dans les strings de classes
3. Vérifier que les `return` dans les event handlers retournent quelque chose d'utile

Prochain projet : **1.4 à 4/5**.

---

### Priorité 2 — Nommage : `setIsOpen` → `onOpenModal` (régression de Pomodoro P3)

**Le problème :** `Cart.tsx` reçoit `setIsOpen: React.Dispatch<React.SetStateAction<boolean>>`. C'est exactement le pattern `setMode` du Pomodoro, corrigé en P3 et recréé ici. La convention `on+verb` n'est pas encore un réflexe automatique.

**Fix concret :**

```tsx
// Cart.tsx — après
interface CartProps {
  onOpenModal: () => void;
}
// usage : onClick={onOpenModal}

// App.tsx — après
<Cart ... onOpenModal={() => setIsOpen(true)} />
```

La règle : dès qu'une prop est un callback déclenché par une action utilisateur, c'est `on+verb`. Jamais un setter brut.

---

### Priorité 3 — DRY : refactorer `Cart.tsx` (axe 2.4, introduction du Niveau 2)

**Le problème :** La `<section>` wrapper et le `<h2>` "Your Cart" sont dupliqués entre état vide et état rempli.

**Refactoring :**

```tsx
<section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-white p-6 xl:max-w-96">
  <h2 className="text-preset-2 text-red">
    Your Cart
    <span aria-live="polite"> ({cartItems.length}) </span>
  </h2>
  {isCartEmpty ? <div>{/* état vide */}</div> : <>{/* contenu panier */}</>}
</section>
```

---

## 📋 Backlog de progression

| Axe        | Observation                                                                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1.2]      | `priceFormated` → `priceFormatted` — typo dans `ProductCard.tsx:17`                                                                                                                            |
| [1.3]      | `fix(types): delete subfolder` — sémantiquement `chore` ou `refactor`, pas `fix`                                                                                                               |
| [2.1]      | `ProductCard.tsx:89` — `className=""` mort à supprimer                                                                                                                                         |
| [2.2]      | `ProductList.tsx:20` — `(product: Product)` dans `.map()` — annotation redondante, TypeScript infère depuis `data: Product[]`                                                                  |
| [2.4]      | `cn()` configuré dans `lib/cn.ts` mais non utilisé — à activer dans le prochain projet sur les classNames conditionnels                                                                        |
| [Niveau 3] | `role="spinbutton"` sur le `<div>` quantity selector — correct sémantiquement mais exige `aria-valuetext` et gestion clavier (Arrow Up/Down). À surveiller quand le Niveau 3 (a11y) sera actif |

---

## 📊 Score global

| Axe                  | Galleria | Pomodoro | Results Summary | Product List | Delta        |
| -------------------- | -------- | -------- | --------------- | ------------ | ------------ |
| 1.1 Structure        | 3.5      | 4        | 4               | 4.5          | ⬆️ +0.5      |
| 1.2 Nommage          | 4        | 3.5      | 4.5             | 3.5          | ⬇️ -1        |
| 1.3 Commits          | 3        | 3        | 3.5             | **4**        | ⬆️ +0.5      |
| 1.4 Lisibilité       | 3        | 3        | 3.5             | 3            | ⬇️ -0.5      |
| **Moy. Niveau 1**    | **3.4**  | **3.4**  | **3.9**         | **3.75**     | **⬇️ -0.15** |
| 2.1 Composants       | —        | —        | —               | 3.5          | (nouveau)    |
| 2.2 TypeScript       | —        | —        | —               | 4            | (nouveau)    |
| 2.3 État             | —        | —        | —               | 3.5          | (nouveau)    |
| 2.4 DRY              | —        | —        | —               | 3            | (nouveau)    |
| **Moy. Niveaux 1+2** | —        | —        | —               | **3.6**      |              |

**Verdict :** L'entrée au Niveau 2 est honnête — TypeScript est solide (4/5), les composants bien découpés (3.5/5), mais la duplication dans Cart et l'anti-pattern `setIsOpen` tirent le score. Sur le Niveau 1 seul, le léger recul (-0.15) vient du nommage qui régresse sur un point déjà corrigé et de la lisibilité qui ne progresse pas malgré 4 reviews.

---

## Note finale

Les commits sont enfin à 4/5 — c'est la progression la plus nette de ce projet, et elle était attendue depuis trois reviews. La structure continue à s'améliorer (4.5/5). Le TypeScript est propre et confiant.

Ce qui ralentit la progression, c'est un pattern récurrent : des problèmes signalés qui sont corrigés sur leur occurrence concrète, mais pas sur la règle sous-jacente. `setMode` était faux → corrigé → `setIsOpen` refait la même erreur. `return` sur un event handler était dans le backlog → il revient dans `App.tsx`. Les double espaces dans les classNames sont là depuis Galleria.

Ce n'est pas un problème de compréhension — ces règles sont comprises. C'est un problème de réflexe : la relecture avant commit n'est pas encore systématique, et les règles de nommage ne sont pas encore appliquées comme des invariants non-négociables.

**Le prochain projet devrait montrer 1.4 à 4/5 et 1.2 stable à 4+/5.**

---

# Code Review — Results Summary Component — 2026-04-20

## Contexte

|                                    |                                                |
| ---------------------------------- | ---------------------------------------------- |
| **Niveau de review**               | N°3 (Niveau 1 uniquement)                      |
| **Stack**                          | React 19 + Vite + Tailwind CSS v4 + TypeScript |
| **Durée du projet**                | 4 sessions                                     |
| **Review précédente**              | Pomodoro — 3.4/5                               |
| **Cible fixée en début de projet** | 4/5                                            |

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

| Axe        | Observation                                                                                                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1.4]      | `SummaryItem.tsx:47` — `return onScoreChange(...)` dans un event handler : le `return` est inutile et trompeur. Supprimer.                                                                                        |
| [1.4]      | `SummaryItem.tsx:29` — `cn()` avec un seul argument non conditionnel : n'apporte rien. `cn()` se justifie avec des classes conditionnelles ou un merge conflictuel.                                               |
| [1.4]      | `SummaryItem.tsx:29` — trailing space dans le template literal : `` `...${COLORS[category].text} ` `` — espace final invisible.                                                                                   |
| [1.4]      | `index.css:185` — commentaire en français (`/* important : garder le contenu au-dessus */`) dans un projet en anglais. Uniformiser.                                                                               |
| [1.3]      | `App.tsx:42` — `key={index}` dans le map. La liste est statique donc inoffensif, mais `key={item.category}` est plus correct sémantiquement.                                                                      |
| [Niveau 2] | `ResultCard.tsx:17` — `setIsAnimationOver(true)` appelé à l'intérieur du setter de `setDisplayScore`. Effet secondaire dans une fonction d'update de state — pattern à éviter, à signaler au passage au Niveau 2. |

---

## 📊 Score global

| Axe            | Galleria  | Pomodoro  | Results Summary | Delta       |
| -------------- | --------- | --------- | --------------- | ----------- |
| 1.1 Structure  | 3.5/5     | 4/5       | 4/5             | =           |
| 1.2 Nommage    | 4/5       | 3.5/5     | 4.5/5           | ⬆️ +1       |
| 1.3 Commits    | 3/5       | 3/5       | 3.5/5           | ⬆️ +0.5     |
| 1.4 Lisibilité | 3/5       | 3/5       | 3.5/5           | ⬆️ +0.5     |
| **Moyenne**    | **3.4/5** | **3.4/5** | **3.9/5**       | **⬆️ +0.5** |

**Verdict :** Première review au-dessus de 3.5. Le score global monte de 0.5 point — c'est la meilleure progression en une review depuis le début. La cible de 4/5 fixée en début de projet est pratiquement atteinte : il manque 0.1 point, imputable aux commentaires redondants et aux dernières irrégularités de commits.

---

## Note finale

Ce projet marque un cap. Trois priorités ciblées, trois réglées — c'est la première fois que ça arrive. Le nommage bondit à 4.5/5 : `onScoreChange`, `ResultCardProps`, `FEEDBACK_DATA`, `isAnimationOver` — tous pertinents, tous cohérents. La lisibilité structurelle est bonne : des fichiers courts, des fonctions focalisées, zero code mort.

Ce qui reste, c'est de la précision : des commentaires qui n'auraient pas dû être écrits, quatre irrégularités dans les commits, un chemin d'import conceptuellement faux. Aucun de ces points n'est architectural — ce sont des habitudes de discipline à quelques semaines d'être automatiques.

Sur le fond technique, le projet va au-delà du brief original : inputs contrôlés, animation compteur avec `setInterval` et cleanup propre, `aria-hidden` synchronisé sur l'animation, gradient CSS en pseudo-élément — c'est du travail soigné. La note Frontend Mentor de 8.5/10 avec la mention _Exceptional_ est cohérente avec ce que montre le code.

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

---
