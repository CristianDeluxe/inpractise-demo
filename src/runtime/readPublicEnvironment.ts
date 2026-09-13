export function readPublicEnvironment() {
  const url: unknown = import.meta.env['VITE_SUPABASE_URL']
  const key: unknown = import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY']
  return { url, key }
}
