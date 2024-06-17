import { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  index({ inertia }: HttpContext) {
    return inertia.render('dashboard/home')
  }
}
