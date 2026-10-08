import type { LabResource } from './LabResource'

export function classifyLabError(error: unknown): LabResource<never> {
  return {
    status: 'error',
    message: error instanceof Error ? error.message : 'Loading failed.',
  }
}
