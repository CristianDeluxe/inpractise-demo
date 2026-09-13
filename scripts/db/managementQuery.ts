import type { Target } from './Target.ts'

export async function managementQuery(
  target: Target,
  query: string,
): Promise<Record<string, unknown>[]> {
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${target.projectRef}/database/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${target.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(30000),
    },
  )
  if (!response.ok)
    throw new Error(
      `Database management request failed: HTTP ${String(response.status)}`,
    )
  return (await response.json()) as Record<string, unknown>[]
}
