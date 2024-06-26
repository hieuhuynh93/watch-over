import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ inertia, auth }: HttpContext) {
    const isAuth = await auth.check()
    return inertia.render('home', { isAuth, user: auth.user })
  }
}
