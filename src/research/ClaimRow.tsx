import { Link } from '@tanstack/react-router'
import type { ClaimRowProps } from './ClaimRowProps'
import { citationLinkLabel } from './citationLinkLabel'
import { claimSources } from './claimSources'

export function ClaimRow(props: ClaimRowProps) {
  return (
    <li className="border-l-2 border-primary pl-4">
      <p className="whitespace-pre-wrap text-lg">{props.claim.text}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {claimSources(props).map((citation) => (
          <Link
            key={citation.citationId}
            to={citation.readerPath}
            className="text-xs text-primary underline"
            title={citation.citationId}
          >
            Source: {citationLinkLabel(citation)}
          </Link>
        ))}
      </div>
    </li>
  )
}
