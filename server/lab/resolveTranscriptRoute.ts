import { allowedMethodFor } from './allowedMethodFor.ts'
import { isTranscriptId } from './isTranscriptId.ts'
import type { LabRoute } from './LabRoute.ts'
import { transcriptRoutePattern } from './transcriptRoutePattern.ts'

export function resolveTranscriptRoute(
  method: string,
  path: string,
): LabRoute | null {
  const match = transcriptRoutePattern.exec(path)
  if (match === null) return null
  const id = match[1] ?? ''
  if (!isTranscriptId(id)) return { kind: 'invalid-id' }
  const suffix = match[2]
  const kind =
    suffix === '/audio' ? 'audio' : suffix === '/review' ? 'review' : 'bundle'
  return allowedMethodFor[kind] === method
    ? { kind, id }
    : { kind: 'method-not-allowed' }
}
