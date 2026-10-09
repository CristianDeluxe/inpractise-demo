import { beaconKinds } from './beaconKinds.mjs'

/** One validated analytics event, or null when the body is not one. */
export function beaconRecord(body, request) {
  let event
  try {
    event = JSON.parse(body)
  } catch {
    return null
  }
  if (event === null || typeof event !== 'object') return null
  const { kind, path, ms, tab } = event
  if (
    !beaconKinds.has(kind) ||
    typeof path !== 'string' ||
    !path.startsWith('/')
  )
    return null
  const forwarded = String(request.headers['x-forwarded-for'] ?? '')
  return {
    at: new Date().toISOString(),
    kind,
    path: path.slice(0, 300),
    ms: Number.isFinite(ms) ? Math.round(ms) : null,
    tab: typeof tab === 'string' ? tab.slice(0, 40) : null,
    ip: forwarded.split(',')[0].trim() || request.socket.remoteAddress,
    ua: String(request.headers['user-agent'] ?? '').slice(0, 200),
  }
}
