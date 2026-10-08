/** Socket addresses of this machine; the lab API answers no one else. */
export const loopbackAddresses: ReadonlySet<string> = new Set([
  '127.0.0.1',
  '::1',
  '::ffff:127.0.0.1',
])
