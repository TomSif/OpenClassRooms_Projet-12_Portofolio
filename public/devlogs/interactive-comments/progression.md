## Session 2026-07-11 (suite) — Audit N°9 : correction des 3 priorités, clôture du projet

### ✅ Étapes accomplies

- Reprise directe après la session de tests du même jour. Thomas a fait passer un audit complet du projet (`rapport.md`, review N°9, score moyen 3.96/5, en recul par rapport à Tip Calculator sur deux axes précis : sécurité 2/5, DRY 3/5) et a décidé de corriger les 3 priorités identifiées avant de clore le projet
- **Priorité 1 (sécurité, `PATCH /comments/:id/vote`)** : ajout d'une vérification d'ownership, mais **inversée** par rapport à `PUT`/`DELETE` (bloquer le vote sur *son propre* commentaire, pas sur celui des autres). Première tentative erronée : Thomas a recopié tel quel le guard `PUT`/`DELETE` (`!==`) sans inverser la condition — corrigé après avoir nommé explicitement le piège. Effet de bord anticipé correctement par Thomas avant de lancer les tests : le test `PATCH vote` existant allait casser puisqu'il votait sur un commentaire de `currentUser`. Deux tests ajustés/ajoutés : cas succès réécrit avec insertion directe en base (`username: "someoneelse"`, pattern déjà connu des tests `403` `PUT`/`DELETE`), nouveau cas `403` pour le vote sur son propre commentaire. Un round d'erreur sur ce dernier test : assertion `expect(res.body.score).toEqual(0)` invalide car la réponse `403` ne contient que `{ error }`, pas `score` — Thomas a demandé "pourquoi c'est faux" plutôt que de deviner, corrigé en retirant l'assertion (cohérent avec les autres tests `403` qui ne vérifient que le `status`). Commit `fix(back/routes): prevent users from voting on their own comments`
- **Priorité 2 (DRY, `insertCommentRow`)** : fonction partagée créée dans `db.ts` (interface `InsertCommentRowParams`, convention de nommage héritée de Tip Calculator) pour remplacer la requête `INSERT` dupliquée 3 fois (`POST /comments`, `POST /comments/:id/replies`, `seed.ts`). Confusion réelle en première tentative : Thomas a recopié le corps de la fonction depuis la route `POST /comments` sans l'adapter — variables `content`/`currentUser`/`parentId` référencées alors qu'elles n'existent pas dans `db.ts`. Débloqué par le parallèle avec `applyVote`/`applyEdit`/`applyDelete` (déjà connu, Phase 2) : une fonction extraite ne doit dépendre que de ses paramètres. Deuxième bug réel en câblant `POST /comments/:id/replies` : `parentId`/`replyingTo` codés en dur à `null` (copié de `POST /comments`) au lieu des vraies variables locales — détecté et corrigé après signalement précis. Bug de type détecté par TypeScript en migrant `seed.ts` : `result.lastInsertRowid` (`number | bigint`) non assignable à `parentId: number | null` — révélé par le typage strict de la nouvelle fonction, un problème invisible avant (SQL brut non vérifié) ; corrigé avec `Number(...)`, pattern déjà utilisé ailleurs dans le projet. Commit `refactor(back): extract insertCommentRow to remove duplicated INSERT query`
- **Priorité 3 (nommage/TypeScript front, `App.tsx`)** : paramètre de `handleDelete` renommé (`deletingId` → `id`) pour lever le shadowing avec l'état `useState` du même nom ; assertion non-null (`deletingId!`) remplacée par un garde explicite (`if (deletingId === null) return`) avant l'appel. Thomas a d'abord demandé une clarification concrète sur le shadowing ("je vois pas où est le problème ici ?") en regardant le bloc isolé — débloqué en montrant côte à côte la déclaration `useState` (ligne 20) et le paramètre (ligne 66). A relevé une question pertinente sur l'absence d'alerte du linter — expliqué : le shadowing est du JS/TS valide, `no-shadow` existe en ESLint mais n'est pas activé par défaut dans les presets courants. Commit `fix(front/app): remove deletingId shadowing and non-null assertion`
- Vérification finale en conditions réelles : `.env` front basculé de `localhost:3000` vers l'URL Render en production, `npm run dev` redémarré, suppression de commentaire testée en navigateur avec succès contre le vrai backend déployé — confirmé fonctionnel des deux côtés (local et Render)
- **Les 3 priorités de l'audit N°9 sont corrigées et vérifiées. Projet considéré comme clos.**

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Inverser une condition d'ownership selon le sens métier (bloquer soi-même vs bloquer les autres) | Nouvelle | Première tentative en copier-coller pur, corrigée après reformulation explicite de la nuance |
| Extraire une fonction générique (ne dépendre que de ses paramètres, pas de variables du scope appelant) | Révisée, mais confusion réelle en pratique | Déjà maîtrisée côté front (`utils/comments.ts`, Phase 2) mais pas transférée spontanément côté back — débloquée par le parallèle explicite avec ce précédent |
| Le typage strict révèle des bugs latents invisibles en SQL brut (`number \| bigint` vs `number \| null`) | Nouvelle | Bénéfice concret et tangible du refactor, pas juste un exercice de style — bien reçu |
| Variable shadowing (paramètre de fonction masquant une variable de scope englobant) | Nouvelle | Code valide, pas une erreur de compilation — nécessité de comparer deux emplacements du fichier pour voir le problème |
| Portée des règles de lint (`no-shadow` pas activée par défaut) | Nouvelle | Bonne question autonome sur pourquoi le linter n'a rien dit |
| Garde explicite (`if (x === null) return`) contre assertion non-null (`!`) | Révisée | Déjà vu en Phase 2 (post-review FEM sur `useState<number \| null>()`), réappliqué ici sur un cas d'usage différent |

### ⚠️ Notions faussement acquises détectées

- **Ownership check "copier-coller sans adapter au contexte"** — déjà un pattern de vigilance identifié en Phase 3 (recopie de blocs sans changer les valeurs) : revu ici deux fois dans la même session (guard vote non inversé, `parentId`/`replyingTo` codés en dur dans la reply). Pas une notion mal comprise en soi, mais un réflexe de relecture à renforcer avant de lancer les tests après un copier-coller — Thomas corrige vite une fois le problème pointé précisément, mais ne le détecte pas encore seul à la relecture.

### 🔄 Étapes restantes

**Aucune côté Phase 3.** Projet fonctionnellement, pédagogiquement et sécuritairement clos : 3 phases bouclées (front, tests front, backend + tests backend), audit N°9 traité intégralement, déploiement Vercel/Render vérifié de bout en bout avec les derniers correctifs.

- Backlog non bloquant identifié par l'audit mais explicitement hors scope de clôture (cf. `rapport.md`, section "Backlog de progression") : typo `console.log` server.ts, incohérence de scope sur un commit isolé, contrat API `PUT` non normalisé, `db.prepare` recréés à chaque requête, découpage `routes/` si le projet grandissait, README à mettre à jour au Niveau 4 (projet 11+)
- Prochaine session : décider avec Thomas du prochain projet Frontend Mentor, ou d'une autre priorité

### 📈 Évaluation de session

- **Points solides :** Bonne anticipation autonome d'un effet de bord (test vote qui allait casser) avant de lancer quoi que ce soit. Questions de clarification précises et bien ciblées plutôt que des suppositions silencieuses ("pourquoi c'est faux ?", "je vois pas le problème", "comment on appelle ce commit"). Transfert conceptuel réussi une fois le parallèle front/back explicité (extraction de fonction pure). Bonne autonomie sur la rédaction des messages de commit, cohérents avec la convention du projet sans qu'elle soit rappelée.
- **Points fragiles :** Réflexe de copier-coller sans adapter les valeurs au nouveau contexte, apparu deux fois cette session (guard vote, `parentId`/`replyingTo` en dur) — pas détecté seul à la relecture, mais corrigé immédiatement une fois signalé précisément. À surveiller sur les futurs refactors : relire chaque bloc copié en se demandant explicitement "quelles valeurs changent ici par rapport à l'original ?"
- **Bilan de clôture :** Projet full-stack complet mené sur ~3,5 semaines (2026-06-17 → 2026-07-11), premier contact de Thomas avec un vrai backend (Express, SQLite, routes CRUD, ownership, tests Supertest) et premier déploiement complet d'une stack front+back en production. Trajectoire pédagogique cohérente de bout en bout : aucun abandon de notion, les points fragiles identifiés en cours de route (SQL, chaînage Supertest, extraction de fonctions) ont tous été retravaillés et consolidés avant la clôture.

### 💬 Notes de contexte

- Session directement enchaînée après celle des tests (même jour), sans rupture de rythme ni fatigue signalée
- Audit externe (`rapport.md`) utilisé comme déclencheur direct de travail plutôt que comme simple lecture — les 3 priorités ont été traitées une par une, dans l'ordre de gravité (sécurité → DRY → nommage)
- Mode guidé maintenu jusqu'au bout de la Phase 3, cohérent avec toutes les sessions précédentes depuis le 2026-07-06
- Clôture actée par Thomas lui-même en ouverture de cette session ("on cloturera probablement sur çà") — pas une décision imposée, contexte clair pour les sessions futures : ce projet est terminé, un nouveau projet ou une nouvelle priorité est à définir au prochain contact

---

## Session 2026-07-11 — Étape 6 (fin) : couverture complète des tests backend, ownership testé en échec

### ✅ Étapes accomplies

