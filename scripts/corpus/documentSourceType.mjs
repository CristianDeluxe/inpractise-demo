export function documentSourceType(document) {
  if (document.origin === 'synthetic') return 'synthetic'
  return document.kind === 'public_interview'
    ? 'public_podcast'
    : 'public_filing'
}
