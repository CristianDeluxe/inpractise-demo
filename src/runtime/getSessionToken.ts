import type { BrowserRuntime } from './BrowserRuntime'

export async function getSessionToken(auth: BrowserRuntime['auth']) {
  const { data, error } = await auth.getSession()
  if (error) throw error
  return data.session?.access_token ?? null
}
