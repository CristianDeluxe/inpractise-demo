import { ApiError } from './ApiError.ts'

/** One frame's event name and decoded payload, or null when it carries neither. */
export function parseEventFrame(frame: string) {
  const event = /^event: (.+)$/m.exec(frame)?.[1]
  const data = /^data: (.+)$/m.exec(frame)?.[1]
  if (!event || data === undefined) return null
  try {
    return { event, data: JSON.parse(data) as unknown }
  } catch {
    throw new ApiError('protocol', 'A stream frame was not valid JSON.')
  }
}
