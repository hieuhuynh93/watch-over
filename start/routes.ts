/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const HomeController = () => import('#app/controllers/home_controller')
const LoginController = () => import('#src/auth/controllers/login_controller')
// const PostsController = () => import('#app/controllers/posts_controller')

router.get('/', [HomeController, 'index'])
// router.get('/posts', [PostsController, 'index'])
router.get('/login', [LoginController, 'render']).as('auth.login')
router.post('/login', [LoginController, 'execute'])

router
  .group(() => {})
  .prefix('admin')
  .as('admin')

router
  .group(() => {})
  .prefix('dashboard')
  .as('dashboard')

router.get('/google/redirect', ({ ally }) => {
  // Google driver instance
  ally
    .use('google')
    .redirect
    //   (request) => {
    //   request.scopes(['userinfo.profile', 'userinfo.email'])
    // }
    ()
})

router.get('/google/callback', async ({ ally }) => {
  const google = ally.use('google')

  /**
   * User has denied access by canceling
   * the login flow
   */
  if (google.accessDenied()) {
    return 'You have cancelled the login process'
  }

  /**
   * OAuth state verification failed. This happens when the
   * CSRF cookie gets expired.
   */
  if (google.stateMisMatch()) {
    return 'We are unable to verify the request. Please try again'
  }

  /**
   * GitHub responded with some error
   */
  if (google.hasError()) {
    return google.getError()
  }

  /**
   * Access user info
   */
  const user = await google.user()

  // console.log('user', user)

  // user.id
  // user.email
  // user.emailVerificationState
  // user.name
  // user.nickName
  // user.avatarUrl
  // user.token
  // user.original

  // user.token.token
  // user.token.type
  // user.token.refreshToken
  // user.token.expiresAt
  // user.token.expiresIn

  return user
})
