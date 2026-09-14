import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'

import { createApiListener } from './server/build/api.mjs'
import { loadOriginEnv } from './server/loadOriginEnv.mjs'
import { originListener } from './server/originListener.mjs'

loadOriginEnv(fileURLToPath(new URL('.env', import.meta.url)))

createServer(originListener(createApiListener())).listen(
  process.env.PORT ?? 3000,
)
