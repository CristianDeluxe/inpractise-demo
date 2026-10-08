import type { Plugin } from 'vite'
import { respondToLabRequest } from './respondToLabRequest.ts'

/** Dev-server-only access to work/transcripts; never part of a build. */
export function labApiPlugin(): Plugin {
  return {
    name: 'lab-transcripts-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((request, response, continueChain) => {
        void respondToLabRequest(request, response, continueChain)
      })
    },
  }
}
