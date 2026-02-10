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

// Admin - accessible uniquement aux admins
router
  .group(() => {
    router.get('/admin/users', [AdminUsersController, 'index'])
    router.get('/admin/users/create', [AdminUsersController, 'create'])
    router.post('/admin/users', [AdminUsersController, 'store'])
    router.get('/admin/users/:id/edit', [AdminUsersController, 'edit'])
    router.put('/admin/users/:id', [AdminUsersController, 'update'])
    router.delete('/admin/users/:id', [AdminUsersController, 'destroy'])
  })
  .use([middleware.auth(), middleware.admin()])
