/**
 * Converts a PDF info dictionary date ("D:20250303122556+01'00'") to ISO
 * 8601. Returns null for anything that does not match, rather than guessing.
 */
export function pdfDateToIso(value) {
  const match = /^D:(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/u.exec(
    value ?? '',
  )
  if (!match) return null
  const [, year, month, day, hour, minute, second] = match
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
}
