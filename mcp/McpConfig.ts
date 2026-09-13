/** Everything the server needs, and nothing that could widen its access: no
 *  service key, no org, user or role. */
export type McpConfig = {
  url: string
  publishableKey: string
  email: string
  password: string
}
