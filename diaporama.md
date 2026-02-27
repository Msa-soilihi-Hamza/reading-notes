# Présentation Examen : Projet Reading Notes

Ce document contient le contenu structuré pour vos 38 slides. Vous pouvez copier-coller ces éléments directement sur Canva.

---

## 🟢 INTRODUCTION

### Slide 1 : Titre et Identification
- **Titre :** Reading Notes
- **Sous-titre :** Plateforme collaborative de gestion de recettes africaines
- **Présenté par :** [Votre Nom]
- **Logo :** (Insérer le logo du projet)
- **Examen :** [Nom de votre diplôme/examen]

### Slide 2 : Sommaire
1. **Objectifs et Cible**
2. **Architecture et Technologies**
3. **Fonctionnalités Principales**
4. **Qualité et Expérience Utilisateur (UX)**
5. **Optimisation et Sécurité**
6. **Déploiement et Défis**

---

## 🟢 PARTIE 1 : OBJECTIFS ET CIBLE

### Slide 3 : [Transition]
**I. Objectifs et Public Cible**

### Slide 4 : Objectifs principaux
- **Digitaliser :** Sauvegarder le patrimoine culinaire africain.
- **Partager :** Offrir une plateforme collaborative et accessible.
- **Gérer :** Permettre un contrôle total sur ses propres créations.
- **Sécuriser :** Garantir la protection des données et des contenus.

### Slide 5 : Public cible
- **Amateurs de cuisine :** Personnes souhaitant découvrir des saveurs authentiques.
- **Gourmands & Passionnés :** Utilisateurs désirant stocker leurs propres recettes.
- **Communauté :** Passionnés de culture africaine et de partage culinaire.
- **Administrateurs :** Modérateurs veillant à la qualité du contenu.

---

## 🟢 PARTIE 2 : ARCHITECTURE ET TECHNOLOGIES

### Slide 6 : [Transition]
**II. Architecture et Technologies utilisées**

