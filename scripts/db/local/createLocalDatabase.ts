import postgres from 'postgres'
import { localDatabaseUrl } from './localDatabaseUrl.ts'

/**
 * Refuses anything but a loopback address. The local suite creates roles and
 * runs migrations, so pointing it at a shared or remote host by changing one
 * environment variable must not be possible.
 */
export function createLocalDatabase() {
  const url = new URL(localDatabaseUrl())
  if (!['127.0.0.1', 'localhost', '::1'].includes(url.hostname))
    throw new Error('The local authorization suite only runs against loopback')
  return postgres({
    host: url.hostname,
    port: Number(url.port || 5432),
    database: url.pathname.slice(1) || 'postgres',
    username: decodeURIComponent(url.username) || 'postgres',
    password: decodeURIComponent(url.password) || 'postgres',
    ssl: false,
    max: 4,
    connect_timeout: 10,
    idle_timeout: 5,
    onnotice: () => {},
  })
}
