# Déploiement sur Railway - Guide

Ce guide explique comment déployer l'application **Reading Notes** sur Railway.

## Étapes de déploiement

1.  **GitHub** : Poussez votre code sur un dépôt GitHub.
2.  **Railway** : Créez un nouveau projet sur Railway et connectez votre dépôt GitHub.
3.  **Base de données** : 
    - Ajoutez un service **MySQL** à votre projet Railway.
    - Railway remplira automatiquement les variables de connexion (MYSQLHOST, MYSQLPORT, etc.).
4.  **Configuration des variables** :
    Dans l'onglet **Variables** de votre service Node.js sur Railway, ajoutez les variables suivantes :

| Variable | Valeur / Source |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `PORT` | `3333` (ou laissez Railway gérer) |
| `HOST` | `0.0.0.0` |
| `APP_KEY` | Générez une clé avec `node ace generate:key` |
| `LOG_LEVEL` | `info` |
| `SESSION_DRIVER` | `cookie` |
| `TRUST_PROXY` | `true` |
| `DB_CONNECTION` | `mysql` |
| `DB_HOST` | `${{MYSQLHOST}}` |
| `DB_PORT` | `${{MYSQLPORT}}` |
| `DB_USER` | `${{MYSQLUSER}}` |
| `DB_PASSWORD` | `${{MYSQLPASSWORD}}` |
| `DB_DATABASE` | `${{MYSQLDATABASE}}` |

## Notes Importantes
- Le fichier `Procfile` ordonne à Railway d'exécuter les migrations (`node ace migration:run --force`) avant de lancer le serveur.
- Assurez-vous que l'IP de Railway est autorisée si vous utilisez une base de données externe (ce n'est pas nécessaire si MySQL est dans le même projet Railway).
