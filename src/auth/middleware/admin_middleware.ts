import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
// import { Exception } from '@adonisjs/core/exceptions'

export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle({ auth, response }: HttpContext, next: NextFn) {
    const isAdmin = await auth.use('admin').check()

    if (!isAdmin) {
      // throw new Exception('You are not authorized to access this page', {
      //   status: 403,
      //   code: 'E_UNAUTHORIZED_ACCESS',
      // })

      return response.redirect().toRoute('auth.login')
    }

    return next()
  }
}
