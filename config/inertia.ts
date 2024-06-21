import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'app_root',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    alert: ({ session }) => session?.flashMessages.get('alert'),
    errors: ({ session }) => session?.flashMessages.get('errors'),
    i18n: ({ i18n }) => i18n,
    locale: ({ session }) => session?.get('locale'),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'resources/app/ssr.tsx',
  },
})
