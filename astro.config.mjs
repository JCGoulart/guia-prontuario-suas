import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://sedsodh.github.io',
  base: '/manual-prontuario-eletronico/',
  integrations: [
    react(),
  ],
  output: 'static',
  build: {
    assets: '_astro',
  },
  vite: {
    resolve: {
      alias: { '@': '/src' },
    },
    optimizeDeps: {
      include: ['react-dom/client'],
    },
  },
})
