import { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  render({ inertia }: HttpContext) {
    return inertia.render('admin/home')
  }
}
