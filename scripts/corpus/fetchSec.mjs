import { setTimeout } from 'node:timers/promises'
import { assertSecUrl } from './assertSecUrl.mjs'
import { processSecResponse } from './processSecResponse.mjs'
import { recordSecFailure } from './recordSecFailure.mjs'
import { requestSecResponse } from './requestSecResponse.mjs'
import { writeJson } from './writeJson.mjs'

export async function fetchSec(root, url, state) {
  let target = assertSecUrl(url)
  for (let attempt = 1; attempt <= 3; attempt++) {
    if (state.blocked || Date.now() >= state.deadline)
      throw new Error(state.blocked ? 'SEC_BLOCKED' : 'SEC_DEADLINE')
    await setTimeout(Math.max(0, state.nextRequestAt - Date.now()))
    state.nextRequestAt = Date.now() + 600
    const record = {
      url: target,
      requestedAt: new Date().toISOString(),
      attempt,
      status: null,
    }
    state.requests.push(record)
    try {
      const response = await requestSecResponse(target, state)
      const outcome = await processSecResponse(root, response, {
        target,
        state,
        record,
        attempt,
      })
      if (outcome.redirect) {
        target = outcome.redirect
        continue
      }
      if (outcome.retry) continue
      return outcome.result
    } catch (error) {
      recordSecFailure(error, record, state, attempt)
    } finally {
      await writeJson(`${root}/corpus/acquisition.json`, {
        startedAt: state.startedAt,
        requests: state.requests,
        documents: state.documents,
      })
    }
  }
  throw new Error('SEC_ATTEMPTS_EXHAUSTED')
}
