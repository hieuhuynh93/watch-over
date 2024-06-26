import Admin from '#src/admin/models/admin'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class AdminLoginController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(8),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('auth/admin')
  }

  async execute({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(AdminLoginController.validator)

    // Find admin
    const admin = await Admin.verifyCredentials(email, password)
    await auth.use('admin').login(admin)

    return response.redirect().toRoute('admin.home')
  }
}
