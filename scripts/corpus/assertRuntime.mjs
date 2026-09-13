import { realpath } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export async function assertRuntime() {
  if (process.versions.node.split('.')[0] !== '24')
    throw new Error('NODE_24_REQUIRED')
  const root = await realpath(fileURLToPath(new URL('../../', import.meta.url)))
  if (
    root !== '/Users/cristiandeluxe/p/inpractise-demo' ||
    (await realpath(process.cwd())) !== root
  )
    throw new Error('DEMO_ROOT_REQUIRED')
  return root
}
