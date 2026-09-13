export type ImportOptions = {
  orgId: string
  manifest: Record<string, unknown>
  indexMode: 'hybrid' | 'lexical_only'
}
