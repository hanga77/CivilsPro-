# Tâches Futures — PI-CONSTRUCTION BTP SARL

Liste des améliorations planifiées pour les prochaines phases de développement.

---

## Infrastructure & Build

- [ ] **Migration Tailwind CDN vers build-time** — Installer Tailwind CSS via npm pour un bundle optimisé en production (purge CSS, tree-shaking)
- [ ] **CI/CD (GitHub Actions)** — Pipeline automatisé : lint, build, test, deploy (staging + production)
- [ ] **Rate limiting API** — Limiter les requêtes API pour prévenir les abus (express-rate-limit)
- [ ] **Optimisation images (sharp)** — Redimensionnement et compression automatique des images uploadées côté serveur

## Fonctionnalités

- [ ] **i18n (FR/EN)** — Internationalisation du site avec react-i18next pour supporter le français et l'anglais
- [ ] **Notifications email (Nodemailer)** — Envoi automatique d'emails lors de la réception de messages de contact
- [ ] **Génération PDF rapports** — Export PDF des fiches projets et rapports de progression
- [ ] **WebSocket temps réel** — Notifications admin en temps réel pour les nouveaux messages (Socket.io)
- [ ] **Blog/Actualités** — Section blog avec éditeur WYSIWYG pour publier des articles et actualités
- [ ] **Suivi budget projets** — Tableau de bord financier avec suivi des dépenses vs budget par projet

## Sécurité & Authentification

- [ ] **RBAC (ingénieur vs admin)** — Contrôle d'accès granulaire par rôle (admin complet, ingénieur en lecture + édition projets, client en consultation)
- [ ] **Refresh tokens** — Implémentation de refresh tokens pour une meilleure gestion des sessions JWT

## Analytics & SEO

- [ ] **Google Analytics** — Intégration GA4 pour le suivi du trafic et des conversions
- [ ] **Sitemap XML dynamique** — Génération automatique du sitemap à partir des pages et projets

## Mobile & Performance

- [ ] **PWA + Service Worker** — Progressive Web App avec mode hors-ligne et notifications push
- [ ] **App mobile React Native** — Application mobile native pour les clients et les ingénieurs terrain

## Qualité

- [ ] **Tests unitaires (Vitest)** — Couverture des composants React et des services API
- [ ] **Tests E2E (Playwright)** — Scénarios de test end-to-end pour les parcours utilisateur critiques
- [ ] **Storybook** — Documentation visuelle des composants UI réutilisables
