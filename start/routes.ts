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
