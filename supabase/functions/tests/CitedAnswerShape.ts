/** The claims and citations a cited answer is asserted to carry. */
export type CitedAnswerShape = {
  claims: { text: string }[]
  citations: { quote: string }[]
}
