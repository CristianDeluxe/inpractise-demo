import { Link } from '@tanstack/react-router'
import type { AskCitationChipsProps } from './AskCitationChipsProps'
import { citationLinkLabel } from './citationLinkLabel'

/** Each chip opens the passage the answer actually used. The server-owned
 * identity stays on the title, where it can be read without filling the chat
 * with hex. */
export function AskCitationChips({ citations }: AskCitationChipsProps) {
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {citations.map((citation) => (
        <li key={citation.citationId}>
          <Link
            to={citation.readerPath}
            title={citation.citationId}
            className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {citationLinkLabel(citation)}
          </Link>
        </li>
      ))}
    </ul>
  )
}
