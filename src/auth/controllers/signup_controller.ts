import User from '#src/users/models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class LoginController {
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
    const { email, password } = await request.validateUsing(LoginController.validator)

    // Find user
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.index')
  }
}
