/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import i18nManager from '@adonisjs/i18n/services/main'

import { middleware } from '#start/kernel'

const HomeController = () => import('#app/controllers/home_controller')

const AuthController = () => import('#src/auth/controllers/auth_controller')
const LoginController = () => import('#src/auth/controllers/login_controller')
const LogoutController = () => import('#src/auth/controllers/logout_controller')
const RegisterController = () => import('#src/auth/controllers/register_controller')

const DashboardController = () => import('#src/dashboard/controllers/dashboard_controller')
// const PostsController = () => import('#app/controllers/posts_controller')

router.get('/', [HomeController, 'index']).as('home')
// router.get('/posts', [PostsController, 'index'])

router.get('/login', [LoginController, 'render']).as('auth.login')
router.post('/login', [LoginController, 'execute'])
router.get('/signup', [RegisterController, 'render']).as('auth.signup')
router.post('/signup', [RegisterController, 'execute'])
router.get('/logout', [LogoutController]).as('auth.logout')

router
  .group(() => {
    router.get('/redirect', [AuthController, 'redirect']).as('google.redirect')
    router.get('/callback', [AuthController, 'callback']).as('google.callback')
  })
  .prefix('google')

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

router
  .post('language/:locale', async ({ session, response, params }) => {
    /**
     * Only update locale when it is part of the supportedLocales
     */
    if (i18nManager.supportedLocales().includes(params.locale)) {
      session.put('locale', params.locale)
    }

    response.redirect().back()
  })
  .as('language.update')
