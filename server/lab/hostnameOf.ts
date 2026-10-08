/** The Host header without its port; IPv6 literals keep their brackets. */
export function hostnameOf(host: string | undefined): string {
  if (host === undefined) return ''
  if (host.startsWith('[')) return host.slice(0, host.indexOf(']') + 1)
  return host.split(':')[0] ?? ''
}
