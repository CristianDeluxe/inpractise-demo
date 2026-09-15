/** One part of the plan: the index the model will cite it by, the standalone
 * question retrieval runs on, and the company slug it is scoped to, if any. */
export type SubQuestion = {
  index: number
  question: string
  company?: string
}
