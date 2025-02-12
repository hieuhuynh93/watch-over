/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const HomeController = () => import('#app/controllers/home_controller')
const LanguageController = () => import('#src/core/controllers/language_controller')

const AuthController = () => import('#src/auth/controllers/auth_controller')
const LoginController = () => import('#src/auth/controllers/login_controller')
const LogoutController = () => import('#src/auth/controllers/logout_controller')
const RegisterController = () => import('#src/auth/controllers/register_controller')

const AdminController = () => import('#src/admin/controllers/admin_controller')
const AdminLoginController = () => import('#src/admin/controllers/login_controller')
const AdminLogoutController = () => import('#src/admin/controllers/logout_controller')

const DashboardController = () => import('#src/dashboard/controllers/dashboard_controller')
// const PostsController = () => import('#app/controllers/posts_controller')

router.get('/', [HomeController, 'index']).as('home')
// router.get('/posts', [PostsController, 'index'])

router
  .group(() => {
    router.get('/login', [LoginController, 'render']).as('login')
    router.post('/login', [LoginController, 'execute']).as('login.post')

    router.get('/login/admin', [AdminLoginController, 'render']).as('login.admin')
    router.post('/login/admin', [AdminLoginController, 'execute']).as('login.admin.post')

    router.get('/signup', [RegisterController, 'render']).as('signup')
    router.post('/signup', [RegisterController, 'store']).as('signup.store')
  })
  .as('auth')
  .use(middleware.guest({ guards: ['user', 'admin'] }))

router.get('/logout', [LogoutController]).as('auth.logout')
router.get('/logout/admin', [AdminLogoutController]).as('auth.admin.logout')

router
  .group(() => {
    router.get('/redirect', [AuthController, 'redirect']).as('redirect')
    router.get('/callback', [AuthController, 'callback']).as('callback')
  })
  .prefix('google')
  .as('google')
  .use(middleware.guest({ guards: ['user', 'admin'] }))

router
  .group(() => {
    router.get('/', [DashboardController, 'render']).as('home')
  })
  .prefix('dashboard')
  .as('dashboard')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [AdminController, 'render']).as('home')
  })
  .prefix('admin')
  .as('admin')
  .use(middleware.admin())

router.post('language/:locale', [LanguageController, 'switchLocale']).as('language.update')
