import { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  execute({}: HttpContext) {}
}
