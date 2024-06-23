import User from '#src/users/models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class AuthController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(8),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async execute({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(AuthController.validator)

    // Find user
    const user = await User.verifyCredentials(email, password)
    await auth.use('user').login(user)

    return response.redirect().toRoute('dashboard.index')
  }

  redirect({ ally }: HttpContext) {
    // Google driver instance
    ally.use('google').redirect()
  }

  async callback({ ally, auth, i18n, response, session }: HttpContext) {
    const google = ally.use('google')

    /**
     * User has denied access by canceling
     * the login flow
     */
    if (google.accessDenied()) {
      session.flash('alert', i18n.t('auth.accessDenied'))
      return response.redirect().toRoute('auth.login')
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (google.stateMisMatch()) {
      session.flash('alert', i18n.t('auth.stateMisMatch'))
      return response.redirect().toRoute('auth.login')
    }

    /**
     * Google responded with some error
     */
    if (google.hasError()) {
      // session.flash('alert', google.getError())
      // return response.redirect().toRoute('auth.login')

      return google.getError()
    }

    /**
     * Access user info
     */
    const user = await google.user()

    console.log('user', user)

    /**
     * Step 2: Verify credentials
     */
    // const user = await User.verifyCredentials(email, password)

    /**
     * Step 3: Login user
     */
    // await auth.use('user').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    // response.redirect('/dashboard')

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
  }
}
