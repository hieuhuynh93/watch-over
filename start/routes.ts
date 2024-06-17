/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#src/auth/controllers/auth_controller')

const HomeController = () => import('#app/controllers/home_controller')
const LoginController = () => import('#src/auth/controllers/login_controller')
const LogoutController = () => import('#src/auth/controllers/logout_controller')

const DashboardController = () => import('#src/dashboard/controllers/dashboard_controller')
// const PostsController = () => import('#app/controllers/posts_controller')

router.get('/', [HomeController, 'index']).as('home')
// router.get('/posts', [PostsController, 'index'])

router.get('/login', [LoginController, 'render']).as('auth.login')
router.post('/login', [LoginController, 'execute'])
router.get('/logout', [LogoutController]).as('auth.logout')

router.get('/google/redirect', [AuthController, 'redirect']).as('google.redirect')
router.get('/google/callback', [AuthController, 'callback']).as('google.callback')

router
  .group(() => {
    router.get('/', [DashboardController, 'index']).as('index')
  })
  .use(middleware.auth({ guards: ['web'] }))
  .prefix('dashboard')

router
  .group(() => {})
  .use(middleware.auth({ guards: ['web', 'api'] }))
  .prefix('admin')
  .as('admin')
