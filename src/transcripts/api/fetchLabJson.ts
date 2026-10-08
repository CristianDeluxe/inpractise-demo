import { LabApiUnavailableError } from './LabApiUnavailableError'

/**
 * A static host answers unknown paths with the SPA shell, so anything that is
 * not JSON means the dev API is absent rather than broken.
 */
export async function fetchLabJson(
  path: string,
  init?: RequestInit,
): Promise<unknown> {
  let response: Response
  try {
    response = await fetch(`/local-api${path}`, init)
  } catch {
    throw new LabApiUnavailableError()
  }
  const type = response.headers.get('content-type') ?? ''
  if (!type.includes('application/json')) throw new LabApiUnavailableError()
  if (!response.ok)
    throw new Error(`The lab API answered ${String(response.status)}.`)
  return response.json() as Promise<unknown>
}
