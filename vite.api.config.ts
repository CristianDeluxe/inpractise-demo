import { defineConfig } from 'vite'

export default defineConfig({
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
  build: {
    ssr: 'server/api/createApiListener.ts',
    outDir: 'server/build',
    emptyOutDir: true,
    rolldownOptions: { output: { entryFileNames: 'api.mjs' } },
  },
  ssr: { noExternal: true },
})
