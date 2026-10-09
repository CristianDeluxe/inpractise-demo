import { loginSearchSchema } from '@/routes/loginSearchSchema'

/** The validated return path in a login URL's query string, if any. */
export function nextPathFrom(searchStr: string) {
  const next = new URLSearchParams(searchStr).get('next') ?? undefined
  return loginSearchSchema.parse({ next }).next
}
