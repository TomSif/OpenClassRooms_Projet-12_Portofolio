# 📋 FICHE TECHNIQUE - PORTFOLIO PROFESSIONNEL

**Référence Projet pour Assistant IA**  
**Dernière mise à jour** : 07/10/2025  
**Statut global** : 45% complété

---

## 🎯 INFORMATIONS GÉNÉRALES

### Contexte

- **Projet** : Portfolio professionnel développeur web (Projet final OpenClassrooms)
- **Objectif** : Créer, développer et déployer un portfolio responsive full-code
- **Soutenance** : 30 minutes (15 min présentation + 10 min discussion + 5 min débrief)
- **Livrable** : Lien vers portfolio en ligne (PDF) dans dossier ZIP

### Approche technique choisie

- ✅ **Full-Code** (Option 1 - Développement 100% Front-End)
- Stack : React 19, Sass, Vite, Framer Motion, Lottie
- Repository GitHub dédié
- Hébergement prévu : Vercel ou Netlify

---

## ✅ PHASE 1 : CONTENU — 75% TERMINÉ

### 1.1 Projets de formation choisis (✅ VALIDÉ)

#### Projet 1 : Sophie Bluel - Portfolio Architecte

- **Type** : JavaScript Vanilla, API REST, JWT
- **Points forts** :
  - Architecture MVC complète
  - Initiatives personnelles : Backend hébergé sur Render, gestionnaire d'état custom, système de toasts
  - Déploiement complet (Frontend Vercel + Backend Render)
- **Fiche** : ✅ 6 sections complètes (Contexte, Objectifs, Stack, Compétences, Résultats, Perspectives)
- **Fichier** : Disponible dans Trello (card terminée)

#### Projet 2 : Argent Bank - Application Bancaire

- **Type** : React 19, Redux Toolkit, JWT, Swagger
- **Points forts** :
  - Architecture Redux avancée (createAsyncThunk, slices modulaires)
  - Authentification JWT complète avec persistance
  - Documentation Swagger Phase 2 (initiative personnelle)
  - 4 compétences validées avec mention "bon travail"
- **Fiche** : ✅ 6 sections complètes
- **Liens** :
  - GitHub : OpenClassRooms_Projet-10_Argent-Bank
  - Swagger : docs/swagger_phase_2.yaml
  - Comptes test : tony@stark.com / steve@rogers.com

### 1.2 Pitch personnel (❌ À FAIRE)

**Statut** : Non rédigé  
**Priorité** : 🔴 CRITIQUE (bloque page "À propos" + soutenance)  
**Structure attendue** (6 actes) :

