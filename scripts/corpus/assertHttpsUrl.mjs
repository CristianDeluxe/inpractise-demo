/**
 * Guards the non-SEC intake the same way assertSecUrl.mjs guards EDGAR
 * requests: https only, no embedded credentials, port, query or fragment.
 * Unlike the SEC guard this intake has no fixed host allowlist across
 * companies, so the acquisition script pins the exact selector URL instead.
 */
export function assertHttpsUrl(value) {
  const url = new URL(value)
  if (
    url.protocol !== 'https:' ||
    [url.username, url.password, url.port].some(Boolean)
  )
    throw new Error('ANNUAL_REPORT_URL_REJECTED')
  return url.href
}
