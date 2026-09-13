import { existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

import { distRoot } from './distRoot.mjs'

// Any path that is not an existing file inside dist/ resolves to index.html so
// that a reloaded deep route still reaches the client router.
export function resolveAsset(requestUrl) {
  const { pathname } = new URL(requestUrl, 'http://localhost')
  const candidate = normalize(join(distRoot, decodeURIComponent(pathname)))
  const indexDocument = { path: `${distRoot}index.html`, extension: '.html' }

  if (!candidate.startsWith(distRoot)) {
    return indexDocument
  }

  // The path is already proven to resolve inside the built output above.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const isFile = existsSync(candidate) && statSync(candidate).isFile()

  return isFile
    ? { path: candidate, extension: extname(candidate) }
    : indexDocument
}
