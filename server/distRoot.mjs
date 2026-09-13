import { fileURLToPath } from 'node:url'

// The built SPA sits next to this directory in both the repository and the
// deployed application root.
export const distRoot = fileURLToPath(new URL('../dist/', import.meta.url))
