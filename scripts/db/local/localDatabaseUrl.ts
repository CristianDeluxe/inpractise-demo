/**
 * The local authorization suite never reads `.env.remote`, and the remote
 * scripts never read this. The port is deliberately not Supabase's default
 * 54322, so a local stack belonging to another project on this machine is
 * neither used nor disturbed.
 */
export function localDatabaseUrl() {
  return (
    process.env['LOCAL_DATABASE_URL'] ??
    'postgresql://postgres:postgres@127.0.0.1:54399/postgres'
  )
}
