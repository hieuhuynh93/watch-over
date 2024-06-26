import User from '#src/users/models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class RegisterController {
  static validator = vine.compile(
    vine.object({
      email: vine
        .string()
        .email()
        .normalizeEmail()
        .unique(async (db, value) => {
          const user = await db.from('users').where('email', value).first()
          return !user
        }),
      password: vine.string().minLength(8),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(RegisterController.validator)

    // Find user
    const user = await User.create(data)
    await auth.use('user').login(user)

    return response.redirect().toRoute('dashboard.home')
  }
}
