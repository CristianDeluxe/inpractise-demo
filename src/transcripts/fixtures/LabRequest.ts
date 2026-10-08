export type LabRequest = {
  readonly url: string
  readonly method: string
  readonly body: unknown
  readonly keepalive: boolean
}
