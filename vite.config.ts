import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { labApiPlugin } from './server/lab/labApiPlugin.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), labApiPlugin()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'supabase', test: /node_modules[\\/]@supabase[\\/]/ },
          ],
        },
      },
    },
  },
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
})
