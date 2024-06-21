import { createRoot } from 'react-dom/client'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

import '../css/globals.css'
import { ReactI18nProvider } from '#packages/inertia-i18n/src/index'

const appName = import.meta.env.VITE_APP_NAME || 'Watch Over'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    // @ts-expect-error
    const { i18n, locale = 'en' }: { i18n: OptionsInterface; locale?: string } =
      props.initialPage.props

    const root = createRoot(el)

    root.render(
      <ReactI18nProvider
        locale={locale}
        fallbackLocale={i18n?.fallbackLocale}
        files={import.meta.glob('../resources/lang/**/*.json')}
      >
        <App {...props} />
      </ReactI18nProvider>
    )
  },
})
