# StudentCourseAPI

Projet pédagogique pour le module **Tests et Qualité** à l’Efrei.

## Contexte

Ce projet back-end (Node.js/Express) sert de base pour l’évaluation finale du module.  
L’objectif est d’améliorer la qualité du code et la couverture de tests à partir d’un projet existant.

## Objectifs pour les étudiants

- **Appliquer les standards de qualité** : linters (ESLint), formatage (Prettier), bonnes pratiques.
- **Intégrer des outils d’analyse statique** : exemple : SonarQube, Codacy.
- **Réaliser une revue de code collaborative** et la documenter.
- **Mettre en place une suite de tests automatisés** (unitaires et intégration) avec Jest, Mocha ou Cypress.
- **Intégrer les tests dans une pipeline CI/CD** (GitHub Actions).
- **Gérer la couverture de tests**.
- **Compléter la documentation technique** : installation, architecture, endpoints API, guides d’usage.
- **Finaliser la documentation Swagger** (manuelle ou automatique).
- **Fournir un dépôt Git propre, structuré et commenté**.

## Fonctionnalités

- Gestion des étudiants et des cours (création, modification, suppression, inscription).
- Règles métier : unicité email/titre, pagination, recherche, suppression protégée, etc.
- API REST documentée avec Swagger.

## Démarrage rapide

### Vérifications de versions 

#### Node


```sh
    node --v 
```

Si non obtention de node : 

```sh
    npm install node
```

#### Lancement du projet

```sh
npm install
npm run dev
```

- Accès à la documentation Swagger : `http://localhost:3000/api-docs/`
- Lancer les tests : `npm test`
- Linter : `npm run lint`
- Formatage : `npm run format`

## Définitions

- Le *Swagger* permet de centraliser les défintions de redirections/endpoints pour l'API

- Les tests (Unitaire/fonctionnelles) permettent de vérifier la pertinence des fonctions.

- Les *prettier* formatent les prérequis de ce qui est attendu du code (Exemple : Utilisation de Simple ou Double quote, les virgules ou les points virgules).

- Les *linter* permet de faire une détections des erreurs de code et éviter les incohérences ou les oublis (Exemple : Variables non utilisés / imports non présents...)
---


