import type { EvidenceIdProps } from './EvidenceIdProps'
import { useCopyIdentifier } from './hooks/useCopyIdentifier'
import { shortenIdentifier } from './shortenIdentifier'

/**
 * A server-owned identifier as a chip rather than a wall of hex. The digest is
 * abbreviated on screen and carried whole by the title and the clipboard, so
 * the identity stays checkable without dominating the sentence around it.
 */
export function EvidenceId({ identifier, label }: EvidenceIdProps) {
  const { copied, copy } = useCopyIdentifier(identifier)
  return (
    <button
      type="button"
      title={identifier}
      aria-label={`Copy ${label} ${identifier}`}
      onClick={() => {
        void copy()
      }}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-border bg-secondary px-2 py-0.5 font-mono text-xs transition-colors hover:bg-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {shortenIdentifier(identifier)}
      <span aria-hidden="true" className="text-muted-foreground">
        {copied ? 'copied' : 'copy'}
      </span>
    </button>
  )
}
