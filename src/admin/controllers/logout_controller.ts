import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({ auth, response }: HttpContext) {
    await auth.use('admin').logout()

    return response.redirect().toRoute('auth.login')
  }
}
