import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'resources/app/ssr.tsx' } }),
    react(),
    svgr(),
    adonisjs({
      entrypoints: ['resources/app/app.tsx'],
      reload: ['resources/views/**/*.edge', 'resources/lang/**/*.json'],
    }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/src/`,
      '#resources/': `${getDirname(import.meta.url)}/resources/`,
    },
  },
})
