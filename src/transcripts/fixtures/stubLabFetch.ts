import { stubFetchWith } from './stubFetchWith'

/** Answers every /local-api call with `body`; returns the spy so tests can inspect PUTs. */
export function stubLabFetch(body: unknown) {
  return stubFetchWith(
    () =>
      new Response(JSON.stringify(body), {
        headers: { 'content-type': 'application/json' },
      }),
  )
}
