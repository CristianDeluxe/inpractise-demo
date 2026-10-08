import { LabApiUnavailableError } from '../api/LabApiUnavailableError'
import type { LabResource } from './LabResource'

export function classifyLabError(error: unknown): LabResource<never> {
  if (error instanceof LabApiUnavailableError) return { status: 'unavailable' }
  return {
    status: 'error',
    message: error instanceof Error ? error.message : 'Loading failed.',
  }
}
