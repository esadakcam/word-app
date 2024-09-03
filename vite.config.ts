import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/wordapp',
  plugins: [react()],
  server: {
    proxy: {
      '/wordapp/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
