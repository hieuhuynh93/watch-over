import User from '#src/users/models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class AuthController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(8).confirmed(),
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

    return response.redirect().toRoute('dashboard.home')
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
      session.flash('alert', i18n.t('auth.alerts.accessDenied'))
      return response.redirect().toRoute('auth.login')
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (google.stateMisMatch()) {
      session.flash('alert', i18n.t('auth.alerts.stateMisMatch'))
      return response.redirect().toRoute('auth.login')
    }

    /**
     * Google responded with some error
     */
    if (google.hasError()) {
      console.log('google error', google.getError())
      session.flash('alert', google.getError() || i18n.t('auth.alerts.accessDenied'))
      return response.redirect().toRoute('auth.login')
    }

    /**
     * Access user info
     */
    let user = new User()
    const userInfos = await google.user()

    console.log('userInfos', userInfos)

    try {
      /**
       * Step 2: Verify existing user
       */
      user = await User.findByOrFail('email', userInfos.email)
    } catch {
      /**
       * Step 2: Create user
       */
      user = await User.create({
        email: userInfos.email,
        preferredLocale: session.get('locale'),
        isEmailVerified: true,
      })

      /**
       * Step 3: Create profile
       */
      await user.related('profile').create({
        firstName: userInfos.name,
        pseudo: userInfos.nickName,
        avatar: userInfos.avatarUrl,
      })

      /**
       * Step 4: Send welcome email
       */
      // await Mail.send((message) => {
      //   message
      //     .from('
    }

    /**
     * Step 3: Login user
     */
    await auth.use('user').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect('/dashboard')

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
