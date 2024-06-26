import type { HttpContext } from '@adonisjs/core/http'

import User from '#src/users/models/user'
import { RolesText } from '#src/users/enums/roles'

export default class UsersController {
  async manage({ view }: HttpContext) {
    const users = await User.query().orderBy('email')
    const roles = await RolesText.query().orderBy('name')

    return view.render('users/manage', { users, roles })
  }
}