1. Accroche identitaire (Prénom, nom, spécialité, domaine d'expertise)
2. Parcours et légitimité (Formation, reconversion, élément déclencheur)
3. Stack technique et expertise (Technologies maîtrisées + projet illustratif)
4. Projets marquants et impact (1-2 projets clés + résultats mesurables)
5. Approche et différenciation (Méthode de travail, qualité distinctive)
6. Projection et ambitions (Type de poste recherché, objectifs)

**Format** : 150-200 mots maximum

---

## ✅ PHASE 2 : GESTION — 100% TERMINÉ

### 2.1 Kanban Trello

- **URL** : https://trello.com/b/oAyqSVfq/portofolio
- **Colonnes** : 📝 À faire | ⏳ En cours | ✅ À tester/Valider | 🎉 Terminé
- **Labels** :
  - 🔴 BLOQUANT (red_dark)
  - 🟠 URGENT (orange)
  - 🟡 IMPORTANT (yellow)
  - 🟢 AMÉLIORATION (green)
  - 🔵 SEO (orange_light)
  - 🟣 DESIGN (purple_light)
  - 🟢 CODE (lime_light)
  - 🔵 CONTENU (sky_light)

### 2.2 État actuel du Kanban (07/10/2025)

**🎉 TERMINÉ (4)** :

- Choisir 2 projets de formation
- Rédiger fiche projet 1 (Sophie Bluel)
- Rédiger fiche projet 2 (Argent Bank)
- Wireframes desktop

**⏳ EN COURS (2)** :

- Créer design system (couleurs/typo) — 90%
- Wireframes mobile + desktop — 50% (desktop fait)

**📝 À FAIRE (19+)** : Voir détail section suivante

---

## 🎨 PHASE 3 : DESIGN — 70% TERMINÉ

### 3.1 Design System (✅ VALIDÉ à 90%)

#### Palette de couleurs

**Couleurs principales** :

- 🟠 Primary : `#fd853a` (Orange vif — CTA, liens, accents)
- 🔵 Secondary : `#0088ff` (Bleu vif — Éléments interactifs)
- 🟣 Accent Purple : `#583fbc` (Violet foncé — Badges, highlights)
- 🩵 Accent Cyan : `#7de0ea` (Cyan — Éléments décoratifs)

**Couleurs de fond** :

- Blanc : `#ffffff`
- Gris-bleu clair : `#d3dce7`
- Gris-bleu alternatif : `#ced7e4`
- Lavande : `#dfe1fa`

**Couleurs de texte** :

- Primary : `#242a41` (Bleu marine foncé)
- Secondary : `#486284` (Gris bleu moyen)
- Dark : `#404040` (Gris foncé alternatif)
- White : `#ffffff`

**États interactifs** :

- Hover Primary : `#e6753d`
- Success : `#10b981`
- Error : `#ef4444`

#### Typographie

**Polices Google Fonts** :

- `Montserrat` (300-900) → Titres principaux (H1)
- `Poppins` (300-700) → Sous-titres (H2-H4)
- `Plus Jakarta Sans` (300-700) → Texte principal (body)
- `Manrope` (300-800) → UI (boutons, badges)

**Tailles** (échelle harmonique) :

- XS : 0.75rem (12px)
- SM : 0.875rem (14px)
- Base : 1rem (16px)
- LG : 1.125rem (18px)
- XL : 1.5rem (24px)
- 2XL : 2rem (32px)
- 3XL : 2.5rem (40px)
- 4XL : 3rem (48px)
- 5XL : 3.5rem (56px)
- 6XL : 4rem (64px)

**Poids** : 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 900 (black)

**Hauteur de ligne** : 1.2 (tight), 1.5 (normal), 1.75 (relaxed)

#### Espacements (Système 8px)

`$spacing-1` à `$spacing-32` : de 4px (0.25rem) à 128px (8rem)

#### Architecture Sass (✅ COMPLET)

```
src/styles/
├── abstracts/
│   ├── _variables.scss (✅ Complet)
│   ├── _mixins.scss (✅ Complet)
│   └── _functions.scss (✅ Complet)
├── base/
│   ├── _reset.scss (✅ Complet)
│   ├── _typography.scss (✅ Complet)
│   └── _animations.scss (✅ Complet)
├── layout/
│   ├── _navbar.scss (✅ Complet)
│   ├── _footer.scss (✅ Complet)
│   └── _grid.scss (✅ Complet)
├── components/
│   ├── _buttons.scss (✅ Complet)
│   ├── _cards.scss (✅ Complet)
│   └── _forms.scss (✅ Complet)
├── pages/
│   ├── _home.scss
│   ├── _projects.scss
│   └── _contact.scss
└── main.scss (✅ Imports configurés)
```

**Composants disponibles** :

- Boutons : `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`, `.btn-sm`, `.btn-lg`
- Formulaires : `.input`, `.textarea`, `.select`, `.form-group`, `.label`
- Utilitaires : Classes de couleurs, polices, poids, alignement

### 3.2 Wireframes

#### Desktop (✅ VALIDÉ)

- **Statut** : Terminé
- **Fichiers** : Joints au Kanban Trello
  - `wireframe desktop-2.png`
  - `wireframe desktop-short.png`
  - `design system.png`
- **Pages couvertes** : Toutes les pages principales

#### Mobile (❌ À FAIRE)

- **Statut** : Non commencé
- **Priorité** : 🔴 CRITIQUE (bloque développement responsive)
- **Pages attendues** : Accueil, À propos, Projets, Contact
- **Format** : 320px → 768px (mobile-first)

---

## 💻 PHASE 4 : DÉVELOPPEMENT — 10% TERMINÉ

### 4.1 Configuration projet (✅ VALIDÉ)

- **Build tool** : Vite 7.1.8
- **React** : 19.2.0
- **Router** : React Router DOM 7.9.3
- **Styling** : Sass 1.93.2
- **Animations** : Framer Motion 11.x, Lottie

### 4.2 Structure actuelle

```
portfolio/
├── index.html (✅ Squelette basique : <div id="root">)
├── src/
│   ├── Main.jsx (✅ Point d'entrée React)
│   ├── styles/ (✅ Design system complet)
│   └── data/
│       └── projects.js (✅ Structure data projets définie)
```

### 4.3 Composants React (❌ À DÉVELOPPER)

**Priorité 1** :

- [ ] Header / Navbar (avec navigation adaptive authentifiée/non-authentifiée)
- [ ] Footer
- [ ] Hero (section d'accueil)
- [ ] ProjectCard (carte projet avec thumbnail, tags, description)
- [ ] ContactForm

**Priorité 2** :

- [ ] ProjectModal (détail projet en modale)
- [ ] SkillsSection
- [ ] AboutSection
- [ ] Timeline (parcours)

### 4.4 Pages (❌ À INTÉGRER)

- [ ] Home (Accueil)
- [ ] About (À propos + pitch)
- [ ] Projects (Portfolio avec filtres)
- [ ] Contact

---

## 🔍 PHASE 5 : SEO — 0% TERMINÉ

### 5.1 Analyse offres d'emploi (❌ À FAIRE)

**Statut** : Non commencé  
**Priorité** : 🔴 CRITIQUE (bloque toute l'optimisation SEO)  
**Action requise** :

- Trouver 3 offres sur WeLoveDevs / Welcome to the Jungle / LesJeudis
- Extraire :
  - Termes techniques récurrents (ex: React developer, développeur full-stack)
  - Vocabulaire sectoriel (ex: développeur fintech, expert e-commerce)
  - Combinaisons géographiques (ex: développeur React Paris, remote)
  - Soft skills (ex: autonome, Agile, culture start-up)
- **Livrable attendu** : Liste de 15+ mots-clés exploitables

### 5.2 Optimisation on-page (❌ À FAIRE)

**Dépend de** : Analyse offres

- [ ] Balise `<title>` (actuellement générique : "Portfolio")
- [ ] Balise `<meta name="description">`
- [ ] Titres H1/H2 optimisés
- [ ] Descriptions de projets avec mots-clés naturels
- [ ] Compression images (TinyPNG)

### 5.3 Tests SEO (❌ À FAIRE)

- [ ] Lighthouse SEO score > 90/100
- [ ] WAVE ou Screaming Frog SEO Spider
- [ ] Validation balises meta

---

## ♿ PHASE 6 : ACCESSIBILITÉ — 0% TERMINÉ

### 6.1 Checklist accessibilité (❌ À FAIRE)

- [ ] Navigation au clavier fluide (Tab, focus visible)
- [ ] HTML sémantique (`<main>`, `<section>`, `<nav>`, `<footer>`)
- [ ] Contrastes visuels suffisants (WAVE)
- [ ] Attributs `alt` sur images (vides pour décoratives, descriptifs pour informatives)
- [ ] Labels associés aux champs de formulaire
- [ ] ARIA si nécessaire (avec modération)

### 6.2 Tests accessibilité (❌ À FAIRE)

- [ ] Lighthouse Accessibility > 90/100
- [ ] WAVE (0 erreurs critiques)
- [ ] axe DevTools

---

## 🚀 PHASE 7 : PUBLICATION — 0% TERMINÉ

### 7.1 Déploiement (❌ À FAIRE)

- [ ] Choix hébergeur (Vercel recommandé ou Netlify)
- [ ] Configuration domaine/sous-domaine
- [ ] Tests finaux (desktop/mobile/tablette)
- [ ] Vérification liens (repo GitHub, démos projets)

### 7.2 Documentation GitHub (❌ À FAIRE)

- [ ] README complet (bilingue FR/EN)
- [ ] Historique commits descriptifs
- [ ] Licence (MIT recommandée)

---

## 📣 PHASE 8 : VALORISATION — 0% TERMINÉ

### 8.1 Communication (❌ À FAIRE)

- [ ] Publication LinkedIn (contexte, choix techniques, screenshots, lien)
- [ ] Ajout portfolio sur profils : GitHub bio, CV, Welcome to the Jungle, Malt

### 8.2 Préparation soutenance (❌ À FAIRE)

- [ ] Support de présentation (15 min : Architecture / 2 Projets / Pitch / Choix techniques / SEO-Accessibilité-Performances)
- [ ] Entraînement oral (2-3 min par projet max)

---

## 📊 TÂCHES PRIORITAIRES (PAR ORDRE)

### 🔴 PRIORITÉ 1 - CETTE SEMAINE (6h)

1. **Rédiger pitch personnel** (2h) → Bloque page "À propos" + soutenance
2. **Analyser 3 offres d'emploi** (2h) → Bloque balises SEO
3. **Wireframes mobile** (2h) → Bloque développement responsive

### 🟠 PRIORITÉ 2 - SEMAINE PROCHAINE (30h+)

4. **Balises SEO** (1h) → Dépend de analyse offres
5. **Compression images** (30min)
6. **Développement composants React** (10h)
7. **Intégration pages** (15h)
8. **Animations Framer Motion** (3h)

### 🟡 PRIORITÉ 3 - AVANT PUBLICATION (10h)

9. **Accessibilité complète** (4h)
10. **Tests Lighthouse** (1h)
11. **Tests responsive** (1h)
12. **Déploiement** (1h)
13. **README GitHub** (1h)
14. **Préparation soutenance** (2h)

---

## ⚠️ POINTS D'ATTENTION

### Risques identifiés

1. **Contenu incomplet** : Pitch manquant = page "À propos" bloquée
2. **SEO non optimisé** : Pas d'analyse offres = pas de mots-clés = mauvais référencement
3. **Wireframes mobile manquants** : Risque d'intégration responsive improvisée

### Points forts

1. ✅ 2 fiches projets excellentes (initiatives personnelles valorisées)
2. ✅ Design system professionnel et complet (code + visuel)
3. ✅ Architecture Sass bien organisée et modulaire
4. ✅ Stack technique moderne (React 19, Redux, Sass, Framer Motion)

---

## 🎯 UTILISATION DE CETTE FICHE

### Pour les futurs #bilan

**Cette fiche est la référence de base.** Lors des prochains bilans :

1. ✅ Ne PAS re-vérifier les sections marquées ✅ VALIDÉ
2. ⚠️ Vérifier uniquement les sections en cours ou à faire
3. 🔄 Mettre à jour les statuts (% complétés, tâches terminées)
4. 📅 Mettre à jour la date "Dernière mise à jour" en haut du document

### Structure des réponses aux #bilan

1. **État des lieux rapide** (basé sur cette fiche)
2. **Nouveaux éléments terminés** (depuis dernier bilan)
3. **Tâches prioritaires** (issues de cette fiche)
4. **Recommandations stratégiques** (basées sur avancement)

---

## 📌 RÉFÉRENCES UTILES

### Documents officiels

- Instructions.pdf (phases, livrables, soutenance)
- Kanban Trello : https://trello.com/b/oAyqSVfq/portofolio

### Fichiers projet (GitHub)

- Design system : `src/styles/`
- Data projets : `src/data/projects.js`
- Config : `index.html`, `src/Main.jsx`

### Contacts / Ressources

- Formation : OpenClassrooms
- Support : Session mentor, soutenance
- Outils : Figma, Coolors, TinyPNG, Lighthouse, WAVE

---

**🔄 Historique des mises à jour** :

- 07/10/2025 : Création fiche technique (état initial 45%)
- _[À compléter lors des futurs bilans]_
