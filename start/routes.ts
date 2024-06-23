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

const DashboardController = () => import('#src/dashboard/controllers/dashboard_controller')
// const PostsController = () => import('#app/controllers/posts_controller')

router.get('/', [HomeController, 'index']).as('home')
// router.get('/posts', [PostsController, 'index'])

router
  .group(() => {
    router.get('/login', [LoginController, 'render']).as('login')
    router.post('/login', [LoginController, 'execute']).as('login.post')
    router.get('/signup', [RegisterController, 'render']).as('signup')
    router.post('/signup', [RegisterController, 'store']).as('signup.store')
    router.get('/logout', [LogoutController]).as('logout')
  })
  .as('auth')

router
  .group(() => {
    router.get('/redirect', [AuthController, 'redirect']).as('google.redirect')
    router.get('/callback', [AuthController, 'callback']).as('google.callback')
  })
  .prefix('google')

router
  .group(() => {
    router.get('/', [DashboardController, 'index']).as('home')
  })
  // .use(middleware.auth({ guards: ['user'] }))
  .prefix('dashboard')
  .as('dashboard')

router
  .group(() => {})
  .use(middleware.auth({ guards: ['user'] }))
  .prefix('admin')
  .as('admin')

router.post('language/:locale', [LanguageController, 'switchLocale']).as('language.update')
