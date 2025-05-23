import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  publicDir: 'public',
  server: {
    // Configuração para redirecionar todas as rotas para index.html (SPA)
    historyApiFallback: {
      disableDotRule: true,
      index: '/',
    },
    port: 3000,
    open: true,
  },
  // Configuração para produção
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})