- Reprise directe de la session du 2026-07-10, mode guidé maintenu
- Test `POST /comments/:id/replies` écrit : premier `Arrange` en deux étapes séquentielles (créer un parent via `POST`, récupérer son `id`, puis poster la reply) — pattern transposé correctement du principe déjà connu (`lastInsertRowid` en `seed.ts`) à un nouveau contexte (deux requêtes Supertest liées)
- Erreur de nommage détectée et corrigée après signalement : `describe("POST /comments")` copié-collé pour le test des replies, renommé en `describe("POST /comments/:id/replies")` ; assertion manquante (`replyingTo`) ajoutée après signalement
- Test `PATCH /comments/:id/vote` écrit : Thomas a soulevé **de lui-même** une question de sécurité pertinente (penser qu'il fallait un "autre user" pour tester le vote, en écho au pattern ownership déjà connu sur edit/delete) — a permis de mettre au jour que la route vote n'a **aucune vérification d'ownership côté backend**, contrairement à `PUT`/`DELETE`, alors que le front ne fait que désactiver les boutons de vote de façon cosmétique. Décision assumée de ne pas corriger cette faille maintenant ("on va pas tout refaire, l'essentiel est ailleurs")
- Test `PUT /comments/:id` (cas succès) écrit sans blocage
- Test `DELETE /comments/:id` (cas succès) : première tentative erronée avec chaînage `.delete(...).get(...)` sur le même objet Supertest (erreur TypeScript) — cause expliquée (`.get()` sur un objet Request Supertest lit un header, ne déclenche pas une deuxième requête), corrigé en deux appels séparés via `request(app)`. Thomas a ensuite remis en question **de lui-même** la validité de son assertion (`expect(res2.status).toBe(200)` seul ne prouve pas la suppression) avant qu'on le lui signale — assertion corrigée sur le contenu (`res2.body.comments` vide)
- Cas `403` introduit : nouvelle notion — impossible de créer un commentaire "d'un autre user" via l'API (`currentUser` toujours en dur dans `POST /comments`), donc contournement nécessaire via insertion directe en base (`db.prepare(...).run(...)`) dans le test lui-même, repris du pattern `seed.ts`. Bonne question de clarification posée avant d'écrire (où se place exactement le `db.prepare` dans le test) — pas de blocage sur la syntaxe SQL elle-même (déjà connue)
- Test `PUT /comments/:id` → `403` écrit à partir de l'exemple donné ; test `DELETE /comments/:id` → `403` écrit seul juste après, par transposition directe du test `PUT` 403 — aucun hint nécessaire
- Les 8 tests (`GET`, `POST` comment, `POST` reply, `PATCH` vote, `PUT` succès, `PUT` 403, `DELETE` succès, `DELETE` 403) passent tous en vert
- **Étape 6 du plan Phase 3 terminée — plan initial en 6 étapes intégralement bouclé**

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `Arrange` en plusieurs étapes séquentielles (`await` puis réutiliser la valeur) | Nouvelle | Transposition réussie du principe déjà connu (`lastInsertRowid` en seed) à un nouveau contexte (deux requêtes Supertest liées) |
| Chaînage de méthodes Supertest — `.get()` sur un objet Request lit un header, ne fait pas une nouvelle requête | Nouvelle, bug réel rencontré | Corrigé en séparant les deux appels via `request(app)` distincts |
| Tester un effet de bord via une requête de vérification supplémentaire (`GET` après `POST` ou `DELETE`) | Nouvelle | Comprise et appliquée deux fois (replies, delete) |
| Restriction UI (bouton désactivé) ≠ sécurité serveur — retrouvée sur vote | Révisée | Déjà identifiée en session 2026-07-08 pour edit/delete ; retrouvée de façon autonome ici sur vote, avant confirmation par lecture du code |
| Tester un statut d'échec attendu (`403`) plutôt qu'un succès | Nouvelle | Premier contact, comprise sans blocage une fois le problème (comment simuler un autre user) posé |
| Insertion directe en base dans un test (contourner l'API pour fabriquer un état impossible à obtenir via les routes) | Nouvelle | Bonne question de clarification sur le placement du code (dans le `it`, pas ailleurs) avant d'écrire — pas de confusion sur la syntaxe SQL elle-même |

### ⚠️ Notions faussement acquises détectées

Aucune notion mal comprise détectée à froid cette session. Deux erreurs ponctuelles rencontrées et vite corrigées : chaînage `.delete().get()` Supertest (erreur TypeScript, cause expliquée), assertion insuffisante sur la suppression (`status` seul) — corrigée après question posée par Thomas lui-même avant même d'être signalée.

### 🔄 Étapes restantes

**Plan Phase 3 (6 étapes) entièrement bouclé** : setup Express, schéma+seed SQLite, routes CRUD, routes replies/vote, câblage front complet, tests backend complets (8 tests, toutes routes + cas 403).

- Nettoyage cosmétique optionnel signalé, pas encore fait : deux `describe("PUT /comments/:id")` et deux `describe("DELETE /comments/:id")` séparés dans `app.test.ts` (un par cas succès/403) — pourraient être fusionnés en un `describe` par route avec plusieurs `it` à l'intérieur
- Faille de sécurité connue et assumée, non corrigée : `PATCH /comments/:id/vote` n'a aucune vérification d'ownership côté backend (contrairement à `PUT`/`DELETE`) — décision explicite de Thomas de ne pas la traiter maintenant
- Pas de suite de plan définie au-delà — projet à considérer comme fonctionnellement complet pour cette phase, décision à prendre avec Thomas sur la prochaine étape (nouveau projet ? durcissement de celui-ci ? autre chose ?)

### 📈 Évaluation de session

- **Points solides :** Transposition autonome et rapide de patterns déjà connus vers des contextes nouveaux (`Arrange` multi-étapes, test `PUT` 403 → `DELETE` 403 sans aucun hint). Deux réflexes de relecture critique spontanés et corrects avant même d'être signalés : questionnement sur la sécurité du vote, et sur la validité de son assertion de suppression. Aucun blocage long cette session, rythme soutenu.
- **Points fragiles :** Une erreur ponctuelle sur le chaînage Supertest, non devinable sans connaître l'API (comportement de `.get()` en tant que field-getter plutôt que verbe HTTP) — corrigée immédiatement une fois expliquée, pas un point de méthode à retravailler.
- **Priorité pour la prochaine session :** Phase 3 fonctionnellement et pédagogiquement complète. Décider avec Thomas de la suite : nouveau projet Frontend Mentor, durcissement de celui-ci (fix de la faille vote, nettoyage des `describe` dupliqués), ou autre priorité.

### 💬 Notes de contexte

- Session courte, dense, sans blocage majeur — contraste avec les sessions plus longues et fatigantes du début de Phase 3 (SQL, 2026-07-03)
- Mode guidé maintenu tout du long, cohérent avec les sessions précédentes de la Phase 3 tests
- Demande explicite de mise à jour de `progression.md` en fin de session, comme habituellement

---

## Session 2026-07-10 — Étape 6 (suite) : premiers tests réels, mécanique SQL et isolation

### ✅ Étapes accomplies

- Mode guidé reconfirmé en ouverture, avec une demande explicite supplémentaire : "j'ai besoin de voir ce qui change" — priorité donnée au retour visuel (`npm run test`, vert/rouge) à chaque étape, cohérent avec l'adaptation déjà notée le 2026-07-09
- Premier test réel écrit et vert du premier coup à partir de l'exemple neutre fourni : `GET /comments` → statut `200` (`back/src/app.test.ts`)
- Assertion étendue sur `res.body.comments` (`toEqual([])`) après une séquence de clarifications sur le fonctionnement interne de la route (voir notions ci-dessous)
- Deuxième test écrit : `POST /comments` avec `.send({ content: "test" })`, assertion sur `res.body.content` — corrigé de `toBe(201)` à `toBe(200)` après vérification dans le code source (`app.ts` n'appelle `.status(201)` nulle part, seuls les cas `403` de `PUT`/`DELETE` posent un status explicite)
- Problème d'état partagé entre tests identifié par Thomas lui-même (sans qu'on le lui souffle) : le `POST` insère une vraie ligne dans la base `:memory:`, ce qui casserait le test `GET` précédent (`toEqual([])`) s'il repassait après
- `beforeEach(() => db.exec("DELETE FROM comments"))` ajouté en tête de fichier — les deux `describe` passent désormais ensemble, dans n'importe quel ordre

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `request(app).get/post(path).send(body)` (Supertest) | Nouvelle, acquise rapidement | Écrit sans hint supplémentaire une fois l'exemple neutre donné — bonne transposition `.get` → `.post` + `.send` |
| `db.prepare(sql)` vs `.all()` vs `.run()` | Nouvelle — confusion réelle, corrigée en plusieurs passes | Voir "faussement acquises" ci-dessous |
| Status codes HTTP (200/201/403) et défaut Express (`res.json()` = 200 sauf `.status()` explicite) | Totalement nouvelle | Thomas a nommé lui-même l'origine du trou : quasi aucune expérience directe avec SQL/DB/HTTP status avant ce projet. A correctement récupéré une fois l'explication directe donnée + vérification dans le code source |
| `beforeEach` (Vitest) pour l'isolation des tests | Nouvelle | Bien comprise : a explicitement rejeté de sa propre initiative l'idée d'utiliser la route `DELETE` (non testée) pour nettoyer entre les tests, correctement identifié que c'est une responsabilité différente (infra de test vs fonctionnalité testée) |
| `toEqual` vs `toBe` | Révisée | Déjà utilisée correctement en Phase 2 front (`comments.test.ts:85`) — pointée du doigt pour ancrer le rappel plutôt que réexpliquée de zéro |

### ⚠️ Notions faussement acquises détectées

- A d'abord affirmé que "`db.prepare` devrait créer une table" — confusion entre `prepare` (compiler le texte SQL) et `CREATE TABLE` (déjà exécuté une fois, ailleurs, à l'import de `db.ts`). Corrigé après explication directe du cycle import vs requête.
- A ensuite reformulé que "`.all()` n'a rien exécuté" parce que la base était vide — confusion entre "l'exécution a eu lieu mais a trouvé 0 ligne" et "l'exécution n'a pas eu lieu". Corrigé.
- A supposé `POST /comments` renvoyait `201` par convention REST, sans vérifier le code source réel — bon réflexe ensuite d'aller lire `app.ts` plutôt que de deviner à l'aveugle une fois orienté dessus.

### 🔄 Étapes restantes

- Tester `POST /comments/:id/replies` (même mécanique que `POST /comments`, déjà connue)
- Tester `PATCH /comments/:id/vote`
- Tester `PUT /comments/:id` et `DELETE /comments/:id`, y compris le cas `403` (ownership) — première rencontre avec un test qui vérifie un statut d'erreur plutôt qu'un succès
- Discussion en attente, non urgente : ajouter `.status(201)` dans `app.ts` pour les deux routes de création, si Thomas veut un jour suivre la convention REST à la lettre (explicitement mis de côté cette session : "la rigueur de suivi des conventions viendra plus tard")

### 📈 Évaluation de session

- **Points solides :** Une fois la destination et l'exemple neutre donnés, transpose correctement la syntaxe Supertest sans hint supplémentaire. A détecté seul le problème d'état partagé entre tests avant qu'on l'introduise, et a évité seul l'écueil de nettoyer via une route non testée — bon raisonnement structurel une fois qu'il a le temps de le dérouler.
- **Points fragiles :** Terrain SQL/DB/HTTP status confirmé "premier ou presque contact" par Thomas lui-même en session — plusieurs allers-retours nécessaires sur `prepare`/`all`/`run` et sur les status codes par défaut. A explicitement demandé de ralentir ("tu vas trop vite") à un moment où l'explication était donnée sans indiquer où l'écrire concrètement — bon signal, il a arrêté de deviner en silence pour nommer précisément le blocage.
- **Priorité pour la prochaine session :** `POST /comments/:id/replies`, `PATCH /comments/:id/vote`, puis `PUT`/`DELETE` avec le cas `403` — première exposition à tester un échec attendu plutôt qu'un succès.

### 💬 Notes de contexte

- Mode guidé maintenu, avec la même priorité déjà notée le 2026-07-09 : retour visuel (`npm run test` vert/rouge) après quasi chaque étape plutôt qu'en fin de séquence
- Bon signal de méthode : Thomas a interrompu explicitement deux fois quand une explication restait trop abstraite ("j'écris çà où ?", "honnêtement c'est encore nébuleux") plutôt que de recopier sans comprendre — cohérent avec la règle "écriture obligatoire, jamais copier-coller sans ancrage"
- Décision assumée : pas de rigueur sur les conventions REST (status 201) pour l'instant, priorité donnée à la compréhension des mécanismes sous-jacents avant la forme

---

## Session 2026-07-09 — Étape 6 : mise en place des tests backend (Vitest + Supertest)

### ✅ Étapes accomplies

- Mode pédagogique revérifié en ouverture de session : Thomas a explicitement demandé le mode **guidé** pour toute la feature (terrain "totalement nouveau ou presque" selon ses mots), avec une justification claire : mieux apprendre en observant/comprenant le "pourquoi" d'abord, pratiquera seul la prochaine fois une fois le principe posé
- Feuille de route en 5 étapes posée en ouverture de session (config DB → install outils → script test → premier test → reset entre tests) pour garder le fil, cf. pattern déjà identifié comme utile en Phase 3
- `db.ts` rendu configurable : `const DB_PATH = process.env.DB_PATH ?? "data.sqlite"` — première rencontre de `process.env` côté back, reliée explicitement à `import.meta.env.VITE_API_URL` déjà connu côté front (avec la différence clé : lu à l'exécution, pas bakée au build)
- Installation de `vitest`, `supertest`, `@types/supertest` en devDependencies dans `back/`
- Script `"test": "vitest"` ajouté à `back/package.json` (identique au front, aucune nouveauté)
- Refactor architecture : `server.ts` découpé en `app.ts` (express app + tous les middlewares/routes, `export default app`) et `server.ts` allégé (import app + `seedIfEmpty()` + `app.listen`) — pattern nécessaire pour que Supertest puisse utiliser l'app sans ouvrir de vrai port ni déclencher le seed automatique. Fait correctement du premier coup une fois le "pourquoi" explicité
- Vérification manuelle que `npm run dev` fonctionne toujours après le découpage (aucune régression)
- `back/vitest.config.ts` créé avec `test.env.DB_PATH = ":memory:"`, pour que les tests utilisent une base SQLite en mémoire au lieu du vrai `data.sqlite`
- Squelette de test Supertest (`describe`/`it`/`request(app).get(...)`) expliqué avec un exemple neutre — écriture du premier test réel (`app.test.ts` sur `GET /comments`) **non commencée**, session interrompue avant faute de temps

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `process.env` (variables d'environnement Node) | Nouvelle | Ancrée via le parallèle avec `import.meta.env.VITE_API_URL` déjà connu — bonne réutilisation d'un acquis front pour comprendre le back |
| Mélanger valeur et appel dans une même expression (`DB_PATH = process.env.DB_PATH ?? new DatabaseSync(...)`) | Erreur ponctuelle, corrigée | Confusion initiale entre "la chaîne de chemin" et "la connexion elle-même" — corrigée après un hint ciblé nommant explicitement les deux étapes séparées |
| Séparation app Express / démarrage serveur (`app.ts` vs `server.ts`) | Nouvelle | Comprise et appliquée correctement du premier coup une fois le "pourquoi" (testabilité) explicité avant la syntaxe |
| Piège ESM : les `import` sont hoistés avant le reste du code d'un fichier | Mentionnée, pas pratiquée | Introduite pour justifier pourquoi la variable d'env ne peut pas être posée "en ligne" dans un fichier de test — pas encore rencontrée concrètement |
| Syntaxe de config Vitest (`defineConfig`, clé `test`, clé `env`) | Nouvelle — confusion réelle, corrigée | Thomas a d'abord interprété `env: { DB_PATH: ":memory:" }` comme une condition liée à un fichier `.env` réel ("si tu vois un fichier .env alors..."). Corrigé explicitement : ordre inconditionnel, aucun fichier `.env` impliqué. A reformulé correctement ensuite ("une fonction qui configure une variable au démarrage") |
| Supertest (`request(app).get(...)`) | Nouvelle, introduite en fin de session | Expliquée avec exemple neutre commenté, pas encore pratiquée par Thomas |

### ⚠️ Notions faussement acquises détectées

Aucune — tout le contenu de cette session était réellement nouveau pour Thomas, pas de notion crue acquise à tort. Point de vigilance (pas un acquis erroné) : la syntaxe de config d'une librairie tierce (`vitest.config.ts`) s'est révélée non devinable même sur un outil déjà connu par ailleurs (Vitest côté front) — remarque formulée par Thomas lui-même, juste et à retenir pour la suite.

### 🔄 Étapes restantes

- Écrire le premier test réel (`back/src/app.test.ts`) sur `GET /comments` avec Supertest
- Étendre aux autres routes (`POST` comment, `POST` reply, `PATCH` vote, `PUT` edit, `DELETE`), y compris le cas `403` (ownership)
- Traiter le reset de la base entre chaque test : actuellement la base `:memory:` est ouverte une seule fois pour tout le run Vitest (import unique de `db.ts`) — sans `beforeEach` ou équivalent, les données d'un test restent visibles dans le suivant. Notion pas encore abordée

### 📈 Évaluation de session

- **Points solides :** Une fois le "pourquoi" de chaque étape posé clairement, exécution correcte et rapide (installation, script `test`, découpage `app.ts`/`server.ts` réalisé sans erreur ni régression). Bon réflexe de ne pas laisser passer une syntaxe non comprise — a explicitement dit "j'ai rien compris" puis "elle est pas devinable" plutôt que de recopier sans comprendre, et a corrigé lui-même sa reformulation avec la bonne terminologie (objet vs fonction).
- **Points fragiles :** Terrain neuf a demandé plusieurs itérations pour deux notions précises (montage du chemin DB en deux étapes séparées, syntaxe de `vitest.config.ts`) — cohérent avec un terrain "totalement nouveau", pas un signal d'inquiétude, mais à surveiller si le rythme d'assimilation reste comparable sur les config d'outils tiers à venir.
- **Priorité pour la prochaine session :** écrire le premier test réel avec Supertest sur `GET /comments`, étendre aux autres routes, introduire `beforeEach` pour repartir d'une base propre entre tests.

### 💬 Notes de contexte

- Mode guidé confirmé en ouverture de session, avec justification explicite de Thomas (mieux apprendre en observant le "pourquoi" avant de deviner sur du terrain inconnu)
- La feuille de route à 5 étapes donnée en ouverture semble avoir aidé à garder le fil — aucun signal de perte de vue d'ensemble pendant la session, contrairement à des sessions Phase 3 précédentes
- Session interrompue avant la fin de l'étape 4 (premier test écrit) faute de temps — reprise prévue le lendemain, session plus longue annoncée

---

## Session 2026-07-08 — Phase 3 : routes PUT/DELETE, ownership, câblage front complet, nettoyage code mort

### ✅ Étapes accomplies

- Méthode pédagogique revérifiée en ouverture de session (comme convenu) : méthode guidée maintenue pour cette session, pas de retour au mode socratique
- `PUT /comments/:id` écrit et validé du premier coup, sans hint après l'explication initiale — recombinaison de trois briques déjà connues (`req.params`, `req.body`, `UPDATE ... WHERE id = ?` calqué sur la route vote)
- `DELETE /comments/:id` écrit et validé : notion nouvelle introduite (table plate vs structure imbriquée du front — supprimer un commentaire racine sans supprimer ses replies laisse des lignes orphelines en base, `parent_id` pointant vers un id disparu). Compris et appliqué correctement (suppression des enfants avant le parent)
- **Faille de sécurité détectée spontanément par Thomas avant qu'elle soit soulevée** : en testant `DELETE`, a interrompu le fil pour signaler que la route ne devrait pas pouvoir supprimer le commentaire de n'importe quel utilisateur, alors que le front ne fait que cacher les boutons Edit/Delete (restriction cosmétique, pas de sécurité réelle). Vérification d'ownership ajoutée sur `PUT` et `DELETE` (comparaison avec `currentUser.username`, `403` sinon), testée dans les deux sens (succès sur son propre commentaire, `403` sur celui d'un autre)
- Les 6 routes CRUD de `/comments` sont maintenant complètes et testées une à une via Postman
- `patchEdit`/`deleteComment` ajoutés dans `services/comments.ts`, calqués sur `patchVote`. Discussion sur le typage de retour (`Promise<void>` vs `Promise<{ id: number }>`) — Thomas a choisi de rester cohérent avec le reste du fichier et de typer/parser la vraie réponse du back, même non consommée immédiatement
- `handleEdit`/`handleDelete` branchés dans `App.tsx` en optimistic UI (mutation locale immédiate + appel API en arrière-plan sans `await`), sur le modèle de `handleVote`
- **Bug détecté et corrigé** : première version de `handleDelete` enveloppait l'appel à `deleteComment` (async) dans un `try/catch` synchrone — ne capture jamais un rejet de Promise non `await`. Corrigé en `.catch()` chaîné, comme `handleVote`
- Vérification bout en bout en navigateur : edit et delete confirmés persistants après reload (F5) — objectif central de la session atteint
- Nettoyage : `buildComment`/`buildReply` devenus du code mort (plus utilisés que par leurs propres tests) — supprimés de `utils/comments.ts` et `utils/comments.test.ts` avec l'accord explicite de Thomas ("je vois pas l'intérêt de garder du code mort"). Suite de tests repassée : 26/26 verts (28 → 26, cohérent)
- Point opérationnel clarifié : `front/.env` pointe vers Render (prod), pas `localhost` — testé directement en prod avec l'accord de Thomas, après avoir corrigé sa première hypothèse (le seed automatique ne rattrape que le cas où la table est *entièrement* vide, pas une suppression ciblée)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Table SQL plate vs structure front imbriquée — lignes orphelines | Nouvelle | Comprise et appliquée sans blocage après l'explication (supprimer les enfants par `parent_id` avant le parent) |
| Restriction UI (bouton caché) ≠ sécurité serveur | Identifiée en pratique, spontanément | Thomas a fait le lien seul entre "le bouton est caché" et "n'importe qui peut appeler la route en direct via Postman" avant que ce soit expliqué |
| Vérification d'ownership avant mutation (`SELECT` puis comparaison avant `UPDATE`/`DELETE`) | Nouvelle | Appliquée correctement sur les deux routes après un seul exemple |
| `.run().changes` (nombre de lignes affectées par `UPDATE`/`DELETE`) | Mentionnée, non implémentée | Expliquée comme option de certitude, pas retenue dans le code final (vérification via `GET` à la place) |
| `try/catch` ne capture pas une Promise non `await`ée | Nouvelle | Bug réel écrit puis corrigé — notion JS/TS importante, première rencontre concrète du piège sync/async |
| Redondance apparente back (`server.ts`) / front (`services/comments.ts`) | Confusion puis auto-résolue | Thomas a posé la question puis s'est corrigé seul en formulant : le back prépare/attend la requête, le front l'envoie |
| Typage de retour d'une fonction service (`Promise<void>` vs `Promise<{ id }>`) | Discussion de conception | Pas une notion "vraie/fausse" — choix de cohérence de convention de fichier, tranché par Thomas |

### ⚠️ Notions faussement acquises détectées

- **Comportement du seed automatique (`seedIfEmpty`)** : Thomas a d'abord supposé qu'une suppression individuelle serait "rattrapée" par le reseed au prochain restart Render. Corrigé : le reseed ne se déclenche que si la table est *entièrement* vide (`COUNT(*) === 0`), pas sur une suppression ciblée — donc les tests `DELETE`/`PUT` faits en prod cette session sont définitifs.

### 🔄 Étapes restantes

**Phase 3 quasi bouclée.** Les 6 routes CRUD (`GET`, `POST` comment, `POST` reply, `PATCH` vote, `PUT` edit, `DELETE`) sont toutes écrites, sécurisées (ownership) et câblées de bout en bout côté front (plus de `localStorage`, SQLite = seule source de vérité pour toutes les actions, vérifié par reload).

- Étape 6 (facultative) : tests automatisés sur les routes backend, jamais faits — à évaluer si le temps le permet
- Repenser si le mode guidé doit continuer ou repasser en socratique — à revérifier en ouverture de la prochaine session comme d'habitude, ne pas supposer

### 📈 Évaluation de session

- **Points solides :** Session dense mais sans blocage réel. Trois routes/concepts nouveaux (`PUT`, lignes orphelines, ownership) tous écrits correctement après une seule explication chacun. Le point fort de la session : détection spontanée de la faille d'autorisation avant qu'elle soit soulevée par l'agent — réflexe de sécurité réel, pas guidé. Bonne question de clarification sur le typage de retour (a mené à un choix de cohérence délibéré, pas suivi par défaut). Auto-correction rapide sur la confusion back/front. A pris une décision de nettoyage de code mort sans hésitation, avec une justification claire.
- **Points fragiles :** Bug `try/catch` autour d'un appel async non `await`é — pas deviné seul, mais bien compris une fois expliqué et corrigé du premier coup. Hypothèse erronée sur le comportement du seed automatique (corrigée avant impact réel).
- **Priorité pour la prochaine session :** Revérifier la méthode pédagogique. Phase 3 fonctionnellement complète — décider avec Thomas s'il veut attaquer l'étape 6 (tests backend) ou considérer le projet prêt pour une nouvelle soumission/relecture.

### 💬 Notes de contexte

- Session courte et efficace comparée aux précédentes (pas de blocage long, pas de fatigue signalée)
- Terminée sur une victoire fonctionnelle claire (CRUD complet vérifié en prod, persistant après reload) — bon point de clôture, cohérent avec la clôture de session précédente
- Thomas a explicitement demandé la mise à jour de `progression.md` et le commit avant de partir — pas de temps pour discuter de la suite, à reprendre à l'ouverture de la prochaine session

---

## Session 2026-07-07 — Phase 3 : routes replies/vote + câblage front complet

### ✅ Étapes accomplies

- `POST /comments/:id/replies` écrit et commité (`1b75e73`) : premier contact avec `req.params` (paramètres d'URL dynamiques, toujours des chaînes — conversion `Number()` nécessaire), même pattern d'insertion que `POST /comments`
- `PATCH /comments/:id/vote` écrit et commité (`b128aca`) : premier `UPDATE` SQL (`score = score + ?`), découverte de `.get()` (une seule ligne, contrairement à `.all()`) — étape 4 du plan bouclée
- Câblage front décidé en **intégration complète** (pas juste le chargement initial) après clarification explicite avec Thomas sur la portée de "câblage front" — SQLite devient la seule source de vérité pour lecture/création/vote, `localStorage` retiré entièrement de `App.tsx`
- `front/.env` créé avec `VITE_API_URL` — Thomas a soulevé **spontanément** que l'URL ne pouvait pas être codée en dur vu que le projet doit être fonctionnel sur son portfolio (donc le back devra être hébergé), avant même qu'on aborde la question
- `services/comments.ts` : `getCommentsData` repointé vers l'API, `postComment`/`postReply`/`patchVote` ajoutés
- `App.tsx` : `handleAddComment`/`handleAddReply` passés en `async`, branchés sur les routes `POST` (remplacent `buildComment`/`buildReply` pour ce chemin) ; `handleVote` en optimistic UI (mise à jour locale immédiate via `applyVote` + `patchVote` en arrière-plan sans `await`)
- CORS vérifié **en pratique** pour la première fois (front Vite + back Express lancés en parallèle) — fonctionne sans configuration supplémentaire
- Commit unique côté front (`3128972`) pour l'ensemble du câblage (une seule feature logique)
- **Déploiement complet réalisé en fin de session :** backend sur Render (`https://front-end-mentor-interactive-comments.onrender.com`), Thomas a géré la configuration Render lui-même (dont deux commits `chore(back)` pour épingler la version Node)
- Bug de production détecté et corrigé : premier déploiement Render renvoyait `comments: []` — le seed n'avait jamais tourné sur ce filesystem (éphémère, cf. mémoire projet). Fix : `seed.ts` refactorisé en fonction exportée `seedIfEmpty()` (garde `COUNT(*) > 0`), appelée au boot dans `server.ts` ; source du seed dupliquée dans `back/data/data.json` pour ne plus dépendre de `front/` (commit `564aca3`)
- Deuxième bug de production détecté et corrigé : le site Vercel affichait "Failed to fetch data" — `VITE_API_URL` n'était jamais injecté au build sur Vercel (`.env` gitignored, jamais eu la valeur). Fix : variable ajoutée dans Vercel → Project Settings → **Environment Variables** (piège d'UI : bien distinct de l'onglet "Environments", que Thomas a essayé en premier)
- Site fonctionnel de bout en bout confirmé (Vercel → Render → SQLite) — objectif portfolio atteint pour le périmètre actuel (lecture/création/vote)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `req.params` (paramètres d'URL dynamiques `:id`) | Nouvelle | Toujours une chaîne de caractères, conversion `Number()` nécessaire pour une colonne `INTEGER` — bien intégré |
| `UPDATE ... SET x = x + ?` en SQL préparé | Nouvelle | Même logique de placeholders que `INSERT`, appliquée sans blocage |
| `.get()` vs `.all()` (une ligne vs un tableau) | Nouvelle | Introduite par contraste avec `.all()` déjà connu |
| Variable d'environnement Vite (`import.meta.env.VITE_API_URL`) | Nouvelle | Introduite suite à une question d'architecture posée par Thomas lui-même, pas par anticipation de l'agent |
| Optimistic UI (mise à jour locale avant confirmation serveur) | Nouvelle | Comprise via contraste avec `handleAddComment`/`handleAddReply` (qui attendent la réponse pour avoir le vrai id) |
| `fetch` avec `method`/`headers`/`body` (POST/PATCH) | Nouvelle | `Content-Type: application/json` relié explicitement à `express.json()` côté serveur — le lien front/back a été explicité, pas juste donné comme boilerplate |
| `COUNT(*)` (fonction d'agrégation SQL) | Nouvelle | Introduite pour la garde d'auto-seed, comprise sans blocage |
| Filesystem éphémère en production (Render free tier) | Identifiée en pratique | Déjà anticipée en théorie en session 2026-07-02, vécue concrètement ici : premier symptôme observé était des données vides, pas une erreur explicite — bon exercice de diagnostic |
| Variables d'environnement Vite injectées au **build**, pas à l'exécution | Nouvelle | Cause du deuxième bug de prod — comprise via le symptôme (`"undefined/comments"`) plutôt qu'expliquée à froid |

### ⚠️ Notions faussement acquises détectées

Aucune. Un point de confusion mineur et vite résolu : Thomas a d'abord cru qu'un commentaire racine ne persistait pas après rechargement, alors qu'il s'agissait en fait d'une réponse (route pas encore câblée à ce moment) — clarifié en une itération.

### 🔄 Étapes restantes

- `PUT /comments/:id` (edit) et `DELETE /comments/:id` — routes backend jamais construites, `handleEdit`/`handleDelete` restent 100% locaux en attendant (ne survivent pas à un rechargement)
- Câblage front de l'edit/delete une fois ces routes prêtes
- Nettoyage potentiel : si `buildComment`/`buildReply` deviennent inutilisés partout (y compris tests), envisager de les retirer de `utils/comments.ts`
- Étape 6 : tests routes si le temps le permet

### 📈 Évaluation de session

- **Points solides :** Session très dense (2 routes backend + câblage front complet + déploiement production bout en bout + 2 bugs de prod diagnostiqués et corrigés) menée sans blocage réel, dans la continuité de la méthode guidée adoptée la veille. Réflexe produit fort et autonome : a interrompu le fil pour poser une question d'architecture pertinente sur l'hébergement en prod avant qu'elle soit soulevée, a initié le déploiement Render de sa propre initiative, et a lui-même noté une limite UX réaliste sur le vote (pas de traçabilité par utilisateur) tout en la relativisant correctement au regard du scope de l'exercice.
- **Points fragiles :** Aucun signalé côté code. Seule friction : navigation dans l'UI Vercel (variables d'environnement pas où attendu) — résolue par itération, pas un point d'apprentissage à retenir en soi.
- **Priorité pour la prochaine session :** routes `PUT`/`DELETE` pour boucler le CRUD, puis câblage edit/delete. Revérifier si la méthode guidée doit continuer ou si un retour au mode socratique est souhaité.

### 💬 Notes de contexte

- Suite directe de la session du 2026-07-06 (même fil de conversation, a chevauché le changement de jour) — méthode guidée maintenue, toujours aucun signe de blocage lié à la concentration mentionnée en ouverture de la session précédente
- Bonne illustration du principe "SQLite = seule source de vérité" : le retrait du `localStorage` a été motivé explicitement (source de données concurrente), pas fait par automatisme
- **Correction de la roadmap initiale :** le front est déployé sur **Vercel**, pas Netlify comme décidé en session de kickoff (2026-06-17) — Thomas a changé de plateforme en cours de route, à refléter dans toute référence future au déploiement
- Session terminée sur une victoire concrète et visible (site fonctionnel en ligne) — bon point de clôture après une session longue, dans le contexte de concentration difficile signalé en ouverture de la session précédente

---

## Session 2026-07-06 — Phase 3 : routes GET/POST /comments (méthode pédagogique adaptée)

### ✅ Étapes accomplies

- Changement de méthode pédagogique demandé par Thomas en début de session : mode socratique suspendu temporairement au profit d'une méthode guidée (explication complète + exemple, puis écriture pas à pas avec vérification visuelle systématique) — raison : difficultés de concentration depuis plusieurs jours, cumulées avec la nature déjà 100% nouvelle du backend/SQL et l'absence de feedback visuel naturel côté back
- `GET /comments` écrit et commité (`57b1ac5`) : transformation des lignes SQL plates en structure imbriquée `{ currentUser, comments }` — `.filter(parentId === null)` pour isoler les commentaires racine, puis `.map` avec sous-`.filter(parentId === row.id)` pour rattacher les réponses à leur parent
- `currentUser` posé comme constante en dur dans `server.ts` (valeurs de `data.json`, `juliusomo`) — décision prise par Thomas lui-même après avoir raisonné qu'aucune auth n'est prévue, donc pas besoin de le rendre dynamique/modifiable via la DB
- `express.json()` ajouté comme middleware pour lire `req.body`
- `POST /comments` écrit et commité (`20a663b`) : insertion via requête préparée (`db.prepare(...).run(...)` avec placeholders `?`), renvoie le commentaire créé au format front (`replies: []`, id = `result.lastInsertRowid`)
- Tests validés à chaque étape via navigateur (`GET`) et **Postman** (`POST`, premier usage sur ce projet) avant de passer à la suite

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Regroupement de données plates par clé étrangère (`parent_id`) en structure imbriquée | Nouvelle | Comprise en profondeur — Thomas a fait le lien spontanément avec l'opération inverse de `seed.ts` ("on vient de faire l'inverse de notre seed"), signe de compréhension du principe et pas seulement de la syntaxe |
| Middleware `express.json()` pour parser le corps JSON d'une requête | Nouvelle | Expliqué directement, appliqué sans blocage |
| Placeholders SQL (`?`) contre l'injection SQL | Nouvelle | Notion de sécurité introduite en même temps que la syntaxe d'insertion, bien reçue |
| `.run()` + `lastInsertRowid` pour récupérer l'id généré à l'insertion | Révisée (vue en seed le 2026-07-03) | Réappliquée correctement pour construire la réponse du `POST` |
| Test de routes `POST` avec un corps JSON via Postman | Nouvelle | Premier usage sur ce projet, aucun souci d'outil |

### ⚠️ Notions faussement acquises détectées

Aucune notion mal comprise détectée cette session. Un seul accroc de workflow (fichier `server.ts` non sauvegardé avant de tester une route → `"Cannot POST"`), auto-diagnostiqué par Thomas sans aide.

### 🔄 Étapes restantes

- Étape 4 : route de création de réponse (`parent_id` + `replying_to` renseignés), route de vote (`PATCH`/`PUT` sur `score`)
- Étape 5 : câblage front (`front/src/services/comments.ts` uniquement)
- Étape 6 : tests routes si le temps le permet

### 📈 Évaluation de session

- **Points solides :** Malgré la difficulté de concentration annoncée en ouverture, aucun blocage réel sur la session — la méthode guidée avec checkpoint visuel systématique (navigateur puis Postman) semble avoir bien compensé l'absence de feedback visuel naturel du backend. Connexion conceptuelle autonome et pertinente (symétrie seed/GET). Décision architecturale sur `currentUser` posée et justifiée par Thomas lui-même, sans être guidé vers cette conclusion. Bug de workflow diagnostiqué seul, sans paniquer.
- **Points fragiles :** Aucun signalé cette session.
- **Priorité pour la prochaine session :** Revérifier en ouverture si la méthode guidée doit être maintenue ou si un retour au mode socratique habituel est souhaité (ne pas supposer que l'adaptation est permanente). Reprendre à la route de création de réponse.

### 💬 Notes de contexte

- Session ouverte par une demande explicite et directe de Thomas de changer de méthode pédagogique, avec une auto-analyse fine des causes (matière nouvelle + absence de feedback visuel + état de concentration) — enregistré en mémoire, à réévaluer au début de la prochaine session plutôt que reconduit par défaut
- Deux commits distincts et propres (`GET` puis `POST`), chacun testé visuellement avant de passer au suivant — bon rythme de checkpoints malgré le contexte de faible concentration annoncé

---

## Session 2026-07-03 — Phase 3 : schéma SQLite finalisé, seed complet (JSON → DB relationnelle)

### ✅ Étapes accomplies

- `CREATE TABLE comments` complété dans `back/src/db.ts` avec les 9 colonnes actées (`id`, `content`, `created_at`, `score`, `username`, `image_png`, `image_webp`, `parent_id`, `replying_to`) — `NOT NULL` posé correctement sur `score`, `image_png`, `image_webp` (garantis par l'interface TS `User`/`Comment`), nullable sur `parent_id`/`replying_to` (commentaire racine)
- Bug résolution de module `NodeNext` découvert et corrigé : `import "./db.js"` (pas `.ts`) dans `server.ts`
- `node:sqlite` vérifié fonctionnel sur Node v23.8.0 — jamais testé avant cette session, aucun souci
- `back/src/seed.ts` créé : lecture de `front/public/data/data.json` depuis `back/` (`fs.readFileSync` + `path.join` + `process.cwd()`)
- Bug BOM (byte order mark) rencontré en pratique sur `data.json` et corrigé (`rawContent.replace(/^﻿/, "")`)
- Requêtes préparées (`db.prepare(...)` + `?` + `.run(...)`) introduites et appliquées correctement après plusieurs itérations de debug (typo colonne, ordre des valeurs, argument manquant)
- Boucle imbriquée écrite **seul** avec succès : `for (comment of data.comments)` → insert + capture `result.lastInsertRowid`, puis `for (reply of comment.replies)` → insert avec `parent_id` = id capturé — après un seul exemple parallèle (livres/exemplaires)
- Vérification finale en DB (requête directe) : 4 lignes propres et correctement liées (2 commentaires racine, 2 replies avec `parent_id`/`replying_to` corrects)
- `data.sqlite` supprimé et régénéré par Thomas en fin de session pour repartir sur des ids propres (1 à 4, sans doublons de tests précédents)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `CREATE TABLE` (types, `NOT NULL`, `PRIMARY KEY AUTOINCREMENT`) | Nouvelle | Expliqué directement (terrain 100% neuf, pas de socratique) puis bien appliqué |
| Aplatissement de données imbriquées TS → colonnes SQL plates | Nouvelle | Premier réflexe "en universel" (un user pourrait ne pas avoir d'image) au lieu de se baser sur le contrat déjà écrit dans l'interface TS `User` du projet — corrigé après recentrage |
| `NULL` vs `0` (absence de valeur vs valeur connue) | Nouvelle | Bien comprise après question ciblée sur `score` |
| Résolution de module `NodeNext` (`.js` en import même si source `.ts`) | Nouvelle | Bizarrerie non devinable, expliquée directement |
| Lecture de fichier Node (`fs.readFileSync` + `path.join` + `process.cwd()`) | Nouvelle | Assimilée via exemple parallèle, chemin relatif correctement déduit seul |
| BOM et effet sur `JSON.parse` | Nouvelle | Bug réel rencontré, cause expliquée. Confusion initiale sur la portée du fix (croyait que ça modifiait `data.json` source) — clarifié : ne nettoie qu'une copie en mémoire |
| Requêtes préparées (`db.prepare` + `?` + `.run(valeurs)`) | Nouvelle | Terrain le plus difficile à visualiser — plusieurs erreurs de mapping colonne/valeur, consolidé via un tableau de correspondance explicite |
| `.run()` retourne un résultat (`lastInsertRowid`) | Nouvelle | Notion clé pour lier parent/enfant en relationnel — comprise via exemple parallèle (livre/exemplaire), puis **appliquée seul avec succès** sur la vraie boucle imbriquée |
| `for...of` sur un tableau | Rouillé, plus fragile que prévu | Bloqué sur la syntaxe de base malgré expérience JS antérieure — a nécessité un exemple isolé, sans rien de SQL autour, pour débloquer |
| `AUTOINCREMENT` ne réutilise jamais les ids supprimés | Nouvelle | Observée en pratique (ids 3,4 au lieu de 1,2 après un `DELETE`), comprise une fois expliquée |
| Fichier `.sqlite` = binaire, pas du texte | Nouvelle | Confusion initiale (ouvert comme texte brut) bien résolue — extension de visualisation dédiée installée |

### ⚠️ Notions faussement acquises détectées

- **`for...of` / méthodes de tableau JS de base** — déjà signalé fragile en Phase 1 (`.sort`, `.filter`/`.map`), confirmé de nouveau ici, encore plus visible sous la charge cognitive du SQL. Pas un point neuf mais qui continue de peser — pourrait mériter un petit exercice ciblé hors-projet à un moment donné.
- **Réflexe de raisonner "dans l'absolu"** plutôt que sur le contrat de données déjà écrit dans le projet (contrainte `NOT NULL` sur les images) — corrigé rapidement une fois recentré, à surveiller sur les prochaines décisions de schéma.

### 🔄 Étapes restantes

**Étape 2 du plan terminée et validée.** Reprendre à l'étape 3 :
- Routes CRUD `/comments` (`GET`, `POST`, `PUT`, `DELETE`)
- Étape 4 : routes replies + vote (`PATCH` upvote/downvote)
- Étape 5 : câblage front (`front/src/services/comments.ts` uniquement)
- Étape 6 : tests routes si le temps le permet

**Consigne méthodologique actée pour la suite (cf. notes de contexte) :** sur toute nouvelle notion de la Phase 3, donner la vue d'ensemble narrative complète (destination finale, pourquoi) AVANT la moindre syntaxe — pas seulement un rappel du "pourquoi" en une phrase.

### 📈 Évaluation de session

- **Points solides :** A écrit seul et correctement la boucle imbriquée (le point le plus complexe de la session) après un seul exemple parallèle — bon transfert une fois la vue d'ensemble posée. A posé une question fine et pertinente sur `NULL` vs `0`. A exprimé sa frustration de façon précise et constructive, sans se bloquer, et a lui-même formulé une hypothèse juste sur son propre fonctionnement cognitif (pense du résultat vers le détail, pas l'inverse).
- **Points fragiles :** Session difficile et fatigante ("j'ai trop sué ce matin") — première rencontre avec SQL + relationnel + `fs` Node, charge cognitive nettement supérieure aux sessions précédentes. Les méthodes de tableau JS de base restent un point de friction récurrent, amplifié ici par la nouveauté du contexte SQL autour.
- **Priorité pour la prochaine session :** reprendre au calme sur les routes CRUD, en appliquant systématiquement la vue d'ensemble narrative avant syntaxe. Surveiller si la friction sur `for...of`/méthodes de tableau persiste — si oui, envisager un petit détour ciblé hors-projet.

### 💬 Notes de contexte

- Session matinale, longue et dense en nouveauté absolue (SQL + relationnel + lecture de fichiers Node) — Thomas a verbalisé une frustration honnête mais constructive à mi-session ("un peu comme un prof de chinois... j'ai aucune idée de comment on fait çà"), sans jamais remettre en cause la méthode de fond ni sa motivation
- Changement de méthode pédagogique acté en session : sur un terrain 100% nouveau, donner la vue d'ensemble narrative (destination finale, pourquoi) AVANT toute syntaxe — pas seulement un rappel du "pourquoi" en une phrase. Enregistré en mémoire pour les sessions futures.
- Prochaine étape actée : routes CRUD sur `/comments`

---

## Session 2026-07-02 — Phase 3 démarrée : setup Express + CORS, blocage SQLite natif

### ✅ Étapes accomplies

- Plan Phase 3 posé en 6 étapes : (1) setup Express + Hello World + CORS, (2) schéma DB + seed depuis data.json, (3) routes CRUD `/comments`, (4) routes replies + vote, (5) câblage front (seul `services/comments.ts` doit changer), (6) tests routes si le temps le permet
- Backend en TypeScript confirmé (cohérence avec le front)
- `back/` scaffolded : `npm init -y`, `"type": "module"` ajouté, `express` + `cors` installés (deps), `typescript` + `tsx` + `@types/*` installés (devDeps)
- `back/tsconfig.json` créé (`module`/`moduleResolution: NodeNext`, `strict`, `outDir`/`rootDir`)
- Scripts npm ajoutés : `dev` (`tsx watch`), `build` (`tsc`), `start` (`node dist/server.js`)
- Premier serveur Express écrit et fonctionnel dans `back/src/server.ts` : route `GET /` testée dans le navigateur (`http://localhost:3000/`)
- CORS branché (`app.use(cors())`) — expliqué conceptuellement, pas encore vérifié en pratique (front pas encore câblé)
- Tentative `better-sqlite3` : échec d'installation — pas de binaire précompilé pour Node v23.8.0 (version non-LTS), et Visual Studio Build Tools incomplet (composant C++ manquant) pour compiler depuis les sources
- Alternatives discutées : `sqlite3` (même souci probable), `sql.js` (WASM, mais persistance disque manuelle), `node:sqlite` (intégré à Node, retenu)
- Décision : ne pas changer la version Node globale (risque d'impact sur les autres projets de Thomas, question posée spontanément avant de valider) → `node:sqlite` choisi pour éviter ce risque
- `better-sqlite3` désinstallé (`npm uninstall better-sqlite3 @types/better-sqlite3`)
- `back/src/db.ts` créé avec le squelette `DatabaseSync` (`node:sqlite`) — le vrai `CREATE TABLE` reste à écrire (session interrompue avant)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Verbe HTTP vs chemin d'URL (`app.get(path, handler)`) | Faussement acquise, puis re-ancrée | Malgré l'expérience Postman/CRUD en formation (~1 an avant), la distinction n'était pas du tout ancrée — a écrit `app.get("/GET", ...)` puis une variable URL complète non utilisée, avant que l'analogie "menu déroulant vs barre d'adresse Postman" fasse déclic |
| Anatomie d'une URL (protocole / hôte+port / chemin) | Nouvelle | Clarifiée après confusion concrète entre `http://localhost:3000/` et le simple `/` attendu dans `app.get` |
| Middleware Express (`app.use`) | Nouvelle | Introduit via CORS, bien reçu, pas de blocage |
| CORS (pourquoi le navigateur bloque le cross-origin) | Nouvelle | Compris conceptuellement, à vérifier en pratique à l'étape 5 (câblage front) |
| Table SQL = tableur (lignes/colonnes) | Nouvelle | Introduite en fin de session via analogie Excel + parallèle direct avec l'interface TS `Comment` déjà connue — a débloqué la perte de vue d'ensemble |
| Diagnostic d'erreur npm install natif (node-gyp, prebuild-install) | Identifiée, largement pilotée par l'agent | Thomas a suivi le diagnostic et posé une bonne question de prudence (impact sur les autres projets), mais la résolution technique elle-même n'est pas un terrain d'ancrage à évaluer ici |

### ⚠️ Notions faussement acquises détectées

- **Distinction verbe HTTP / chemin d'URL** — Thomas pensait avoir cette notion via Postman (formation, ~1 an avant), verbalisé ensuite comme "j'ai aucune idée de comment on fait ça, de but en blanc". À traiter comme nouvelle notion, pas comme une révision, sur les prochaines sessions Express.
- **Perte de la vue d'ensemble en cours de tâche technique** — pattern déjà noté en Phase 1 (session 2026-06-19, chaînes de props). Ici : passage direct de l'installation de la DB à l'écriture de colonnes SQL sans rappel du "pourquoi", a nécessité un arrêt complet et une reformulation avec analogie tableur. À anticiper systématiquement en Phase 3 : rappeler le lien avec l'objectif global AVANT de donner la syntaxe d'une nouvelle étape, pas seulement quand la confusion est déjà là.

### 🔄 Étapes restantes

**Reprendre exactement ici — étape 2 du plan, non finalisée :**
- Écrire le vrai `CREATE TABLE comments` dans `back/src/db.ts` (colonnes : `id`, `content`, `created_at`, `score`, `username`, `image_png`, `image_webp`, `parent_id`, `replying_to` — types et `NOT NULL` à déterminer). L'analogie tableur Excel + parallèle avec l'interface TS `Comment` a bien fonctionné, la reprendre comme point d'ancrage.
- Lancer `npm run dev` pour vérifier que `node:sqlite` fonctionne sans erreur/flag expérimental sur Node v23.8.0 (jamais encore exécuté)
- Écrire le script de seed (importer les données de `data.json` dans la table `comments`)

**Puis suite du plan Phase 3 :**
- Étape 3 : routes CRUD `/comments` (`GET`, `POST`, `PUT`, `DELETE`)
- Étape 4 : routes replies + vote (`PATCH` upvote/downvote — design REST à discuter ensemble)
- Étape 5 : câblage front — modifier uniquement `front/src/services/comments.ts` pour appeler l'API Express au lieu de `data.json` local ; vérifier concrètement l'effet de CORS à ce moment-là
- Étape 6 : tests routes (si le temps le permet)
- Plus tard, hors urgence : au déploiement, exclure Vercel serverless (filesystem non persistant) ; sur Render, prévoir l'option persistent disk (payante) vu l'expérience précédente de Thomas

### 📈 Évaluation de session

- **Points solides :** A suivi et intégré l'anatomie d'une URL une fois reformulée avec l'analogie Postman. A posé une question pertinente et autonome sur l'impact d'un changement de version Node sur ses autres projets, avant de valider — bon réflexe de prudence système, pas guidé. A signalé activement et honnêtement quand il perdait le fil ("je comprends pas grand chose"), plutôt que de faire semblant de suivre.
- **Points fragiles :** L'expérience Postman/CRUD antérieure ne s'est pas transférée du tout à l'écriture de code Express — à traiter comme un terrain neuf, pas une révision, sur les prochaines sessions. Perte de vue d'ensemble récurrente (déjà notée en Phase 1) dès qu'une tâche technique s'enchaîne sans rappel explicite du "pourquoi".
- **Priorité pour la prochaine session :** Reprendre le `CREATE TABLE` avec l'analogie tableur déjà posée. Rappeler le "pourquoi" de chaque étape AVANT la syntaxe, pas après une confusion.

### 💬 Notes de contexte

- Session interrompue par fatigue (matinée), pas par blocage technique non résolu — la compréhension conceptuelle du `CREATE TABLE` est posée, reste à l'écrire concrètement
- Contexte machine important pour la suite : Node v23.8.0 installé globalement, Visual Studio Build Tools incomplet (composant C++ manquant), pas de nvm — toute lib nécessitant une compilation native (au-delà de `node:sqlite`) posera le même problème tant que l'environnement n'est pas changé délibérément
- Décision actée : rester sur `node:sqlite` pour ce projet plutôt que toucher à l'environnement Node global — l'impact sur les autres projets de Thomas n'a pas été mesuré et le risque n'était pas justifié pour cette session
- `better-sqlite3` installé puis désinstallé proprement (`npm uninstall`) — ne doit plus apparaître dans `back/package.json`

---

## Session 2026-07-01 — Phase 2 bouclée + soumission FEM + corrections post-review

### ✅ Étapes accomplies

- Tests d'interactions écrits et passants dans `CommentCard.test.tsx` :
  - `onVote(id, 'up')` — clic Upvote sur `otherUser`
  - `onVote(id, 'down')` — clic Downvote sur `otherUser`
  - `onReply(id)` — clic Reply sur `otherUser`
  - `onOpening(id)` — clic Delete sur `currentUser`
  - Mode édition : clic Edit → textarea → clear + type → clic UPDATE → `onEdit(id, content)`
- Phase 2 bouclée — 28 tests au total, tous verts
- Déploiement Vercel + soumission Frontend Mentor : **8.0/10**
- Corrections post-review FEM :
  - `useState<number | null>()` → `useState<number | null>(null)` dans App (`activeReplyId`)
  - `alert(error)` dans le catch remplacé par `{error && <p>{error}</p>}` dans le JSX
  - Assertions sans `()` corrigées dans `CommentCard.test.tsx` (`.toBeInTheDocument` → `.toBeInTheDocument()`) — 5 occurrences au total
  - Assertions sans matcher corrigées (`expect(element)` → `expect(element).toBeInTheDocument()`)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `await user.click(button)` pour tester une interaction | Nouvelle | `userEvent` est async — `await` obligatoire |
| `getByRole('button', { name })` sensible à la casse | Révisée | Bug `'UpVote'` vs `'Upvote'` — le message d'erreur liste les noms accessibles disponibles |
| Ordre du scénario multi-étapes : clic déclencheur avant `getBy` | Nouvelle | Le textarea n'existe pas avant le clic Edit — requête après le clic seulement |
| `user.clear()` + `user.type()` pour modifier un champ | Nouvelle | Deux opérations async enchaînées |
| Un composant teste ce qu'il fait, pas ce que le parent fait | Révisée | Tester `onVote` appelé, pas l'affichage du score — le score est géré par App |
| `getByLabelText` ≠ `getByRole` pour un `aria-label` | Nouvelle | `getByLabelText` cherche un `<label>` HTML, pas un `aria-label` |
| `useState` sans valeur initiale → `undefined`, pas `null` | Révisée | `useState<number \| null>()` donne `undefined` — toujours passer la valeur initiale explicitement |
| `setError` dans catch + `error` non lu dans le JSX = lint warning | Nouvelle | Fix : afficher `{error && <p>{error}</p>}` dans le JSX, pas `alert(error)` (state pas encore mis à jour) |

### ⚠️ Notions faussement acquises détectées

- **`expect(element)` sans matcher** — ne vérifie rien, le test passe toujours. `getByRole` échoue si absent mais l'intention n'est pas explicite. Règle : tout `expect` finit par un matcher appelé avec `()`.
- **`.toBeInTheDocument` sans parenthèses** — référence la fonction sans l'appeler. Récurrent sur cette session (5 occurrences). À surveiller systématiquement à la relecture.
- **Ordre act/assert dans un scénario multi-étapes** — clic UPDATE posé avant `expect(onEdit)`. L'ordre render → action → assert est à ancrer comme réflexe.

### 📈 Évaluation de session

- **Points solides :** Pattern d'interaction test assimilé rapidement après le premier exemple (Upvote). A identifié seul que le test de vote ne devait pas tester l'affichage du score. Scénario edit mode écrit avec la bonne structure après recadrage sur l'ordre.
- **Points fragiles :** Parenthèses manquantes sur les matchers — erreur récurrente, détectée par FEM et non à la relecture. À intégrer comme checklist avant commit.
- **Note FEM :** 8.0/10 (8.1 premier jet, légère baisse après corrections — robot potentiellement pas à jour).

### 🔄 Étapes restantes

- Phase 3 : backend Express (premier contact backend)

---

## Session 2026-06-26 — Phase 2 : tests CommentCard (en cours)

### ✅ Étapes accomplies

- `beforeEach(() => handleSubmit.mockClear())` commité dans `CommentInput.test.tsx` — correction d'isolation des mocks
- `CommentCard.test.tsx` démarré : fixtures `currentUser` / `otherUser` + `baseProps` avec spread pattern
- 9 tests écrits et passants :
  - Tag "you" présent (`getByTestId('you-badge')`) / absent (`queryByTestId`)
  - Delete + Edit présents pour `currentUser` / absents pour `otherUser`
  - Reply présent pour `otherUser` / absent pour `currentUser`
  - Votes `+/-` disabled pour `currentUser` / enabled pour `otherUser`
  - `@replyingTo` prefix affiché quand la prop est fournie
- Corrections accessibilité dans `CommentCard.tsx` :
  - `alt=""` sur les icônes décoratives (delete, edit, reply) — icônes purement visuelles
  - `aria-label` supprimé du bouton Reply — redondant avec le texte du span
  - `data-testid="you-badge"` ajouté sur le span du tag "you"

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Rôle des tests : filet de sécurité contre les régressions | Nouvelle | Distinction bien posée : les tests ne découvrent pas des bugs, ils préviennent d'en introduire un lors d'un refacto futur |
| `baseProps` + spread `{...baseProps, user: otherUser}` | Nouvelle | Pattern assimilé immédiatement — JS pur, prop de droite écrase le spread |
| `getByTestId` pour cibler un élément sans rôle sémantique | Nouvelle | Choix raisonné : évite les ambiguïtés sur "you" qui peut apparaître dans le contenu |
| `getBy` vs `queryBy` : erreur vs null si absent | Nouvelle | Bug rencontré (`getByTestId` sur élément absent = erreur), règle ancrée par l'erreur |
| Nom accessible d'un bouton : `alt` img + texte span | Nouvelle | `alt="icon delete"` + "Delete" = nom accessible "icon delete Delete" — fix : `alt=""` sur icônes décoratives |
| `aria-label` prend la priorité sur le contenu textuel | Nouvelle | Le bouton Reply avait `aria-label="Button for reply..."` — cachait le texte "Reply" au test |
| `.toBeDisabled()` / `.not.toBeDisabled()` | Nouvelle | Fourni par `@testing-library/jest-dom` |

### ⚠️ Notions faussement acquises détectées

- **`toBeInTheDocument` sans parenthèses** — référence à la fonction sans l'appeler, le test passe toujours. Corrigé sur signalement.

### 🔄 Étapes restantes (CommentCard)

- Interactions : `onReply(id)`, `onOpening(id)`, `onVote(id, 'up'/'down')`
- Mode édition : clic Edit → textarea avec contenu actuel, clic UPDATE → `onEdit(id, content)`, retour mode vue

---

## Session 2026-06-25 — Phase 2 : extraction utils + tests unitaires + tests composant

### ✅ Étapes accomplies

- `front/src/utils/comments.ts` créé : 5 fonctions pures extraites de App.tsx (`applyVote`, `buildComment`, `buildReply`, `applyEdit`, `applyDelete`)
- `front/src/utils/comments.test.ts` : 8 tests unitaires couvrant les 5 fonctions (dont test vote sur reply imbriquée, suppression comment racine vs reply)
- App.tsx refactorisé : handlers réduits à `setComments((prev) => utilFn(prev, ...args))`
- `front/src/components/CommentInput.test.tsx` : 5 tests RTL couvrant bouton SEND/REPLY, appel onSubmit, reset textarea, guard textarea vide
- Bug `vi.fn()` partagé détecté et corrigé : `beforeEach(() => handleSubmit.mockClear())` ajouté
- 4 commits propres

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Extraction de fonctions pures depuis des handlers React | Nouvelle | Comprend bien le principe : sortir le calcul du `setComments`, le handler ne fait que brancher |
| `utils/` vs `services/` — séparation transformation vs source de données | Nouvelle | Raisonnement autonome sur la distinction, appliqué immédiatement |
| Tests unitaires fonctions pures (Arrange/Act/Assert) | Révisée | Structures retrouvées sans aide, seul blocage sur `Date.now()` non testable — résolu |
| `vi.fn()` comme espion de prop | Nouvelle | Concept bien compris après explication : remplace une vraie fonction pour vérifier les appels |
| `render` + `screen` + `userEvent` — structure d'un test RTL | Nouvelle | Écrit seul après le premier exemple, pattern assimilé |
| `getByRole` vs `queryByRole` | Nouvelle | Introduit, `getByRole` utilisé correctement |
| `toHaveValue('')` pour vérifier un champ vide | Nouvelle | Trouvé après guidage |
| `beforeEach` + `mockClear()` — reset mock entre tests | Nouvelle | Bug détecté à la relecture (mock partagé au niveau module) — notion ancrée par le problème réel |
| `.not` sur un matcher Vitest | Nouvelle | Appliqué spontanément après explication |

### ⚠️ Notions faussement acquises détectées

- **Mock partagé entre tests** : `vi.fn()` déclaré au niveau module, pas remis à zéro entre les `it` — `not.toHaveBeenCalled()` aurait pu donner un faux positif. Corrigé avec `beforeEach(mockClear)`.

### 🔄 Étapes restantes

- Tests composant `CommentCard` (plus complexe — récursif, props multiples)
- Phase 3 : backend Express

### 📈 Évaluation de session

- **Points solides :** A compris et appliqué seul l'extraction de fonctions pures après une seule explication du pattern. A câblé App.tsx sans aide. Structure des tests RTL assimilée rapidement — tous les tests écrits de façon autonome après le premier exemple.
- **Points fragiles :** Distinction "tester le composant isolé vs tester l'app entière" — a eu besoin de recadrage sur ce point (CommentInput ne sait pas qu'il y a un arbre). À surveiller sur les tests de CommentCard.
- **Priorité pour la prochaine session :** Tests de `CommentCard` — composant récursif avec plus de props et de comportements conditionnels.

### 💬 Notes de contexte

- Session matinale — Thomas a verbalisé "ça me paraît un peu moins nébuleux" en fin de session
- Premier vrai contact avec RTL — pattern assimilé en une session, ce qui est rapide
- Le bug `vi.fn()` partagé a été détecté à la relecture du code (pas pendant l'écriture) — bonne illustration de pourquoi on relit avant de commiter

---

## Session 2026-06-24 — localStorage, tri par score, restrictions

### ✅ Étapes accomplies

- `localStorage` branché sur `comments` : chargement au montage (avec fallback fetch), sauvegarde à chaque mutation via `useEffect([comments])`
- Bug "sauvegarde trop tôt" résolu : `isInitialized` (`useRef<boolean>`) utilisé comme flag pour bloquer le `useEffect` de sauvegarde au premier render
- Tag "you" ajouté sur ses propres comments (`isCurrentUser` variable intermédiaire réutilisée)
- Boutons de vote `disabled={isCurrentUser}` + styles `disabled:opacity-50 disabled:cursor-not-allowed` + hover effects
- Tri des comments par score décroissant : `[...comments].sort((a, b) => b.score - a.score)` dans le JSX
- Bug mutation corrigé : `.sort()` mute le tableau original — remplacé par `[...comments].sort(...)` pour trier une copie

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| `useRef` comme flag d'initialisation (pas de re-render) | Nouvelle | Pattern "effet qui tire trop tôt au montage" — non devinable sans connaître le problème |
| `useState` vs `useRef` : re-render vs pas de re-render | Nouvelle | `useState` aurait marché mais déclenché un render inutile — distinction bien comprise |
| Ordre d'exécution des `useEffect` au montage | Nouvelle | Le `useEffect` de sauvegarde tire avant le fetch — source du bug `"[]"` en localStorage |
| `.sort()` mute le tableau original | Révisée | Avait trié `comments` directement (state) — corrigé en `[...comments].sort(...)` |
| `disabled` + styles Tailwind `disabled:` | Nouvelle | Approche sémantique choisie spontanément par Thomas — bonne décision |

### ⚠️ Notions faussement acquises détectées

- **`useState` initial = `undefined`** : Thomas a répondu `null` quand la valeur initiale de `comments` était `[]`. Distinction `undefined` / `null` / tableau vide à surveiller.

### 🔄 Étapes restantes

- Phase 2 : Tests Vitest + React Testing Library

### 📈 Évaluation de session

- **Points solides :** A structuré le `useEffect` de chargement correctement (fetch + localStorage check) sans aide. A choisi `disabled` spontanément pour la restriction de vote — approche sémantique et correcte. A trouvé le placement du `.sort()` seul.
- **Points fragiles :** Bug `useRef` / ordre de déclenchement des effets non devinable sans expérience — notion vue une fois, à consolider sur le prochain projet.
- **Priorité pour la prochaine session :** Phase 2 — premier contact Vitest + React Testing Library. Commencer par tester les services (fonctions pures), puis les composants.

### 💬 Notes de contexte

- Session courte et ciblée — Phase 1 bouclée en fin de session
- Thomas a verbalisé "des notions intéressantes" — le pattern `useRef` comme flag et la mutation `.sort()` sont les deux acquis clés

---

## Session 2026-06-22 — CRUD complet : Vote, Create, Edit, Delete

### ✅ Étapes accomplies

- `handleVote` écrit dans App : mutation immutable à deux niveaux (comment racine + reply imbriquée), propagé via `onVote` à CommentCard
- Convention `handle` vs `on` corrigée : prop renommée `onVote` (fonctions internes = `handleXxx`, props = `onXxx`)
- Dead prop `onAddReply` supprimée de l'interface CommentCard
- `handleAddComment` écrit : construit un objet `Comment` complet et l'ajoute en fin de tableau via `setComments(prev => [...prev, newComment])`
- `handleAddReply` écrit : ajoute une reply dans `comment.replies` du bon comment racine via `.map()` + spread
- `onAddReply` ajouté en prop de CommentCard pour câbler le CommentInput des replies-de-replies
- Bug double `@username` corrigé dans `CommentInput` : `cleanContent` via `.replace()` avant `onSubmit`, conditionnel sur `replyingTo`
- Guard commentaire vide ajouté : `if (cleanContent.trim() === '') return`
- `setActiveReplyId(null)` ajouté dans `handleAddReply` pour fermer le CommentInput après soumission
- Edit inline : `isEditing` (local dans CommentCard) + `editContent` (useState initialisé avec `content`) + textarea contrôlée + bouton UPDATE → `onEdit(id, editContent)` + `setIsEditing(false)`
- `handleEdit` écrit dans App : même structure que `handleVote`, met à jour `content` à deux niveaux
- Boutons Delete/Edit affichés conditionnellement (`user.username === currentUser.username`), bouton Reply sinon
- `<dialog>` natif avec `useRef` + `useEffect` (showModal/close) pour la modale de confirmation Delete
- `deletingId: number | null` dans App pour tracker quel comment supprimer
- `onOpening(id: number)` corrigé : argument au lieu de closure pour transmettre le bon id depuis les replies
- `handleDelete` : `.filter()` à deux niveaux pour supprimer sans muter

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Mutation immutable à deux niveaux (`comments[i].replies[j]`) | Nouvelle | Écrit sans aide après explication — deux spreads imbriqués corrects |
| Convention `handleXxx` (interne) vs `onXxx` (prop) | Révisée | Avait nommé la prop `handleVote` — corrigé sur signalement |
| Séparation service / handler React (`setComments` ne peut pas vivre dans un service) | Nouvelle | Bonne question posée spontanément — logique bien comprise après explication |
| Construction d'objet TypeScript depuis une interface | Révisée | Blocage initial ("j'utilise CommentCard ?") — résolu après clarification |
| State local par composant (`isEditing`, `editContent` dans CommentCard) | Nouvelle | Bien compris : state local = données inutiles aux autres composants |
| `.filter()` pour supprimer vs `.map()` pour transformer | Nouvelle | Avait utilisé `.map()` + `content: ''` — distinction clarifiée |
| Closure vs argument dans les callbacks passés en prop | Nouvelle | Bug `onOpening` capturant toujours `comment.id` racine — non détectable sans connaître le pattern |
| `<dialog>` natif + `useRef` + `showModal()`/`close()` | Nouvelle | Implémenté seul, approche moderne correcte |
| `.replace()` pour nettoyer le préfixe `@username` avant `onSubmit` | Nouvelle | Trouvé `replace` seul, appliqué correctement après guidance |

### ⚠️ Notions faussement acquises détectées

- **Ordre des arguments** dans `handleAddReply` : signature `(content, id, userName)` mais appel `(id, userName, content)` — incohérence non détectée spontanément
- **Props = composants** : croyait qu'il fallait utiliser `CommentCard` dans un handler JS pour "créer un container" — confusion rendu/logique de données
- **Closure dans les callbacks JSX** : `onOpening` capturait `comment.id` racine pour toutes les replies — bug invisible sans connaître le pattern, non devinable

### 🔄 Étapes restantes

- `localStorage` pour persistance
- Empêcher vote/reply sur ses propres commentaires
- Tri des comments par score

### 📈 Évaluation de session

- **Points solides :** CRUD complet implémenté — Vote, Create, Edit, Delete tous écrits sans aide structurelle majeure. Bonne intuition sur la séparation state local/global (`isEditing` dans CommentCard, pas App). `handleEdit` calqué seul sur `handleVote`. `<dialog>` natif avec `useRef` implémenté seul.
- **Points fragiles :** Closure vs argument dans les callbacks — pattern non devinable, à surveiller sur les prochains projets. `.filter()` vs `.map()` pas encore automatique. Méthodes de tableau en général encore hésitantes.
- **Priorité pour la prochaine session :** `localStorage` — premier contact avec persistance côté client. Pattern : charger au montage, sauvegarder à chaque mutation de `comments`.

### 💬 Notes de contexte

- Session longue et dense — CRUD complet en une session, ce qui est ambitieux
- Thomas a verbalisé sa progression : "les props ça commence à être plus automatique, c'est en s'exposant qu'on retient" — bonne lucidité sur son propre apprentissage
- Le pattern closure/argument est une notion clé de React intermédiaire — maintenant vécu, pas juste lu
- `localStorage` sera plus simple que le CRUD — bonne entrée pour la prochaine session

---

## Session 2026-06-19 — CommentInput, activeReplyId, câblage des props

### ✅ Étapes accomplies

- Layout responsive de `CommentCard` (`flex-col` → `md:flex-row-reverse`, vote à gauche sur desktop)
- `CommentInput` créé : composant contrôlé avec `useState`, `mode: 'send' | 'reply'`, `replyingTo?: string`, `onSubmit: (content: string) => void`, reset post-submit
- `activeReplyId: number | null` ajouté dans App, `onReply: (id: number) => void` passé à CommentCard
- Débogage de la chaîne de props : `onReply` pré-bindé → passé avec id en argument → toggle correct
- Architecture de placement du CommentInput clarifiée via la maquette `active-states.jpg` :
  - Reply sur comment racine → CommentInput dans App's `<ul>` via `Fragment`
  - Reply sur reply → CommentInput à l'intérieur de la `<ul>` des replies de CommentCard
- `Fragment` avec `key` dans le `.map()` (ne peut pas recevoir `className`)
- Résolution des erreurs TypeScript une par une (currentUser, onAddReply, onSubmit, mode manquant)

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Composant contrôlé (textarea + useState + onChange) | Révisée | Écrit sans aide, pattern bien assimilé |
| `e.preventDefault()` vs `e.preventDefault` | Faussement acquise | Oublié les parenthèses — corrigé sur signalement |
| `Fragment` avec `key` dans `.map()` | Nouvelle | `<>` ne peut pas recevoir de `key`, `Fragment` oui |
| Chaîne de props multi-niveaux (App → CommentCard → récursif → CommentInput) | Identifiée comme limite | Compréhension pièce par pièce OK, suivi de la chaîne complète difficile |
| `onReply: (id: number) => void` vs pré-binding | Nouvelle | Pré-binder l'id dans App = bug quand propagé aux replies |
| Placement conditionnel d'un composant selon le niveau (racine vs indenté) | Nouvelle | Résolu par lecture de la maquette active-states.jpg |

### ⚠️ Notions faussement acquises détectées

- **`e.preventDefault`** sans parenthèses — référence la fonction sans l'appeler. Le formulaire aurait soumis et rechargé la page.
- **Lecture des specs avant de coder** — Thomas a commencé à implémenter le placement du CommentInput sans regarder `active-states.jpg`. La maquette aurait évité 30 min de débogage de layout.

### 🔄 Étapes restantes

- `onSubmit` stubs à remplacer par vraie logique CRUD (add comment, add reply)
- Logique de vote (upvote/downvote, mutation immutable sur état imbriqué)
- Edit inline (bouton Edit → textarea dans le card, bouton UPDATE)
- Delete avec modal de confirmation
- Afficher boutons Edit/Delete pour l'utilisateur courant (à la place de Reply)
- `localStorage` pour persistance

### 📈 Évaluation de session

- **Points solides :** `CommentInput` écrit proprement sans aide (useState, controlled form, reset). A identifié spontanément que le CommentInput racine devait être dans App et non dans CommentCard — c'était la bonne décision architecturale.
- **Points fragiles :** Suivi de chaînes de props longues — perd le fil quand la chaîne dépasse 2-3 niveaux. Verbalisé honnêtement par Thomas lui-même. À surveiller sur la session CRUD (même profondeur de chaîne).
- **Priorité pour la prochaine session :** Lire les maquettes AVANT de coder (active-states.jpg contient des infos critiques). Puis logique de vote — première mutation immutable sur état imbriqué.

### 💬 Notes de contexte

- Session longue (matin + après-midi) — beaucoup de débogage de props TypeScript
- Le pattern `Fragment` avec `key` dans un map a été découvert par nécessité — bien ancré
- `first-of-type:mt-4` sur le premier `<li>` des replies est un workaround fragile — à surveiller
- Les `onSubmit` sont des stubs `() => {}` pour l'instant — CRUD à implémenter en prochaine session

---

## Session 2026-06-18 — Services, App data loading, CommentCard récursif

### ✅ Étapes accomplies

- Clarification de la maquette : deux inputs distincts (SEND global / REPLY inline), pas un seul input à détection dynamique de `@`
- Décision architecture : `CommentCard` unique pour comments et replies (composant récursif)
- `data.json` déplacé de `src/data/` vers `public/data/` pour être accessible via `fetch`
- `src/services/comments.ts` créé : une fonction `getCommentsData()` async retournant `CommentsData` (choix délibéré : un seul fetch, App destructure)
- `App.tsx` : `useEffect` + `useState` pour chargement async des données au montage, gestion d'erreur avec `instanceof Error`
- `CommentCard.tsx` : composant récursif affichant comments + replies imbriquées, avec `replyingTo?: string` pour afficher le `@username`
- 6 commits propres au fil de la session

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Couche services async (fetch vs import JSON) | Nouvelle | Thomas a choisi `fetch` pour la migration Phase 3 — raisonnement autonome et correct |
| `async/await` dans services, retour `Promise<T>` | Révisée | Syntaxe retrouvée sans aide |
| `useEffect` + fonction async interne + try/catch | Révisée | Pattern correctement produit, gestion d'erreur avec `instanceof Error` bien comprise |
| `instanceof` pour vérifier le type d'une erreur catchée | Nouvelle | Concept expliqué, appliqué correctement |
| Composant récursif (`CommentCard` dans `CommentCard`) | Nouvelle | Sceptique au départ ("ça va pas faire un effet larsen ?"), a écrit la solution seul après une explication |
| Données locales dans la récursion (pas besoin qu'App connaisse `replyingTo`) | Nouvelle | Observé et verbalisé spontanément par Thomas en fin de session |
| `Vite public/` pour assets accessibles via `fetch` | Nouvelle | Déduit du problème de path, corrigé immédiatement |

### ⚠️ Notions faussement acquises détectées

- **Lecture de la maquette Reply** : Thomas croyait que le bouton SEND/REPLY changeait dynamiquement selon la présence d'un `@username` dans l'input, et que le système faisait un `.find()` live. Réalité : deux inputs distincts dont le mode est piloté par l'état (`activeReplyId`), pas par le contenu textuel. Gap corrigé en début de session.

### 🔄 Étapes restantes

- ~~Layout desktop `CommentCard` : `flex-col` → `md:flex-row` (vote à gauche du contenu)~~ ✅
- `CommentInput` : composant statique fait — à brancher avec `useState` (valeur contrôlée) + `onSubmit: (content: string) => void`
- Intégrer `CommentInput` dans `App` (mode send) et dans `CommentCard` (mode reply, conditionnel sur `activeReplyId`)
- Logique de vote (upvote/downvote, mutation immutable sur état imbriqué)
- CRUD : add comment, add reply, edit, delete avec modal de confirmation
- `localStorage` pour persistance
- Afficher boutons Edit/Delete pour l'utilisateur courant (à la place de Reply)

### 📈 Évaluation de session

- **Points solides :** Raisonnement autonome sur les choix d'architecture (async vs sync, un fetch vs deux). A écrit `useEffect` + async + try/catch sans aide. A implémenté le composant récursif seul après une seule explication — c'était le pattern le plus nouveau de la session.
- **Points fragiles :** Visualisation de la structure de données imbriquée au départ ("j'arrive pas à me visualiser"). La lecture intuitive de la maquette était incorrecte — montre que l'analyse des specs avant de coder reste un point à consolider.
- **Priorité pour la prochaine session :** `CommentInput` (composant formulaire contrôlé, mode send/reply) — premier contact avec l'état d'édition local dans un composant.

### 💬 Notes de contexte

- Thomas a verbalisé spontanément l'élégance du composant récursif en fin de session ("c'est finalement assez élégant que tout tienne en un composant") — signe que le pattern est ancré, pas juste copié
- La distinction "deux inputs distincts vs un input qui change de mode" a été une correction importante — à surveiller sur les prochaines features (lire la maquette avant de coder)
- `activeReplyId: number | null` dans App est la prochaine pièce clé — pas encore introduit, sera nécessaire pour `CommentInput`

---

## 🚦 Project Kickoff — Auto-évaluation des concepts clés

> Réalisée en fin de session de setup (2026-06-17), avant toute écriture de code de la solution. Concepts extraits du README, du `data.json` et des maquettes.

| Concept | Auto-évaluation | Note |
| --- | --- | --- |
| `useState` + rendu conditionnel | À l'aise | Réserve sur le typage TypeScript — à observer in situ |
| Mutation immutable d'état imbriqué | Intuition correcte (spreads) — notion pas clairement formalisée | A identifié le mécanisme de base (copier l'état, ne pas muter) mais sans expérience sur deux niveaux d'imbrication. C'est le terrain le plus nouveau et le plus risqué du projet |
| Tri de tableau par propriété | Rouillé | Méthodes JS `.sort()` souvent oubliées — à vérifier in situ |
| Composition et props | À l'aise | — |
| Formulaire contrôlé | Méfiant — "ça a toujours l'air simple sur le papier" | Bonne lucidité. Sur ce projet, la difficulté est l'édition inline (un état d'édition par comment, pas un seul formulaire global) |
| Couche `services/` | "Pas sûr de ce que ça représente" | Notion architecturale nouvelle — clarifié en kickoff : c'est un fichier de fonctions nommées, pas de syntaxe nouvelle |
| Modal de confirmation | À l'aise | — |
| Layout responsive Tailwind | À l'aise — "j'aime beaucoup Tailwind" | — |
| `localStorage` | Rouillé | Déjà utilisé, syntaxes oubliées — pas inquiétant, bien documenté |
| Timestamps relatifs dynamiques | Jamais vu | Nouveau terrain — `Date` + `Intl.RelativeTimeFormat` ou calcul manuel. Bonus FEM, pas bloquant |

### 💬 Notes de contexte (kickoff)

- **Mutation immutable** : Thomas a identifié spontanément les spreads comme mécanisme — c'est la bonne intuition. Ce qu'il n'a pas encore vécu, c'est la profondeur : deux niveaux d'imbrication (`comments[i].replies[j]`) demandent deux spreads imbriqués. C'est précisément l'objectif n°1 de `OBJECTIFS.md` — à observer sans intervention dès le premier handler de vote ou d'édition.
- **Formulaire contrôlé** : l'auto-méfiance est fondée. Ce projet a plusieurs formulaires simultanés potentiellement ouverts (mode édition par comment, formulaire de réponse par comment). Un seul `useState<string>` global ne suffit pas — il faudra soit un état d'édition par item, soit une architecture différente. Point à laisser émerger naturellement.
- **Couche services/** : clarifié verbalement — "juste des fonctions nommées dans un fichier". Thomas n'était pas inquiet une fois la notion démystifiée.

---

## Session 2026-06-17 — Interactive Comments Section — Roadmap, scaffold & objectifs

> **Note de transparence :** Cette session est entièrement une session de setup et de planification. Thomas a délégué explicitement le scaffold, la configuration et la création des fichiers de gouvernance. Il n'a pas écrit de code de la solution. Aucune notion de code n'est donc à évaluer sur l'axe "ancrage par l'écriture" — c'est assumé et cohérent avec la session de setup du Tip Calculator (2026-06-08).

---

### ✅ Étapes accomplies

**Roadmap et architecture (discussion)**

- Définition de la roadmap en 3 étapes : (1) Front JSON local, (2) Tests Vitest + RTL, (3) Backend Express local
- Décision monorepo : `interactive-comments-section-main/front/` + `back/`, git init à la racine, déploiement Netlify depuis `front/` (base dir: front, publish: front/dist) — compatible Frontend Mentor sans friction
- Décision de structure de données : discussion sur la structure imbriquée (`comments[].replies[]`) vs structure plate — décision de partir imbriqué (fidèle au JSON FEM), avec conscience du problème de mise à jour que ça implique
- Décision AGENTS.md : fichier custom à placer à la racine (pas dans `front/`), pour additionner au AGENTS.md FEM existant sans le remplacer

**Scaffold (délégué à l'agent)**

- Scaffold manuel de `front/` (le générateur `npm create vite@latest` a annulé car le dossier n'était pas vide — les fichiers FEM y étaient déjà copiés par Thomas)
- Fichiers créés : `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html` (remplace le HTML statique FEM), `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- Stack installée via `npm install` : Vite 6, React 19, TypeScript 5.8, Tailwind CSS v4 + `@tailwindcss/vite`, `clsx`, `tailwind-merge`, Prettier + `prettier-plugin-tailwindcss`, Vitest 3, React Testing Library, jsdom
- Alias `@/` → `src/` configuré dans `tsconfig.app.json` + `vite.config.ts`
- Vitest configuré dans `vite.config.ts` (environnement jsdom, setupFiles, globals)
- `src/setupTests.ts` créé avec `@testing-library/jest-dom`

**Assets et données**

- `front/images/` déplacé vers `front/public/images/` (assets statiques Vite)
- `data.json` copié vers `src/data/data.json` avec correction des chemins `./images/` → `/images/`
- `src/types/index.ts` créé avec les interfaces TypeScript dérivées du `data.json` : `UserImage`, `User`, `Reply`, `Comment`, `CommentsData`

**Design tokens (délégué à l'agent — images fournies par Thomas)**

- Extraction de la palette couleur depuis les captures Figma → `@theme` dans `index.css` : 4 couleurs primaires (purple-600/200, pink-400/200) + 4 neutres (grey-800/500/100/50)
- Google Fonts Rubik (400/500/700) ajouté dans `index.html` via `<link>` avec `preconnect`
- `--font-sans: 'Rubik', sans-serif` dans `@theme` — Rubik devient le font-sans par défaut
- Extraction des text presets depuis la capture Figma → `@utility` dans `index.css` : `text-preset-1` (24px/500/lh1.2), `text-preset-2-medium` (16px/500/lh1.5), `text-preset-2-regular` (16px/400/lh1.5), `text-preset-3` (13px/500/lh1.2)
- Toutes les valeurs px converties en rem

**Gouvernance**

- `.gitignore` racine créé (node_modules, dist, .env, coverage)
- `.prettierrc` créé (semi: false, singleQuote: true, tabWidth: 2, trailingComma: es5, plugin Tailwind)
- `AGENTS.md` + `CLAUDE.md` custom importés par Thomas à la racine
- `rapport.md` importé à la racine (historique des 8 code reviews du parcours)
- `OBJECTIFS.md` créé avec les 7 objectifs pédagogiques du projet

**Bug résolu**

- `tsconfig.app.json` : `baseUrl: "."` supprimé — déprécié en TypeScript 5+ avec `moduleResolution: "bundler"`, `paths` fonctionne sans lui

**Vérification finale**

- `tsc --noEmit` : 0 erreur
- `npm run build` : build propre, 29 modules transformés, CSS Tailwind généré

---

### 🧠 Notions de code vues

| Notion | Statut | Commentaire |
| --- | --- | --- |
| Monorepo front/back avec git à la racine | Nouvelle | Première fois que la structure "un repo, deux dossiers" est posée délibérément — compatible FM via Netlify subdirectory deployment |
| Tailwind v4 `@theme` pour les design tokens | Révisée | Déjà vu sur Tip Calculator (setup délégué) — Thomas a fourni les captures et posé les questions sur la convention de nommage |
| Tailwind v4 `@utility` pour les text presets | Révisée | Même contexte — Thomas a choisi cette approche sur Tip Calculator, réappliquée ici |
| Structure imbriquée `comments[].replies[]` | Identifiée | Analysée en roadmap — la complexité de mutation sans état plat a été discutée, pas encore pratiquée |
| Couche `services/` comme abstraction de la source de données | Identifiée | Posée comme décision architecturale en discussion — sera pratiquée en première session de code |
| `baseUrl` déprécié avec `moduleResolution: "bundler"` | Nouvelle | Détecté via l'erreur VSCode, corrigé immédiatement |

---

### ⚠️ Notions faussement acquises détectées

Aucune — cette session ne comportait pas d'écriture de code de la solution par Thomas. Terrain non évaluable sur ce plan.

---

### 🔄 Étapes restantes

- **Project Kickoff** : auto-évaluation des concepts clés du challenge (cf. `AGENTS.md` §3) — à faire avant la première ligne de code de la solution
- Décision sur la structure des composants : `CommentCard` unique pour comment + reply, ou deux composants distincts ?
- Création de `src/services/comments.ts` (couche d'abstraction données)
- Premier composant (à définir en kickoff)
- Logique CRUD sur l'état imbriqué

---

### 📈 Évaluation de session

- **Points solides :** Thomas formule ses besoins avec précision avant de déléguer (liste explicite des outils à installer, choix de la structure monorepo, fourniture des images pour les design tokens). La décision de garder les objectifs dans un fichier dédié `OBJECTIFS.md` plutôt que dans `progression.md` est pertinente — meilleure séparation entre les objectifs pédagogiques stables et les devlogs de session.
- **Points fragiles :** N/A — session de setup délégué.
- **Priorité pour la prochaine session :** Project Kickoff auto-évaluation, puis décision sur la structure des composants avant d'écrire la première ligne.

---

### 💬 Notes de contexte

- Première session sur Interactive Comments Section — fait suite au Tip Calculator (8.5/10 "Exceptional", score le plus haut du parcours)
- Le scaffold a été manuel (pas `npm create vite@latest`) car Thomas avait déjà copié les fichiers FEM dans `front/` avant la session — le générateur annule en mode non-interactif quand le dossier n'est pas vide
- Thomas a importé un `AGENTS.md` custom complet à la racine (comportement mentor, protocole de session, protocole de fin de session) — ce fichier définit le cadre de collaboration pour toute la durée du projet
- Architecture Express : Thomas n'a jamais fait de backend. Décision : pas d'Auth (trop complexe), 4-5 routes CRUD simples avec stockage JSON ou SQLite — faisable et pédagogique
- La discussion sur la structure imbriquée vs plate a débouché sur une décision pragmatique : rester imbriqué (fidèle au JSON FEM), avec conscience que cela implique des mises à jour immutables plus complexes — c'est précisément l'objectif n°1 de `OBJECTIFS.md`
- **Convention de commits monorepo décidée :** Phase 1 (front seul) → scope = composant/feature comme d'habitude, pas de préfixe `(front)` (`feat(comment)`, `fix(modal)`, `test(services)`). Phase 3 (quand Express démarre) → Convention B slash : `feat(front/modal)`, `feat(back/routes)`. Premier commit du projet : `chore: initialize monorepo and frontend tooling` (pas de scope, touche la racine du monorepo)
