/** The request every cross-reference result restates, whatever it found. A
 * missing company means the topic was cross-referenced across every company
 * the caller may read. */
export type CompareScope = {
  company?: string
  topic: string
  mode: 'hybrid' | 'lexical_only'
}
