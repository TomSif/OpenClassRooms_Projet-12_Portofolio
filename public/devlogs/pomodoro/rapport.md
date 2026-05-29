# Code Review — Galleria Slideshow — 2026-04-08

## Contexte

| | |
|---|---|
| **Niveau de review** | N°1 (Niveau 1 uniquement) |
| **Stack** | React 19 + Vite + Tailwind CSS v4 + TypeScript + Framer Motion + React Router |
| **Durée du projet** | 12 sessions |
| **Progression** | Première review — pas de comparaison possible |

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
`fix(readme)!:add proper readme` — le `!` signifie *breaking change*, ce qui n'a aucun sens pour un fix de README.

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
className="flex flex-col  items-center justify-center w-full p-6 md:p-10  xl:flex-row xl:mt-24 lg:gap-6 2xl:gap-36 2xl:px-24 xl:h-156 max-w-93.75 md:max-w-3xl xl:max-w-360 "
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
*est-ce que c'est un `fix:` (comportement cassé → réparé), un `feat:` (nouvelle capacité), un `refactor:` (restructuration sans changement de comportement), ou un `chore:` ?*
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

*À traiter dans les projets suivants — pas maintenant.*

| Axe | Observation |
|-----|-------------|
| [1.2 Nommage] | Faute de frappe `"Progession-bar"` dans `Articles.tsx:249` — corriger avant le prochain push |
| [1.1 Structure] | Incohérence `Articles.tsx` (fichier) / `Article` (export) — harmoniser : soit `Article.tsx`, soit le composant s'appelle `Articles` |
| [2.1 Composants] | `Articles.tsx` cumule 5 responsabilités — modal, navigation, slideshow, resize, animation. À découper en hooks ou sous-composants dans le prochain projet de complexité équivalente |
| [2.3 État] | `isPlaying` géré dans `Layout` et passé via `useOutletContext` — pattern fonctionnel mais à surveiller : l'état appartient-il vraiment au Layout ou à une couche plus proche ? |

---

## 📊 Score global

| Axe | Score |
|-----|-------|
| 1.1 Structure & organisation | 3.5 / 5 |
| 1.2 Nommage | 4 / 5 |
| 1.3 Commits | 3 / 5 |
| 1.4 Lisibilité | 3 / 5 |
| **Moyenne** | **3.4 / 5** |

---

## Verdict

Niveau junior solide, proche du standard professionnel sur le nommage. La structure de fichiers est bonne. Les deux axes qui tirent le score vers le bas — commits et lisibilité — ont des corrections concrètes et rapides disponibles. Ce n'est pas du code qui fait peur ; c'est du code qui montre que les fondations sont là et que ce sont les habitudes de discipline (commit, nettoyage, longueur de ligne) qui manquent encore de régularité.

La partie technique du projet — `solveMasonry`, `SlideWrapper`/`enterDir`/`exitDir`, `AnimatePresence` — est clairement au-dessus du niveau junior standard. Ça se voit dans le code.

**Les 3 priorités sont toutes corrigeables en moins d'une session au démarrage du prochain projet.** Aucune ne concerne de l'architecture à repenser — c'est du polish et de la discipline. Le plus utile maintenant : intégrer la checklist de démarrage comme réflexe, pas comme chose à se rappeler.
