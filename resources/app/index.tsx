import { createRoot } from 'react-dom/client'

import i18nConfig from 'i18next'
import { initReactI18next } from 'react-i18next'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

import '../css/globals.css'

const appName = import.meta.env.VITE_APP_NAME || 'Watch Over'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    const root = createRoot(el)

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

    root.render(<App {...props} />)
  },
})

// import { createRoot } from 'react-dom/client'

// import { I18nextProvider } from 'react-i18next'
// import { createInertiaApp } from '@inertiajs/react'
// import { resolvePageComponent } from '@adonisjs/inertia/helpers'

// import '../css/globals.css'

// const appName = import.meta.env.VITE_APP_NAME || 'Watch Over'

// createInertiaApp({
//   progress: { color: '#5468FF' },

//   title: (title) => `${title} - ${appName}`,

//   resolve: (name) => {
//     return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
//   },

//   setup({ el, App, props }) {
//     // @ts-expect-error
//     const { i18n, locale = 'en' }: { i18n: OptionsInterface; locale?: string } =
//       props.initialPage.props

//     const root = createRoot(el)

//     root.render(
//       <I18nextProvider
//         resources={{
//           [locale]: i18n?.localeTranslations,
//           en: i18n?.fallbackLocale,
//         }}
//         lng={locale}
//         interpolation={{
//           escapeValue: false, // react already safes from xss
//         }}
//       >
//         <App {...props} />
//       </I18nextProvider>
//     )
//   },
// })
