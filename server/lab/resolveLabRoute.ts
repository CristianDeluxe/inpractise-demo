import type { LabRoute } from './LabRoute.ts'
import { resolveTranscriptRoute } from './resolveTranscriptRoute.ts'

/** Null when the path is not a lab API path, so Vite can keep going. */
export function resolveLabRoute(method: string, path: string): LabRoute | null {
  if (path === '/local-api/transcripts') {
    return method === 'GET' ? { kind: 'list' } : { kind: 'method-not-allowed' }
  }
  if (path === '/local-api/memory') {
    return method === 'GET'
      ? { kind: 'memory' }
      : { kind: 'method-not-allowed' }
  }
  return resolveTranscriptRoute(method, path)
}
