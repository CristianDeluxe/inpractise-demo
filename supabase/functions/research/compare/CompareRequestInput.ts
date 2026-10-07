/** A validated cross-reference request, with the company still optional. */
export type CompareRequestInput = {
  topic: string
  company?: string | undefined
}
