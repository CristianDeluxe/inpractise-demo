export function isoUploadDate(value: string): string {
  const match = /^(\d{4})(\d{2})(\d{2})$/u.exec(value)
  return match === null
    ? value
    : `${match[1] ?? ''}-${match[2] ?? ''}-${match[3] ?? ''}`
}
