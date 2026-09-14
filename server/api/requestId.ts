export function requestId(value: string | null): string {
  return value && /^[\w.-]{1,128}$/.test(value) ? value : crypto.randomUUID()
}
