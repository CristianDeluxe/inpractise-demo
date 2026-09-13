import { readFileSync } from 'node:fs'
import postgres from 'postgres'
import type { Target } from './Target.ts'

export function createDatabase(target: Target) {
  const url = new URL(readFileSync('supabase/.temp/pooler-url', 'utf8').trim())
  if (
    !url.username.includes(target.projectRef) ||
    !url.hostname.endsWith('.pooler.supabase.com')
  )
    throw new Error('Linked database target mismatch')
  return postgres({
    host: url.hostname,
    port: Number(url.port || 5432),
    database: 'postgres',
    username: decodeURIComponent(url.username),
    password: target.dbPassword,
    ssl: 'require',
    max: 2,
    connect_timeout: 15,
    idle_timeout: 5,
    onnotice: () => {},
  })
}
