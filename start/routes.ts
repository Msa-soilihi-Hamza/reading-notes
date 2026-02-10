/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const HomeController = () => import('#controllers/home_controller')
const AdminUsersController = () => import('#controllers/admin_users_controller')
const ProfileController = () => import('#controllers/profile_controller')
const BooksController = () => import('#controllers/books_controller')

// Page d'accueil
router.get('/', [HomeController, 'index'])

// Auth - accessible uniquement aux visiteurs non connectes
router
  .group(() => {
    router.get('/register', [AuthController, 'showRegister'])
    router.post('/register', [AuthController, 'register'])
    router.get('/login', [AuthController, 'showLogin'])
    router.post('/login', [AuthController, 'login'])
  })
  .use(middleware.guest())

// Logout - accessible uniquement aux utilisateurs connectes
router.post('/logout', [AuthController, 'logout']).use(middleware.auth())

// Profil - accessible aux utilisateurs connectes
router
  .group(() => {
    router.get('/profile', [ProfileController, 'edit'])
    router.put('/profile', [ProfileController, 'update'])
    router.put('/profile/password', [ProfileController, 'updatePassword'])
    router.delete('/profile', [ProfileController, 'destroy'])
  })
  .use(middleware.auth())

// Recettes - accessible uniquement aux utilisateurs connectes
router
  .group(() => {
    router.get('/books', [BooksController, 'index'])
    router.get('/books/:id', [BooksController, 'show'])

    router.get('/my-recipes', [BooksController, 'myRecipes'])
    router.get('/my-recipes/create', [BooksController, 'userCreate'])
    router.post('/my-recipes', [BooksController, 'userStore'])
    router.get('/my-recipes/:id/edit', [BooksController, 'userEdit'])
    router.put('/my-recipes/:id', [BooksController, 'userUpdate'])
    router.delete('/my-recipes/:id', [BooksController, 'userDestroy'])
  })
  .use(middleware.auth())

// Admin - accessible uniquement aux admins
router
  .group(() => {
    router.get('/admin/users', [AdminUsersController, 'index'])
    router.get('/admin/users/create', [AdminUsersController, 'create'])
    router.post('/admin/users', [AdminUsersController, 'store'])
    router.get('/admin/users/:id/edit', [AdminUsersController, 'edit'])
    router.put('/admin/users/:id', [AdminUsersController, 'update'])
    router.delete('/admin/users/:id', [AdminUsersController, 'destroy'])

    router.get('/admin/books', [BooksController, 'adminIndex'])
    router.get('/admin/books/create', [BooksController, 'create'])
    router.post('/admin/books', [BooksController, 'store'])
    router.get('/admin/books/:id/edit', [BooksController, 'edit'])
    router.put('/admin/books/:id', [BooksController, 'update'])
    router.delete('/admin/books/:id', [BooksController, 'destroy'])
  })
  .use([middleware.auth(), middleware.admin()])
