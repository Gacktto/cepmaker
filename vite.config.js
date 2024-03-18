import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cepmaker/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // Configurando o fallback para index.html
    // Isso é necessário para permitir que o Vue Router gerencie as rotas em modo hash
    // em vez de enviar um 404 quando a URL é atualizada manualmente.
    fs: {
      strict: false
    }
  },
  assetsInclude: ['**/*.csv']
})
