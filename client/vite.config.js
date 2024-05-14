import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': "https://file-manager-backend-vert.vercel.app",
    },
  },
  plugins: [react()],
  enableJsx: true,
})
