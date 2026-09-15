import type { SubmitEvent } from 'react'

/** The trimmed question a submitted composer carries, with the page reload
 * the form would otherwise cause already prevented. */
export function chatQuestionFromSubmit(
  event: SubmitEvent<HTMLFormElement>,
  query: string,
): string {
  event.preventDefault()
  return query.trim()
}
