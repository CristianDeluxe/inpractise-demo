/** The request every cross-reference result restates, whatever it found. */
export type CompareScope = {
  company: string
  topic: string
  mode: 'hybrid' | 'lexical_only'
}
