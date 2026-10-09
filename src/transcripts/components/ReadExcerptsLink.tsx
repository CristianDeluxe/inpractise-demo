import { Link } from '@tanstack/react-router'
import { documentIdForTranscript } from '../episodes/documentIdForTranscript'
import type { ReadExcerptsLinkProps } from './ReadExcerptsLinkProps'

/** Back to the interview this transcript belongs to, where its excerpts open. */
export function ReadExcerptsLink({ id }: ReadExcerptsLinkProps) {
  const documentId = documentIdForTranscript(id)
  if (documentId === undefined) return null
  return (
    <Link to="/app" hash={documentId} className="underline underline-offset-4">
      Read excerpts
    </Link>
  )
}
