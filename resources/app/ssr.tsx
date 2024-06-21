import ReactDOMServer from 'react-dom/server'

import i18nConfig from 'i18next'
import { initReactI18next } from 'react-i18next'
import { createInertiaApp } from '@inertiajs/react'

interface OptionsInterface {
  fallbackLocale?: string
  locale?: string
  localeTranslations: object
  fallbackTranslations: object
}

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,

    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      return pages[`../pages/${name}.tsx`]
    },

    setup: ({ App, props }) => {
      // @ts-expect-error
      const { i18n, locale = 'en' }: { i18n: OptionsInterface; locale?: string } =
        props.initialPage.props

      i18nConfig.use(initReactI18next).init({
        resources: {
          [locale]: {
            translation: i18n?.localeTranslations,
          },
          [i18n?.fallbackLocale || 'en']: {
            translation: i18n?.fallbackTranslations,
          },
        },
        lng: locale,
        interpolation: {
          escapeValue: false,
        },
      })

      return <App {...props} />
    },
  })
}
