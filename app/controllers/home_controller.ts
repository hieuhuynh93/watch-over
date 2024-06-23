import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ inertia, auth }: HttpContext) {
    const isAuth = await auth.check()
    console.log('isAuth', isAuth)
    return inertia.render('home', { user: auth.user })
  }
}
