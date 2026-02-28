 Pour démarrer le projet, voici les étapes :

  Option 1 : Dev local (sans Docker)

  1. Démarrer le backend (nécessite MongoDB local)

  # Terminal 1 — Créer le .env du serveur
  cd server
  cp ../.env.example .env
  # Éditer .env avec votre JWT_SECRET

  # Installer les dépendances et lancer
  npm install
  npm run seed    # Peupler la base de données
  npm run dev     # → http://localhost:5000

  2. Démarrer le frontend

  # Terminal 2
  cd client
  npm run dev     # → http://localhost:3000

  Option 2 : Docker (tout-en-un)

  docker-compose up --build    # → http://localhost

  # Puis seeder la base :
  docker-compose exec server npm run seed

  Accès Admin

  - URL : /admin
  - Email : admin@piconstruction.cm
  - Mot de passe : admin123

  ---
  Pré-requis :
  - Node.js 18+
  - MongoDB (local ou via Docker)
  - Docker + Docker Compose (pour Option 2)