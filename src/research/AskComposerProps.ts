import type { SubmitEvent } from 'react'

export type AskComposerProps = {
  query: string
  pending: boolean
  onChange: (query: string) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}
