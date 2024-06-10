import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class HomeController {
  async index({ inertia }: HttpContext) {
    // const user = await User.create({
    //   fullName: 'rlanz',
    //   email: 'romain@adonisjs.com',
    // })

    // console.log('user', user)

    return inertia.render('home', { version: 6, user: { name: 'julien' } })
  }
}
