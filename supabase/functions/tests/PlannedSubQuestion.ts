/** One scripted sub-question, optionally scoped to a company. */
export type PlannedSubQuestion = {
  question: string
  company?: string | null
}
