// Vite fingerprints everything under assets/, so only those files are safe to
// cache indefinitely; the entry document must always be revalidated.
export function cacheControl(path) {
  return path.includes('/assets/')
    ? 'public, max-age=31536000, immutable'
    : 'no-cache'
}
