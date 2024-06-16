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
    alert: (ctx) => ctx.session?.flashMessages.get('alert'),
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    i18n: (ctx) => ctx.i18n,
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'resources/app/ssr.tsx',
  },
})
