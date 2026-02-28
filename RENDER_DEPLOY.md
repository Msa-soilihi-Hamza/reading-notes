# Déploiement sur Render - Guide

Ce guide explique comment déployer l'application **Reading Notes** sur Render.

## 1. Créer une base de données MySQL
1. Connectez-vous à Render et créez une nouvelle **MySQL Database**.
2. Notez l'URL de connexion (elle ressemble à `mysql://user:pass@host:port/db`).

## 2. Créer le Service Web
1. Créez un nouveau **Web Service** et connectez votre dépôt GitHub.
2. Configurez les options suivantes :
   - **Runtime** : `Node`
   - **Build Command** : `npm install && npm run render:build`
   - **Start Command** : `node build/ace.js migration:run --force && node build/bin/server.js`

## 3. Configuration des Variables d'Environnement
Dans l'onglet **Environment** de votre Web Service, ajoutez ces variables :

| Variable | Valeur / Source |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `PORT` | `3333` (Render gère le port automatiquement, mais Adonis utilise celui-ci en interne) |
| `HOST` | `0.0.0.0` |
| `APP_KEY` | Générez une clé avec `node ace generate:key` |
| `LOG_LEVEL` | `info` |
| `SESSION_DRIVER` | `cookie` |
| `TRUST_PROXY` | `true` |
| `DB_CONNECTION` | `mysql` |
| `DB_HOST` | *(Depuis votre DB Render)* |
| `DB_PORT` | *(Depuis votre DB Render, souvent 3306)* |
| `DB_USER` | *(Depuis votre DB Render)* |
| `DB_PASSWORD` | *(Depuis votre DB Render)* |
| `DB_DATABASE` | *(Depuis votre DB Render)* |

## Notes Importantes
- Render utilise un proxy inverse, donc `TRUST_PROXY=true` est essentiel pour la gestion des sessions et cookies.
- La commande de démarrage effectue automatiquement les migrations avant de lancer le serveur.
