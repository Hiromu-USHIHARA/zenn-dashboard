import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/zenn-feed': {
        target: 'https://zenn.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/zenn-feed/, '/hiromu_ushihara/feed'),
      },
      '/zenn-api': {
        target: 'https://zenn.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/zenn-api/, '/api'),
      },
    },
  },
})