### Slide 7 : C'est quoi le MVC ?
- **M (Modèle) :** Gestion de la donnée (Base de données).
- **V (Vue) :** Interface utilisateur (Ce que voit le visiteur).
- **C (Contrôleur) :** La logique (L'arbitre entre le Modèle et la Vue).

### Slide 8 : Schéma du fonctionnement MVC
- **Requête HTTP** → **Routeur** → **Contrôleur**.
- **Contrôleur** interroge le **Modèle**.
- **Modèle** renvoie les données de la **Base de données**.
- **Contrôleur** envoie les données à la **Vue (EdgeJS)**.
- **Vue** affiche la page finale à l'utilisateur.

### Slide 9 : Pourquoi le MVC ?
- **Organisation :** Séparation claire des responsabilités.
- **Maintenabilité :** Facile à mettre à jour sans tout casser.
- **Clarté :** Code structuré et standardisé pour le travail en équipe.

### Slide 10 : Technologies côté Front-end
- **EdgeJS :** Moteur de templates performant (rendu côté serveur).
- **Vanilla CSS :** Design sur mesure, léger et responsive.
- **Structure Sémantique :** HTML5 pour l'accessibilité et le SEO.

### Slide 11 : Technologies côté Back-end
- **Node.js :** Environnement d'exécution rapide et moderne.
- **AdonisJS v6 :** Framework TypeScript robuste (robuste, sécurisé, complet).
- **TypeScript :** Sécurité du code grâce au typage statique.

### Slide 12 : Stockage des données
- **MySQL :** Base de données relationnelle fiable et performante.
- **Lucid ORM :** Interface intuitive pour manipuler la base de données en TypeScript.
- **Migrations :** Versioning de la structure des données.

---

## 🟢 PARTIE 3 : FONCTIONNALITÉS PRINCIPALES

### Slide 13 : [Transition]
**III. Fonctionnalités de l'application**

### Slide 14 : Fonctionnalité 1 : Consultation des recettes
- **Accès Public :** Tout visiteur peut voir les délices partagés.
- **Affichage :** Listes claires avec titres, catégories et descriptions.
- **Détails :** Ingrédients, instructions, temps de cuisson et difficulté.

### Slide 15 : Fonctionnalité 2 : Gestion des comptes
- **Inscription :** Formulaire sécurisé avec validation stricte (**VineJS**).
- **Contrôle :** Vérification du format email, unicité et complexité du mot de passe.
- **Connexion :** Système sécurisé par sessions (Adonis Auth).

### Slide 16 : Fonctionnalité 3 : Création et Édition
- **Espace Membre :** Créer ses propres recettes ("My Recipes").
- **CRUD Utilisateur :** Ajouter, modifier ou supprimer ses contenus.
- **Validation :** Règles strictes sur les ingrédients et instructions.

### Slide 17 : Fonctionnalité 4 : Administration
- **Dashboard Admin :** Gestion complète des utilisateurs.
- **Modération :** Possibilité de modifier ou supprimer n'importe quelle recette.
- **Contrôle :** Attribution des rôles (Admin vs User).

### Slide 18 à 25 : Captures d'écran
*(Conseil : Prenez des captures de votre site et ajoutez ces légendes)*
- **Slide 18 :** Page d'accueil (Le "Wow" effect).
- **Slide 19 :** Liste des recettes (Ergonomie).
- **Slide 20 :** Détail d'une recette (Contenu riche).
- **Slide 21 :** Formulaire d'inscription (Clarté).
- **Slide 22 :** Espace "Mes Recettes" (Gestion personnelle).
- **Slide 23 :** Formulaire de création (Interface intuitive).
- **Slide 24 :** Panneau Admin - Liste Utilisateurs (Puissance).
- **Slide 25 :** Panneau Admin - Gestion des Recettes.

---

## 🟢 PARTIE 4 : QUALITÉ ET EXPÉRIENCE UTILISATEUR (UX)

### Slide 26 : [Transition]
**IV. Qualité et Expérience Utilisateur (UX)**

### Slide 27 : Choix graphiques
- **Palette Indigo (#4f46e5) :** Une teinte premium qui sublime les visuels culinaires.
- **Typographie Native :** Utilisation du "System-UI" pour une lisibilité maximale et rapidité d'affichage.
- **Psychologie des couleurs :** Le violet apporte une touche de sophistication et de modernité.

### Slide 28 : Navigation et Ergonomie
- **Mobile First :** Interface optimisée pour une utilisation fluide sur smartphone.
- **Navigation Intuitive :** Menu épuré pour un accès rapide aux recettes.
- **Réactivité :** Retours visuels immédiats (Flash messages) pour chaque action.

---

## 🟢 PARTIE 5 : OPTIMISATION ET SÉCURITÉ

### Slide 29 : [Transition]
**V. Optimisation et Sécurité**

### Slide 30 : Protection des données
- **Hachage Scrypt :** Sécurisation automatique des mots de passe.
```ts
// User.ts - Hachage natif
withAuthFinder(() => hash.use('scrypt'))
```
- **Validation (VineJS) :** Sécurisation des entrées pour éviter les données invalides.
```ts
// auth.ts - Règles de validation
email: vine.string().email().unique(),
password: vine.string().minLength(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
```
- **Shield (CSRF/XSS) :** Protection contre les injections.
```html
<!-- Template - Protection CSRF -->
<form action="/login" method="POST">
  {{ csrfField() }}
</form>
```

### Slide 31 : Contrôle des accès (Middlewares)
- **Pipeline de sécurité :** Filtrage des requêtes avant d'atteindre le contrôleur.
```ts
// routes.ts - Protections par groupes
router.group(() => {
  router.get('/admin', [AdminController, 'index'])
}).use([middleware.auth(), middleware.admin()])
```
- **Rôles :** Middleware `Admin` qui redirige les non-autorisés.

### Slide 32 : Sécurité anti-abus
- **ThrottleMiddleware :** Limite les tentatives (ex: 10/min).
```ts
// throttle_middleware.ts - Rate Limiting
if (entry.count >= maxAttempts) {
  return response.tooManyRequests('Trop de tentatives.')
}
```
- **Protection Brute Force :** Indispensable sur Login et Register.

---

## 🟢 PARTIE 6 : DÉPLOIEMENT ET DÉFIS

### Slide 33 : [Transition]
**VI. Déploiement et Défis**

### Slide 34 : Méthode de déploiement
- **Environnement :** Node.js configuré pour la production.
- **Build :** Compilation TypeScript vers JavaScript via `node ace build`.
- **Variables d'environnement :** Fichier `.env` pour la sécurité des clés.

### Slide 35 : Défi 1 : Maîtriser l'ORM
- **Difficulté :** Passer des requêtes SQL pures aux modèles Lucid.
- **Solution :** Utilisation des relations `@belongsTo` et des Migrations pour une structure propre.

### Slide 36 : Défi 2 : Logique de sécurité
- **Difficulté :** Gérer les permissions fines (Qui peut modifier quoi ?).
- **Solution :** Mise en place de vérifications strictes dans les contrôleurs et via les middlewares.

---

## 🟢 CONCLUSION

### Slide 37 : [Transition]
**Conclusion**

### Slide 38 : Bilan final et perspectives
- **Bilan :** Application fonctionnelle, sécurisée et scalable.
- **Évolution :** Ajouter des images aux recettes, système de "Favoris", moteur de recherche.
- **Remerciements :** Merci pour votre attention ! Avez-vous des questions ?

---

💡 **Conseils Bonus pour Canva :**
1. Utilisez des icônes de **Lucide React** ou **FontAwesome** pour les slides technologiques.
2. Gardez un fond sombre ou très épuré pour mettre en valeur vos captures d'écran.
3. Pour les slides de code (Slide 30-32), utilisez des blocs de texte à police "Monospace" pour simuler un éditeur de code.
