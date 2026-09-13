/** Stamped on every response so a reader can tell which build produced an answer. */
export const buildId = Deno.env.get('BUILD_ID') ?? 'dev'
