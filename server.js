import { createServer } from 'node:http'

import { requestListener } from './server/requestListener.mjs'

createServer(requestListener).listen(process.env.PORT ?? 3000)
