import { createReadStream } from 'node:fs'

import { cacheControl } from './cacheControl.mjs'
import { contentType } from './contentType.mjs'
import { resolveAsset } from './resolveAsset.mjs'

export function requestListener(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { allow: 'GET, HEAD' })
    response.end()
    return
  }

  const asset = resolveAsset(request.url ?? '/')

  response.writeHead(200, {
    'cache-control': cacheControl(asset.path),
    'content-type': contentType(asset.extension),
    'x-robots-tag': 'noindex, nofollow',
  })

  if (request.method === 'HEAD') {
    response.end()
    return
  }

  // resolveAsset only returns paths inside the built output.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  createReadStream(asset.path).pipe(response)
}
