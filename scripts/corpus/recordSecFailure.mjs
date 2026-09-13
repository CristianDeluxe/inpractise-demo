export function recordSecFailure(error, record, state, attempt) {
  record.error = /^SEC_|^RESPONSE_/.test(error.message)
    ? error.message
    : 'SEC_NETWORK_ERROR'
  if (state.blocked || /^SEC_|^RESPONSE_/.test(error.message) || attempt === 3)
    throw new Error(record.error, { cause: error })
}
