import { beaconLimit } from './beaconLimit.mjs'
import { beaconRecord } from './beaconRecord.mjs'

/**
 * First-party page analytics: the browser posts a small JSON body on every
 * page view and when the page is left; one line per event goes to the
 * process log, read later on the host. No cookies, nothing sent elsewhere.
 */
export function beaconListener(request, response) {
  let body = ''
  request.setEncoding('utf8')
  request.on('data', (chunk) => {
    body += chunk
    if (body.length > beaconLimit) request.destroy()
  })
  request.on('end', () => {
    const record = beaconRecord(body, request)
    if (record !== null)
      process.stdout.write(`beacon ${JSON.stringify(record)}\n`)
    response.writeHead(204, { 'cache-control': 'no-store' })
    response.end()
  })
}
