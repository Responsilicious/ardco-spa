import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ardco-spa/',   // ← match your GitHub repo name exactly
  plugins: [react()],
})