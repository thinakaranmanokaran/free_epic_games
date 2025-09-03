import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/free_epic_games/',   // 👈 Add this line
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://store-site-backend-static.ak.epicgames.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
