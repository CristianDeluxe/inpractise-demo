import { createServer } from 'node:http'

import { createApiListener } from './server/build/api.mjs'
import { originListener } from './server/originListener.mjs'

createServer(originListener(createApiListener())).listen(
  process.env.PORT ?? 3000,
)
