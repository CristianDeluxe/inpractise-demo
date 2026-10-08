/**
 * Review saves must survive the tab closing, so a small write to lab_reviews
 * is sent with keepalive. The browser caps a keepalive body at 64 KiB, so a
 * larger body goes out as an ordinary request.
 */
export async function fetchKeepingReviewsAlive(
  input: Parameters<typeof fetch>[0],
  init?: RequestInit,
) {
  const url = input instanceof Request ? input.url : String(input)
  const small = typeof init?.body === 'string' && init.body.length < 60_000
  const isReviewWrite =
    init?.method === 'POST' && url.includes('/rest/v1/lab_reviews')
  return fetch(
    input,
    small && isReviewWrite ? { ...init, keepalive: true } : init,
  )
}
