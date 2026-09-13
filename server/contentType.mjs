import { mediaTypes } from './mediaTypes.mjs'

export function contentType(extension) {
  return mediaTypes.get(extension) ?? 'application/octet-stream'
}
