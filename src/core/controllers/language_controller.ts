import { HttpContext } from '@adonisjs/core/http'
import i18nManager from '@adonisjs/i18n/services/main'

export default class LanguageController {
  async switchLocale({ i18n, request, response, session }: HttpContext) {
    const locale = request.param('locale')

    /**
     * Only update locale when it is part of the supportedLocales
     */
    if (i18nManager.supportedLocales().includes(locale)) {
      console.log('locale switch to:', locale)

      session.put('locale', locale)
      i18n.switchLocale(locale)
    }

    response.redirect('/login')
  }
}
