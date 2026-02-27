# Reading Notes - Résumé du Projet

## Présentation

**Reading Notes** est une application web de gestion de recettes de cuisine africaine digitalisées. Elle permet aux utilisateurs de consulter, créer et gérer leurs propres recettes, tout en offrant un panneau d'administration complet pour la gestion des utilisateurs et de l'ensemble des recettes.

## Technologies utilisées

| Technologie | Rôle |
|---|---|
| **AdonisJS v6** | Framework back-end (TypeScript) |
| **Edge.js v6** | Moteur de templates (rendu côté serveur) |
| **Lucid ORM** | ORM pour la gestion de la base de données |
| **MySQL** | Base de données relationnelle |
| **VineJS** | Validation des données |
| **AdonisJS Shield** | Sécurité (CSRF, CSP, HSTS) |
| **CSS personnalisé** | Stylisation de l'interface |

## Fonctionnalités principales

### Authentification
- Inscription et connexion sécurisées (hashage Scrypt)
- Gestion de session avec expiration automatique (2h)
- Protection CSRF sur tous les formulaires

### Gestion du profil utilisateur
- Modification du nom complet
- Changement de mot de passe (vérification de l'ancien mot de passe)
- Suppression de compte

### Recettes (Utilisateur connecté)
- Consultation de toutes les recettes publiées
- Création, modification et suppression de ses propres recettes
- Chaque recette contient : titre, catégorie, description, ingrédients, instructions, temps de cuisson, nombre de portions, niveau de difficulté

### Administration
- Gestion complète des utilisateurs (CRUD)
- Gestion de toutes les recettes (CRUD)
- Attribution des rôles (admin / utilisateur)

## Architecture

```
reading-notes/
├── app/
│   ├── controllers/       # Logique métier (auth, books, profile, admin)
│   ├── models/            # Modèles Lucid (User, Book)
│   ├── middleware/         # Auth, Guest, Admin, Rate Limiting
│   └── validators/        # Validation VineJS
├── resources/views/       # Templates Edge.js
├── database/migrations/   # Schéma de la base de données
├── start/
│   ├── routes.ts          # Définition des routes
│   └── kernel.ts          # Configuration des middlewares
└── config/                # Configuration (session, shield, app)
```

## Sécurité

- **Mots de passe** : hashage Scrypt + règles de complexité (majuscule, minuscule, chiffre, caractère spécial, 8 caractères minimum)
- **Protection XSS** : échappement automatique des données affichées
- **Protection CSRF** : tokens sur tous les formulaires
- **CSP** (Content Security Policy) : politique stricte activée
- **HSTS** : forçage HTTPS en production
- **Rate Limiting** : limitation à 10 requêtes/minute par IP
- **Session** : HttpOnly, SameSite Lax, suppression à la fermeture du navigateur
- **Contrôle d'accès** : vérification de propriété sur les recettes utilisateur

## Base de données

Deux tables principales :

- **users** : id, full_name, email, password, role (admin/user), timestamps
- **books** : id, user_id (clé étrangère), title, category, description, ingredients, instructions, cooking_time, servings, difficulty, timestamps

## Accès

- **Visiteur** : page d'accueil, inscription, connexion
- **Utilisateur connecté** : consultation des recettes, CRUD sur ses propres recettes, gestion du profil
- **Administrateur** : tout ce qui précède + gestion de tous les utilisateurs et toutes les recettes

---

*Projet réalisé avec AdonisJS v6 - Application full-stack TypeScript*
