import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': "https://file-manager-backend-b1yk.onrender.com",
    },
  },
  plugins: [react()],
  enableJsx: true,
})
