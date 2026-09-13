export function assertSecUrl(value) {
  const url = new URL(value)
  if (
    url.protocol !== 'https:' ||
    [url.username, url.password, url.port, url.search, url.hash].some(Boolean)
  )
    throw new Error('SEC_URL_REJECTED')
  if (
    url.hostname === 'data.sec.gov' &&
    /^\/submissions\/CIK\d{10}(?:-submissions-\d{3})?\.json$/.test(url.pathname)
  )
    return url.href
  if (
    url.hostname === 'www.sec.gov' &&
    /^\/Archives\/edgar\/data\/\d+\/\d{18}\/[\w.-]+\.html?$/.test(url.pathname)
  )
    return url.href
  throw new Error('SEC_URL_REJECTED')
}
