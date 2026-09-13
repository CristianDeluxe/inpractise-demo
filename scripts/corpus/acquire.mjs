import { access } from 'node:fs/promises'
import { assertRuntime } from './assertRuntime.mjs'
import { discoverFilings } from './discoverFilings.mjs'
import { fetchSec } from './fetchSec.mjs'
import { readJson } from './readJson.mjs'
import { writeJson } from './writeJson.mjs'

try {
  const root = await assertRuntime()
  try {
    await access(`${root}/corpus/acquisition.json`)
    throw new Error('ACQUISITION_ALREADY_FROZEN')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  const sources = await readJson(`${root}/corpus/sources.json`)
  const state = {
    userAgent: sources.userAgent,
    startedAt: new Date().toISOString(),
    deadline: Date.now() + 900000,
    nextRequestAt: 0,
    blocked: false,
    requests: [],
    documents: [],
  }
  const cache = new Map()
  for (const selector of sources.selectors) {
    const document = { ...selector, status: 'failed' }
    state.documents.push(document)
    try {
      Object.assign(
        document,
        await discoverFilings(root, selector, state, cache),
      )
      const result = await fetchSec(root, document.sourceUrl, state)
      Object.assign(document, {
        status: 'acquired_pending_review',
        rawPath: result.record.path,
        rawSha256: result.record.sha256,
        retrievedAt: result.record.retrievedAt,
      })
    } catch (error) {
      document.error = /^SEC_|^RESPONSE_/.test(error.message)
        ? error.message
        : 'ACQUISITION_FAILED'
      process.exitCode = 1
    }
    await writeJson(`${root}/corpus/acquisition.json`, {
      startedAt: state.startedAt,
      completedAt: new Date().toISOString(),
      requests: state.requests,
      documents: state.documents,
    })
    console.log(
      `${document.documentId}: ${document.status}${document.error ? ` (${document.error})` : ''}`,
    )
  }
} catch {
  console.error('ACQUISITION_FAILED_OR_ALREADY_FROZEN')
  process.exitCode = 1
}
