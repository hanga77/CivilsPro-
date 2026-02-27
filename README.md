# PI-CONSTRUCTION BTP SARL — Site Web

Site vitrine de PI-CONSTRUCTION BTP SARL, entreprise de génie civil basée au Cameroun. Monorepo React + Express avec intégration IA Gemini.

## Stack technique

- **Frontend :** React 18, TypeScript, Vite, Tailwind CSS (CDN), FontAwesome
- **Backend :** Express, MongoDB, Mongoose, JWT, Multer
- **IA :** Google Gemini (gemini-3-flash-preview)
- **Déploiement :** Docker (Phase 6)

## Structure du projet

```
CivilsPro-/
├── client/                    # Frontend React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/         # AdminDashboard
│   │   │   ├── auth/          # (Phase 3)
│   │   │   ├── contact/       # (Phase 4)
│   │   │   ├── expertise/     # (Phase 4)
│   │   │   ├── gallery/       # (Phase 4)
│   │   │   ├── home/          # (Phase 4)
│   │   │   ├── layout/        # Layout (Header, Nav, Footer)
│   │   │   ├── projects/      # (Phase 4)
│   │   │   ├── rentals/       # (Phase 4)
│   │   │   └── ui/            # (Phase 4)
│   │   ├── context/           # (Phase 3)
│   │   ├── hooks/             # (Phase 3)
│   │   ├── lib/               # constants.tsx (données initiales, couleurs)
│   │   ├── pages/             # (Phase 3)
│   │   ├── services/          # geminiService.ts
│   │   ├── types/             # index.ts (interfaces TS)
│   │   ├── App.tsx            # Composant principal + état + rendu par onglet
│   │   └── main.tsx           # Point d'entrée
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                    # Backend Express + MongoDB
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── seed/
│   ├── package.json
│   └── tsconfig.json
├── CLAUDE.md
└── README.md
```

## Démarrage rapide

```bash
cd client
npm install
npm run dev          # → http://localhost:3000
```

### Variables d'environnement

Créer `client/.env.local` :

```env
VITE_GEMINI_API_KEY=votre-cle-gemini
```

Créer `server/.env` :

```env
MONGODB_URI=mongodb://localhost:27017/pi-construction
JWT_SECRET=votre-secret-jwt
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
```

## Commandes

| Commande                    | Description                        |
| --------------------------- | ---------------------------------- |
| `cd client && npm run dev`  | Serveur de développement (port 3000) |
| `cd client && npm run build`| Build de production via Vite       |
| `cd client && npm run preview` | Servir le build localement      |
| `cd server && npm run dev`  | Serveur backend (port 5000)        |
| `cd server && npm run seed` | Peupler la base MongoDB            |
| `cd server && npm run build`| Build TypeScript du serveur        |

## Avancement

- [x] **Phase 1** — Restructuration monorepo `client/` + `server/`
- [x] **Phase 2** — Backend Express + MongoDB (modèles, API REST, JWT, upload, seed)
- [ ] **Phase 3** — Frontend : Tailwind propre, React Router, AuthContext, services API
- [ ] **Phase 4** — Redesign UX/UI des pages publiques + galerie watermark
- [ ] **Phase 5** — Admin Panel complet (sidebar, CRUD, dashboard)
- [ ] **Phase 6** — Docker (Compose, Dockerfiles, Nginx)

## Phase 1 — Détails

Restructuration du projet monolithique en monorepo :

- Déplacement des fichiers frontend dans `client/` (src, config Vite, tsconfig, package.json)
- Réorganisation des composants en sous-dossiers thématiques (`admin/`, `layout/`, `home/`, `gallery/`, etc.)
- Création des dossiers `context/`, `hooks/`, `pages/` (prêts pour Phase 3)
- Création du squelette `server/` avec structure Express standard (config, models, routes, controllers, middleware, seed)
- Mise en place de l'alias `@/` → `client/src/` dans Vite et TypeScript
- Séparation des types dans `types/index.ts` et des constantes dans `lib/constants.tsx`

## Phase 2 — Détails

Backend Express + MongoDB complet :

- **7 modèles Mongoose** : User, Project, RentalItem, Industry, ContactMessage, SiteConfig (singleton), GalleryItem
- **8 groupes de routes REST** : auth, projects, rentals, industries, messages, config, gallery, upload
- **Authentification JWT** : middleware `protect` + `adminOnly`, token 7 jours, mots de passe hashés (bcrypt)
- **Upload de fichiers** : Multer (stockage disque `uploads/`), filtre images uniquement, limite 5 Mo
- **Validation** : express-validator sur toutes les routes d'écriture
- **Seed** : script complet avec admin (`admin@piconstruction.cm` / `admin123`), projets, industries, locations, config site
- **Variables d'environnement** : `MONGODB_URI`, `JWT_SECRET`, `PORT`, `CLIENT_ORIGIN` (voir `server/.env`)

### Commandes serveur

```bash
cd server
npm install
npm run seed         # Peupler la base de données
npm run dev          # → http://localhost:5000
```

## Palette de couleurs

| Couleur | Hex       | Usage           |
| ------- | --------- | --------------- |
| Navy    | `#001E42` | Couleur primaire |
| Gold    | `#FFB81C` | Accent           |
