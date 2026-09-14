export function createExpiredToken(expiresAtSeconds: number): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/u, '')
  const payload = btoa(
    JSON.stringify({
      iss: 'https://example.supabase.co/auth/v1',
      sub: '00000000-0000-4000-8000-000000000000',
      aud: 'authenticated',
      role: 'authenticated',
      exp: expiresAtSeconds,
    }),
  )
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/u, '')
  return `${header}.${payload}.constructed-test-signature`
}
