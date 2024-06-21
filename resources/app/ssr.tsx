import ReactDOMServer from 'react-dom/server'

import { createInertiaApp } from '@inertiajs/react'
import ReactI18nProvider from '#packages/inertia-i18n/src/provider'

interface OptionsInterface {
  fallbackLocale?: string
  locale?: string
  files: Record<string, unknown> | Record<string, () => Promise<unknown>>
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

      return (
        <ReactI18nProvider
          locale={locale}
          fallbackLocale={i18n?.fallbackLocale}
          files={import.meta.glob('../resources/lang/**/*.json', { eager: true })}
        >
          <App {...props} />
        </ReactI18nProvider>
      )
    },
  })
}
