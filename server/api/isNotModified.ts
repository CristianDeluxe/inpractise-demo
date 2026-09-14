export function isNotModified(header: string | null, etag: string): boolean {
  return (
    header?.split(',').some((value) => {
      const tag = value.trim()
      return tag === '*' || tag === etag || tag === `W/${etag}`
    }) ?? false
  )
}
