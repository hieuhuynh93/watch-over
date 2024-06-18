import User from '#src/users/models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class RegisterController {
  static validator = vine.compile(
    vine.object({
      email: vine
        .string()
        .email()
        .unique(async (db, value) => {
          const user = await db.from('users').where('email', value).first()
          return !user
        }),
      password: vine.string().minLength(8).confirmed(),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async execute({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(RegisterController.validator)

    // Find user
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.index')
  }
}
